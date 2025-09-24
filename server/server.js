import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import asteroidRoutes from "./routes/route.asteroid.js";
import usgsRoutes from "./routes/route.usgs.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 7000;
app.use(cors());
app.use(express.json());

app.use("/api/asteroids", asteroidRoutes);
app.use("/api/usgs", usgsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
