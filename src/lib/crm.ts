export interface LeadData {
  name?: string;
  email: string;
  number?: string;
  description?: string;
  amount?: string;
  countryCode?: string;
  leadType?: "signup" | "contact";
}

export const COUNTRY_PHONE_PATTERNS: Record<string, { regex: RegExp; example: string }> = {
  IE: { regex: /^8\d{8}$/, example: "87 123 4567" },
  CH: { regex: /^(\+41|0041|0)?[1-9]\d{8}$/, example: "079 123 45 67" },
  FR: { regex: /^(\+33|0033|0)[1-9]\d{8}$/, example: "06 12 34 56 78" },
  BE: { regex: /^(\+32|0032|0)[1-9]\d{7,8}$/, example: "047 12 34 56" },
  CA: { regex: /^(\+1|001)?\d{10}$/, example: "416 123 4567" },
  US: { regex: /^(\+1|001)?\d{10}$/, example: "212 123 4567" },
  GB: { regex: /^(\+44|0044|0)[1-9]\d{9}$/, example: "07123 456789" },
  DE: { regex: /^(\+49|0049|0)[1-9]\d{10,11}$/, example: "0151 12345678" },
  ES: { regex: /^(\+34|0034)?[67]\d{8}$/, example: "612 34 56 78" },
  IT: { regex: /^(\+39|0039)?3\d{8,9}$/, example: "312 345 6789" },
  NL: { regex: /^(\+31|0031|0)6\d{8}$/, example: "06 12345678" },
  SE: { regex: /^(\+46|0046|0)7\d{8}$/, example: "070 123 45 67" },
  AU: { regex: /^(\+61|0061|0)4\d{8}$/, example: "0412 345 678" },
  IN: { regex: /^(\+91|0091)?[6-9]\d{9}$/, example: "91234 56789" },
  AE: { regex: /^(\+971|00971|0)5\d{8}$/, example: "050 123 4567" },
  SG: { regex: /^(\+65|0065)?[89]\d{7}$/, example: "8123 4567" },
  ZA: { regex: /^(\+27|0027|0)[6-8]\d{8}$/, example: "071 234 5678" },
  BR: { regex: /^(\+55|0055)?\d{10,11}$/, example: "11 91234 5678" },
  MX: { regex: /^(\+52|0052)?\d{10}$/, example: "55 1234 5678" },
  JP: { regex: /^(\+81|0081|0)[789]0\d{8}$/, example: "090 1234 5678" },
  CY: { regex: /^(\+357|00357)?[9]\d{7}$/, example: "99 123456" }
};

const DIAL_CODES: Record<string, string> = {
  IE: "353",
  CH: "41", FR: "33", BE: "32", CA: "1", US: "1", GB: "44",
  DE: "49", ES: "34", IT: "39", NL: "31", SE: "46", AU: "61",
  IN: "91", AE: "971", SG: "65", ZA: "27", BR: "55", MX: "52",
  JP: "81", CY: "357"
};

/**
 * Normalises a phone number for the CRM.
 */
function formatPhone(raw: string, countryCode: string): string {
  let phone = raw.replace(/[^0-9+]/g, "");
  if (!phone) return "0000000000";

  // If already starts with +, just replace with 00
  if (phone.startsWith("+")) {
    return "00" + phone.slice(1);
  }

  // If already starts with 00, return as is
  if (phone.startsWith("00")) return phone;

  const code = DIAL_CODES[countryCode.toUpperCase()] || "41";

  // If it starts with 0, it's usually a local number, remove the 0
  if (phone.startsWith("0")) {
    return "00" + code + phone.slice(1);
  }

  return "00" + code + phone;
}

/**
 * Parses a full name string into { first_name, last_name }.
 * Uses .trim() first to prevent leading spaces causing a blank first_name.
 */
function parseName(fullName?: string): { first_name: string; last_name: string } {
  const [first_name, ...lastParts] = (fullName || "Unknown").trim().split(" ");
  const last_name = lastParts.join(" ") || "";
  return { first_name: first_name || "Unknown", last_name };
}

export async function createLead(data: LeadData): Promise<boolean> {
  const url =
    import.meta.env.VITE_CRM_URL ||
    "https://inwo.crmcore.me/api/lead_management/api/affiliates";
  const token =
    import.meta.env.VITE_CRM_TOKEN ||
    "AFF_1_92cbc1bc76284e19b711bab22587d75f";

  const { first_name, last_name } = parseName(data.name);
  const countryCode = data.countryCode || "CH";
  const phone = formatPhone(data.number || "", countryCode);

  const payload = {
    country_name: (data.countryCode || "CH").toUpperCase(),
    description: "Cryptora",
    phone,
    email: data.email,
    first_name,
    last_name,
    password: "Password123!",
    custom_fields: {
      Source_ID: "website",
      How_Much_Invested: data.amount || "0",
      Outline_Your_Case: data.description || "",
    },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    let responseBody: any = null;
    try {
      responseBody = await response.json();
    } catch {
      // Not JSON — ignore
    }

    if (!response.ok) {
    const errorText = await response.clone().text().catch(()=>"");
    if (errorText.toLowerCase().includes("already exist") || errorText.toLowerCase().includes("already exists")) {
        throw new Error("Failed to create account: Account already exist!");
    }

      const errorMsg = responseBody?.error || response.statusText;
      console.error("CRM API Error:", response.status, errorMsg);
      if (
        typeof errorMsg === "string" &&
        errorMsg.toLowerCase().includes("already exist")
      ) {
        return true;
      }
      return false;
    }

    if (responseBody?.error) {
      console.error("CRM API Error (200 OK but invalid):", responseBody.error);
      if (
        typeof responseBody.error === "string" &&
        responseBody.error.toLowerCase().includes("already exist")
      ) {
        return true;
      }
      return false;
    }

    try {
      const dashboardUrl = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_DASHBOARD_URL) || "https://lead-dashboard-orcin.vercel.app/api/increment";
      await fetch(dashboardUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ website: "Cryptora", type: data.leadType || (data.description ? "contact" : "signup"), name: data.name, email: data.email})
      }).catch(() => {});
    } catch(e){}

    return true;
  } catch (error) {
    console.error("Failed to submit lead to CRM", error);
    return false;
  }
}


function incrementLeadCount() {
  fetch("/api/leads-count", { method: "POST" }).catch((err) =>
    console.warn("[leads-count] Failed to increment:", err)
  );
}
