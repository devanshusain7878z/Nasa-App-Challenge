import { SphereGeometry, MeshStandardMaterial } from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const getColorBySize = (size) => {
  if (size < 100) return "green";
  if (size < 300) return "yellow";
  if (size < 600) return "orange";
  return "red";
};
const Asteroid = ({ asteroid, speed }) => {
  const meshRef = useRef();
  const angleRef = useRef(Math.random() * Math.PI * 2); //random start angle.

  useFrame(() => {
    if (!meshRef.current) return;

    angleRef.current += speed;
    meshRef.current.position.x = asteroid.radius * Math.cos(angleRef.current);
    meshRef.current.position.z = asteroid.radius * Math.sin(angleRef.current);
    meshRef.current.position.y = asteroid.yOffset || 0;
  });

  return (
    <mesh
      ref={meshRef}
      onClick={() =>
        alert(`${asteroid.name}\nSize:${asteroid.size?.toFixed(2)} m`)
      }
    >
      <SphereGeometry args={[Math.cbrt(asteroid.size) / 10, 16, 16]} />
      <MeshStandardMaterial color={getColorBySize(asteroid.size)} />
    </mesh>
  );
};

export default Asteroid;
