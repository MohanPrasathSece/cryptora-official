export interface LeadData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country_name?: string;
  description?: string;
  custom_fields?: Record<string, string>;
}

export async function createLead(data: LeadData) {
  const url = import.meta.env.VITE_CRM_URL || "https://inwo.crmcore.me/api/lead_management/api/affiliates";
  const token = import.meta.env.VITE_CRM_TOKEN || "AFF_1_92cbc1bc76284e19b711bab22587d75f";

  // Provide defaults
  const payload = {
    country_name: data.country_name || "us",
    description: data.description || "Lead from Cryptora",
    phone: data.phone,
    email: data.email,
    first_name: data.first_name,
    last_name: data.last_name,
    custom_fields: data.custom_fields || {},
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "authorization": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error("CRM API Error:", response.status, response.statusText);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Failed to submit lead to CRM", error);
    return false;
  }
}
