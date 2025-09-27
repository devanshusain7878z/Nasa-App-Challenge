// frontend/src/App.jsx
import React, { useContext, useEffect, useReducer, useState } from "react";
import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import {
  getAsteroids,
  getAsteroidDetails,
  simulateImpact,
} from "./services/api";
import Dashboard from "./components/Dashboard";
import OrbitalView from "./components/OrbitalView";
import ImpactMap from "./components/ImpactMap";
import AsteroidSelector from "./components/AsteroidSelector";
import MitigationPanel from "./components/MitigationPanel";
import RiskChart from "./components/RiskChart";
import EducationalOverlay from "./components/EducationalOverlay";
import Impactor2025Scenario from "./components/Impactor2025Scenario";
import "./accessibility.css";
import { useStorage } from "./hooks/useStorage";
import { dataContext } from "./Context";

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

const App = () => {
  const {
    asteroidsData,
    dispatch,
    selectedId,
    selectedAsteroid,
    size,
    velocity,
    velocityChange,
    impactResult,
    showEducational,
    showScenario,
    mitigationResults,
    riskData,
    setSelectedId,
    setVelocityChange,
    setVelocity,
    setSize,
    setMitigationResults,
    setShowScenario,
  } = useContext(dataContext);
  // const [selectedId, setSelectedId] = useState(null);
  // const [selectedAsteroid, setSelectedAsteroid] = useState(null);

  // const [size, setSize] = useState(100);
  // const [velocity, setVelocity] = useState(20);
  // const [velocityChange, setVelocityChange] = useState(0);
  // const [impactResult, setImpactResult] = useState(null);

  // const [showEducational, setShowEducational] = useState(false);
  // const [showScenario, setShowScenario] = useState(false);
  // const [mitigationResults, setMitigationResults] = useState(null);
  // const [riskData, setRiskData] = useState([]);

  // useEffect(() => {
  //   async function load() {
  //     const data = await getAsteroids(0);
  //     // NASA browse returns near_earth_objects array OR near_earth_objects keyed by page; handle both
  //     const list = data.near_earth_objects || data;
  //     dispatch({ type: "setAsteroidsData", payload: list || [] });
  //   }
  //   load();
  // }, []);

  // useEffect(() => {
  //   // when user selects an asteroid id, fetch details and fill defaults
  //   if (!selectedId) {
  //     setSelectedAsteroid(null);
  //     return;
  //   }
  //   (async () => {
  //     const details = await getAsteroidDetails(selectedId);
  //     setSelectedAsteroid(details);

  //     const avgD = avgDiameterFromEstimated(details.estimated_diameter);
  //     const relVel =
  //       details.close_approach_data?.[0]?.relative_velocity
  //         ?.kilometers_per_second;
  //     if (avgD) setSize(Math.round(avgD));
  //     if (relVel) setVelocity(Number(parseFloat(relVel).toFixed(2)));
  //     // trigger an immediate simulation (using asteroid defaults)
  //     const sim = await simulateImpact(
  //       avgD || size,
  //       relVel || velocity,
  //       velocityChange,
  //       selectedId
  //     );
  //     setImpactResult(sim);
  //   })();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedId]);

  // // When size/velocity/velocityChange change, re-simulate (but keep asteroidId if selected)
  // useEffect(() => {
  //   (async () => {
  //     const sim = await simulateImpact(
  //       size,
  //       velocity,
  //       velocityChange,
  //       selectedId
  //     );
  //     setImpactResult(sim);
  //   })();
  // }, [size, velocity, velocityChange, selectedId]);

  const selectedMarker = selectedAsteroid
    ? idToLatLng(selectedAsteroid.id)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 text-white">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold text-blue-400">
                🌍 Asteroid Impact Simulator
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowEducational(!showEducational)}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
              >
                {showEducational ? "Hide" : "Show"} Educational
              </button>
              <button
                onClick={() => setShowScenario(!showScenario)}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
              >
                Impactor-2025 Scenario
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-700 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  isActive
                    ? "border-b-blue-500 text-blue-400"
                    : "border-transparent text-gray-300 hover:text-white hover:border-gray-300"
                }`
              }
            >
              📊 Dashboard
            </NavLink>
            <NavLink
              to="/simulation"
              className={({ isActive }) =>
                `py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  isActive
                    ? "border-blue-500 text-blue-400"
                    : "border-transparent text-gray-300 hover:text-white hover:border-gray-300"
                }`
              }
            >
              🎯 Simulation
            </NavLink>
            <NavLink
              to="/mitigation"
              className={({ isActive }) =>
                `py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  isActive
                    ? "border-blue-500 text-blue-400"
                    : "border-transparent text-gray-300 hover:text-white hover:border-gray-300"
                }`
              }
            >
              🛡️ Mitigation
            </NavLink>
            <NavLink
              to="/analysis"
              className={({ isActive }) =>
                `py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  isActive
                    ? "border-blue-500 text-blue-400"
                    : "border-transparent text-gray-300 hover:text-white hover:border-gray-300"
                }`
              }
            >
              📈 Analysis
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route
            path="/dashboard"
            element={
              <Dashboard
                asteroids={asteroidsData}
                selectedAsteroid={selectedAsteroid}
                impactResult={impactResult}
                riskData={riskData}
              />
            }
          />
          <Route
            path="/simulation"
            element={
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <AsteroidSelector
                      asteroids={asteroidsData}
                      selectedId={selectedId}
                      setSelectedId={setSelectedId}
                    />

                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                      <h3 className="text-xl font-bold mb-4">
                        Simulation Controls
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Asteroid Size (meters)
                          </label>
                          <input
                            type="range"
                            min="1"
                            max="1000"
                            value={size}
                            onChange={(e) => setSize(Number(e.target.value))}
                            className="w-full"
                          />
                          <span className="text-sm text-gray-300">
                            {size} m
                          </span>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Velocity (km/s)
                          </label>
                          <input
                            type="range"
                            min="1"
                            max="50"
                            step="0.1"
                            value={velocity}
                            onChange={(e) =>
                              setVelocity(Number(e.target.value))
                            }
                            className="w-full"
                          />
                          <span className="text-sm text-gray-300">
                            {velocity} km/s
                          </span>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Velocity Change (km/s)
                          </label>
                          <input
                            type="range"
                            min="-5"
                            max="5"
                            step="0.1"
                            value={velocityChange}
                            onChange={(e) =>
                              setVelocityChange(Number(e.target.value))
                            }
                            className="w-full"
                          />
                          <span className="text-sm text-gray-300">
                            {velocityChange} km/s
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {impactResult && (
                      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold mb-4">
                          Impact Analysis
                        </h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-300">Mass:</span>
                            <span className="ml-2 font-mono">
                              {impactResult.mass.toFixed(2)} kg
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-300">Energy:</span>
                            <span className="ml-2 font-mono">
                              {(impactResult.energy / 1e12).toFixed(2)} TJ
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-300">
                              TNT Equivalent:
                            </span>
                            <span className="ml-2 font-mono">
                              {(impactResult.tntEquivalent / 1e6).toFixed(2)} MT
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-300">Crater:</span>
                            <span className="ml-2 font-mono">
                              {impactResult.crater.toFixed(0)} m
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-300">Seismic:</span>
                            <span className="ml-2 font-mono">
                              M{impactResult.seismicMagnitude.toFixed(1)}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-300">Tsunami:</span>
                            <span className="ml-2 font-mono">
                              {impactResult.tsunamiHeight.toFixed(1)} m
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    <RiskChart data={riskData} />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="rounded-lg overflow-hidden shadow-lg border-2 border-gray-600">
                    <h2 className="text-2xl font-bold text-center p-4 bg-gray-800">
                      3D Orbital View
                    </h2>
                    <OrbitalView
                      asteroids={asteroidsData}
                      selectedAsteroid={selectedAsteroid}
                    />
                  </div>

                  <div className="rounded-lg overflow-hidden shadow-lg border-2 border-gray-600">
                    <h2 className="text-2xl font-bold text-center p-4 bg-gray-800">
                      Impact Map
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
            }
          />
          <Route
            path="/mitigation"
            element={
              <MitigationPanel
                selectedAsteroid={selectedAsteroid}
                impactResult={impactResult}
                onResultsChange={setMitigationResults}
              />
            }
          />
          <Route
            path="/analysis"
            element={
              <div className="space-y-8">
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-bold mb-4">
                    Advanced Impact Analysis
                  </h2>
                  {impactResult && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-gray-700 p-4 rounded-lg">
                        <h3 className="font-bold text-blue-400 mb-2">
                          Atmospheric Effects
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div>
                            Airburst Altitude:{" "}
                            {impactResult.atmosphericEffects.airburstAltitude.toFixed(
                              0
                            )}{" "}
                            m
                          </div>
                          <div>
                            Fireball Radius:{" "}
                            {impactResult.atmosphericEffects.fireballRadius.toFixed(
                              0
                            )}{" "}
                            m
                          </div>
                          <div>
                            Energy:{" "}
                            {impactResult.atmosphericEffects.energy.toFixed(2)}{" "}
                            TJ
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-700 p-4 rounded-lg">
                        <h3 className="font-bold text-red-400 mb-2">
                          Environmental Impact
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div>
                            Impact Type:{" "}
                            {impactResult.environmentalEffects.impactType}
                          </div>
                          <div>
                            Affected Radius:{" "}
                            {(
                              impactResult.environmentalEffects.affectedRadius /
                              1000
                            ).toFixed(1)}{" "}
                            km
                          </div>
                          <div>
                            Seismic:{" "}
                            {impactResult.environmentalEffects
                              .environmentalDamage.seismic
                              ? "Yes"
                              : "No"}
                          </div>
                          <div>
                            Tsunami:{" "}
                            {impactResult.environmentalEffects
                              .environmentalDamage.tsunami
                              ? "Yes"
                              : "No"}
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-700 p-4 rounded-lg">
                        <h3 className="font-bold text-yellow-400 mb-2">
                          Risk Assessment
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div>
                            Risk Level:{" "}
                            <span
                              className={`font-bold ${
                                impactResult.riskAssessment.riskLevel === "HIGH"
                                  ? "text-red-400"
                                  : impactResult.riskAssessment.riskLevel ===
                                    "MEDIUM"
                                  ? "text-yellow-400"
                                  : "text-green-400"
                              }`}
                            >
                              {impactResult.riskAssessment.riskLevel}
                            </span>
                          </div>
                          <div>
                            Risk Score:{" "}
                            {impactResult.riskAssessment.riskScore.toFixed(2)}
                          </div>
                          <div>
                            Energy Factor:{" "}
                            {impactResult.riskAssessment.factors.energy.toFixed(
                              2
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>

      {/* Educational Overlay */}
      {showEducational && (
        <EducationalOverlay onClose={() => setShowEducational(false)} />
      )}

      {/* Impactor-2025 Scenario */}
      {showScenario && (
        <Impactor2025Scenario onClose={() => setShowScenario(false)} />
      )}
    </div>
  );
};

export default App;
