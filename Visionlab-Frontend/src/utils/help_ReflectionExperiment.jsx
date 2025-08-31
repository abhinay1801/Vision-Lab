import React, { useState } from "react";
import { motion } from "framer-motion";

function help_ReflectionExperiment() {
  const [inputAngle, setInputAngle] = useState("");
  const [angle, setAngle] = useState("");
  const [showAngles, setShowAngles] = useState(false);
  const [showReflectedRay, setShowReflectedRay] = useState(false);
  const [error, setError] = useState("");
  const [animationKey, setAnimationKey] = useState(0);

  const handleInputChange = (e) => {
    setInputAngle(e.target.value);
    setError("");
  };

  const handleEnter = () => {
    const newAngle = parseFloat(inputAngle);

    if (isNaN(newAngle)) {
      setError("Please enter a valid number");
      return;
    }

    if (newAngle < 0 || newAngle > 90) {
      setError("Incidence angle should be in the range of 0°-90°");
      return;
    }

    // Reset animation by changing key
    setAnimationKey((prev) => prev + 1);

    setAngle(newAngle);
    setShowAngles(true);
    setShowReflectedRay(false);
    setError("");

    // Trigger reflected ray animation after incident ray completes
    setTimeout(() => {
      setShowReflectedRay(true);
    }, 1000);
  };

  const reset = () => {
    setInputAngle("");
    setAngle("");
    setShowAngles(false);
    setShowReflectedRay(false);
    setError("");
    setAnimationKey((prev) => prev + 1);
  };

  const calculateRayCoordinates = (angle) => {
    const centerX = 250;
    const centerY = 250;
    const rayLength = 200;

    // Incident ray coming from top left (2nd quadrant)
    const incidentRayStartX =
      centerX - rayLength * Math.cos((angle * Math.PI) / 180);
    const incidentRayStartY =
      centerY - rayLength * Math.sin((angle * Math.PI) / 180);

    // Reflected ray going to top right (1st quadrant)
    const reflectedRayEndX =
      centerX + rayLength * Math.cos((angle * Math.PI) / 180);
    const reflectedRayEndY =
      centerY - rayLength * Math.sin((angle * Math.PI) / 180);

    return {
      incidentRay: {
        x1: incidentRayStartX,
        y1: incidentRayStartY,
        x2: centerX,
        y2: centerY,
      },
      reflectedRay: {
        x1: centerX,
        y1: centerY,
        x2: reflectedRayEndX,
        y2: reflectedRayEndY,
      },
      normalLine: {
        x1: centerX,
        y1: 50,
        x2: centerX,
        y2: 450,
      },
    };
  };

  const rayCoords = showAngles ? calculateRayCoordinates(angle) : null;

  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-white to-blue-50 text-black min-h-screen p-5">
      <h1 className="text-4xl font-bold mb-6 text-blue-800">
        Light Reflection Experiment
      </h1>

      <div className="mb-6 flex items-center space-x-4">
        <label className="text-lg font-medium text-blue-700">
          Enter Angle of Incidence (0-90°):
        </label>
        <input
          type="text"
          value={inputAngle}
          onChange={handleInputChange}
          className="p-2 text-black rounded-lg border-2 border-blue-300 focus:ring-2 focus:ring-blue-500 transition-all"
          placeholder="0-90"
        />
        <button
          onClick={handleEnter}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
        >
          Enter
        </button>
      </div>

      {error && <div className="text-red-500 mb-4 text-lg">{error}</div>}

      <div className="relative bg-white shadow-xl rounded-xl border border-blue-100 p-6">
        <svg width="500" height="500" viewBox="0 0 500 500">
          {/* Permanent Normal Line */}
          <line
            x1="250"
            y1="50"
            x2="250"
            y2="250"
            stroke="magenta"
            strokeWidth="3"
            strokeDasharray="10,10"
          />
          <text x="210" y="30" fill="magenta" fontSize="16">
            Normal Line
          </text>
          <text x="230" y="270" fill="silver" fontSize="16">
            Mirror
          </text>

          {/* Mirror Surface */}
          <line
            x1="50"
            y1="250"
            x2="450"
            y2="250"
            stroke="silver"
            strokeWidth="4"
          />

          {/* Incident Ray */}
          {showAngles && rayCoords && (
            <>
              <motion.line
                key={`incident-ray-${animationKey}`}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                {...rayCoords.incidentRay}
                stroke="blue"
                strokeWidth="5"
              />
              {/* Angle of Incidence */}
              <text x="50" y="280" fill="blue" fontSize="16">
                θᵢ = {angle}°
              </text>
              <text x="50" y="300" fill="blue" fontSize="16">
                Angle of Incidance
              </text>
            </>
          )}

          {/* Reflected Ray */}
          {showAngles && showReflectedRay && rayCoords && (
            <>
              <motion.line
                key={`reflected-ray-${animationKey}`}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                {...rayCoords.reflectedRay}
                stroke="green"
                strokeWidth="5"
              />
              {/* Angle of Reflection */}
              <text x="300" y="280" fill="green" fontSize="16">
                θᵣ = {angle}°
              </text>
              <text x="300" y="300" fill="green" fontSize="16">
                Angle of Reflection
              </text>
            </>
          )}
        </svg>
      </div>

      <button
        onClick={reset}
        className="bg-red-500 text-white px-6 py-3 rounded-lg mt-6 shadow-md hover:bg-red-600 transition-all"
      >
        Reset Experiment
      </button>
    </div>
  );
}

export default help_ReflectionExperiment;
