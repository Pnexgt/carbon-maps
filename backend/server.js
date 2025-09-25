// 1️⃣ Import dependencies
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const axios = require("axios");

// 2️⃣ Configure environment variables
dotenv.config();

// 3️⃣ Create Express app
const app = express();

// 4️⃣ Middleware
app.use(cors({ origin: "http://localhost:3000" })); // CORS
app.use(express.json());

// 5️⃣ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// 6️⃣ Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// 7️⃣ Route for getting directions & carbon emission
app.post("/api/route", async (req, res) => {
  try {
    const { start, end, mode } = req.body;

    // Convert place names to coordinates using ORS Geocode API
    const geo = async (place) => {
      const response = await axios.get(
        `https://api.openrouteservice.org/geocode/search?api_key=${process.env.ORS_API_KEY}&text=${encodeURIComponent(
          place
        )}`
      );
      const coords = response.data.features[0].geometry.coordinates; // [lng, lat]
      return coords;
    };

    const startCoords = await geo(start);
    const endCoords = await geo(end);

    // Get route using ORS Directions API
    const routeRes = await axios.post(
      `https://api.openrouteservice.org/v2/directions/${mode}/geojson`,
      {
        coordinates: [startCoords, endCoords],
      },
      {
        headers: {
          Authorization: process.env.ORS_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    const routeData = routeRes.data;

    // Calculate carbon emission (kg CO2 per km)
    const distanceKm = routeData.features[0].properties.summary.distance / 1000;
    let emissionFactor = 0.192; // Car
    if (mode === "cycling-regular") emissionFactor = 0;
    if (mode === "foot-walking") emissionFactor = 0;
    if (mode === "driving-hgv") emissionFactor = 0.1; // Bus approximation
    const emission = distanceKm * emissionFactor;

    res.json({
      route: routeData,
      distanceKm,
      emission: emission.toFixed(2),
    });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch route" });
  }
});

// 8️⃣ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
