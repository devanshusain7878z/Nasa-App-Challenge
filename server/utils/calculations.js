// Enhanced asteroid impact and mitigation calculations
// Based on established physics and scaling relationships

// Physical constants
const EARTH_RADIUS = 6371000; // meters
const EARTH_MASS = 5.972e24; // kg
const GRAVITATIONAL_CONSTANT = 6.674e-11; // m³/kg⋅s²
const ASTEROID_DENSITY = 3000; // kg/m³ (typical stony asteroid)
const TNT_ENERGY_DENSITY = 4.184e9; // J/kg

// Basic impact calculations
export function calculateMass(diameter, density = ASTEROID_DENSITY) {
  const radius = diameter / 2;
  const volume = (4 / 3) * Math.PI * Math.pow(radius, 3);
  return volume * density; // kg
}

export function calculateImpactEnergy(mass, velocity) {
  // velocity in km/s → convert to m/s
  const v_m_s = velocity * 1000;
  return 0.5 * mass * v_m_s * v_m_s; // Joules
}

export function calculateTNTEquivalent(energy) {
  return energy / TNT_ENERGY_DENSITY; // kg TNT
}

export function calculateCraterDiameter(energy) {
  // Improved scaling relationship based on Gault (1974) and Melosh (1989)
  const energyTJ = energy / 1e12; // Convert to Terajoules

  // Simple crater diameter (transient crater)
  const transientDiameter = Math.pow(energyTJ, 0.294) * 1000;

  // Final crater diameter (includes rim collapse)
  const finalDiameter = transientDiameter * 1.3; // 30% larger due to rim collapse

  return finalDiameter; // meters
}

export function calculateSeismicMagnitude(energy) {
  // Convert impact energy to seismic magnitude
  // Based on relationship: Mw = (log10(E) - 4.8) / 1.5
  const energyJoules = energy;
  const magnitude = (Math.log10(energyJoules) - 4.8) / 1.5;
  return Math.max(0, magnitude); // Ensure non-negative
}

export function calculateTsunamiHeight(energy, distanceFromCoast) {
  // Simplified tsunami height calculation
  // Based on Ward & Asphaug (2000) and other studies
  const energyTJ = energy / 1e12;
  const height = Math.pow(energyTJ, 0.25) * 100; // meters at source

  // Attenuation with distance (simplified)
  const attenuationFactor = Math.exp(-distanceFromCoast / 100000); // 100km scale
  return height * attenuationFactor;
}

export function calculateAtmosphericEntryEffects(diameter, velocity) {
  const mass = calculateMass(diameter);
  const energy = calculateImpactEnergy(mass, velocity);

  // Airburst altitude estimation (simplified)
  const airburstAltitude = 8500 * Math.pow(diameter / 100, 0.4); // meters

  // Fireball radius
  const fireballRadius = Math.pow(energy / 1e12, 0.4) * 1000; // meters

  return {
    airburstAltitude,
    fireballRadius,
    energy: energy / 1e12, // TJ
  };
}

// Orbital mechanics calculations
export function calculateOrbitalVelocity(
  semiMajorAxis,
  eccentricity,
  trueAnomaly
) {
  // Simplified orbital velocity calculation
  const mu = GRAVITATIONAL_CONSTANT * EARTH_MASS;
  const r =
    (semiMajorAxis * (1 - eccentricity * eccentricity)) /
    (1 + eccentricity * Math.cos(trueAnomaly));
  return Math.sqrt(mu * (2 / r - 1 / semiMajorAxis));
}

export function calculateDeflectionEffect(
  impactorMass,
  impactorVelocity,
  targetMass,
  timeToImpact
) {
  // Calculate velocity change from kinetic impactor
  const momentumTransfer = impactorMass * impactorVelocity;
  const velocityChange = momentumTransfer / targetMass;

  // Calculate deflection distance
  const deflectionDistance = velocityChange * timeToImpact;

  return {
    velocityChange,
    deflectionDistance,
    effectiveness: deflectionDistance / EARTH_RADIUS, // Relative to Earth radius
  };
}

// Mitigation strategy calculations
export function calculateKineticImpactorEffect(
  impactorMass,
  impactorVelocity,
  targetMass,
  timeToImpact
) {
  return calculateDeflectionEffect(
    impactorMass,
    impactorVelocity,
    targetMass,
    timeToImpact
  );
}

export function calculateGravityTractorEffect(
  tractorMass,
  distance,
  targetMass,
  timeToImpact
) {
  // Simplified gravity tractor calculation
  const gravitationalForce =
    (GRAVITATIONAL_CONSTANT * tractorMass * targetMass) / (distance * distance);
  const acceleration = gravitationalForce / targetMass;
  const velocityChange = acceleration * timeToImpact;
  const deflectionDistance = velocityChange * timeToImpact;

  return {
    velocityChange,
    deflectionDistance,
    effectiveness: deflectionDistance / EARTH_RADIUS,
  };
}

export function calculateLaserAblationEffect(
  laserPower,
  timeToImpact,
  targetMass
) {
  // Simplified laser ablation calculation
  const totalEnergy = laserPower * timeToImpact;
  const velocityChange = Math.sqrt((2 * totalEnergy) / targetMass);
  const deflectionDistance = velocityChange * timeToImpact;

  return {
    velocityChange,
    deflectionDistance,
    effectiveness: deflectionDistance / EARTH_RADIUS,
  };
}

// Environmental impact calculations
export function calculateEnvironmentalEffects(energy, impactLocation) {
  const tntEquivalent = calculateTNTEquivalent(energy);
  const seismicMagnitude = calculateSeismicMagnitude(energy);

  // Determine impact type based on energy
  let impactType = "local";
  if (tntEquivalent > 1e6) impactType = "regional";
  if (tntEquivalent > 1e9) impactType = "global";

  // Calculate affected area (simplified)
  const affectedRadius = Math.pow(energy / 1e12, 0.33) * 1000; // meters

  return {
    impactType,
    tntEquivalent,
    seismicMagnitude,
    affectedRadius,
    environmentalDamage: {
      atmospheric: tntEquivalent > 1e6,
      seismic: seismicMagnitude > 4,
      tsunami: impactLocation.isCoastal,
      firestorm: tntEquivalent > 1e7,
    },
  };
}

// Risk assessment calculations
export function calculateRiskScore(asteroid, impactProbability, timeToImpact) {
  const mass = calculateMass(asteroid.diameter);
  const energy = calculateImpactEnergy(mass, asteroid.velocity);
  const tntEquivalent = calculateTNTEquivalent(energy);

  // Risk factors
  const energyFactor = Math.log10(tntEquivalent + 1);
  const probabilityFactor = Math.log10(impactProbability + 1e-10);
  const timeFactor = Math.max(0, 1 - timeToImpact / 100); // More urgent = higher risk

  const riskScore = energyFactor * probabilityFactor * timeFactor;

  return {
    riskScore,
    riskLevel: riskScore > 10 ? "HIGH" : riskScore > 5 ? "MEDIUM" : "LOW",
    factors: {
      energy: energyFactor,
      probability: probabilityFactor,
      urgency: timeFactor,
    },
  };
}

// Advanced orbital mechanics
export function calculateCloseApproach(orbitalData, currentTime) {
  // Simplified close approach calculation
  const {
    semi_major_axis,
    eccentricity,
    inclination,
    longitude_of_ascending_node,
    argument_of_periapsis,
    mean_anomaly,
  } = orbitalData;

  // Calculate position and velocity at current time
  const meanMotion = Math.sqrt(
    (GRAVITATIONAL_CONSTANT * EARTH_MASS) / Math.pow(semi_major_axis, 3)
  );
  const currentAnomaly = mean_anomaly + meanMotion * currentTime;

  // Simplified position calculation (ignoring perturbations)
  const r =
    (semi_major_axis * (1 - eccentricity * eccentricity)) /
    (1 + eccentricity * Math.cos(currentAnomaly));

  return {
    distance: r,
    velocity: calculateOrbitalVelocity(
      semi_major_axis,
      eccentricity,
      currentAnomaly
    ),
    position: {
      x: r * Math.cos(currentAnomaly),
      y: r * Math.sin(currentAnomaly),
      z: 0, // Simplified 2D case
    },
  };
}
