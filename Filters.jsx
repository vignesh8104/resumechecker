import React from "react";

export default function Filters({ filters, onChange }) {
  const f = filters;
  const set = (k, v) => onChange({ ...f, [k]: v });
  return (
    <div className="bg-white rounded-2xl p-3 shadow flex flex-wrap items-center gap-2">
      <input value={f.q} onChange={e=>set("q", e.target.value)} placeholder="Search name..." className="border rounded-lg p-2 flex-1 min-w-[160px]" />
      <input value={f.role} onChange={e=>set("role", e.target.value)} placeholder="Role..." className="border rounded-lg p-2 w-40" />
      <select value={f.stage} onChange={e=>set("stage", e.target.value)} className="border rounded-lg p-2 w-40">
        <option value="">All stages</option>
        <option>Applied</option><option>Interview</option><option>Offer</option><option>Rejected</option>
      </select>
      <input type="number" value={f.minExp} onChange={e=>set("minExp", e.target.value)} placeholder="Min exp" className="border rounded-lg p-2 w-28" />
      <input type="number" value={f.maxExp} onChange={e=>set("maxExp", e.target.value)} placeholder="Max exp" className="border rounded-lg p-2 w-28" />
      <button onClick={()=>onChange({ q:"", role:"", stage:"", minExp:"", maxExp:"" })} className="border rounded-lg px-3 py-2">Reset</button>
    </div>
  );
}
