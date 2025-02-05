export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const API_SECRET = process.env.API_SECRET;
  const dcnData = req.body;
  dcnData.apiKey = API_SECRET;  // Attach API key to request

  try {
    // Send data to Google Apps Script
    const response = await fetch("https://script.google.com/macros/s/AKfycbzCfUY8fIiOMYOQxsoA_vf-8gEeS_Yue4GiF5OTDtYKVZu42XjI_n0shr29g-8ahpB8/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dcnData),
    });

    const textResponse = await response.text();

    try {
      const jsonResponse = JSON.parse(textResponse);
      return res.status(200).json(jsonResponse);
    } catch (error) {
      console.error("Google Apps Script returned invalid JSON:", textResponse);
      return res.status(500).json({ error: "Invalid JSON response from Google Apps Script", details: textResponse });
    }

  } catch (error) {
    console.error("Error communicating with Google Apps Script:", error);
    return res.status(500).json({ error: "Failed to fetch data from Google Apps Script" });
  }
}
