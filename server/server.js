import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";
import router from "./controllers/controller.usgs.js";

dotenv.config();
const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

app.use("/api", router);

app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
