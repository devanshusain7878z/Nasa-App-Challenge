import React, { useState, useEffect } from "react";
import { simulateImpact } from "../services/api";

const Impactor2025Scenario = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [scenarioData, setScenarioData] = useState(null);
  const [loading, setLoading] = useState(false);

  const scenarioSteps = [
    {
      id: 0,
      title: "Discovery",
      icon: "🔍",
      content: (
        <div className="space-y-4">
          <div className="bg-red-900 p-4 rounded-lg">
            <h3 className="font-bold text-red-300 mb-2">🚨 URGENT ALERT</h3>
            <p className="text-sm">
              A newly discovered near-Earth asteroid, designated
              "Impactor-2025", has been detected by NASA's Near-Earth Object
              tracking system.
            </p>
          </div>
          <div className="bg-blue-900 p-4 rounded-lg">
            <h4 className="font-bold text-blue-300 mb-2">
              Initial Observations:
            </h4>
            <ul className="text-sm space-y-1">
              <li>• Diameter: ~150 meters</li>
              <li>• Velocity: 15.2 km/s</li>
              <li>• Approach Date: March 15, 2025</li>
              <li>• Miss Distance: 0.02 AU (within Earth's orbit)</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 1,
      title: "Risk Assessment",
      icon: "⚠️",
      content: (
        <div className="space-y-4">
          <div className="bg-yellow-900 p-4 rounded-lg">
            <h3 className="font-bold text-yellow-300 mb-2">Risk Analysis</h3>
            <p className="text-sm">
              Initial calculations indicate a 1 in 1,000 chance of impact. While
              low, this exceeds the threshold for immediate attention.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-900 p-4 rounded-lg">
              <h4 className="font-bold text-red-300 mb-2">
                Potential Impact Effects:
              </h4>
              <ul className="text-sm space-y-1">
                <li>• Energy: ~50 megatons TNT</li>
                <li>• Crater: ~2.5 km diameter</li>
                <li>• Seismic: M6.5 earthquake</li>
                <li>• Tsunami: 10-15m waves (if ocean impact)</li>
              </ul>
            </div>
            <div className="bg-green-900 p-4 rounded-lg">
              <h4 className="font-bold text-green-300 mb-2">
                Affected Population:
              </h4>
              <ul className="text-sm space-y-1">
                <li>• Direct impact zone: 50,000 people</li>
                <li>• Tsunami risk: 2 million people</li>
                <li>• Seismic effects: 10 million people</li>
                <li>• Economic damage: $500 billion</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: "Mitigation Planning",
      icon: "🛡️",
      content: (
        <div className="space-y-4">
          <div className="bg-blue-900 p-4 rounded-lg">
            <h3 className="font-bold text-blue-300 mb-2">
              Deflection Mission Planning
            </h3>
            <p className="text-sm">
              NASA and international partners are evaluating multiple mitigation
              strategies. Time is critical - we have 6 months before the
              asteroid's closest approach.
            </p>
          </div>
          <div className="space-y-4">
            <div className="bg-green-900 p-4 rounded-lg">
              <h4 className="font-bold text-green-300 mb-2">
                🚀 Kinetic Impactor Mission
              </h4>
              <div className="text-sm space-y-1">
                <p>
                  <strong>Timeline:</strong> 3 months to launch
                </p>
                <p>
                  <strong>Success Rate:</strong> 85%
                </p>
                <p>
                  <strong>Deflection:</strong> 0.1° trajectory change
                </p>
                <p>
                  <strong>Cost:</strong> $500 million
                </p>
              </div>
            </div>
            <div className="bg-purple-900 p-4 rounded-lg">
              <h4 className="font-bold text-purple-300 mb-2">
                🛰️ Gravity Tractor Mission
              </h4>
              <div className="text-sm space-y-1">
                <p>
                  <strong>Timeline:</strong> 4 months to launch
                </p>
                <p>
                  <strong>Success Rate:</strong> 70%
                </p>
                <p>
                  <strong>Deflection:</strong> 0.05° trajectory change
                </p>
                <p>
                  <strong>Cost:</strong> $800 million
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: "Mission Execution",
      icon: "🚀",
      content: (
        <div className="space-y-4">
          <div className="bg-green-900 p-4 rounded-lg">
            <h3 className="font-bold text-green-300 mb-2">
              Mission Status: ACTIVE
            </h3>
            <p className="text-sm">
              The kinetic impactor mission "Defender-1" has been launched
              successfully. The spacecraft is now en route to intercept
              Impactor-2025.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <h4 className="font-bold text-white mb-2">Launch Phase</h4>
              <div className="text-sm space-y-1">
                <p>✅ Launch successful</p>
                <p>✅ Trajectory confirmed</p>
                <p>🔄 En route to target</p>
                <p>⏳ 45 days to intercept</p>
              </div>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h4 className="font-bold text-white mb-2">Mission Parameters</h4>
              <div className="text-sm space-y-1">
                <p>Impactor Mass: 500 kg</p>
                <p>Impact Velocity: 6.5 km/s</p>
                <p>Target Distance: 0.02 AU</p>
                <p>Deflection Goal: 0.1°</p>
              </div>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h4 className="font-bold text-white mb-2">Success Metrics</h4>
              <div className="text-sm space-y-1">
                <p>Trajectory Change: 0.1°</p>
                <p>Miss Distance: 0.05 AU</p>
                <p>Risk Reduction: 95%</p>
                <p>Mission Success: 85%</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      title: "Outcome",
      icon: "🌍",
      content: (
        <div className="space-y-4">
          <div className="bg-green-900 p-4 rounded-lg">
            <h3 className="font-bold text-green-300 mb-2">
              🎉 MISSION SUCCESS
            </h3>
            <p className="text-sm">
              The Defender-1 mission successfully impacted Impactor-2025,
              changing its trajectory by 0.12°. The asteroid will now pass
              safely at a distance of 0.05 AU from Earth.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-900 p-4 rounded-lg">
              <h4 className="font-bold text-blue-300 mb-2">Final Results:</h4>
              <ul className="text-sm space-y-1">
                <li>✅ Impact successful</li>
                <li>✅ Trajectory changed by 0.12°</li>
                <li>✅ Miss distance: 0.05 AU</li>
                <li>✅ Risk eliminated</li>
              </ul>
            </div>
            <div className="bg-purple-900 p-4 rounded-lg">
              <h4 className="font-bold text-purple-300 mb-2">
                Lessons Learned:
              </h4>
              <ul className="text-sm space-y-1">
                <li>• Early detection is crucial</li>
                <li>• International cooperation essential</li>
                <li>• Kinetic impactors are effective</li>
                <li>• Public communication matters</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const runSimulation = async () => {
    setLoading(true);
    try {
      // Simulate the Impactor-2025 scenario
      const result = await simulateImpact(150, 15.2, 0, "impactor-2025");
      setScenarioData(result);
    } catch (error) {
      console.error("Simulation error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentStep === 1) {
      runSimulation();
    }
  }, [currentStep]);

  const nextStep = () => {
    if (currentStep < scenarioSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = scenarioSteps[currentStep];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">☄️ Impactor-2025 Scenario</h2>
              <p className="text-sm text-red-100">
                Interactive asteroid threat simulation and mitigation
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-800 p-4">
          <div className="flex items-center space-x-2">
            {scenarioSteps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index <= currentStep
                      ? "bg-blue-600 text-white"
                      : "bg-gray-600 text-gray-300"
                  }`}
                >
                  {index + 1}
                </div>
                {index < scenarioSteps.length - 1 && (
                  <div
                    className={`w-8 h-1 mx-2 ${
                      index < currentStep ? "bg-blue-600" : "bg-gray-600"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="mb-6">
            <h3 className="text-3xl font-bold text-white mb-2">
              {currentStepData.icon} {currentStepData.title}
            </h3>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentStep + 1) / scenarioSteps.length) * 100}%`,
                }}
              />
            </div>
          </div>

          <div className="text-gray-300">{currentStepData.content}</div>

          {/* Simulation Results */}
          {currentStep === 1 && scenarioData && (
            <div className="mt-6 bg-gray-800 p-4 rounded-lg">
              <h4 className="font-bold text-green-400 mb-2">
                Simulation Results:
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-300">Energy:</span>
                  <span className="ml-2 font-mono">
                    {(scenarioData.energy / 1e12).toFixed(2)} TJ
                  </span>
                </div>
                <div>
                  <span className="text-gray-300">TNT Equivalent:</span>
                  <span className="ml-2 font-mono">
                    {(scenarioData.tntEquivalent / 1e6).toFixed(2)} MT
                  </span>
                </div>
                <div>
                  <span className="text-gray-300">Crater:</span>
                  <span className="ml-2 font-mono">
                    {scenarioData.crater.toFixed(0)} m
                  </span>
                </div>
                <div>
                  <span className="text-gray-300">Seismic:</span>
                  <span className="ml-2 font-mono">
                    M{scenarioData.seismicMagnitude.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-800 p-4 border-t border-gray-700">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-400">
              Step {currentStep + 1} of {scenarioSteps.length}
            </div>
            <div className="space-x-4">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 disabled:text-gray-500 px-4 py-2 rounded-lg transition-colors"
              >
                Previous
              </button>
              <button
                onClick={nextStep}
                disabled={currentStep === scenarioSteps.length - 1}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-800 disabled:text-gray-500 px-4 py-2 rounded-lg transition-colors"
              >
                {currentStep === scenarioSteps.length - 1 ? "Close" : "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Impactor2025Scenario;
