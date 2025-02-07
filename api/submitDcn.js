export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const API_SECRET = process.env.API_SECRET;
  const dcnData = req.body;
  dcnData.apiKey = API_SECRET;  // Attach API key to request

  console.log("📨 Sending data to Google Apps Script:", JSON.stringify(dcnData));

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbwPvO9PKUFi1quO7PvXe4-POREwhp1D0MU7Js5GtUsvzLjsGp_OwuBI4UNS011W9KfJrg/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dcnData),
    });

    const responseData = await response.text();
    console.log("✅ Google Sheets Response:", responseData);
    return res.status(200).json({ message: "Success", responseData });
  } catch (error) {
    console.error("❌ Error sending to Google Apps Script:", error);
    return res.status(500).json({ error: "Google Apps Script request failed" });
  }
}
