import express from "express";
import axios from "axios";
import {
  calculateCraterDiameter,
  calculateImpactEnergy,
  calculateMass,
} from "../utils/calculations.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${process.env.NASA_API_KEY}`
    );
    console.log("1", process.env.NASA_API_KEY);
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch asteroid data" });
  }
});

router.post("/simulate-impact", (req, res) => {
  let { diameter, velocity, velocityChange = 0 } = req.body;

  if (!diameter || !velocity) {
    return res.status(400).json({ error: "Missing diameter or velocity" });
  }

  //Apply mitigation (defection)
  const adjustedVelocity = velocity + velocityChange;

  const mass = calculateMass(diameter);
  const energy = calculateImpactEnergy(mass, velocityChange);
  const crater = calculateCraterDiameter(energy);

  //simple impact point shift simulation (randomized for demo)
  const impactShiftLat = velocityChange * 2;
  const impactShiftLong = velocityChange * 2;

  res.status(200).json({
    mass,
    energy,
    crater,
    adjustedVelocity,
    impactShiftLat,
    impactShiftLong,
  });
});

export default router;
