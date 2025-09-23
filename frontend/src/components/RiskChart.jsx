import { dataContext } from "@/context";
import { memo, useContext } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const RiskChart = memo(() => {
  console.log("risk");
  const { riskData } = useContext(dataContext);
  return (
    <div className="bg-white p-4 rounded-2xl shadow h-96">
      <h2 className="text-xl font-bold mb-3">📊 Risk Assessment</h2>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={riskData}>
          <XAxis dataKey="factor" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});

export default RiskChart;
