export interface LeadData {
  name?: string;
  email: string;
  number?: string;
  description?: string;
  amount?: string;
}

/**
 * Normalises a Swiss phone number to the `0041XXXXXXXXX` format the CRM requires.
 * Accepts: +41..., 41...(11 digits), 079..., 79...
 */
function formatSwissPhone(raw: string): string {
  // Strip everything except digits and leading +
  let phone = raw.replace(/[^0-9+]/g, "");

  if (!phone) return "0000000000";

  // +41... → 0041...
  if (phone.startsWith("+")) {
    phone = "00" + phone.slice(1);
  }

  // 41XXXXXXXXX (11 digits, no leading 00) → 0041...
  if (phone.startsWith("41") && phone.length === 11) {
    phone = "00" + phone;
  }

  // Already correct
  if (phone.startsWith("0041")) return phone;

  // 07X... (Swiss local with leading 0) → 0041 + remove the leading 0
  if (phone.startsWith("0") && !phone.startsWith("00")) {
    phone = "0041" + phone.slice(1);
    return phone;
  }

  // 7X... (Swiss local without leading 0) → 0041 + number
  if (!phone.startsWith("00")) {
    phone = "0041" + phone;
  }

  return phone;
}

/**
 * Parses a full name string into { first_name, last_name }.
 * Uses .trim() first to prevent leading spaces causing a blank first_name.
 */
function parseName(fullName?: string): { first_name: string; last_name: string } {
  const [first_name, ...lastParts] = (fullName || "Unknown").trim().split(" ");
  const last_name = lastParts.join(" ") || "Lead";
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
  const phone = formatSwissPhone(data.number || "");

  const payload = {
    country_name: "ch",
    description: data.description || "Signup Lead",
    phone,
    email: data.email,
    first_name,
    last_name,
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
        authorization: token,
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

    return true;
  } catch (error) {
    console.error("Failed to submit lead to CRM", error);
    return false;
  }
}
