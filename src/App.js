import { useState, useEffect } from "react";

export default function App() {
  const [dcns, setDcns] = useState([]);
  const [view, setView] = useState("home"); // Home, Submit, Review, Complete
  const [selectedDcn, setSelectedDcn] = useState(null);
  const [form, setForm] = useState({
    documentName: "",
    currentRevision: "",
    documentType: "",
    reasonForChange: "",
    descriptionOfChange: "",
    requestedBy: "",
    date: "",
    status: "Pending",
    impact: [],
    departmentAffected: [],
    changeProcessedDate: "",
    changeCommunicated: false,
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
        [name]: checked,
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDcns([...dcns, form]);
    setView("home");
  };

  const handleComplete = () => {
    setDcns(dcns.filter((dcn) => dcn !== selectedDcn));
    setView("complete");
  };

  const handleReject = () => {
    setDcns(dcns.filter((dcn) => dcn !== selectedDcn));
    setView("complete");
  };

  return (
    <div className="min-h-screen bg-white text-black p-4">
      <header className="bg-[#C41230] text-white p-4 shadow-md fixed w-full flex items-center justify-between">
        <img src="/logo.jpg" alt="Company Logo" className="h-10 ml-4" />
        <div className="flex-1 text-center">
          <h1 className="text-2xl font-bold">Document Change Notice (DCN)</h1>
        </div>
      </header>

      {view === "home" && (
        <div className="pt-28 flex flex-col items-center gap-6 text-center">
          <div className="text-[#848688] font-normal text-lg max-w-2xl space-y-3">
            <p>A DCN should be raised for any modification that impacts the content or process described in a document.</p>
            <p><strong>Minor spelling/grammar changes do not require a DCN.</strong></p>
            <p>If a change affects workflows, compliance, automation, or any dependent process, it must go through the DCN process.</p>
          </div>
          <div className="mt-4 flex flex-col gap-4">
            <button onClick={() => setView("submit")} className="px-6 py-3 bg-[#C41230] text-white font-bold rounded">Submit a New DCN</button>
            <button onClick={() => setView("review")} className="px-6 py-3 bg-[#C41230] text-white font-bold rounded">Review a Current DCN</button>
            <button onClick={() => setView("complete")} className="px-6 py-3 bg-[#C41230] text-white font-bold rounded">View Completed DCNs</button>
          </div>
        </div>
      )}

      {view === "submit" && (
        <div className="pt-20 max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md text-black">
          <button onClick={() => setView("home")} className="px-4 py-2 bg-[#C41230] text-white font-bold rounded mb-4">Back</button>
          <h2 className="text-xl font-semibold mb-4">Submit a New DCN</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="documentName" placeholder="Document Name" value={form.documentName} onChange={handleChange} className="w-full p-2 border rounded" required />
            <input type="text" name="currentRevision" placeholder="Current Revision" value={form.currentRevision} onChange={handleChange} className="w-full p-2 border rounded" required />
            <label className="block font-semibold">Document Type</label>
            <select name="documentType" value={form.documentType} onChange={handleChange} className="w-full p-2 border rounded" required>
              <option value="">Select One</option>
              <option value="Internal">Internal</option>
              <option value="External">External</option>
              <option value="Legal">Legal</option>
            </select>
            <input type="text" name="reasonForChange" placeholder="Reason for Change" value={form.reasonForChange} onChange={handleChange} className="w-full p-2 border rounded" required />
            <textarea name="descriptionOfChange" placeholder="Description of Change" value={form.descriptionOfChange} onChange={handleChange} className="w-full p-2 border rounded" required></textarea>
            <input type="text" name="requestedBy" placeholder="Requested By" value={form.requestedBy} onChange={handleChange} className="w-full p-2 border rounded" required />
            <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full p-2 border rounded" required />
            <button type="submit" className="w-full py-2 bg-[#C41230] text-white font-semibold rounded">Submit DCN</button>
          </form>
        </div>
      )}

      {view === "review" && (
        <div className="pt-20 max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md text-black">
          <button onClick={() => setView("home")} className="px-4 py-2 bg-[#C41230] text-white font-bold rounded mb-4">Back</button>
          <h2 className="text-xl font-semibold mb-4">Review a Current DCN</h2>
          <ul>
            {dcns.map((dcn, index) => (
              <li key={index} className="p-4 border rounded cursor-pointer hover:bg-gray-100" onClick={() => setSelectedDcn(dcn)}>
                {dcn.documentName} - {dcn.currentRevision}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
