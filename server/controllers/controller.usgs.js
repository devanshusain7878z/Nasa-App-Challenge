import { Router } from "express";

const router = Router();

// NASA API (Asteroids)
router.get("/asteroids", async (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    const nasaApiKey = process.env.NASA_API; // set this in .env file

    const url = `https://api.nasa.gov/neo/rest/v1/feed?`;
    const { data } = await axios.get(url, {
      params: {
        start_date: start_date,
        end_date: end_date,
        api_key: nasaApiKey,
      },
    });

    res.json(data.near_earth_objects); // clean data
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error fetching asteroid data" });
  }
});

// USGS Earthquake API
router.get("/earthquakes", async (req, res) => {
  try {
    const { starttime, endtime, minmagnitude } = req.query;
    console.log(starttime);
    const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?`;
    const { data } = await axios.get(url, {
      params: {
        format: "geojson",
        starttime: starttime,
        endtime: endtime,
        minmagnitude: minmagnitude,
      },
    });
    console.log(data.features);
    res.json(
      data.features.map((eq) => ({
        id: eq.id,
        place: eq.properties.place,
        mag: eq.properties.mag,
        time: new Date(eq.properties.time),
        coordinates: eq.geometry.coordinates,
      }))
    );
  } catch (err) {
    res.status(500).json({ error: "Error fetching earthquake data" });
  }
});

export default router;
