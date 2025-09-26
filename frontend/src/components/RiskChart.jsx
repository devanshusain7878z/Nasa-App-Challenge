import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const RiskChart = ({ data }) => {
  // Generate sample risk data if none provided
  const sampleData =
    data.length > 0
      ? data
      : [
          { time: "0", risk: 0.1, energy: 0 },
          { time: "1", risk: 0.15, energy: 0.5 },
          { time: "2", risk: 0.25, energy: 1.2 },
          { time: "3", risk: 0.4, energy: 2.1 },
          { time: "4", risk: 0.6, energy: 3.5 },
          { time: "5", risk: 0.8, energy: 5.2 },
          { time: "6", risk: 0.9, energy: 7.1 },
          { time: "7", risk: 0.95, energy: 9.3 },
          { time: "8", risk: 0.98, energy: 12.1 },
          { time: "9", risk: 1.0, energy: 15.5 },
        ];

  const riskLevelData = [
    { level: "Low", count: 15, color: "#10B981" },
    { level: "Medium", count: 8, color: "#F59E0B" },
    { level: "High", count: 3, color: "#EF4444" },
  ];

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">Risk Assessment</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Over Time */}
        <div>
          <h4 className="font-bold text-blue-400 mb-2">Risk Evolution</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9CA3AF" tick={{ fontSize: 12 }} />
              <YAxis stroke="#9CA3AF" tick={{ fontSize: 12 }} domain={[0, 1]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #374151",
                  borderRadius: "6px",
                }}
                labelStyle={{ color: "#F3F4F6" }}
              />
              <Line
                type="monotone"
                dataKey="risk"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Level Distribution */}
        <div>
          <h4 className="font-bold text-green-400 mb-2">
            Risk Level Distribution
          </h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={riskLevelData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="level" stroke="#9CA3AF" tick={{ fontSize: 12 }} />
              <YAxis stroke="#9CA3AF" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #374151",
                  borderRadius: "6px",
                }}
                labelStyle={{ color: "#F3F4F6" }}
              />
              <Bar dataKey="count" fill="#8884d8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Risk Indicators */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-700 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="font-medium">Low Risk</span>
          </div>
          <div className="text-sm text-gray-300 mt-1">Risk score &lt; 0.3</div>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="font-medium">Medium Risk</span>
          </div>
          <div className="text-sm text-gray-300 mt-1">Risk score 0.3 - 0.7</div>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="font-medium">High Risk</span>
          </div>
          <div className="text-sm text-gray-300 mt-1">Risk score &gt; 0.7</div>
        </div>
      </div>
    </div>
  );
};

export default RiskChart;
