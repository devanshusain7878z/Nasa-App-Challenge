import React, { useState } from "react";

const EducationalOverlay = ({ onClose }) => {
  const [currentTopic, setCurrentTopic] = useState("asteroids");

  const topics = [
    {
      id: "asteroids",
      title: "What are Asteroids?",
      icon: "☄️",
      content: (
        <div className="space-y-4">
          <p className="text-lg">
            Asteroids are small, rocky objects that orbit the Sun. They are
            remnants from the early formation of our solar system, about 4.6
            billion years ago.
          </p>
          <div className="bg-blue-900 p-4 rounded-lg">
            <h4 className="font-bold text-blue-300 mb-2">Key Facts:</h4>
            <ul className="space-y-1 text-sm">
              <li>
                • Most asteroids are found in the asteroid belt between Mars and
                Jupiter
              </li>
              <li>
                • They range in size from small rocks to objects hundreds of
                kilometers across
              </li>
              <li>
                • Near-Earth Asteroids (NEAs) have orbits that bring them close
                to Earth
              </li>
              <li>
                • Potentially Hazardous Asteroids (PHAs) are large enough and
                close enough to pose a threat
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "impact",
      title: "Impact Effects",
      icon: "💥",
      content: (
        <div className="space-y-4">
          <p className="text-lg">
            When an asteroid impacts Earth, it releases enormous amounts of
            energy, causing various destructive effects.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-900 p-4 rounded-lg">
              <h4 className="font-bold text-red-300 mb-2">
                Immediate Effects:
              </h4>
              <ul className="space-y-1 text-sm">
                <li>• Crater formation</li>
                <li>• Seismic waves (earthquakes)</li>
                <li>• Fireball and thermal radiation</li>
                <li>• Air blast and shock waves</li>
              </ul>
            </div>
            <div className="bg-yellow-900 p-4 rounded-lg">
              <h4 className="font-bold text-yellow-300 mb-2">
                Secondary Effects:
              </h4>
              <ul className="space-y-1 text-sm">
                <li>• Tsunamis (if ocean impact)</li>
                <li>• Atmospheric dust and debris</li>
                <li>• Climate changes</li>
                <li>• Global firestorms</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "mitigation",
      title: "Mitigation Strategies",
      icon: "🛡️",
      content: (
        <div className="space-y-4">
          <p className="text-lg">
            Scientists have developed several strategies to deflect or destroy
            threatening asteroids before they reach Earth.
          </p>
          <div className="space-y-4">
            <div className="bg-green-900 p-4 rounded-lg">
              <h4 className="font-bold text-green-300 mb-2">
                🚀 Kinetic Impactor
              </h4>
              <p className="text-sm">
                High-speed spacecraft collides with asteroid to change its
                trajectory. Most proven method.
              </p>
            </div>
            <div className="bg-blue-900 p-4 rounded-lg">
              <h4 className="font-bold text-blue-300 mb-2">
                🛰️ Gravity Tractor
              </h4>
              <p className="text-sm">
                Spacecraft hovers near asteroid, using gravitational pull to
                gradually change its path.
              </p>
            </div>
            <div className="bg-purple-900 p-4 rounded-lg">
              <h4 className="font-bold text-purple-300 mb-2">
                🔴 Laser Ablation
              </h4>
              <p className="text-sm">
                Focused laser beam vaporizes surface material, creating thrust
                to deflect asteroid.
              </p>
            </div>
            <div className="bg-red-900 p-4 rounded-lg">
              <h4 className="font-bold text-red-300 mb-2">
                💥 Nuclear Deflection
              </h4>
              <p className="text-sm">
                Nuclear explosion near asteroid surface creates shock wave to
                change trajectory.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "detection",
      title: "Detection & Tracking",
      icon: "🔍",
      content: (
        <div className="space-y-4">
          <p className="text-lg">
            NASA and international partners continuously monitor the skies for
            potentially threatening asteroids.
          </p>
          <div className="bg-gray-700 p-4 rounded-lg">
            <h4 className="font-bold text-white mb-2">Detection Methods:</h4>
            <ul className="space-y-2 text-sm">
              <li>
                • <strong>Ground-based telescopes:</strong> Large optical and
                radio telescopes scan the sky
              </li>
              <li>
                • <strong>Space-based observatories:</strong> Satellites like
                NEOWISE detect infrared signatures
              </li>
              <li>
                • <strong>Radar observations:</strong> Powerful radar systems
                track asteroid size and rotation
              </li>
              <li>
                • <strong>Automated surveys:</strong> Computer systems
                automatically identify moving objects
              </li>
            </ul>
          </div>
          <div className="bg-blue-900 p-4 rounded-lg">
            <h4 className="font-bold text-blue-300 mb-2">Current Status:</h4>
            <p className="text-sm">
              NASA has discovered over 90% of asteroids larger than 1 kilometer
              that could cause global devastation. The focus now is on finding
              smaller but still dangerous objects.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "physics",
      title: "Impact Physics",
      icon: "⚗️",
      content: (
        <div className="space-y-4">
          <p className="text-lg">
            Understanding the physics of asteroid impacts helps us predict and
            prepare for potential threats.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-900 p-4 rounded-lg">
              <h4 className="font-bold text-blue-300 mb-2">
                Energy Calculations:
              </h4>
              <div className="text-sm space-y-1">
                <p>
                  <strong>Kinetic Energy:</strong> KE = ½mv²
                </p>
                <p>
                  <strong>Impact Energy:</strong> Depends on mass and velocity
                </p>
                <p>
                  <strong>TNT Equivalent:</strong> Energy compared to explosives
                </p>
              </div>
            </div>
            <div className="bg-green-900 p-4 rounded-lg">
              <h4 className="font-bold text-green-300 mb-2">Scaling Laws:</h4>
              <div className="text-sm space-y-1">
                <p>
                  <strong>Crater Size:</strong> ∝ Energy^0.294
                </p>
                <p>
                  <strong>Seismic Magnitude:</strong> ∝ log(Energy)
                </p>
                <p>
                  <strong>Tsunami Height:</strong> ∝ Energy^0.25
                </p>
              </div>
            </div>
          </div>
          <div className="bg-yellow-900 p-4 rounded-lg">
            <h4 className="font-bold text-yellow-300 mb-2">Real Examples:</h4>
            <div className="text-sm space-y-1">
              <p>
                • <strong>Chelyabinsk (2013):</strong> 20m asteroid, 500
                kilotons TNT equivalent
              </p>
              <p>
                • <strong>Tunguska (1908):</strong> 50-60m asteroid, 10-15
                megatons TNT equivalent
              </p>
              <p>
                • <strong>Chicxulub (65M years ago):</strong> 10km asteroid, 100
                teratons TNT equivalent
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gray-800 p-6 border-b border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Educational Guide</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex h-[70vh]">
          {/* Sidebar */}
          <div className="w-1/3 bg-gray-800 p-4 border-r border-gray-700">
            <h3 className="font-bold text-white mb-4">Topics</h3>
            <div className="space-y-2">
              {topics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => setCurrentTopic(topic.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    currentTopic === topic.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{topic.icon}</span>
                    <span className="font-medium">{topic.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">
                {topics.find((t) => t.id === currentTopic)?.icon}{" "}
                {topics.find((t) => t.id === currentTopic)?.title}
              </h2>
            </div>

            <div className="text-gray-300">
              {topics.find((t) => t.id === currentTopic)?.content}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-800 p-4 border-t border-gray-700">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-400">
              Learn more about asteroid impacts and planetary defense
            </div>
            <div className="space-x-4">
              <button
                onClick={onClose}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationalOverlay;
