import React, { useState } from "react";
import { getRoute } from "../services/api";
import ModeSelector from "./ModeSelector";
import "./Sidebar.css";

function Sidebar({ setRouteData, setLoading }) {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [mode, setMode] = useState("driving-car");

  const fetchRouteHandler = async () => {
    if (!start || !end) {
      alert("Please enter both start and end locations!");
      return;
    }

    setLoading(true);
    try {
      const data = await getRoute(start, end, mode);
      setRouteData(data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch route. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sidebar">
      <input
        type="text"
        placeholder="Start location 🌍"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />
      <input
        type="text"
        placeholder="End location 📍"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
      />
      <ModeSelector mode={mode} setMode={setMode} />
      <button onClick={fetchRouteHandler}>Get Route 🚦</button>
    </div>
  );
}

export default Sidebar;
