import React from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const getColorByCrater = (crater) => {
  if (!crater) return "red";
  if (crater < 50) return "green";
  if (crater < 200) return "yellow";
  if (crater < 500) return "orange";
  return "red";
};

const ImpactMap = ({ asteroids, crater, velocityShift = 0 }) => {
  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: "400px", width: "100%" }}
      className="leaflet-container"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {asteroids.map((a) => {
        const lat = Math.random() * 140 - 70 + velocityShift;
        const lng = Math.random() * 360 - 180 + velocityShift;
        return (
          <CircleMarker
            key={a.id}
            center={[lat, lng]}
            radius={crater ? crater / 5 : 5}
            color={getColorByCrater(crater)}
          >
            <Tooltip>
              <div>
                <strong>{a.name}</strong>
                <br />
                Crater: {crater ? crater.toFixed(2) + " m" : "N/A"}
              </div>
            </Tooltip>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
};

export default ImpactMap;
