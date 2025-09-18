// // src/App.jsx
// import { useState } from "react";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   Legend,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

//const { default: Dashboard } = require("./components/Dashboard");

// // Mock asteroid data (replace with NASA API later)
// const asteroids = [
//   {
//     id: 1,
//     name: "Impactor-2025",
//     diameter: 500,
//     density: 3000,
//     probability: 0.05,
//     lat: 20.59,
//     lng: 78.96,
//   },
//   {
//     id: 2,
//     name: "Apollo",
//     diameter: 1200,
//     density: 2800,
//     probability: 0.01,
//     lat: 34.05,
//     lng: -118.25,
//   },
//   {
//     id: 3,
//     name: "Bennu",
//     diameter: 490,
//     density: 2500,
//     probability: 0.002,
//     lat: 35.68,
//     lng: 139.69,
//   },
// ];

// function calculateEarthquake(asteroid) {
//   const radius = asteroid.diameter / 2; // meters
//   const volume = (4 / 3) * Math.PI * Math.pow(radius, 3);
//   const mass = volume * asteroid.density; // kg
//   const velocity = 20000; // m/s (20 km/s typical impact speed)

//   const energyJoules = 0.5 * mass * velocity * velocity;
//   const energyTNT = energyJoules / 4.184e15; // in megatons
//   const magnitude = (2 / 3) * Math.log10(energyJoules) - 3.2;

//   return { energyTNT, magnitude };
// }

// function App() {
//   const [selected, setSelected] = useState(asteroids[0]);

//   const { energyTNT, magnitude } = calculateEarthquake(selected);

//   const chartData = [
//     { name: "Safe", value: 1 - selected.probability },
//     { name: "Impact Risk", value: selected.probability },
//   ];

//   const quakeData = [{ name: selected.name, magnitude: magnitude.toFixed(2) }];

//   const COLORS = ["#00C49F", "#FF8042"];

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen flex flex-col gap-6">
//       <h1 className="text-3xl font-bold text-center text-indigo-700">
//         🌍 Asteroid Impact Dashboard
//       </h1>

//       {/* Asteroid Selector */}
//       <div className="bg-white shadow-lg rounded-xl p-4">
//         <h2 className="text-xl font-semibold mb-2">Select Asteroid</h2>
//         <select
//           className="border p-2 rounded-lg"
//           onChange={(e) =>
//             setSelected(asteroids.find((a) => a.id === Number(e.target.value)))
//           }
//         >
//           {asteroids.map((a) => (
//             <option key={a.id} value={a.id}>
//               {a.name} (Diameter: {a.diameter}m)
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Visualization Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Impact Probability Pie Chart */}
//         <div className="bg-white shadow-lg rounded-xl p-4 flex flex-col items-center">
//           <h2 className="text-xl font-semibold mb-4">Impact Probability</h2>
//           <PieChart width={300} height={300}>
//             <Pie
//               data={chartData}
//               cx={150}
//               cy={150}
//               innerRadius={70}
//               outerRadius={100}
//               fill="#8884d8"
//               paddingAngle={5}
//               dataKey="value"
//               label
//             >
//               {chartData.map((entry, index) => (
//                 <Cell
//                   key={`cell-${index}`}
//                   fill={COLORS[index % COLORS.length]}
//                 />
//               ))}
//             </Pie>
//             <Tooltip />
//             <Legend />
//           </PieChart>
//         </div>

//         {/* Map */}
//         <div className="bg-white shadow-lg rounded-xl p-4">
//           <h2 className="text-xl font-semibold mb-4">Impact Location</h2>
//           <MapContainer
//             center={[selected.lat, selected.lng]}
//             zoom={3}
//             style={{ height: "300px", width: "100%" }}
//           >
//             <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//             <Marker position={[selected.lat, selected.lng]}>
//               <Popup>
//                 <b>{selected.name}</b> <br />
//                 Diameter: {selected.diameter}m <br />
//                 Probability: {selected.probability * 100}% <br />
//                 Energy: {energyTNT.toFixed(2)} Mt TNT <br />
//                 Magnitude: {magnitude.toFixed(2)}
//               </Popup>
//             </Marker>
//           </MapContainer>
//         </div>
//       </div>

//       {/* Earthquake Magnitude Bar Chart */}
//       <div className="bg-white shadow-lg rounded-xl p-4">
//         <h2 className="text-xl font-semibold mb-4">Earthquake Equivalent</h2>
//         <BarChart width={400} height={300} data={quakeData}>
//           <XAxis dataKey="name" />
//           <YAxis domain={[0, 12]} />
//           <Tooltip />
//           <Bar dataKey="magnitude" fill="#8884d8" />
//         </BarChart>
//       </div>
//     </div>
//   );
// }

// export default App;

import Dashboard from "./components/Dashboard";
const App = () => {
  return <Dashboard />;
};

export default App;
