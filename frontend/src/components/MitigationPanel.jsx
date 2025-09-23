import { memo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DstAlphaFactor } from "three";

const MitigationPanel = memo(() => {
  const [asteroid, setAsteroid] = useState({
    size: 300, // meters
    speed: 25000, // km/h
    probability: 60, // %
    warningTime: 5, // years
  });

  const calculateMitigation = () => {
    console.log("calculate");
    const { size, probability, warningTime } = asteroid;

    return [
      {
        strategy: "Deflection 🚀",
        effectiveness: Math.min(100, ((warningTime * 10) / size) * 100),
      },
      {
        strategy: "Nuclear 💥",
        effectiveness:
          size > 500
            ? Math.min(100, warningTime * 5)
            : Math.min(50, warningTime * 2),
      },
      {
        strategy: "Evacuation 🏃‍♂️",
        effectiveness: Math.min(100, probability * 2),
      },
      {
        strategy: "Early Warning 📡",
        effectiveness: Math.min(100, warningTime * 5),
      },
    ];
  };

  const results = calculateMitigation();

  return (
    <div className="bg-white p-4 rounded-2xl shadow">
      <h2 className="text-xl font-bold mb-3">🛡️ Mitigation Strategies</h2>

      {/* Inputs */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <input
          type="number"
          placeholder="Size (m)"
          className="border p-2 rounded"
          value={asteroid.size}
          onChange={(e) => setAsteroid({ ...asteroid, size: +e.target.value })}
        />
        <input
          type="number"
          placeholder="Probability (%)"
          className="border p-2 rounded"
          value={asteroid.probability}
          onChange={(e) =>
            setAsteroid({ ...asteroid, probability: +e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Speed (km/h)"
          className="border p-2 rounded"
          value={asteroid.speed}
          onChange={(e) => setAsteroid({ ...asteroid, speed: +e.target.value })}
        />
        <input
          type="number"
          placeholder="Warning Time (yrs)"
          className="border p-2 rounded"
          value={asteroid.warningTime}
          onChange={(e) =>
            setAsteroid({ ...asteroid, warningTime: +e.target.value })
          }
        />
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={results}>
          <XAxis dataKey="strategy" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="effectiveness" fill="#4f46e5" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});

export default MitigationPanel;
