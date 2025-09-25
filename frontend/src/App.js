import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import MapView from "./components/MapView";
import "./App.css";

function App() {
  const [routeData, setRouteData] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="app-container">
      {/* Background bubbles */}
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="bubble"
          style={{
            width: `${30 + Math.random() * 50}px`,
            height: `${30 + Math.random() * 50}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 5}s`,
          }}
        ></div>
      ))}

      {/* Sidebar for input */}
      <Sidebar setRouteData={setRouteData} setLoading={setLoading} />

      {/* Map */}
      <div className="map-container">
        {loading && <div className="loading-overlay">Loading...</div>}
        <MapView routeData={routeData} />
        {routeData && (
          <div className="info-panel">
            Distance: {routeData.distanceKm.toFixed(2)} km | Carbon: {routeData.emission} kg CO₂
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
