import React, { useState, useEffect } from "react";

const HelpIronCopperSulphateReaction = () => {
  const [ironAmount, setIronAmount] = useState("");
  const [cuso4Amount, setCuso4Amount] = useState("");
  const [error, setError] = useState("");
  const [ironRemaining, setIronRemaining] = useState(0);
  const [particles, setParticles] = useState([]);
  const [cuDeposited, setCuDeposited] = useState(0);
  const [feso4Formed, setFeso4Formed] = useState(0);
  const [isReactionRunning, setIsReactionRunning] = useState(false);

  const MOLAR_MASS_FE = 55.845; // g/mol
  const MOLAR_MASS_CUSO4 = 159.609; // g/mol
  const MOLAR_MASS_CU = 63.546; // g/mol
  const MOLAR_MASS_FESO4 = 151.908; // g/mol

  useEffect(() => {
    let interval;
    if (isReactionRunning && ironRemaining > 0) {
      interval = setInterval(() => {
        setIronRemaining(prev => {
          const newIron = Math.max(prev - 0.01 * parseFloat(ironAmount), 0); // Gradual consumption
          const ironConsumed = parseFloat(ironAmount) - newIron;
          updateProducts(ironConsumed);
          return newIron;
        });

        setParticles(prev => {
          const updatedParticles = prev.map(p => ({
            ...p,
            y: p.type === 'feso4' ? p.y - 1.5 : p.type === 'cu' ? p.y + 2 : p.y,
            x: p.x + (p.velocity.x * 0.5),
            opacity: p.opacity - 0.015,
            rotation: p.rotation + (Math.random() * 3 - 1.5)
          })).filter(p => p.opacity > 0 && p.y < 200 && p.y > -20);

          if (Math.random() > 0.6 && ironRemaining > 0) {
            const type = Math.random() > 0.5 ? 'cu' : 'feso4';
            updatedParticles.push({
              id: Date.now(),
              x: 50 + (Math.random() * 20 - 10),
              y: 40,
              size: Math.random() * 3 + 2,
              opacity: 1,
              rotation: Math.random() * 360,
              type,
              velocity: { x: Math.random() * 2 - 1, y: type === 'cu' ? -1 : 1 }
            });
          }

          return updatedParticles;
        });
      }, 50);
    } else if (ironRemaining <= 0) {
      setIsReactionRunning(false);
    }

    return () => clearInterval(interval);
  }, [isReactionRunning, ironRemaining, ironAmount]);

  const handleIronChange = (e) => {
    const value = e.target.value;
    if (!/^\d*\.?\d*$/.test(value)) {
      setError("Iron amount must be a positive number.");
    } else {
      setError("");
      setIronAmount(value);
      calculateReaction(parseFloat(value), parseFloat(cuso4Amount));
    }
  };

  const handleCuso4Change = (e) => {
    const value = e.target.value;
    if (!/^\d*\.?\d*$/.test(value)) {
      setError("CuSO₄ amount must be a positive number.");
    } else {
      setError("");
      setCuso4Amount(value);
      calculateReaction(parseFloat(ironAmount), parseFloat(value));
    }
  };

  const calculateReaction = (iron, cuso4) => {
    iron = Number(iron) || 0;
    cuso4 = Number(cuso4) || 0;

    if (iron > 0 && cuso4 > 0) {
      const molesFe = iron / MOLAR_MASS_FE;
      const molesCuSO4 = cuso4 / MOLAR_MASS_CUSO4;
      const reactionExtent = Math.min(molesFe, molesCuSO4); // Molar limiting reactant

      setCuDeposited(reactionExtent * MOLAR_MASS_CU);
      setFeso4Formed(reactionExtent * MOLAR_MASS_FESO4);
      setIronRemaining(iron - (reactionExtent * MOLAR_MASS_FE));
      setParticles([]);
      setIsReactionRunning(true);
    } else {
      setCuDeposited(0);
      setFeso4Formed(0);
      setIronRemaining(0);
      setIsReactionRunning(false);
    }
  };

  const updateProducts = (ironConsumed) => {
    const molesFeConsumed = ironConsumed / MOLAR_MASS_FE;
    setCuDeposited(molesFeConsumed * MOLAR_MASS_CU);
    setFeso4Formed(molesFeConsumed * MOLAR_MASS_FESO4);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 p-6">
      <h1 className="text-4xl font-bold text-blue-800 mb-8 text-center drop-shadow-md">
        Iron Metal + CuSO₄ Reaction ⚗
      </h1>

      <div className="relative bg-white/90 backdrop-blur-sm shadow-2xl rounded-xl p-8 w-full max-w-2xl border border-blue-200">
        <div className="relative h-72 bg-gradient-to-b from-blue-400/70 to-blue-500/70 overflow-hidden rounded-t-xl">
          <div 
            className="absolute left-1/2 -translate-x-1/2 bottom-10 w-32 h-16 bg-gray-600 rounded-t-md shadow-lg transition-all duration-1000"
            style={{ 
              opacity: ironRemaining / (parseFloat(ironAmount) || 1),
              height: `${16 * (ironRemaining / (parseFloat(ironAmount) || 1))}px`,
              filter: `brightness(${(ironRemaining / (parseFloat(ironAmount) || 1)) + 0.5})`
            }}
          >
            <div className="absolute inset-0 bg-gray-700/30 animate-rust" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold">
              Fe
            </span>
          </div>

          <div className="absolute inset-0 bg-blue-400/30 animate-wave" />
          <div className="absolute inset-0">
            {particles.map((particle) => (
              <div
                key={particle.id}
                className={`absolute rounded-full transition-all duration-50 ${
                  particle.type === 'cu' ? 'bg-amber-800 shadow-lg' : 'bg-emerald-400 shadow-sm'
                }`}
                style={{
                  left: `${particle.x}%`,
                  bottom: `${particle.y}px`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  opacity: particle.opacity,
                  transform: `rotate(${particle.rotation}deg)`,
                  filter: 'blur(0.5px)',
                }}
              >
                <span className="absolute text-xs font-bold -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  {particle.type === 'cu' ? 'Cu' : 'FeSO₄'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold text-gray-800 text-lg mb-2">
              Iron Metal (g):
            </label>
            <input
              type="text"
              value={ironAmount}
              onChange={handleIronChange}
              className="border-2 border-gray-300 rounded-lg p-3 w-full text-center text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              placeholder="Enter amount"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-800 text-lg mb-2">
              CuSO₄ Solution (g):
            </label>
            <input
              type="text"
              value={cuso4Amount}
              onChange={handleCuso4Change}
              className="border-2 border-gray-300 rounded-lg p-3 w-full text-center text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              placeholder="Enter amount"
            />
          </div>
        </div>

        {error && <p className="text-red-600 text-sm mt-4 text-center font-medium">{error}</p>}

        {ironAmount && cuso4Amount && (
          <div className="mt-6 bg-blue-50 p-6 rounded-lg shadow-inner border border-blue-100">
            <h2 className="text-xl font-bold mb-3 text-blue-800">Reaction Progress:</h2>
            <p className="text-gray-700 text-lg">
              Iron remaining: {ironRemaining.toFixed(2)}g
            </p>
            <p className="text-amber-800 font-semibold mt-2">
              Copper Deposited: {cuDeposited.toFixed(2)}g
            </p>
            <p className="text-emerald-700 font-semibold">
              FeSO₄ Formed: {feso4Formed.toFixed(2)}g
            </p>
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes rust { 0%, 100% { background-position: 0 0; } 50% { background-position: 100% 100%; } }
          @keyframes wave { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(4px); } }
          .animate-rust { background: linear-gradient(45deg, rgba(139, 69, 19, 0.2), transparent); animation: rust 5s infinite; }
          .animate-wave { animation: wave 2s infinite ease-in-out; }
        `}
      </style>
    </div>
  );
};

export default HelpIronCopperSulphateReaction;