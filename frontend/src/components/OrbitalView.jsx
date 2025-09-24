import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import Asteroid from "./Asteroid";

const OrbitalView = ({ asteroids }) => {
  //map asteroids to include random radius/offset/size for demo
  const mappedAsteroids = asteroids.map((a) => ({
    id: a.id,
    size: a.estimated_diameter.meters.estimated_diameter_max,
    radius: Math.random() * 10 + 2,
    yOffset: (Math.random() - 0.5) * 2,
    name: a.name,
  }));
  return (
    <Canvas style={{ height: "400px", background: "#000" }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Stars />

      {/* Represent Earth as a sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          map={new THREE.TextureLoader().load(
            "https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg"
          )}
        />
      </mesh>

      {/* Asteroids */}
      {mappedAsteroids.map((a) => {
        const speed = 0.01 + Math.random() * 0.001;
        return <Asteroid key={a.id} asteroid={a} speed={speed} />;
      })}

      <OrbitControls />
    </Canvas>
  );
};

export default OrbitalView;
