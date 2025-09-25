// frontend/src/App.jsx
import React, { useEffect, useState } from "react";
import {
  getAsteroids,
  getAsteroidDetails,
  simulateImpact,
} from "./services/api";
import Controls from "./components/Controls";
import OrbitalView from "./components/OrbitalView";
import ImpactMap from "./components/ImpactMap";
import AsteroidSelector from "./components/AsteroidSelector";

function avgDiameterFromEstimated(estimated) {
  if (!estimated?.meters) return null;
  const m = estimated.meters;
  return (m.estimated_diameter_min + m.estimated_diameter_max) / 2;
}

function idToLatLng(id) {
  // deterministic pseudo-random lat/lng from id
  let hash = 0;
  for (let i = 0; i < id.length; i++)
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  const lat = (hash % 18000) / 100 - 90; // -90..+90
  const lng = (Math.floor(hash / 18000) % 36000) / 100 - 180; // -180..+180
  return [lat, lng];
}

export default function App() {
  const [asteroidsData, setAsteroidsData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedAsteroid, setSelectedAsteroid] = useState(null);

  const [size, setSize] = useState(100);
  const [velocity, setVelocity] = useState(20);
  const [velocityChange, setVelocityChange] = useState(0);
  const [impactResult, setImpactResult] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await getAsteroids(0);
      // NASA browse returns near_earth_objects array OR near_earth_objects keyed by page; handle both
      const list = data.near_earth_objects || data;
      setAsteroidsData(list || []);
    }
    load();
  }, []);

  useEffect(() => {
    // when user selects an asteroid id, fetch details and fill defaults
    if (!selectedId) {
      setSelectedAsteroid(null);
      return;
    }
    (async () => {
      const details = await getAsteroidDetails(selectedId);
      setSelectedAsteroid(details);

      const avgD = avgDiameterFromEstimated(details.estimated_diameter);
      const relVel =
        details.close_approach_data?.[0]?.relative_velocity
          ?.kilometers_per_second;
      if (avgD) setSize(Math.round(avgD));
      if (relVel) setVelocity(Number(parseFloat(relVel).toFixed(2)));
      // trigger an immediate simulation (using asteroid defaults)
      const sim = await simulateImpact(
        avgD || size,
        relVel || velocity,
        velocityChange,
        selectedId
      );
      setImpactResult(sim);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  // When size/velocity/velocityChange change, re-simulate (but keep asteroidId if selected)
  useEffect(() => {
    (async () => {
      const sim = await simulateImpact(
        size,
        velocity,
        velocityChange,
        selectedId
      );
      setImpactResult(sim);
    })();
  }, [size, velocity, velocityChange, selectedId]);

  const selectedMarker = selectedAsteroid
    ? idToLatLng(selectedAsteroid.id)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 text-white p-6 space-y-8">
      <h1 className="text-4xl font-bold text-center">Asteroid Simulator</h1>

      <div className="max-w-4xl mx-auto space-y-4">
        <AsteroidSelector
          asteroids={asteroidsData}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />

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
            <p>Mass: {impactResult.mass.toFixed(2)} kg</p>
            <p>
              Adjusted Velocity: {impactResult.adjustedVelocity.toFixed(2)} km/s
            </p>
            <p>
              Impact Energy: {(impactResult.energy / 1e12).toFixed(2)}{" "}
              Terajoules
            </p>
            <p>
              Estimated Crater Diameter: {impactResult.crater.toFixed(2)} meters
            </p>
          </div>
        )}

        <div className="rounded-lg overflow-hidden shadow-lg border-2 border-gray-600">
          <h2 className="text-2xl font-bold text-center mt-4">
            3D Orbital View
          </h2>
          <OrbitalView
            asteroids={asteroidsData}
            selectedAsteroid={selectedAsteroid}
          />
        </div>

        <div className="rounded-lg overflow-hidden shadow-lg border-2 border-gray-600">
          <h2 className="text-2xl font-bold text-center mt-4">
            Potential Impact Map
          </h2>
          <ImpactMap
            asteroids={asteroidsData}
            crater={impactResult?.crater}
            velocityShift={impactResult?.impactShiftLat}
            selectedMarker={selectedMarker}
          />
        </div>
      </div>
    </div>
  );
}
