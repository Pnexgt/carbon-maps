import React from "react";
import { MapContainer, TileLayer, Polyline, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MapView({ routeData }) {
  if (!routeData) return <div className="map">Enter route to display</div>;

  const coordinates = routeData.route.features[0].geometry.coordinates;

  return (
    <MapContainer
      center={[coordinates[0][1], coordinates[0][0]]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[coordinates[0][1], coordinates[0][0]]} />
      <Marker position={[coordinates.slice(-1)[0][1], coordinates.slice(-1)[0][0]]} />
      <Polyline positions={coordinates.map(c => [c[1], c[0]])} color="red" />
    </MapContainer>
  );
}

export default MapView;
