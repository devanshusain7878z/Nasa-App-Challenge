import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const CreateScenario = () => {
  const mountRef = useRef(null);
  const [asteroid, setAsteroid] = useState({ size: 50, lat: 0, lon: 0 });

  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 4);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Lights
    scene.add(new THREE.AmbientLight(0x333333));
    const sunLight = new THREE.DirectionalLight(0xffffff, 1);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    // Textures
    const loader = new THREE.TextureLoader();
    const earthGeo = new THREE.SphereGeometry(1, 64, 64);
    const earthMat = new THREE.MeshPhongMaterial({
      map: loader.load("/textures/earth_daymap.jpg"),
      specularMap: loader.load("/textures/earth_nightmap.jpg"),
      specular: new THREE.Color("grey"),
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    scene.add(earthMesh);

    // Clouds
    const cloudGeo = new THREE.SphereGeometry(1.01, 64, 64);
    const cloudMat = new THREE.MeshPhongMaterial({
      map: loader.load("/textures/earth_clouds.jpg"),
      transparent: true,
    });
    const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
    scene.add(cloudMesh);

    // Orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);

    // Group for asteroid + damage marker
    const markersGroup = new THREE.Group();
    scene.add(markersGroup);

    // Function to add asteroid + damage radius
    const addAsteroidMarker = (lat, lon, size) => {
      markersGroup.clear();

      // 🔴 Impact point
      const markerGeo = new THREE.SphereGeometry(size / 500, 16, 16);
      const markerMat = new THREE.MeshBasicMaterial({ color: "red" });
      const marker = new THREE.Mesh(markerGeo, markerMat);

      // Convert lat/lon to 3D position
      const radius = 1.02;
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);

      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);

      marker.position.set(x, y, z);
      markersGroup.add(marker);

      // 🔵 Damage radius (scaled by asteroid size)
      const damageRadius = size / 100; // simple scaling factor
      const circleGeo = new THREE.CircleGeometry(damageRadius, 64);
      const circleMat = new THREE.MeshBasicMaterial({
        color: "blue",
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide,
      });
      const circle = new THREE.Mesh(circleGeo, circleMat);

      // Position circle just above Earth surface
      circle.position.set(x, y, z);

      // Make circle face outward (align with surface normal)
      circle.lookAt(new THREE.Vector3(0, 0, 0));

      markersGroup.add(circle);
    };

    // Listen for asteroid event
    const handleAsteroidEvent = (e) => {
      const { lat, lon, size } = e.detail;
      addAsteroidMarker(lat, lon, size);
    };
    window.addEventListener("addAsteroid", handleAsteroidEvent);

    // Animate
    const animate = () => {
      requestAnimationFrame(animate);
      earthMesh.rotation.y += 0.0008;
      cloudMesh.rotation.y += 0.001;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const handleResize = () => {
      camera.aspect =
        mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight
      );
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      if (mountRef.current && renderer.domElement) {
        if (mountRef.current.contains(renderer.domElement)) {
          mountRef.current.removeChild(renderer.domElement);
        }
      }
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("addAsteroid", handleAsteroidEvent);
    };
  }, []);

  // Trigger asteroid placement when state changes
  useEffect(() => {
    if (!mountRef.current) return;
    const event = new CustomEvent("addAsteroid", { detail: asteroid });
    window.dispatchEvent(event);
  }, [asteroid]);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Controls */}
      <div className="w-full md:w-1/3 p-4 bg-gray-900 text-white flex flex-col gap-4">
        <h2 className="text-xl font-bold">🌍 Create Your Scenario</h2>

        <label>
          Asteroid Size (m):
          <input
            type="range"
            min="10"
            max="500"
            value={asteroid.size}
            onChange={(e) =>
              setAsteroid({ ...asteroid, size: parseInt(e.target.value) })
            }
          />
        </label>

        <label>
          Latitude:
          <input
            type="number"
            value={asteroid.lat}
            onChange={(e) =>
              setAsteroid({ ...asteroid, lat: parseFloat(e.target.value) })
            }
          />
        </label>

        <label>
          Longitude:
          <input
            type="number"
            value={asteroid.lon}
            onChange={(e) =>
              setAsteroid({ ...asteroid, lon: parseFloat(e.target.value) })
            }
          />
        </label>

        <button
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
          onClick={() => {
            const event = new CustomEvent("addAsteroid", { detail: asteroid });
            window.dispatchEvent(event);
          }}
        >
          🚀 Simulate Impact
        </button>
      </div>

      {/* Globe */}
      <div ref={mountRef} className="w-full md:w-2/3 h-full" />
    </div>
  );
};

export default CreateScenario;
