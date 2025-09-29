import { dataContext } from "@/Context";
import React, { useContext } from "react";

const AsteroidSelector = () => {
  const {
    asteroidsData: asteroids,
    selectedId,
    setSelectedId,
  } = useContext(dataContext);
  return (
    <div className="bg-gray-800 text-white p-3 rounded-lg shadow mb-4">
      <label className="block font-semibold mb-2">Select asteroid</label>
      <select
        className="w-full p-2 bg-gray-700 rounded focus:outline-none"
        value={selectedId || ""}
        onChange={(e) => setSelectedId(e.target.value)}
      >
        <option value="">— pick an asteroid —</option>
        {asteroids.map((a) => (
          <option key={a.id} value={a.id}>
            {a.name} — {a.id}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AsteroidSelector;
