import React, { useState, useEffect } from "react";

const help_HookesLawExperiment = () => {
  const [force, setForce] = useState("");
  const [springConstant, setSpringConstant] = useState("");
  const [targetExtension, setTargetExtension] = useState(0);
  const [currentExtension, setCurrentExtension] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (currentExtension < targetExtension) {
      const timer = setTimeout(() => {
        setCurrentExtension((prev) => Math.min(prev + 0.1, targetExtension));
      }, 50);
      return () => clearTimeout(timer);
    } else if (currentExtension > targetExtension) {
      const timer = setTimeout(() => {
        setCurrentExtension((prev) => Math.max(prev - 0.1, targetExtension));
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [currentExtension, targetExtension]);

  const handleForceChange = (e) => {
    const value = e.target.value;
    if (!/^[0-9]*\.?[0-9]*$/.test(value)) {
      setError("Enter a valid number.");
    } else {
      setError("");
      setForce(value);
      calculateExtension(parseFloat(value), parseFloat(springConstant));
    }
  };

  const handleSpringConstantChange = (e) => {
    const value = e.target.value;
    if (!/^[0-9]*\.?[0-9]*$/.test(value)) {
      setError("Enter a valid number.");
    } else {
      setError("");
      setSpringConstant(value);
      calculateExtension(parseFloat(force), parseFloat(value));
    }
  };

  const calculateExtension = (force, springConstant) => {
    if (force > 0 && springConstant > 0) {
      let calculatedExtension = force / springConstant;
      setTargetExtension(calculatedExtension);
    } else {
      setTargetExtension(0);
    }
  };

  const generateSpringPath = (numCoils, coilSpacing) => {
    let path = "M 50,20 ";
    for (let i = 0; i < numCoils; i++) {
      let y = 20 + i * coilSpacing;
      path += `C 70,${y + coilSpacing / 3} 30,${y + (2 * coilSpacing) / 3} 50,${y + coilSpacing} `;
    }
    return path;
  };

  const baseCoils = 10;
  const coilSpacing = 20;
  const additionalCoils = Math.min(Math.max(currentExtension * 5, 0), 10);
  const totalCoils = baseCoils + additionalCoils;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">
        Hooke's Law Experiment 🌀📏
      </h1>

      <div className="relative bg-white shadow-lg rounded-lg p-6 w-full max-w-lg flex flex-col items-center">
        <svg
          width="100"
          height={totalCoils * coilSpacing + 60}
          viewBox={`0 0 100 ${totalCoils * coilSpacing + 60}`}
        >
          <rect x="20" y="0" width="60" height="10" fill="black" />
          <path
            d={generateSpringPath(totalCoils, coilSpacing)}
            stroke="black"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="50" cy={totalCoils * coilSpacing + 30} r="10" fill="gray" />
        </svg>
        <p className="mt-2 text-gray-700 font-bold">
          Spring Hanging from the Wall
        </p>

        <div className="mt-6 flex flex-col md:flex-row justify-between w-full max-w-lg">
          <div>
            <label className="block font-semibold text-gray-700 text-lg mb-2">
              Force (N):
            </label>
            <input
              type="text"
              value={force}
              onChange={handleForceChange}
              className="border rounded p-3 w-32 text-center text-lg shadow-md"
              placeholder="Enter force"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 text-lg mb-2">
              Spring Constant (N/m):
            </label>
            <input
              type="text"
              value={springConstant}
              onChange={handleSpringConstantChange}
              className="border rounded p-3 w-32 text-center text-lg shadow-md"
              placeholder="Enter spring constant"
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}

        {currentExtension > 0 && (
          <div className="mt-6 bg-gradient-to-r from-green-100 to-green-300 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold text-green-900 mb-3">
              🔍 Experiment Result
            </h2>
            <p className="text-gray-800 text-lg">
              When a force of{" "}
              <span className="text-green-800 font-semibold">{force} N</span>
              is applied to a spring with a constant of
              <span className="text-green-800 font-semibold"> {springConstant} N/m</span>,
              the resulting extension is:
            </p>
            <p className="mt-4 text-3xl font-bold text-green-900">
              📏 {currentExtension.toFixed(2)} m
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default help_HookesLawExperiment;
