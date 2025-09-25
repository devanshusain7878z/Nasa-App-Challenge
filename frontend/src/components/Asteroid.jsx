import { SphereGeometry, MeshStandardMaterial } from "three";
import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

const getColorBySize = (size) => {
  if (size < 100) return "green";
  if (size < 300) return "yellow";
  if (size < 600) return "orange";
  return "red";
};
const Asteroid = ({ asteroid, speed, onSelect }) => {
  const meshRef = useRef();
  const angleRef = useRef(Math.random() * Math.PI * 2); //random start angle.

  const colorMap = useLoader(THREE.TextureLoader, "/textures/asteroid.jpg");
  const normalMap = useLoader(THREE.TextureLoader, "/textures/asteroid1.jpg");
  useFrame(() => {
    if (!meshRef.current) return;

    angleRef.current += speed;
    meshRef.current.position.x = asteroid.radius * Math.cos(angleRef.current);
    meshRef.current.position.z = asteroid.radius * Math.sin(angleRef.current);
    meshRef.current.position.y = asteroid.yOffset || 0;
  });

  return (
    <mesh ref={meshRef} onClick={() => onSelect(asteroid)}>
      {" "}
      {/* More subdivisions for realistic surface */}
      <icosahedronGeometry args={[Math.cbrt(asteroid.size) / 10, 3]} />
      <meshStandardMaterial
        map={colorMap}
        normalMap={normalMap}
        roughness={0.95}
        metalness={0.05}
      />
    </mesh>
  );
};

export default Asteroid;
