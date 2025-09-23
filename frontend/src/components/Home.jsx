// Home.jsx
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from 'three'


function RotatingGlobe() {
  const globeRef = useRef();

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.002; // slow rotation
    }
  });

  return (
    <mesh ref={globeRef}>
      {/* Sphere for Earth */}
      <sphereGeometry args={[3, 64, 64]} />
      <meshStandardMaterial
        map={new THREE.TextureLoader().load(
          "https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg"
        )}
      />
    </mesh>
  );
}

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-black text-white">
      {/* 3D Globe Section */}
      <div className="w-full h-2/3">
        <Canvas camera={{ position: [0, 0, 6] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <RotatingGlobe />
          <OrbitControls enableZoom={false} />
          <Stars radius={100} depth={50} count={5000} factor={4} fade />
        </Canvas>
      </div>

      {/* Buttons Section */}
      <div className="w-full h-1/3 flex flex-col items-center justify-center gap-4">
        <button className="px-6 py-3 bg-blue-600 rounded-xl shadow-md hover:bg-blue-700">
          Create Your Own Scenario
        </button>
        <button className="px-6 py-3 bg-green-600 rounded-xl shadow-md hover:bg-green-700">
          Defend Earth (Mitigation)
        </button>
        <button className="px-6 py-3 bg-purple-600 rounded-xl shadow-md hover:bg-purple-700">
          Study Session (Past Events)
        </button>
        <button className="px-6 py-3 bg-gray-600 rounded-xl shadow-md hover:bg-gray-700">
          Resources & About
        </button>
      </div>
    </div>
  );
}