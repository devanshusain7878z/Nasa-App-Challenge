import React, { useEffect, useState } from "react";
import { getAsteroids, simulateImpact } from "./services/api";
import Controls from "./components/Controls";
import OrbitalView from "./components/OrbitalView";
import ImpactMap from "./components/ImpactMap";

function App() {
  const [asteroids, setAsteroids] = useState([]);
  const [size, setSize] = useState(100);
  const [velocity, setVelocity] = useState(20);
  const [velocityChange, setVelocityChange] = useState(0);
  const [impactResult, setImpactResult] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getAsteroids();
      setAsteroids(data.near_earth_objects || []);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchImpact() {
      const result = await simulateImpact(size, velocity, velocityChange);
      setImpactResult(result);
    }
    fetchImpact();
  }, [size, velocity, velocityChange]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 text-white p-6 space-y-8">
      <h1 className="text-4xl font-bold text-center mb-4">
        Asteroid Simulator
      </h1>

      <Controls
        size={size}
        setSize={setSize}
        velocity={velocity}
        setVelocity={setVelocity}
        velocityChange={velocityChange}
        setVelocityChange={setVelocityChange}
      />

      {impactResult && (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg space-y-2">
          <h3 className="text-xl font-bold">Impact Simulation</h3>
          <p>Mass: {Number(impactResult.mass)?.toFixed(2)} kg</p>
          <p>
            Adjusted Velocity:{" "}
            {Number(impactResult?.adjustedVelocity)?.toFixed(2)} km/s
          </p>
          <p>
            Impact Energy: {Number(impactResult?.energy / 1e12)?.toFixed(2)}{" "}
            Terajoules
          </p>
          <p>
            Estimated Crater Diameter:{" "}
            {Number(impactResult?.crater)?.toFixed(2)} meters
          </p>
        </div>
      )}

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center">3D Orbital View</h2>
        <div className="rounded-lg overflow-hidden shadow-lg border-2 border-gray-600">
          <OrbitalView asteroids={asteroids} />
        </div>

        <h2 className="text-2xl font-bold text-center">Potential Impact Map</h2>
        <div className="rounded-lg overflow-hidden shadow-lg border-2 border-gray-600">
          <ImpactMap
            asteroids={asteroids}
            crater={impactResult?.crater}
            velocityShift={impactResult?.impactShiftLat}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
