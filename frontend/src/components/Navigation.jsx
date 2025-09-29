import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="bg-gray-700 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                isActive
                  ? "border-b-blue-500 text-blue-400"
                  : "border-transparent text-gray-300 hover:text-white hover:border-gray-300"
              }`
            }
          >
            📊 Dashboard
          </NavLink>
          <NavLink
            to="/simulation"
            className={({ isActive }) =>
              `py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                isActive
                  ? "border-blue-500 text-blue-400"
                  : "border-transparent text-gray-300 hover:text-white hover:border-gray-300"
              }`
            }
          >
            🎯 Simulation
          </NavLink>
          <NavLink
            to="/mitigation"
            className={({ isActive }) =>
              `py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                isActive
                  ? "border-blue-500 text-blue-400"
                  : "border-transparent text-gray-300 hover:text-white hover:border-gray-300"
              }`
            }
          >
            🛡️ Mitigation
          </NavLink>
          <NavLink
            to="/analysis"
            className={({ isActive }) =>
              `py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                isActive
                  ? "border-blue-500 text-blue-400"
                  : "border-transparent text-gray-300 hover:text-white hover:border-gray-300"
              }`
            }
          >
            📈 Analysis
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
