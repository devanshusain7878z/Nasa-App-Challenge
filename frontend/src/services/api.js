// frontend/src/services/api.js
import axios from "axios";
const API_URL = "http://localhost:8000/api";

export const getAsteroids = async (page = 0) => {
  const res = await axios.get(`${API_URL}/asteroids?page=${page}`);
  return res.data;
};

export const getAsteroidDetails = async (id) => {
  const res = await axios.get(`${API_URL}/asteroids/${id}`);
  return res.data;
};

export const simulateImpact = async (
  diameter,
  velocity,
  velocityChange = 0,
  asteroidId = null
) => {
  const body = { diameter, velocity, velocityChange };
  if (asteroidId) body.asteroidId = asteroidId;
  const res = await axios.post(`${API_URL}/asteroids/simulate-impact`, body);
  return res.data;
};
