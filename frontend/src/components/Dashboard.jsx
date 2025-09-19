import Navbar from "./Navbar";
import AsteroidTable from "./AsteroidTable";
import ImpactMap from "./ImpactMap";
import RiskChart from "./RiskChart";
import MitigationPanel from "./MitigationPanel";
import AsteroidGlobe from "./AsteroidGlobe";

const Dashboard = () => {
  const asteroidData = [
    { name: "Impactor-2025", size: 300, distance: 45000 },
    { name: "Apophis", size: 370, distance: 32000 },
  ];

  const riskData = [
    { factor: "Impact Probability", value: 60 },
    { factor: "Damage Radius", value: 80 },
    { factor: "Casualty Risk", value: 50 },
  ];

  const impactLocation = [20, 77]; // Example: somewhere in India

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <AsteroidTable asteroids={asteroidData} />
        <ImpactMap location={impactLocation} />
        <RiskChart data={riskData} />
        <MitigationPanel />
        <AsteroidGlobe asteroids={asteroidData} />
      </div>
    </div>
  );
};

export default Dashboard;
