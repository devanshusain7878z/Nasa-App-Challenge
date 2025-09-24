import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const getAsteroids = async () => {
  try {
    const res = await axios.get(`${API_URL}/asteroids`);
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getSeismicData = async () => {
  try {
    const res = await axios.get(`${API_URL}/usgs/seismic`);
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const simulateImpact = async (
  diameter,
  velocity,
  velocityChange = 0
) => {
  try {
    const res = await axios.post(`${API_URL}/asteroids/simulate-impact`, {
      diameter,
      velocity,
      velocityChange,
    });
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
