import express from "express";
import axios from "axios";
const router = express.Router();
// Example: Fetch USGS recent earthquake data
router.get("/seismic", async (req, res) => {
  try {
    const response = await axios.get(
      "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"
    );
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch USGS data" });
  }
});

export default router;
