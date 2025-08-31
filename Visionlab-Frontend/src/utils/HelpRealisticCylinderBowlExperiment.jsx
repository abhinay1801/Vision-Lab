
import React, { useState, useEffect } from "react";

const HelpRealisticCylinderBowlExperiment = () => {
  const [liquids, setLiquids] = useState({ Water: 0, Oil: 0, Alcohol: 0, Honey: 0 });
  const [selectedLiquid, setSelectedLiquid] = useState("");
  const [liquidAmount, setLiquidAmount] = useState("");
  const [solids, setSolids] = useState([]);
  const [solidInputs, setSolidInputs] = useState({ Wood: 0, Iron: 0, Plastic: 0 });
  const [error, setError] = useState("");
  const [isPouring, setIsPouring] = useState(false);
  const [pourProgress, setPourProgress] = useState(0);
  const [showHelp, setShowHelp] = useState(false);

  // Physical properties with more vibrant colors
  const LIQUIDS = {
    "Water": { density: 1.0, color: "from-blue-400 to-blue-600" },
    "Oil": { density: 0.92, color: "from-yellow-300 to-yellow-500" },
    "Alcohol": { density: 0.79, color: "from-gray-100 to-gray-300" },
    "Honey": { density: 1.42, color: "from-amber-500 to-amber-700" }
  };

  const SOLIDS = {
    "Wood": { density: 0.7, color: "bg-gradient-to-br from-amber-700 to-amber-900" },
    "Iron": { density: 7.87, color: "bg-gradient-to-br from-gray-600 to-gray-800" },
    "Plastic": { density: 0.95, color: "bg-gradient-to-br from-red-400 to-red-600" }
  };

  const BOWL_HEIGHT = 400; // Taller bowl
  const BOWL_WIDTH = 200; // Fixed width for cylinder

  useEffect(() => {
    if (isPouring && pourProgress < parseFloat(liquidAmount)) {
      const interval = setInterval(() => {
        setPourProgress(prev => {
          const currentTotal = Object.values(liquids).reduce((sum, val) => sum + val, 0);
          const remaining = 100 - currentTotal;
          const pourStep = Math.min(1, remaining, parseFloat(liquidAmount) - prev)/2;
          if (prev + pourStep >= parseFloat(liquidAmount) || currentTotal + pourStep >= 100) {
            setIsPouring(false);
            setPourProgress(0);
          }
          setLiquids(l => ({
            ...l,
            [selectedLiquid]: l[selectedLiquid] + pourStep
          }));
          return prev + pourStep*2;
        });
      }, 50);
      return () => clearInterval(interval);
    }

    if (solids.length > 0) {
      const interval = setInterval(() => {
        setSolids(prev => prev.map(solid => {
          const layers = getLiquidLayers();
          let targetY = 0; // Bottom of bowl

          for (let i = layers.length - 1; i >= 0; i--) {
            const layer = layers[i];
            if (SOLIDS[solid.type].density < layer.density) {
              targetY = layer.top - 20; // Float near top of this layer
              break;
            }
          }

          const newY = solid.y + (targetY - solid.y) * 0.1;
          return {
            ...solid,
            y: Math.max(0, Math.min(BOWL_HEIGHT - 20, newY)),
            rotation: solid.rotation + (Math.random() * 3 - 1.5),
            bounce: Math.abs(targetY - newY) < 5 ? (solid.bounce || 0) + 0.1 : 0
          };
        }));
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isPouring, solids, selectedLiquid, liquidAmount, pourProgress]);

  const getLiquidLayers = () => {
    const totalPercent = Object.values(liquids).reduce((sum, val) => sum + val, 0);
    if (totalPercent === 0) return [];

    const sortedLiquids = Object.entries(liquids)
      .filter(([_, amount]) => amount > 0)
      .sort((a, b) => LIQUIDS[b[0]].density - LIQUIDS[a[0]].density);

    let currentHeight = 0;
    return sortedLiquids.map(([name, amount]) => {
      const height = (amount / 100) * BOWL_HEIGHT;
      const layer = {
        name,
        density: LIQUIDS[name].density,
        color: LIQUIDS[name].color,
        bottom: currentHeight,
        top: currentHeight + height
      };
      currentHeight += height;
      return layer;
    });
  };

  const handleLiquidChange = (e) => {
    setSelectedLiquid(e.target.value);
    setLiquidAmount("");
    setPourProgress(0);
  };

  const handleLiquidAmountChange = (e) => {
    const value = e.target.value;
    if (!/^\d*\.?\d*$/.test(value)) {
      setError("Liquid amount must be a positive number.");
    } else {
      setError("");
      setLiquidAmount(value);
    }
  };

  const addLiquid = () => {
    if (!selectedLiquid || !liquidAmount) return;

    const newAmount = parseFloat(liquidAmount);
    const currentTotal = Object.values(liquids).reduce((sum, val) => sum + val, 0);
    const remainingCapacity = 100 - currentTotal;

    if (newAmount > remainingCapacity) {
      setError(`Cannot exceed 100% capacity. Only ${remainingCapacity.toFixed(1)}% remains.`);
      return;
    }

    setIsPouring(true);
  };

  const handleSolidAmountChange = (solid, value) => {
    if (!/^\d*$/.test(value) || parseInt(value) > 5) {
      setError(`Solid amount must be a whole number between 0 and 5.`);
    } else {
      setError("");
      setSolidInputs(prev => ({ ...prev, [solid]: parseInt(value) || 0 }));
    }
  };

  const addSolids = () => {
    const newSolids = [];
    Object.entries(solidInputs).forEach(([type, count]) => {
      if (count > 0) {
        for (let i = 0; i < count; i++) {
          newSolids.push({
            id: `${type}-${Date.now()}-${i}`,
            type,
            x: Math.random() * (BOWL_WIDTH - 40) + 20,
            y: BOWL_HEIGHT + 20,
            rotation: Math.random() * 360,
            bounce: 0
          });
        }
      }
    });
    setSolids([...solids, ...newSolids]);
  };

  const resetExperiment = () => {
    setLiquids({ Water: 0, Oil: 0, Alcohol: 0, Honey: 0 });
    setSolids([]);
    setSolidInputs({ Wood: 0, Iron: 0, Plastic: 0 });
    setError("");
    setIsPouring(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 p-6">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-blue-900 drop-shadow-md">
            Density Experiment Lab
          </h1>
          <button 
            onClick={() => setShowHelp(!showHelp)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            {showHelp ? "Hide Help" : "Show Help"}
          </button>
        </div>

        {showHelp && (
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg mb-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-blue-800 mb-3">How It Works</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Pour liquids into the cylinder - they'll layer by density</li>
              <li>Add solids to see how they float or sink</li>
              <li>Fill up to 100% capacity with any combination of liquids</li>
              <li>Watch realistic physics simulation with waves and buoyancy</li>
            </ul>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cylinder Bowl */}
          <div className="flex-1 flex flex-col items-center">
            <div className="relative bg-white/95 backdrop-blur-md shadow-2xl rounded-xl p-6 w-full border border-blue-300">
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-blue-800">Density Cylinder</h2>
                <p className="text-gray-600">Observe liquid layers and buoyancy</p>
              </div>
              
              <div className="flex justify-center">
                <div 
                  className="relative overflow-hidden border-4 border-blue-600 bg-gradient-to-b from-blue-100/20 to-blue-200/20"
                  style={{ 
                    height: BOWL_HEIGHT + "px",
                    width: BOWL_WIDTH + "px",
                    borderRadius: '20px',
                    boxShadow: "inset 0 0 20px rgba(0,0,0,0.1)"
                  }}
                >
                  {/* Liquid layers */}
                  {getLiquidLayers().map((layer, index) => (
                    <div
                      key={index}
                      className={`absolute w-full bg-gradient-to-b ${layer.color} opacity-90 transition-all duration-200`}
                      style={{
                        bottom: layer.bottom + "px",
                        height: (layer.top - layer.bottom) + "px",
                        borderRadius: '15px',
                        boxShadow: "inset 0 0 15px rgba(0,0,0,0.2)"
                      }}
                    >
                      <div className="absolute inset-0 bg-white/10 animate-wave" />
                      <div className="absolute top-0 left-0 w-full h-2 bg-white/30 opacity-70 animate-ripple" />
                    </div>
                  ))}

                  {/* Solids */}
                  {solids.map((solid) => (
                    <div
                      key={solid.id}
                      className={`absolute w-12 h-12 ${SOLIDS[solid.type].color} rounded-lg shadow-xl transition-all duration-50 flex items-center justify-center`}
                      style={{
                        left: solid.x + "px",
                        bottom: solid.y + Math.sin(solid.bounce) * 5 + "px",
                        transform: `rotate(${solid.rotation}deg) scale(1.${Math.round(solid.bounce)})`,
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                      }}
                    >
                      <span className="text-white font-bold text-xs drop-shadow">
                        {solid.type}
                      </span>
                    </div>
                  ))}

                  {/* Water level marker */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-red-500 opacity-80" />
                  <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-bl">
                    100%
                  </div>
                </div>
              </div>

              {/* Status display */}
              <div className="mt-6 bg-white/80 p-4 rounded-lg shadow-inner">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-blue-800">Liquids:</h3>
                    <ul className="space-y-1">
                      {Object.entries(liquids)
                        .filter(([_, v]) => v > 0)
                        .map(([k, v]) => (
                          <li key={k} className="flex justify-between">
                            <span>{k}:</span>
                            <span>{v.toFixed(1)}%</span>
                          </li>
                        ))}
                      {Object.values(liquids).every(v => v === 0) && (
                        <li className="text-gray-500">Empty</li>
                      )}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-800">Solids:</h3>
                    {solids.length > 0 ? (
                      <ul className="space-y-1">
                        {Object.entries(solids.reduce((acc, solid) => {
                          acc[solid.type] = (acc[solid.type] || 0) + 1;
                          return acc;
                        }, {})).map(([type, count]) => (
                          <li key={type} className="flex justify-between">
                            <span>{type}:</span>
                            <span>{count}x</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">None</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex-1 space-y-6">
            {/* Liquid Controls */}
            <div className="bg-white/95 p-6 rounded-xl shadow-lg border border-blue-200">
              <h2 className="text-xl font-bold text-blue-800 mb-4">Liquid Controls</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Liquid</label>
                  <select
                    value={selectedLiquid}
                    onChange={handleLiquidChange}
                    className="w-full p-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
                  >
                    <option value="">Choose a liquid...</option>
                    {Object.entries(LIQUIDS).map(([liquid, props]) => (
                      <option key={liquid} value={liquid}>
                        {liquid} (Density: {props.density}g/cm³)
                      </option>
                    ))}
                  </select>
                </div>

                {selectedLiquid && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Amount to pour (%)
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="text"
                        value={liquidAmount}
                        onChange={handleLiquidAmountChange}
                        className="flex-1 p-3 border-2 border-blue-300 rounded-lg text-center focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
                        placeholder="0-100"
                      />
                      <button
                        onClick={addLiquid}
                        disabled={isPouring}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md disabled:opacity-50"
                      >
                        {isPouring ? "Pouring..." : "Pour"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Solid Controls */}
            <div className="bg-white/95 p-6 rounded-xl shadow-lg border border-blue-200">
              <h2 className="text-xl font-bold text-blue-800 mb-4">Solid Objects</h2>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                {Object.entries(SOLIDS).map(([solid, props]) => (
                  <div key={solid} className="bg-blue-50/50 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{solid}</span>
                      <span className="text-xs bg-blue-200 px-2 py-1 rounded">
                        {props.density}g/cm³
                      </span>
                    </div>
                    <input
                      type="number"
                      min="0"
                      max="5"
                      value={solidInputs[solid]}
                      onChange={(e) => handleSolidAmountChange(solid, e.target.value)}
                      className="w-full p-2 border border-blue-300 rounded text-center"
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={addSolids}
                className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-md"
              >
                Add Solids to Cylinder
              </button>
            </div>

            {/* Reset Button */}
            <button
              onClick={resetExperiment}
              className="w-full py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-md"
            >
              Reset Experiment
            </button>

            {error && (
              <div className="mt-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
                <p>{error}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes wave {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(3px); }
        }
        @keyframes ripple {
          0% { opacity: 0.5; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.1); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-wave {
          animation: wave 2s infinite ease-in-out;
        }
        .animate-ripple {
          animation: ripple 1.5s infinite ease-out;
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default HelpRealisticCylinderBowlExperiment;