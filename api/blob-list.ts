import type { VercelRequest, VercelResponse } from "@vercel/node";
import { list } from "@vercel/blob";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const prefix = req.query.prefix as string | undefined;

    const blobs = await list({
      prefix: prefix || undefined,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return res.status(200).json(blobs);
  } catch (err: any) {
    console.error("Blob list error:", err);
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
}
