import React, { useState, useEffect } from "react";

const help_ElectrolysisOfWater = () => {
  const [voltage, setVoltage] = useState("");
  const [electrolyte, setElectrolyte] = useState("");
  const [error, setError] = useState("");
  const [bubblesH2, setBubblesH2] = useState([]);
  const [bubblesO2, setBubblesO2] = useState([]);
  const [h2Amount, setH2Amount] = useState(0);
  const [o2Amount, setO2Amount] = useState(0);
  const [isExperimentRunning, setIsExperimentRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isExperimentRunning) {
      interval = setInterval(() => {
        setBubblesH2((prev) =>
          prev.length >= 20
            ? prev.slice(1)
            : [...prev, { id: Date.now(), left: Math.random() * 30 }]
        );
        setBubblesO2((prev) =>
          prev.length >= 20
            ? prev.slice(1)
            : [...prev, { id: Date.now(), left: Math.random() * 30 + 70 }]
        );
      }, 500);
    } else {
      setBubblesH2([]);
      setBubblesO2([]);
    }

    return () => clearInterval(interval);
  }, [isExperimentRunning]);

  const handleVoltageChange = (e) => {
    const value = e.target.value;
    if (!/^\d*\.?\d*$/.test(value)) {
      setError("Voltage must be a positive number.");
    } else {
      setError("");
      setVoltage(value);
      calculateGasAmounts(parseFloat(value), parseFloat(electrolyte));
    }
  };

  const handleElectrolyteChange = (e) => {
    const value = e.target.value;
    if (!/^\d*\.?\d*$/.test(value)) {
      setError("Electrolyte concentration must be a positive number.");
    } else {
      setError("");
      setElectrolyte(value);
      calculateGasAmounts(parseFloat(voltage), parseFloat(value));
    }
  };

  const calculateGasAmounts = (voltage, electrolyte) => {
    voltage = Number(voltage) || 0;
    electrolyte = Number(electrolyte) || 0;

    if (voltage > 0 && electrolyte > 0) {
      let volume = (voltage * electrolyte) / 10;
      setH2Amount(volume * 2);
      setO2Amount(volume);
      setIsExperimentRunning(true);
    } else {
      setH2Amount(0);
      setO2Amount(0);
      setIsExperimentRunning(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        Electrolysis of Water Experiment💧
      </h1>

      <div className="relative bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-end h-48 border-b-4 border-gray-600 relative">
          <div className="w-1/5 flex flex-col items-center">
            <div className="w-8 h-24 bg-gray-700 rounded-t-md"></div>
            <p className="mt-2 font-bold text-blue-600">Cathode (-)</p>
          </div>

          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-full overflow-hidden">
            {bubblesH2.map((bubble) => (
              <div
                key={bubble.id}
                className="absolute w-4 h-4 bg-blue-400 rounded-full opacity-80 animate-rise"
                style={{ left: `${bubble.left}%`, bottom: "0px" }}
              >
                <span className="absolute text-sm text-blue-700 font-bold -mt-6">
                  H₂
                </span>
              </div>
            ))}
            {bubblesO2.map((bubble) => (
              <div
                key={bubble.id}
                className="absolute w-5 h-5 bg-red-400 rounded-full opacity-80 animate-rise"
                style={{ left: `${bubble.left}%`, bottom: "0px" }}
              >
                <span className="absolute text-sm text-red-700 font-bold -mt-6">
                  O₂
                </span>
              </div>
            ))}
          </div>

          <div className="w-1/5 flex flex-col items-center">
            <div className="w-8 h-24 bg-gray-700 rounded-t-md"></div>
            <p className="mt-2 font-bold text-red-600">Anode (+)</p>
          </div>
        </div>

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
              Electrolyte:
            </label>
            <input
              type="text"
              value={electrolyte}
              onChange={handleElectrolyteChange}
              className="border rounded p-3 w-32 text-center text-lg shadow-md"
              placeholder="Enter value"
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}

        {voltage && electrolyte && (
          <div className="mt-6 bg-blue-100 p-4 rounded-lg shadow-md text-center">
            <h2 className="text-lg font-bold mb-2">Reaction Status:</h2>
            <p className="text-gray-700 text-lg">
              Applying <b>{voltage}V</b> with <b>{electrolyte}</b> electrolyte...  
              Hydrogen (H₂) is released at the cathode (-) and Oxygen (O₂) at the anode (+)! 💧
            </p>
            <p className="text-blue-700 font-semibold mt-2">
              H₂ Released: {h2Amount.toFixed(2)} mL
            </p>
            <p className="text-red-700 font-semibold">
              O₂ Released: {o2Amount.toFixed(2)} mL
            </p>
          </div>
        )}
      </div>

      <style>
        {`
        @keyframes rise {
          0% { transform: translateY(0); opacity: 0.8; }
          100% { transform: translateY(-150px); opacity: 0; }
        }
        .animate-rise {
          animation: rise 3s linear infinite;
        }
        `}
      </style>
    </div>
  );
};

export default help_ElectrolysisOfWater;
