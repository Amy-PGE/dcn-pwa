import { useState, useEffect } from "react";

export default function App() {
  const [dcns, setDcns] = useState([]);
  const [form, setForm] = useState({
    documentName: "",
    currentRevision: "",
    documentType: "Internal",
    reasonForChange: "",
    descriptionOfChange: "",
    requestedBy: "",
    date: "",
    status: "Pending",
    impact: [],
    departmentAffected: [],
    changeProcessedDate: "",
    changeCommunicated: "",
    changeCompleteBy: ""
  });

  useEffect(() => {
    const storedDcns = JSON.parse(localStorage.getItem("dcns")) || [];
    setDcns(storedDcns);
  }, []);

  useEffect(() => {
    localStorage.setItem("dcns", JSON.stringify(dcns));
  }, [dcns]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter((item) => item !== value),
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

const handleSubmit = (e) => {
  e.preventDefault();

  const newDcn = { ...form };

  // Save in Local Storage
  setDcns([...dcns, newDcn]);

  // Send to Google Sheets
  fetch("https://script.google.com/a/macros/powerglide.co.nz/s/AKfycbz8exb9hyak86zKfoA5R2xSCYxYFuVgqhfxTfhnsaRYzEvgK1qEpL9lgh114lrxQqLp/exec", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newDcn),
  })
  .then(response => response.text())
  .then(data => console.log("Google Sheets Response:", data))
  .catch(error => console.error("Error sending to Google Sheets:", error));

  // Reset Form
  setForm({
    documentName: "",
    currentRevision: "",
    documentType: "Internal",
    reasonForChange: "",
    descriptionOfChange: "",
    requestedBy: "",
    date: "",
    status: "Pending",
    impact: [],
    departmentAffected: [],
    changeProcessedDate: "",
    changeCommunicated: "",
    changeCompleteBy: ""
  });
};

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md fixed w-full">
        <h1 className="text-2xl font-bold">Document Change Notice (DCN) Application</h1>
      </header>

      {/* Main Content */}
      <main className="pt-20 p-4 max-w-4xl mx-auto">
        {/* DCN Form */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Submit a New DCN</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium">Document Name</label>
              <input
                type="text"
                name="documentName"
                value={form.documentName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block font-medium">Current Revision</label>
              <input
                type="text"
                name="currentRevision"
                value={form.currentRevision}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block font-medium">Document Type</label>
              <select
                name="documentType"
                value={form.documentType}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="Internal">Internal</option>
                <option value="External">External</option>
                <option value="Legal">Legal</option>
              </select>
            </div>
            <div>
              <label className="block font-medium">Reason for Change</label>
              <input
                type="text"
                name="reasonForChange"
                value={form.reasonForChange}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block font-medium">Description of Change</label>
              <textarea
                name="descriptionOfChange"
                value={form.descriptionOfChange}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              ></textarea>
            </div>
            <div>
              <label className="block font-medium">Requested By</label>
              <input
                type="text"
                name="requestedBy"
                value={form.requestedBy}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block font-medium">Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-200"
            >
              Submit DCN
            </button>
          </form>
        </section>

        {/* Submitted DCNs List */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Submitted DCNs</h2>
          <ul className="space-y-4">
            {dcns.map((dcn, index) => (
              <li key={index} className="bg-white p-6 rounded-lg shadow-md">
                <p><strong>Document:</strong> {dcn.documentName}</p>
                <p><strong>Revision:</strong> {dcn.currentRevision}</p>
                <p><strong>Type:</strong> {dcn.documentType}</p>
                <p><strong>Reason:</strong> {dcn.reasonForChange}</p>
                <p><strong>Status:</strong> {dcn.status}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
