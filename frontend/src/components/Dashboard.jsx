import Navbar from "./Navbar";
import AsteroidTable from "./AsteroidTable";
import ImpactMap from "./ImpactMap";
import RiskChart from "./RiskChart";
import MitigationPanel from "./MitigationPanel";
import AsteroidGlobe from "./AsteroidGlobe";
import { dataContext } from "@/context";
import { useMemo, useState } from "react";

const Dashboard = () => {
  console.log("dash");
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const asteroidData = useMemo(
    () => [
      { name: "Impactor-2025", size: 300, distance: 45000 },
      { name: "Apophis", size: 370, distance: 32000 },
    ],
    []
  );

  const riskData = useMemo(
    () => [
      { factor: "Impact Probability", value: 60 },
      { factor: "Damage Radius", value: 80 },
      { factor: "Casualty Risk", value: 50 },
    ],
    []
  );

  const impactLocation = [lat, lon]; // Example: somewhere in India

  const contextValue = useMemo(
    () => ({
      asteroidData,
      riskData,
    }),
    [asteroidData, riskData]
  );

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <dataContext.Provider value={contextValue}>
          <div>
            <input
              type="number"
              placeholder="latitude"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
            />
            <input
              type="number"
              placeholder="longitude"
              value={lon}
              onChange={(e) => setLon(e.target.value)}
            />
          </div>
          <AsteroidTable />
          <ImpactMap impactLocation={impactLocation} />
          <RiskChart />
          <MitigationPanel />
          {/* <AsteroidGlobe asteroid={asteroidData} /> */}
        </dataContext.Provider>
      </div>
    </div>
  );
};

export default Dashboard;
