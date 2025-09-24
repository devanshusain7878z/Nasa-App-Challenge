// Home.jsx
import React, { useRef, Suspense } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Outlet, useNavigate } from "react-router-dom";

function RotatingGlobe() {
  const globeRef = useRef();
  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.002; // slow rotation
    }
  });

  return (
    <mesh ref={globeRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial
        map={new THREE.TextureLoader().load(
          "https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg"
        )}
      />
    </mesh>
  );
}

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen flex flex-col bg-black text-white">
      {/* 3D Globe */}
      <div className="flex-1">
        <Canvas camera={{ position: [0, 0, 6] }}>
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} />
          <Suspense fallback={null}>
            <RotatingGlobe />
          </Suspense>
          <OrbitControls enableZoom={false} />
          {/* Better star background */}
          <Stars
            radius={200} // larger sphere of stars
            depth={60}
            count={10000}
            factor={5}
            saturation={0}
            fade
          />
        </Canvas>
      </div>

      {/* Buttons (Responsive) */}
      <div className="flex flex-col md:flex-row md:justify-center gap-4 p-6 items-center">
        <button
          className="px-6 py-3 w-60 text-center bg-blue-600 rounded-xl shadow-md hover:bg-blue-700 transition cursor-pointer"
          onClick={() => navigate("/create-scenario")}
        >
          Create Your Own Scenario
        </button>
        <button
          className="px-6 py-3 w-60 text-center bg-green-600 rounded-xl shadow-md hover:bg-green-700 transition cursor-pointer"
          onClick={() => navigate("/mitigation")}
        >
          Defend Earth (Mitigation)
        </button>
        <button
          className="px-6 py-3 w-60 text-center bg-purple-600 rounded-xl shadow-md hover:bg-purple-700 transition cursor-pointer"
          onClick={() => navigate("/past-events")}
        >
          Study Session (Past Events)
        </button>
        <button className="px-6 py-3 w-60 text-center bg-gray-600 rounded-xl shadow-md hover:bg-gray-700 transition cursor-pointer">
          Resources & About
        </button>
      </div>
    </div>
  );
};

export default Home;
