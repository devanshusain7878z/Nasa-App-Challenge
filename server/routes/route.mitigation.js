import express from "express";
import {
  calculateKineticImpactorEffect,
  calculateGravityTractorEffect,
  calculateLaserAblationEffect,
  calculateDeflectionEffect,
} from "../utils/calculations.js";

const router = express.Router();

// Kinetic Impactor Mitigation Strategy
router.post("/kinetic-impactor", async (req, res) => {
  try {
    const {
      targetMass,
      targetVelocity,
      impactorMass,
      impactorVelocity,
      timeToImpact,
      impactAngle = 0, // degrees from perpendicular
    } = req.body;

    if (
      !targetMass ||
      !targetVelocity ||
      !impactorMass ||
      !impactorVelocity ||
      !timeToImpact
    ) {
      return res.status(400).json({
        error:
          "Missing required parameters: targetMass, targetVelocity, impactorMass, impactorVelocity, timeToImpact",
      });
    }

    // Calculate deflection effect
    const effect = calculateKineticImpactorEffect(
      impactorMass,
      impactorVelocity,
      targetMass,
      timeToImpact
    );

    // Adjust for impact angle (cosine of angle)
    const angleFactor = Math.cos((impactAngle * Math.PI) / 180);
    const adjustedVelocityChange = effect.velocityChange * angleFactor;
    const adjustedDeflectionDistance = effect.deflectionDistance * angleFactor;

    // Calculate mission requirements
    const missionRequirements = {
      launchWindow: timeToImpact - 365, // 1 year before impact
      approachVelocity: impactorVelocity,
      targetingAccuracy: (Math.atan(0.1 / impactorVelocity) * 180) / Math.PI, // degrees
      fuelMass: impactorMass * 0.1, // 10% of impactor mass
      totalMissionMass: impactorMass * 1.1,
    };

    // Calculate success probability
    const successProbability = Math.min(
      0.95,
      Math.max(0.1, (effect.effectiveness * 100) / (timeToImpact / 365))
    );

    res.json({
      strategy: "kinetic_impactor",
      parameters: {
        targetMass,
        targetVelocity,
        impactorMass,
        impactorVelocity,
        timeToImpact,
        impactAngle,
      },
      results: {
        velocityChange: adjustedVelocityChange,
        deflectionDistance: adjustedDeflectionDistance,
        effectiveness: adjustedDeflectionDistance / 6371000, // Earth radius
        successProbability,
      },
      missionRequirements,
      advantages: [
        "Proven technology",
        "High momentum transfer",
        "Relatively simple mission",
      ],
      disadvantages: [
        "Requires precise targeting",
        "Limited to large asteroids",
        "Single attempt only",
      ],
    });
  } catch (err) {
    console.error("Kinetic Impactor Error:", err);
    res
      .status(500)
      .json({ error: "Failed to calculate kinetic impactor effect" });
  }
});

// Gravity Tractor Mitigation Strategy
router.post("/gravity-tractor", async (req, res) => {
  try {
    const {
      targetMass,
      tractorMass,
      distance,
      timeToImpact,
      operationTime = 365, // days
    } = req.body;

    if (!targetMass || !tractorMass || !distance || !timeToImpact) {
      return res.status(400).json({
        error:
          "Missing required parameters: targetMass, tractorMass, distance, timeToImpact",
      });
    }

    // Calculate deflection effect
    const effect = calculateGravityTractorEffect(
      tractorMass,
      distance,
      targetMass,
      timeToImpact
    );

    // Calculate mission requirements
    const missionRequirements = {
      launchWindow: timeToImpact - 730, // 2 years before impact
      approachVelocity: 0.1, // km/s (slow approach)
      stationKeeping: true,
      fuelMass: tractorMass * 0.2, // 20% of tractor mass
      totalMissionMass: tractorMass * 1.2,
      operationDuration: operationTime,
    };

    // Calculate success probability
    const successProbability = Math.min(
      0.9,
      Math.max(0.05, (effect.effectiveness * 50) / (timeToImpact / 365))
    );

    res.json({
      strategy: "gravity_tractor",
      parameters: {
        targetMass,
        tractorMass,
        distance,
        timeToImpact,
        operationTime,
      },
      results: {
        velocityChange: effect.velocityChange,
        deflectionDistance: effect.deflectionDistance,
        effectiveness: effect.effectiveness,
        successProbability,
      },
      missionRequirements,
      advantages: [
        "No physical contact required",
        "Works on any asteroid size",
        "Gradual, controlled deflection",
      ],
      disadvantages: [
        "Requires long operation time",
        "Limited deflection capability",
        "Complex station-keeping",
      ],
    });
  } catch (err) {
    console.error("Gravity Tractor Error:", err);
    res
      .status(500)
      .json({ error: "Failed to calculate gravity tractor effect" });
  }
});

// Laser Ablation Mitigation Strategy
router.post("/laser-ablation", async (req, res) => {
  try {
    const {
      targetMass,
      laserPower,
      timeToImpact,
      operationTime = 365, // days
    } = req.body;

    if (!targetMass || !laserPower || !timeToImpact) {
      return res.status(400).json({
        error:
          "Missing required parameters: targetMass, laserPower, timeToImpact",
      });
    }

    // Calculate deflection effect
    const effect = calculateLaserAblationEffect(
      laserPower,
      timeToImpact,
      targetMass
    );

    // Calculate mission requirements
    const missionRequirements = {
      launchWindow: timeToImpact - 1095, // 3 years before impact
      approachVelocity: 0.05, // km/s (very slow approach)
      stationKeeping: true,
      powerGeneration: laserPower * 1.2, // 20% overhead
      totalMissionMass: laserPower * 0.1, // kg per kW
      operationDuration: operationTime,
    };

    // Calculate success probability
    const successProbability = Math.min(
      0.8,
      Math.max(0.02, (effect.effectiveness * 30) / (timeToImpact / 365))
    );

    res.json({
      strategy: "laser_ablation",
      parameters: {
        targetMass,
        laserPower,
        timeToImpact,
        operationTime,
      },
      results: {
        velocityChange: effect.velocityChange,
        deflectionDistance: effect.deflectionDistance,
        effectiveness: effect.effectiveness,
        successProbability,
      },
      missionRequirements,
      advantages: [
        "No physical contact required",
        "Precise control",
        "Can work on small asteroids",
      ],
      disadvantages: [
        "High power requirements",
        "Limited range",
        "Complex technology",
      ],
    });
  } catch (err) {
    console.error("Laser Ablation Error:", err);
    res
      .status(500)
      .json({ error: "Failed to calculate laser ablation effect" });
  }
});

// Nuclear Deflection Strategy
router.post("/nuclear-deflection", async (req, res) => {
  try {
    const {
      targetMass,
      targetVelocity,
      nuclearYield, // megatons
      timeToImpact,
      detonationDistance,
    } = req.body;

    if (!targetMass || !targetVelocity || !nuclearYield || !timeToImpact) {
      return res.status(400).json({
        error:
          "Missing required parameters: targetMass, targetVelocity, nuclearYield, timeToImpact",
      });
    }

    // Calculate deflection effect (simplified)
    const energy = nuclearYield * 4.184e15; // Joules
    const momentumTransfer = Math.sqrt(2 * energy * targetMass);
    const velocityChange = momentumTransfer / targetMass;
    const deflectionDistance = velocityChange * timeToImpact;

    // Calculate mission requirements
    const missionRequirements = {
      launchWindow: timeToImpact - 180, // 6 months before impact
      approachVelocity: targetVelocity * 0.1, // 10% of target velocity
      targetingAccuracy: 0.1, // km
      totalMissionMass: nuclearYield * 1000, // kg per megaton
      detonationDistance: detonationDistance || 100, // km
    };

    // Calculate success probability
    const successProbability = Math.min(
      0.99,
      Math.max(0.1, (deflectionDistance / 6371000) * 100)
    );

    res.json({
      strategy: "nuclear_deflection",
      parameters: {
        targetMass,
        targetVelocity,
        nuclearYield,
        timeToImpact,
        detonationDistance,
      },
      results: {
        velocityChange,
        deflectionDistance,
        effectiveness: deflectionDistance / 6371000, // Earth radius
        successProbability,
      },
      missionRequirements,
      advantages: [
        "High energy transfer",
        "Works on large asteroids",
        "Proven technology",
      ],
      disadvantages: [
        "Political implications",
        "Debris creation",
        "Limited precision",
      ],
    });
  } catch (err) {
    console.error("Nuclear Deflection Error:", err);
    res
      .status(500)
      .json({ error: "Failed to calculate nuclear deflection effect" });
  }
});

// Compare multiple mitigation strategies
router.post("/compare", async (req, res) => {
  try {
    const { targetMass, targetVelocity, timeToImpact, asteroidDiameter } =
      req.body;

    if (!targetMass || !targetVelocity || !timeToImpact) {
      return res.status(400).json({
        error:
          "Missing required parameters: targetMass, targetVelocity, timeToImpact",
      });
    }

    // Calculate parameters for each strategy
    const strategies = [];

    // Kinetic Impactor
    const impactorMass = targetMass * 0.01; // 1% of target mass
    const impactorVelocity = 10; // km/s
    const kineticEffect = calculateKineticImpactorEffect(
      impactorMass,
      impactorVelocity,
      targetMass,
      timeToImpact
    );

    strategies.push({
      name: "Kinetic Impactor",
      effectiveness: kineticEffect.effectiveness,
      cost: impactorMass * 1000, // $1000/kg
      timeRequired: 365, // days
      technologyReadiness: 9, // TRL 9
      risk: "medium",
    });

    // Gravity Tractor
    const tractorMass = 1000; // kg
    const distance = 100; // m
    const gravityEffect = calculateGravityTractorEffect(
      tractorMass,
      distance,
      targetMass,
      timeToImpact
    );

    strategies.push({
      name: "Gravity Tractor",
      effectiveness: gravityEffect.effectiveness,
      cost: tractorMass * 5000, // $5000/kg
      timeRequired: 730, // days
      technologyReadiness: 6, // TRL 6
      risk: "low",
    });

    // Laser Ablation
    const laserPower = 1000; // kW
    const laserEffect = calculateLaserAblationEffect(
      laserPower,
      timeToImpact,
      targetMass
    );

    strategies.push({
      name: "Laser Ablation",
      effectiveness: laserEffect.effectiveness,
      cost: laserPower * 10000, // $10k/kW
      timeRequired: 1095, // days
      technologyReadiness: 4, // TRL 4
      risk: "high",
    });

    // Sort by effectiveness
    strategies.sort((a, b) => b.effectiveness - a.effectiveness);

    res.json({
      comparison: strategies,
      recommendation: strategies[0],
      summary: {
        mostEffective: strategies[0],
        mostCostEffective: strategies.reduce((min, current) =>
          current.cost / current.effectiveness < min.cost / min.effectiveness
            ? current
            : min
        ),
        lowestRisk: strategies.reduce((min, current) =>
          current.risk === "low" ? current : min
        ),
      },
    });
  } catch (err) {
    console.error("Strategy Comparison Error:", err);
    res.status(500).json({ error: "Failed to compare mitigation strategies" });
  }
});

export default router;
