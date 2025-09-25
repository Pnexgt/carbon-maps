exports.calculateEmission = (distance, mode) => {
  const emissionsPerKm = { car: 0.12, bike: 0.07, walk: 0.0, bus: 0.04 };
  return distance * (emissionsPerKm[mode] || 0);
};