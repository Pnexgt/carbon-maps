import React from "react";
import "./Sidebar.css";

function ModeSelector({ mode, setMode }) {
  return (
    <select value={mode} onChange={(e) => setMode(e.target.value)}>
      <option value="driving-car">🚗 Car</option>
      <option value="foot-walking">🚶 Walk</option>
      <option value="cycling-regular">🚴 Bike</option>
      <option value="driving-hgv">🚌 Bus</option>
    </select>
  );
}

export default ModeSelector;
