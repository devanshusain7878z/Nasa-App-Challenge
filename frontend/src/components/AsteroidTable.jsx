import { dataContext } from "@/context";
import { useContext } from "react";

const AsteroidTable = () => {
  const { asteroidData } = useContext(dataContext);
  return (
    <div className="bg-white p-4 rounded-2xl shadow">
      <h2 className="text-xl font-bold mb-3">🚀 Near-Earth Asteroids</h2>
      <table className="w-full text-left border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Size (m)</th>
            <th className="p-2">Miss Distance (km)</th>
          </tr>
        </thead>
        <tbody>
          {asteroidData.map((a, idx) => (
            <tr key={idx} className="border-b">
              <td className="p-2">{a.name}</td>
              <td className="p-2">{a.size}</td>
              <td className="p-2">{a.distance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AsteroidTable;
