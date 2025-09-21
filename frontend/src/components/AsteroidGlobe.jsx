import { dataContext } from "@/context";
import { useContext, useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import "three";

export default function AsteroidGlobe({ asteroid }) {
  const { asteroidData } = useContext(dataContext);
  console.log(asteroidData);
  const globeRef = useRef();
  const [points, setPoints] = useState([]);
  const [arcs, setArcs] = useState([]);

  // Create default asteroid object if none passed
  const ast = asteroid ?? {
    name: "Impactor-2025",
    lat: 20.5937,
    lng: 78.9629,
    diameter: 500, // meters
  };

  useEffect(() => {
    // Points = impact marker(s)
    const pts = [
      {
        lat: ast.lat,
        lng: ast.lng,
        size: Math.max(0.01, ast.diameter / 2000), // small normalized size
        color: "red",
        label: `${ast.name}\nDiameter: ${ast.diameter} m`,
      },
    ];
    setPoints(pts);

    // Arcs = example orbit path from a far point to impact point (visual)
    // arcsData expects startLat/startLng and endLat/endLng
    const startLat = ast.lat + 40; // just a demo start point
    const startLng = ast.lng - 80;
    const arc = [
      {
        startLat,
        startLng,
        endLat: ast.lat,
        endLng: ast.lng,
        color: ["orange"], // array supported by globe
        label: `${ast.name} approach`,
      },
    ];
    setArcs(arc);

    // enable slow auto-rotate
    const g = globeRef.current;
    if (g && g.controls) {
      try {
        g.controls().autoRotate = true;
        g.controls().autoRotateSpeed = 0.3;
      } catch (e) {
        // some builds may not have controls() immediately; ignore safely
      }
    }
  }, [ast.name, ast.lat, ast.lng, ast.diameter]);

  // Guard: render only in browser (prevents SSR errors)
  if (typeof window === "undefined") return null;

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h3 className="text-lg font-semibold mb-2">
        🌍 3D Impact / Orbit Visualization
      </h3>

      <div style={{ width: "100%", height: 420 }}>
        <Globe
          ref={globeRef}
          // nice public texture for demo; change if you have assets
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          // POINTS (impact markers)
          pointsData={points}
          pointLat="lat"
          pointLng="lng"
          pointColor="color"
          // pointAltitude is a fraction of globe radius; scale size -> altitude
          pointAltitude={(d) => d.size * 0.12}
          pointRadius={0.4}
          pointLabel={(d) => d.label}
          // ARCS (approach/trajectory lines)
          arcsData={arcs}
          arcStartLat="startLat"
          arcStartLng="startLng"
          arcEndLat="endLat"
          arcEndLng="endLng"
          arcColor={(d) => (d.color && d.color[0]) || "#ffcc00"}
          arcStroke={0.8}
          arcDashLength={0.6}
          arcDashGap={0.6}
          arcDashAnimateTime={2000}
          arcLabel={(d) => d.label}
          // visual tuning
          backgroundColor="rgba(0,0,0,0)"
          animateIn={true}
        />
      </div>
    </div>
  );
}
