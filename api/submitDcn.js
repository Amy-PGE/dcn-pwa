export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const API_SECRET = process.env.API_SECRET;
  const dcnData = req.body;
  dcnData.apiKey = API_SECRET;  // Attach API key to request

  try {
    // Send data to Google Apps Script
    const response = await fetch("https://script.google.com/macros/s/AKfycbwPvO9PKUFi1quO7PvXe4-POREwhp1D0MU7Js5GtUsvzLjsGp_OwuBI4UNS011W9KfJrg/exec", { // Replace this!
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dcnData),
    });

    const textResponse = await response.text();
    console.log("Google Apps Script Response:", textResponse); // Debugging

    if (!response.ok) {
      return res.status(500).json({ error: "Google Apps Script request failed", details: textResponse });
    }

    return res.status(200).json(JSON.parse(textResponse));

  } catch (error) {
    console.error("Error communicating with Google Apps Script:", error);
    return res.status(500).json({ error: "Failed to fetch data from Google Apps Script", details: error.toString() });
  }
}
