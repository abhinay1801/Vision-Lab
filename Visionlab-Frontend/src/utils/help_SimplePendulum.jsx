import React, { useState, useEffect } from "react";

const SimplePendulum = () => {
  const [angle, setAngle] = useState(40); // Default max swing angle
  const [length, setLength] = useState(200); // Pendulum length
  const [swingAngle, setSwingAngle] = useState(angle); // Current angle
  const [displayAngle, setDisplayAngle] = useState(0); // Displayed angle (rounded)

  useEffect(() => {
    let direction = 1;
    const interval = setInterval(() => {
      setSwingAngle((prev) => {
        if (prev >= angle) direction = -1;
        if (prev <= -angle) direction = 1;
        const newAngle = prev + direction * 0.5; // Smooth motion

        // Update display angle only at 5° intervals
        if (Math.abs(newAngle) % 5 === 0) {
          setDisplayAngle(Math.round(newAngle / 5) * 5);
        }

        return newAngle;
      });
    }, 16); // Updates ~60FPS

    return () => clearInterval(interval);
  }, [angle]);

  const originX = 200;
  const originY = 50;
  const bobX = originX + length * Math.sin((swingAngle * Math.PI) / 180);
  const bobY = originY + length * Math.cos((swingAngle * Math.PI) / 180);

  // Convert length to meters (Assume 100px ≈ 1m)
  const lengthMeters = length / 100;
  const g = 9.8;
  const timePeriod = (2 * Math.PI * Math.sqrt(lengthMeters / g)).toFixed(2);

  // Generate result based on time period
  let resultMessage;
  if (timePeriod < 1) {
    resultMessage = "The pendulum swings quickly with a short time period.";
  } else if (timePeriod >= 1 && timePeriod <= 2) {
    resultMessage = "The pendulum moves at a moderate speed.";
  } else {
    resultMessage = "The pendulum swings slowly due to its long length.";
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-blue-300 p-6">
      <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">
        Simple Pendulum ⏳
      </h1>

      {/* Pendulum */}
      <div className="relative">
        <svg
          width="400"
          height="400"
          className="rounded-lg shadow-xl bg-gray-50 border border-gray-300"
        >
          {/* Ceiling (Wooden Bar) */}
          <rect
            x={140}
            y={35}
            width="120"
            height="15"
            rx="5"
            fill="sienna"
            stroke="black"
            strokeWidth="2"
          />

          {/* Angle Indicator (Updates only at 5° intervals) */}
          <text
            x={originX - 30}
            y={originY + 15}
            fill="black"
            fontSize="16"
            fontWeight="bold"
          >
            {Math.abs(displayAngle)}°
          </text>

          {/* Pendulum String */}
          <line
            x1={originX}
            y1={originY + 5}
            x2={bobX}
            y2={bobY}
            stroke="black"
            strokeWidth="3"
          />
          {/* Pendulum Bob */}
          <circle
            cx={bobX}
            cy={bobY}
            r="15"
            fill="red"
            stroke="black"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Controls */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow-lg flex flex-col gap-4">
        <div>
          <label className="block text-lg font-semibold text-gray-700">
            Swing Angle (°):
          </label>
          <input
            type="range"
            min="5"
            max="80"
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="w-40"
          />
          <span className="ml-2 text-lg">{angle}°</span>
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700">
            Length (cm):
          </label>
          <input
            type="range"
            min="100"
            max="250"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-40"
          />
          <span className="ml-2 text-lg">{length}px</span>
        </div>

        {/* Dynamic Experiment Result */}
        <div className="mt-4 p-3 bg-gray-200 rounded-lg">
          <h2 className="text-lg font-bold text-gray-700 mb-2">Result:</h2>
          <p className="text-gray-700">{resultMessage}</p>
          <p className="text-gray-600">Time Period: {timePeriod} sec</p>
        </div>
      </div>
    </div>
  );
};

export default SimplePendulum;