const axios = require("axios");
const { calculateEmission } = require("../utils/emissions");

exports.getRoute = async (req, res) => {
  try {
    const { start, end, mode } = req.body;
    const apiKey = process.env.ORS_API_KEY;

    const response = await axios.get(`https://api.openrouteservice.org/v2/directions/${mode}?api_key=${apiKey}&start=${start}&end=${end}`);
    const data = response.data;

    const distance = data.features[0].properties.summary.distance / 1000; // in km
    const duration = data.features[0].properties.summary.duration / 60; // in minutes
    const emission = calculateEmission(distance, mode);

    res.json({ distance, duration, emission, coordinates: data.features[0].geometry.coordinates });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};