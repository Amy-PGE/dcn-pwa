export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Secure API Key (Never exposed to frontend)
  const API_SECRET = process.env.API_SECRET;

  // Get data from request
  const dcnData = req.body;
  dcnData.apiKey = API_SECRET;  // Attach API key to request

  // Send data to Google Apps Script
  const response = await fetch("https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dcnData),
  });

  const responseData = await response.json();
  return res.status(200).json(responseData);
}
