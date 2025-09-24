// Calculate asteroid mass from size (diameter in meters) and density (kg/m^3)
function calculateMass(diameter, density = 3000) {
  const radius = diameter / 2;
  const volume = (4 / 3) * Math.PI * Math.pow(radius, 3);
  return volume * density; // kg
}

// Calculate impact energy (Joules)
function calculateImpactEnergy(mass, velocity) {
  // velocity in km/s → convert to m/s
  const v_m_s = velocity * 1000;
  return 0.5 * mass * v_m_s * v_m_s;
}

// Estimate crater diameter (simplified scaling law)
function calculateCraterDiameter(energy) {
  // Energy in Joules, diameter in meters
  return 0.01 * Math.pow(energy, 1 / 3);
}

export { calculateMass, calculateImpactEnergy, calculateCraterDiameter };
