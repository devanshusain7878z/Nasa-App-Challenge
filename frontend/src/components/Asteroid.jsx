import { useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

// const getColorBySize = (size) => {
//   if (size < 100) return "#10B981"; // green
//   if (size < 300) return "#F59E0B"; // yellow
//   if (size < 600) return "#F97316"; // orange
//   return "#EF4444"; // red
// };

const Asteroid = ({ asteroid, speed, isSelected, isHazardous, onHover }) => {
  const meshRef = useRef();
  const angleRef = useRef(Math.random() * Math.PI * 2);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Orbital motion
    angleRef.current += speed;
    meshRef.current.position.x = asteroid.radius * Math.cos(angleRef.current);
    meshRef.current.position.z = asteroid.radius * Math.sin(angleRef.current);
    meshRef.current.position.y = asteroid.yOffset || 0;

    // Rotation
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;

    // Pulsing effect for hazardous asteroids
    if (isHazardous) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      meshRef.current.scale.setScalar(scale);
    } else {
      meshRef.current.scale.setScalar(1);
    }

    // Selection highlight
    if (isSelected) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.2;
      meshRef.current.scale.setScalar(scale);
    }
  });

  // const getMaterial = () => {
  //   if (colorMap && normalMap) {
  //     return (
  //       <meshStandardMaterial
  //         map={colorMap}
  //         normalMap={normalMap}
  //         roughness={0.95}
  //         metalness={0.05}
  //         emissive={
  //           isHazardous ? "#ff4444" : isSelected ? "#ffff00" : "#000000"
  //         }
  //         emissiveIntensity={isHazardous ? 0.2 : isSelected ? 0.1 : 0}
  //       />
  //     );
  //   } else {
  //     // Fallback material
  //     return (
  //       <meshStandardMaterial
  //         color={getColorBySize(asteroid.size * 1000)}
  //         roughness={0.95}
  //         metalness={0.05}
  //         emissive={
  //           isHazardous ? "#ff4444" : isSelected ? "#ffff00" : "#000000"
  //         }
  //         emissiveIntensity={isHazardous ? 0.2 : isSelected ? 0.1 : 0}
  //       />
  //     );
  //   }
  // };

  return (
    <mesh
      ref={meshRef}
      onPointerOver={(e) => {
        setHovered(true);
        onHover && onHover(true);
        e.stopPropagation();
      }}
      onPointerOut={(e) => {
        setHovered(false);
        onHover && onHover(false);
        e.stopPropagation();
      }}
      scale={isSelected ? 1.5 : 1}
    >
      <icosahedronGeometry args={[Math.max(asteroid.size / 100, 0.05), 2]} />
      {/* {getMaterial()} */}

      {/* Selection ring */}
      {isSelected && (
        <mesh position={[0, 0, 0]}>
          <ringGeometry
            args={[asteroid.size / 100 + 0.1, asteroid.size / 100 + 0.15, 32]}
          />
          <meshBasicMaterial
            color="#ffff00"
            transparent
            opacity={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Hazard indicator */}
      {isHazardous && (
        <mesh position={[0, 0, 0]}>
          <ringGeometry
            args={[asteroid.size / 100 + 0.05, asteroid.size / 100 + 0.1, 32]}
          />
          <meshBasicMaterial
            color="#ff4444"
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </mesh>
  );
};

export default Asteroid;
