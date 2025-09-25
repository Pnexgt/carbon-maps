const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  start: String,
  end: String,
  mode: String,
  distance: Number,
  duration: Number,
  emission: Number,
  coordinates: Array
});

module.exports = mongoose.model("Trip", tripSchema);