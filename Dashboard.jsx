import React, { useEffect, useState } from "react";
import { api } from "../services/api.js";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

export default function Dashboard({ tick }) {
  const [stats, setStats] = useState({ countsByStage: {}, countsByRole: [], averageExperience: 0 });
  const load = async () => {
    const { data } = await api.get("/stats");
    setStats(data);
  };
  useEffect(() => { load(); }, [tick]);

  const stageData = Object.entries(stats.countsByStage || {}).map(([name, value]) => ({ name, value }));
  const roleData = stats.countsByRole || [];

  return (
    <div className="bg-white rounded-2xl p-4 shadow space-y-4">
      <h3 className="font-semibold">Analytics</h3>
      <div className="text-sm">Average Experience: <span className="font-semibold">{stats.averageExperience} yrs</span></div>
      <div className="h-56">
        <ResponsiveContainer>
          <PieChart>
            <Pie dataKey="value" data={stageData} nameKey="name" label />
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="h-56">
        <ResponsiveContainer>
          <BarChart data={roleData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="role" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" name="Candidates" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
