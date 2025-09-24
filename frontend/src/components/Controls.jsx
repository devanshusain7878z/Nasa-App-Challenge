import React from "react";

const Controls = ({
  size,
  setSize,
  velocity,
  setVelocity,
  velocityChange,
  setVelocityChange,
}) => {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg mb-6 space-y-4">
      <div>
        <label className="block mb-1 font-semibold">
          Asteroid Size (m): {size}
        </label>
        <input
          type="range"
          min="10"
          max="1000"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="w-full accent-red-500"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">
          Velocity (km/s): {velocity}
        </label>
        <input
          type="range"
          min="5"
          max="50"
          value={velocity}
          onChange={(e) => setVelocity(e.target.value)}
          className="w-full accent-blue-500"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">
          Mitigation (Velocity Change km/s): {velocityChange}
        </label>
        <input
          type="range"
          min="-10"
          max="10"
          value={velocityChange}
          onChange={(e) => setVelocityChange(e.target.value)}
          className="w-full accent-green-500"
        />
      </div>
    </div>
  );
};

export default Controls;
