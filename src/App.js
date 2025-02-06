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

      {view === "review" && (
        <div className="pt-20 max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md text-black">
          <button onClick={() => setView("home")} className="px-4 py-2 bg-[#C41230] text-white font-bold rounded mb-4">Back</button>
          <h2 className="text-xl font-semibold mb-4">Review a Current DCN</h2>
          <ul>
            {dcns.map((dcn, index) => (
              <li
                key={index}
                className="p-4 border rounded cursor-pointer hover:bg-gray-100"
                onClick={() => setSelectedDcn(dcn)}
              >
                {dcn.documentName} - {dcn.currentRevision}
              </li>
            ))}
          </ul>
          {selectedDcn && (
            <div className="mt-6 p-4 border rounded">
              <h3 className="text-lg font-semibold">{selectedDcn.documentName}</h3>
              <p><strong>Current Revision:</strong> {selectedDcn.currentRevision}</p>
              <p><strong>Reason for Change:</strong> {selectedDcn.reasonForChange}</p>
              <p><strong>Description:</strong> {selectedDcn.descriptionOfChange}</p>
              <p><strong>Requested By:</strong> {selectedDcn.requestedBy}</p>
              <p><strong>Date:</strong> {selectedDcn.date}</p>

              <label className="block font-semibold mt-4">Impact</label>
              <select name="impact" multiple value={selectedDcn.impact} onChange={handleChange} className="w-full p-2 border rounded">
                <option value="Automations">Automations</option>
                <option value="Process Change">Process Change</option>
                <option value="SOP">SOP</option>
                <option value="Comms Links">Comms Links</option>
                <option value="Upload to Platform">Upload to Platform</option>
              </select>

              <label className="block font-semibold mt-4">Department Affected</label>
              <select name="departmentAffected" multiple value={selectedDcn.departmentAffected} onChange={handleChange} className="w-full p-2 border rounded">
                <option value="Sales">Sales</option>
                <option value="Design">Design</option>
                <option value="Accounts">Accounts</option>
                <option value="Purchasing">Purchasing</option>
                <option value="Production">Production</option>
                <option value="Field Operations">Field Operations</option>
                <option value="Service">Service</option>
                <option value="Customer">Customer</option>
              </select>

              <label className="block font-semibold mt-4">Change Processed Date</label>
              <input type="date" name="changeProcessedDate" value={selectedDcn.changeProcessedDate} onChange={handleChange} className="w-full p-2 border rounded" />

              <label className="block font-semibold mt-4">Change Complete By</label>
              <input type="text" name="changeCompleteBy" value={selectedDcn.changeCompleteBy} onChange={handleChange} className="w-full p-2 border rounded" />

              <button onClick={handleComplete} className="mt-4 px-6 py-3 bg-green-600 text-white font-bold rounded">Complete DCN</button>
              <button onClick={handleReject} className="mt-4 ml-4 px-6 py-3 bg-red-600 text-white font-bold rounded">Reject DCN</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
