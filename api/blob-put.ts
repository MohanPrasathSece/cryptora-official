import type { VercelRequest, VercelResponse } from "@vercel/node";
import { put } from "@vercel/blob";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const pathname = req.query.pathname as string;
    if (!pathname) {
      return res.status(400).json({ error: "Missing pathname" });
    }

    let body = req.body;
    if (typeof body !== "string") {
      body = JSON.stringify(body);
    }

    const blob = await put(pathname, body, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
      addRandomSuffix: false,
      cacheControlMaxAge: 0,
    });

    return res.status(200).json(blob);
  } catch (err: any) {
    console.error("Blob put error:", err);
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
}
