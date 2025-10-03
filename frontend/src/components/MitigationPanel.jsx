import React, { useContext, useState } from "react";
import axios from "axios";
import { dataContext } from "@/Context";

const MitigationPanel = () => {
  const {
    selectedAsteroid,
    impactResult,
    setMitigationResults: onResultsChange,
  } = useContext(dataContext);
  const [selectedStrategy, setSelectedStrategy] = useState("kinetic-impactor");
  const [parameters, setParameters] = useState({
    impactorMass: 1000,
    impactorVelocity: 10,
    timeToImpact: 365,
    impactAngle: 0,
  });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const strategies = [
    {
      id: "kinetic-impactor",
      name: "Kinetic Impactor",
      description: "High-speed collision to change asteroid trajectory",
      icon: "🚀",
      color: "blue",
    },
    {
      id: "gravity-tractor",
      name: "Gravity Tractor",
      description: "Gravitational pull from nearby spacecraft",
      icon: "🛰️",
      color: "green",
    },
    {
      id: "laser-ablation",
      name: "Laser Ablation",
      description: "Focused laser to vaporize surface material",
      icon: "🔴",
      color: "red",
    },
    {
      id: "nuclear-deflection",
      name: "Nuclear Deflection",
      description: "Nuclear explosion for maximum deflection",
      icon: "💥",
      color: "yellow",
    },
  ];

  const runSimulation = async () => {
    if (!selectedAsteroid || !impactResult) {
      alert("Please select an asteroid and run an impact simulation first");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:7000/api/mitigation/${selectedStrategy}`,
        {
          targetMass: impactResult.mass,
          targetVelocity: impactResult.adjustedVelocity,
          ...parameters,
        }
      );

      setResults(response.data);
      onResultsChange(response.data);
    } catch (error) {
      console.error("Mitigation simulation error:", error);
      alert("Failed to run mitigation simulation");
    } finally {
      setLoading(false);
    }
  };

  const compareStrategies = async () => {
    console.log(selectedAsteroid, impactResult);
    if (!selectedAsteroid || !impactResult) {
      alert("Please select an asteroid and run an impact simulation first");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:7000/api/mitigation/compare",
        {
          targetMass: impactResult.mass,
          targetVelocity: impactResult.adjustedVelocity,
          timeToImpact: 365,
          asteroidDiameter: selectedAsteroid.estimated_diameter?.meters
            ? (selectedAsteroid.estimated_diameter.meters
                .estimated_diameter_min +
                selectedAsteroid.estimated_diameter.meters
                  .estimated_diameter_max) /
              2
            : 100,
        }
      );

      setResults(response.data);
      onResultsChange(response.data);
    } catch (error) {
      console.error("Strategy comparison error:", error);
      alert("Failed to compare mitigation strategies");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 rounded-lg text-white">
        <h1 className="text-3xl font-bold mb-2">🛡️ Mitigation Strategies</h1>
        <p className="text-lg text-green-100">
          Explore different methods to deflect threatening asteroids
        </p>
      </div>

      {/* Strategy Selection */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Select Mitigation Strategy</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {strategies.map((strategy) => (
            <button
              key={strategy.id}
              onClick={() => setSelectedStrategy(strategy.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedStrategy === strategy.id
                  ? `border-${strategy.color}-500 bg-${strategy.color}-900`
                  : "border-gray-600 bg-gray-700 hover:border-gray-500"
              }`}
            >
              <div className="text-center">
                <div className="text-3xl mb-2">{strategy.icon}</div>
                <div className="font-bold">{strategy.name}</div>
                <div className="text-sm text-gray-300 mt-1">
                  {strategy.description}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Parameters */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Strategy Parameters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {selectedStrategy === "kinetic-impactor" && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Impactor Mass (kg)
                </label>
                <input
                  type="range"
                  min="100"
                  max="10000"
                  step="100"
                  value={parameters.impactorMass}
                  onChange={(e) =>
                    setParameters({
                      ...parameters,
                      impactorMass: Number(e.target.value),
                    })
                  }
                  className="w-full"
                />
                <span className="text-sm text-gray-300">
                  {parameters.impactorMass} kg
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Impactor Velocity (km/s)
                </label>
                <input
                  type="range"
                  min="5"
                  max="20"
                  step="0.5"
                  value={parameters.impactorVelocity}
                  onChange={(e) =>
                    setParameters({
                      ...parameters,
                      impactorVelocity: Number(e.target.value),
                    })
                  }
                  className="w-full"
                />
                <span className="text-sm text-gray-300">
                  {parameters.impactorVelocity} km/s
                </span>
              </div>
            </>
          )}

          {selectedStrategy === "gravity-tractor" && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Tractor Mass (kg)
                </label>
                <input
                  type="range"
                  min="1000"
                  max="50000"
                  step="1000"
                  value={parameters.tractorMass || 10000}
                  onChange={(e) =>
                    setParameters({
                      ...parameters,
                      tractorMass: Number(e.target.value),
                    })
                  }
                  className="w-full"
                />
                <span className="text-sm text-gray-300">
                  {parameters.tractorMass || 10000} kg
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Distance (m)
                </label>
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="10"
                  value={parameters.distance || 100}
                  onChange={(e) =>
                    setParameters({
                      ...parameters,
                      distance: Number(e.target.value),
                    })
                  }
                  className="w-full"
                />
                <span className="text-sm text-gray-300">
                  {parameters.distance || 100} m
                </span>
              </div>
            </>
          )}

          {selectedStrategy === "laser-ablation" && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Laser Power (kW)
              </label>
              <input
                type="range"
                min="100"
                max="10000"
                step="100"
                value={parameters.laserPower || 1000}
                onChange={(e) =>
                  setParameters({
                    ...parameters,
                    laserPower: Number(e.target.value),
                  })
                }
                className="w-full"
              />
              <span className="text-sm text-gray-300">
                {parameters.laserPower || 1000} kW
              </span>
            </div>
          )}

          {selectedStrategy === "nuclear-deflection" && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Nuclear Yield (MT)
              </label>
              <input
                type="range"
                min="0.1"
                max="10"
                step="0.1"
                value={parameters.nuclearYield || 1}
                onChange={(e) =>
                  setParameters({
                    ...parameters,
                    nuclearYield: Number(e.target.value),
                  })
                }
                className="w-full"
              />
              <span className="text-sm text-gray-300">
                {parameters.nuclearYield || 1} MT
              </span>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">
              Time to Impact (days)
            </label>
            <input
              type="range"
              min="30"
              max="1095"
              step="30"
              value={parameters.timeToImpact}
              onChange={(e) =>
                setParameters({
                  ...parameters,
                  timeToImpact: Number(e.target.value),
                })
              }
              className="w-full"
            />
            <span className="text-sm text-gray-300">
              {parameters.timeToImpact} days
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={runSimulation}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-6 py-3 rounded-lg font-bold transition-colors"
        >
          {loading ? "Running..." : "Run Simulation"}
        </button>

        <button
          onClick={compareStrategies}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-6 py-3 rounded-lg font-bold transition-colors"
        >
          {loading ? "Comparing..." : "Compare All Strategies"}
        </button>
      </div>

      {/* Results */}
      {results && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Simulation Results</h2>

          {results.comparison ? (
            // Strategy comparison results
            <div className="space-y-6">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="font-bold text-green-400 mb-2">
                  Recommended Strategy
                </h3>
                <div className="text-lg font-bold">
                  {results.recommendation.name}
                </div>
                <div className="text-sm text-gray-300">
                  Effectiveness:{" "}
                  {(results.recommendation.effectiveness * 100).toFixed(1)}%
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {results.comparison.map((strategy, index) => (
                  <div key={index} className="bg-gray-700 p-4 rounded-lg">
                    <div className="font-bold">{strategy.name}</div>
                    <div className="text-sm text-gray-300">
                      Effectiveness: {(strategy.effectiveness * 100).toFixed(1)}
                      %
                    </div>
                    <div className="text-sm text-gray-300">
                      Cost: ${strategy.cost.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-300">
                      Risk: {strategy.risk}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Single strategy results
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="font-bold text-blue-400 mb-2">
                  Deflection Results
                </h3>
                <div className="space-y-2 text-sm">
                  <div>
                    Velocity Change: {results.results.velocityChange.toFixed(6)}{" "}
                    km/s
                  </div>
                  <div>
                    Deflection Distance:{" "}
                    {(results.results.deflectionDistance / 1000).toFixed(2)} km
                  </div>
                  <div>
                    Effectiveness:{" "}
                    {(results.results.effectiveness * 100).toFixed(2)}%
                  </div>
                  <div>
                    Success Probability:{" "}
                    {(results.results.successProbability * 100).toFixed(1)}%
                  </div>
                </div>
              </div>

              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="font-bold text-green-400 mb-2">
                  Mission Requirements
                </h3>
                <div className="space-y-2 text-sm">
                  <div>
                    Launch Window: {results.missionRequirements.launchWindow}{" "}
                    days before impact
                  </div>
                  <div>
                    Total Mass:{" "}
                    {results.missionRequirements.totalMissionMass.toFixed(0)} kg
                  </div>
                  <div>
                    Fuel Mass: {results.missionRequirements.fuelMass.toFixed(0)}{" "}
                    kg
                  </div>
                  {results.missionRequirements.operationDuration && (
                    <div>
                      Operation Duration:{" "}
                      {results.missionRequirements.operationDuration} days
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MitigationPanel;
