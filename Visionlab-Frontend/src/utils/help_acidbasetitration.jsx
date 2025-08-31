import React, { useState } from "react";

const help_acidbasetitration = () => {
  const [acidVolume, setAcidVolume] = useState("");
  const [baseConcentration, setBaseConcentration] = useState("");
  const [error, setError] = useState("");
  const [neutralizationPoint, setNeutralizationPoint] = useState(null);

  const handleAcidChange = (e) => {
    const value = e.target.value;
    if (!/^\d*\.?\d*$/.test(value)) {
      setError("Enter a valid number.");
    } else {
      setError("");
      setAcidVolume(value);
      calculateNeutralization(parseFloat(value), parseFloat(baseConcentration));
    }
  };

  const handleBaseChange = (e) => {
    const value = e.target.value;
    if (!/^\d*\.?\d*$/.test(value)) {
      setError("Enter a valid number.");
    } else {
      setError("");
      setBaseConcentration(value);
      calculateNeutralization(parseFloat(acidVolume), parseFloat(value));
    }
  };

  const calculateNeutralization = (acidVolume, baseConcentration) => {
    if (acidVolume > 0 && baseConcentration > 0) {
      let requiredBaseVolume = (acidVolume * 0.1) / baseConcentration; // Simple reaction assumption
      setNeutralizationPoint(requiredBaseVolume.toFixed(2));
    } else {
      setNeutralizationPoint(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
        Acid-Base Titration Experiment ⚗🧪
      </h1>

      <div className="relative bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-end h-48 border-b-4 border-gray-600 relative">
          <div className="w-1/5 flex flex-col items-center">
            <div className="w-8 h-24 bg-blue-500 rounded-t-md"></div>
            <p className="mt-2 font-bold text-blue-600">Base</p>
          </div>

          <div className="relative w-2/5 h-full flex items-center justify-center">
            <div className="w-16 h-28 bg-transparent border-4 border-gray-700 rounded-b-md overflow-hidden">
              <div
                className="w-full h-full bg-blue-300 transition-all duration-500 ease-in-out"
                style={{
                  height: neutralizationPoint ? `${Math.min(neutralizationPoint * 10, 100)}%` : "0%",
                }}
              ></div>
            </div>
            <span className="absolute -bottom-8 text-gray-700 font-bold text-lg">
              pH: {neutralizationPoint ? "Neutral" : "Acidic"}
            </span>
          </div>

          <div className="w-1/5 flex flex-col items-center">
            <div className="w-8 h-24 bg-red-500 rounded-t-md"></div>
            <p className="mt-2 font-bold text-red-600">Acid</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col md:flex-row justify-between w-full max-w-lg">
          <div>
            <label className="block font-semibold text-gray-700 text-lg mb-2">
              Acid Volume (mL):
            </label>
            <input
              type="text"
              value={acidVolume}
              onChange={handleAcidChange}
              className="border rounded p-3 w-32 text-center text-lg shadow-md"
              placeholder="Enter volume"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 text-lg mb-2">
              Base Concentration (M):
            </label>
            <input
              type="text"
              value={baseConcentration}
              onChange={handleBaseChange}
              className="border rounded p-3 w-32 text-center text-lg shadow-md"
              placeholder="Enter concentration"
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}

        {neutralizationPoint && (
          <div className="mt-6 bg-green-100 p-4 rounded-lg shadow-md text-center">
            <h2 className="text-lg font-bold mb-2">Reaction Status:</h2>
            <p className="text-gray-700 text-lg">
              Adding <b>{acidVolume} mL</b> of acid with <b>{baseConcentration} M</b> base...
              The neutralization point is reached at <b>{neutralizationPoint} mL</b> of base! 🧪⚗
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default help_acidbasetitration;