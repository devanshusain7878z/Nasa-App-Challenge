import React, { useState, useEffect, useContext } from "react";
import { getAsteroids } from "../services/api";
import { damp } from "three/src/math/MathUtils";
import { dataContext } from "@/Context";

const Dashboard = () => {
  const {
    asteroidsData: asteroids,
    selectedAsteroid,
    impactResult,
    riskData,
  } = useContext(dataContext);
  const [stats, setStats] = useState({
    totalAsteroids: 0,
    hazardousAsteroids: 0,
    averageSize: 0,
    closestApproach: null,
  });

  useEffect(() => {
    if (asteroids.length > 0) {
      const hazardous = asteroids.filter(
        (asteroid) => asteroid.is_potentially_hazardous_asteroid
      );

      const sizes = asteroids
        .map((asteroid) => {
          const diameter = asteroid.estimated_diameter?.meters;
          if (diameter) {
            return (
              (diameter.estimated_diameter_min +
                diameter.estimated_diameter_max) /
              2
            );
          }
          return 0;
        })
        .filter((size) => size > 0);

      const averageSize =
        sizes.length > 0 ? sizes.reduce((a, b) => a + b, 0) / sizes.length : 0;

      setStats({
        totalAsteroids: asteroids.length,
        hazardousAsteroids: hazardous.length,
        averageSize: averageSize,
        closestApproach: asteroids[0], // Simplified - would need proper calculation
      });
    }
  }, [asteroids]);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-lg text-white">
        <h1 className="text-4xl font-bold mb-4">
          🌍 Asteroid Impact Simulation Dashboard
        </h1>
        <p className="text-xl text-blue-100">
          Real-time asteroid tracking and impact simulation using NASA and USGS
          data
        </p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-blue-500 rounded-full">
              <span className="text-2xl">☄️</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-300">
                Total Asteroids
              </p>
              <p className="text-2xl font-bold text-white">
                {stats.totalAsteroids}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-red-500 rounded-full">
              <span className="text-2xl">⚠️</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-300">
                Hazardous Asteroids
              </p>
              <p className="text-2xl font-bold text-white">
                {stats.hazardousAsteroids}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-green-500 rounded-full">
              <span className="text-2xl">📏</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-300">Average Size</p>
              <p className="text-2xl font-bold text-white">
                {stats.averageSize.toFixed(0)}m
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-500 rounded-full">
              <span className="text-2xl">🎯</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-300">
                Current Simulation
              </p>
              <p className="text-2xl font-bold text-white">
                {selectedAsteroid ? "Active" : "None"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Current Simulation Status */}
      {selectedAsteroid && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">
            Current Simulation: {selectedAsteroid.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="font-bold text-blue-400 mb-2">Asteroid Details</h3>
              <div className="space-y-2 text-sm">
                <div>Name: {selectedAsteroid.name}</div>
                <div>ID: {selectedAsteroid.id}</div>
                <div>
                  Hazardous:{" "}
                  {selectedAsteroid.is_potentially_hazardous_asteroid
                    ? "Yes"
                    : "No"}
                </div>
                {selectedAsteroid.estimated_diameter?.meters && (
                  <div>
                    Size:{" "}
                    {(selectedAsteroid.estimated_diameter.meters
                      .estimated_diameter_min +
                      selectedAsteroid.estimated_diameter.meters
                        .estimated_diameter_max) /
                      2}{" "}
                    m
                  </div>
                )}
              </div>
            </div>

            {impactResult && (
              <>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-bold text-red-400 mb-2">
                    Impact Analysis
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      Energy: {(impactResult.energy / 1e12).toFixed(2)} TJ
                    </div>
                    <div>
                      TNT Equivalent:{" "}
                      {(impactResult.tntEquivalent / 1e6).toFixed(2)} MT
                    </div>
                    <div>Crater Size: {impactResult.crater.toFixed(0)} m</div>
                    <div>
                      Seismic: M{impactResult.seismicMagnitude.toFixed(1)}
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
                            : impactResult.riskAssessment.riskLevel === "MEDIUM"
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
                      Impact Type:{" "}
                      {impactResult.environmentalEffects.impactType}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 p-4 rounded-lg transition-colors">
            <div className="text-center">
              <div className="text-3xl mb-2">🎯</div>
              <div className="font-bold">Run Simulation</div>
              <div className="text-sm text-gray-300">Start impact analysis</div>
            </div>
          </button>

          <button className="bg-green-600 hover:bg-green-700 p-4 rounded-lg transition-colors">
            <div className="text-center">
              <div className="text-3xl mb-2">🛡️</div>
              <div className="font-bold">Mitigation Strategies</div>
              <div className="text-sm text-gray-300">
                Explore deflection options
              </div>
            </div>
          </button>

          <button className="bg-purple-600 hover:bg-purple-700 p-4 rounded-lg transition-colors">
            <div className="text-center">
              <div className="text-3xl mb-2">📊</div>
              <div className="font-bold">View Analysis</div>
              <div className="text-sm text-gray-300">Detailed impact data</div>
            </div>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div>
              <div className="font-medium">System Online</div>
              <div className="text-sm text-gray-300">
                NASA NEO API connected
              </div>
            </div>
            <div className="text-sm text-gray-400 ml-auto">Just now</div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div>
              <div className="font-medium">USGS Data Updated</div>
              <div className="text-sm text-gray-300">
                Seismic and geological data refreshed
              </div>
            </div>
            <div className="text-sm text-gray-400 ml-auto">2 minutes ago</div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <div>
              <div className="font-medium">Simulation Ready</div>
              <div className="text-sm text-gray-300">
                Impact modeling system initialized
              </div>
            </div>
            <div className="text-sm text-gray-400 ml-auto">5 minutes ago</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
