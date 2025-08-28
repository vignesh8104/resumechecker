import React, { useEffect, useMemo, useState } from "react";
import KanbanBoard from "./components/KanbanBoard.jsx";
import CandidateForm from "./components/CandidateForm.jsx";
import Filters from "./components/Filters.jsx";
import Dashboard from "./components/Dashboard.jsx";
import { api } from "./services/api.js";
import { io } from "socket.io-client";

const stages = ["Applied","Interview","Offer","Rejected"];

export default function App() {
  const [candidates, setCandidates] = useState([]);
  const [filters, setFilters] = useState({ q: "", role: "", stage: "", minExp: "", maxExp: "" });
  const [statsTick, setStatsTick] = useState(0);

  const fetchData = async () => {
    const { data } = await api.get("/candidates", { params: filters });
    setCandidates(data);
  };

  useEffect(() => { fetchData(); }, [JSON.stringify(filters)]);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_URL || "http://localhost:5000");
    socket.on("connect", () => {});
    socket.on("dataUpdated", () => { fetchData(); setStatsTick(t => t+1); });
    return () => socket.disconnect();
  }, []);

  const grouped = useMemo(() => {
    const map = Object.fromEntries(stages.map(s => [s, []]));
    for (const c of candidates) map[c.stage]?.push(c);
    return map;
  }, [candidates]);

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    const destStage = destination.droppableId;
    const srcStage = source.droppableId;
    if (destStage === srcStage) return;
    await api.patch(`/candidates/${draggableId}/stage`, { stage: destStage });
    // server will emit update -> refetch
  };

  const addCandidate = async (payload) => {
    await api.post("/candidates", payload);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mini Applicant Tracking System</h1>
      </header>
      <section className="grid md:grid-cols-4 gap-4">
        <div className="md:col-span-3 space-y-4">
          <Filters filters={filters} onChange={setFilters} />
          <KanbanBoard columns={grouped} onDragEnd={onDragEnd} />
        </div>
        <div className="md:col-span-1">
          <CandidateForm onSubmit={addCandidate} />
          <div className="mt-6">
            <Dashboard tick={statsTick} />
          </div>
        </div>
      </section>
    </div>
  );
}
