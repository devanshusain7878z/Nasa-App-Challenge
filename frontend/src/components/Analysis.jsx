import { dataContext } from "@/Context";
import React, { useContext } from "react";

const Analysis = () => {
  const { impactResult } = useContext(dataContext);
  return (
    <div className="space-y-8">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Advanced Impact Analysis</h2>
        {impactResult && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="font-bold text-blue-400 mb-2">
                Atmospheric Effects
              </h3>
              <div className="space-y-2 text-sm">
                <div>
                  Airburst Altitude:{" "}
                  {impactResult.atmosphericEffects.airburstAltitude.toFixed(0)}{" "}
                  m
                </div>
                <div>
                  Fireball Radius:{" "}
                  {impactResult.atmosphericEffects.fireballRadius.toFixed(0)} m
                </div>
                <div>
                  Energy: {impactResult.atmosphericEffects.energy.toFixed(2)} TJ
                </div>
              </div>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="font-bold text-red-400 mb-2">
                Environmental Impact
              </h3>
              <div className="space-y-2 text-sm">
                <div>
                  Impact Type: {impactResult.environmentalEffects.impactType}
                </div>
                <div>
                  Affected Radius:{" "}
                  {(
                    impactResult.environmentalEffects.affectedRadius / 1000
                  ).toFixed(1)}{" "}
                  km
                </div>
                <div>
                  Seismic:{" "}
                  {impactResult.environmentalEffects.environmentalDamage.seismic
                    ? "Yes"
                    : "No"}
                </div>
                <div>
                  Tsunami:{" "}
                  {impactResult.environmentalEffects.environmentalDamage.tsunami
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
                        : impactResult.riskAssessment.riskLevel === "MEDIUM"
                        ? "text-yellow-400"
                        : "text-green-400"
                    }`}
                  >
                    {impactResult.riskAssessment.riskLevel}
                  </span>
                </div>
                <div>
                  Risk Score: {impactResult.riskAssessment.riskScore.toFixed(2)}
                </div>
                <div>
                  Energy Factor:{" "}
                  {impactResult.riskAssessment.factors.energy.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analysis;
