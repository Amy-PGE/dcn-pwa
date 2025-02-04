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
    setDcns([...dcns, form]);
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
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold">Document Change Notice (DCN)</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md shadow">
        <input type="text" name="documentName" placeholder="Document Name" value={form.documentName} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="currentRevision" placeholder="Current Revision" value={form.currentRevision} onChange={handleChange} className="w-full p-2 border rounded" required />
        <label className="block font-semibold">Document Type</label>
        <select name="documentType" value={form.documentType} onChange={handleChange} className="w-full p-2 border rounded" required>
          <option value="Internal">Internal</option>
          <option value="External">External</option>
          <option value="Legal">Legal</option>
        </select>
        <input type="text" name="reasonForChange" placeholder="Reason for Change" value={form.reasonForChange} onChange={handleChange} className="w-full p-2 border rounded" required />
        <textarea name="descriptionOfChange" placeholder="Description of Change" value={form.descriptionOfChange} onChange={handleChange} className="w-full p-2 border rounded" required></textarea>
        <input type="text" name="requestedBy" placeholder="Requested By" value={form.requestedBy} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full p-2 border rounded" required />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Submit DCN</button>
      </form>

      <h2 className="text-lg font-semibold mt-6">Submitted DCNs</h2>
      <ul className="mt-4 space-y-2">
        {dcns.map((dcn, index) => (
          <li key={index} className="p-4 border rounded-md">
            <p><strong>Document:</strong> {dcn.documentName}</p>
            <p><strong>Revision:</strong> {dcn.currentRevision}</p>
            <p><strong>Type:</strong> {dcn.documentType}</p>
            <p><strong>Reason:</strong> {dcn.reasonForChange}</p>
            <p><strong>Status:</strong> {dcn.status}</p>
            <p><strong>Impact:</strong> {dcn.impact.join(", ")}</p>
            <p><strong>Departments Affected:</strong> {dcn.departmentAffected.join(", ")}</p>
            <p><strong>Change Processed Date:</strong> {dcn.changeProcessedDate}</p>
            <p><strong>Change Communicated:</strong> {dcn.changeCommunicated}</p>
            <p><strong>Change Complete By:</strong> {dcn.changeCompleteBy}</p>
            <select name="status" value={dcn.status} onChange={(e) => {
              const updatedDcns = [...dcns];
              updatedDcns[index].status = e.target.value;
              setDcns(updatedDcns);
            }} className="p-2 border rounded">
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
}
