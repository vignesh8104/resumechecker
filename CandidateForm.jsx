import React, { useState } from "react";

const initial = { name: "", role: "", experienceYears: 0, resumeUrl: "", stage: "Applied" };

export default function CandidateForm({ onSubmit }) {
  const [form, setForm] = useState(initial);
  const submit = async (e) => {
    e.preventDefault();
    await onSubmit({ ...form, experienceYears: Number(form.experienceYears) });
    setForm(initial);
  };
  return (
    <form onSubmit={submit} className="bg-white rounded-2xl p-4 shadow">
      <h3 className="font-semibold mb-3">Add Candidate</h3>
      <div className="space-y-2">
        <input required placeholder="Name" className="w-full border rounded-lg p-2" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
        <input required placeholder="Role" className="w-full border rounded-lg p-2" value={form.role} onChange={e=>setForm({...form, role:e.target.value})}/>
        <input required type="number" min="0" placeholder="Years of Experience" className="w-full border rounded-lg p-2" value={form.experienceYears} onChange={e=>setForm({...form, experienceYears:e.target.value})}/>
        <input placeholder="Resume URL" className="w-full border rounded-lg p-2" value={form.resumeUrl} onChange={e=>setForm({...form, resumeUrl:e.target.value})}/>
        <select className="w-full border rounded-lg p-2" value={form.stage} onChange={e=>setForm({...form, stage:e.target.value})}>
          <option>Applied</option><option>Interview</option><option>Offer</option><option>Rejected</option>
        </select>
        <button className="w-full bg-black text-white rounded-xl py-2">Save</button>
      </div>
    </form>
  );
}
