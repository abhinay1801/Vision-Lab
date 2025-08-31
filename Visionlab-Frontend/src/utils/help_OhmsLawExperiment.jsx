import React, { useState } from "react";

const help_OhmsLawExperiment = () => {
  const [voltage, setVoltage] = useState("");
  const [resistance, setResistance] = useState("");
  const [current, setCurrent] = useState(null);
  const [error, setError] = useState("");

  const handleVoltageChange = (e) => {
    const value = e.target.value;
    if (!/^\d*\.?\d*$/.test(value)) {
      setError("Enter a valid number.");
    } else {
      setError("");
      setVoltage(value);
      calculateCurrent(value, resistance);
    }
  };

  const handleResistanceChange = (e) => {
    const value = e.target.value;
    if (!/^\d*\.?\d*$/.test(value)) {
      setError("Enter a valid number.");
    } else {
      setError("");
      setResistance(value);
      calculateCurrent(voltage, value);
    }
  };

  const calculateCurrent = (voltage, resistance) => {
    if (voltage > 0 && resistance > 0) {
      let calculatedCurrent = voltage / resistance;
      setCurrent(calculatedCurrent.toFixed(2));
    } else {
      setCurrent(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">
        Ohm's Law Experiment ⚡🔬
      </h1>

      <div className="relative bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        {/* Circuit Representation */}
        <div className="relative flex flex-col items-center">
          <div
            className="w-40 h-10 bg-yellow-500 rounded-full shadow-lg transition-all duration-500"
            style={{
              filter: `brightness(${current ? Math.min(current * 2, 2) : 0.3})`,
            }}
          ></div>
          <p className="mt-2 text-gray-700 font-bold">Wire</p>

          {/* Bulb */}
          <div className="relative mt-4 flex flex-col items-center">
            <div
              className="w-16 h-16 rounded-full transition-all duration-500"
              style={{
                backgroundColor: `rgba(255, 204, 0, ${current ? Math.min(current / 5, 1) : 0.1})`,
                boxShadow: current
                  ? `0 0 ${Math.min(current * 10, 40)}px rgba(255, 204, 0, 0.8)`
                  : "none",
              }}
            ></div>
            <p className="mt-2 font-bold text-yellow-600">Bulb</p>
          </div>
        </div>

        {/* Inputs */}
        <div className="mt-6 flex flex-col md:flex-row justify-between w-full max-w-lg">
          <div>
            <label className="block font-semibold text-gray-700 text-lg mb-2">
              Voltage (V):
            </label>
            <input
              type="text"
              value={voltage}
              onChange={handleVoltageChange}
              className="border rounded p-3 w-32 text-center text-lg shadow-md"
              placeholder="Enter voltage"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 text-lg mb-2">
              Resistance (Ω):
            </label>
            <input
              type="text"
              value={resistance}
              onChange={handleResistanceChange}
              className="border rounded p-3 w-32 text-center text-lg shadow-md"
              placeholder="Enter resistance"
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}

        {/* Output */}
        {current && (
          <div className="mt-6 bg-gray-200 p-4 rounded-lg shadow-md text-center">
            <h2 className="text-lg font-bold mb-2">Result:</h2>
            <p className="text-gray-700 text-lg">
              For <b>{voltage}V</b> and <b>{resistance}Ω</b>, the calculated{" "}
              <b>current</b> is <b>{current} A</b>. ⚡
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default help_OhmsLawExperiment;
