import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Waves } from "lucide-react";

const help_RefractionExperiment = () => {
  const [incidentAngle, setIncidentAngle] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [simulationData, setSimulationData] = useState(null);
  const [animationStage, setAnimationStage] = useState(0);
  const [error, setError] = useState("");
  const [showInputControls, setShowInputControls] = useState(true); // Controls text field and Simulate button

  const nAir = 1.0;
  const nGlass = 1.5;

  const calculateRefraction = (angle) => {
    const angleRad = (angle * Math.PI) / 180;
    const sinTheta2 = (nAir * Math.sin(angleRad)) / nGlass;
    if (Math.abs(sinTheta2) > 1) return null;
    const refractedAngleRad = Math.asin(sinTheta2);
    return (refractedAngleRad * 180) / Math.PI;
  };

  const handleAngleChange = (e) => {
    const value = e.target.value;
    setError("");
    if (value === "") {
      setIncidentAngle("");
      return;
    }
    const numValue = parseFloat(value);
    if (numValue < 0) {
      setIncidentAngle("0");
    } else if (numValue > 90) {
      setIncidentAngle("90");
    } else {
      setIncidentAngle(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const angle = parseFloat(incidentAngle);
    if (angle >= 0 && angle <= 90) {
      const refractedAngle = calculateRefraction(angle);
      if (refractedAngle === null) {
        setError(
          "Angle causes total internal reflection. Try a smaller angle."
        );
        return;
      }

      const coords = getRayCoordinates(angle, refractedAngle);

      setAnimationStage(0);
      setShowResult(false);
      setSimulationData({
        angle,
        refractedAngle,
        coords,
      });
      setShowResult(true);
      setError("");
      setShowInputControls(false); // Hide only input and Simulate button
    } else {
      setError("Please enter an angle between 0 and 90 degrees");
    }
  };

  const resetSimulation = () => {
    setIncidentAngle("");
    setShowResult(false);
    setAnimationStage(0);
    setSimulationData(null);
    setError("");
    setShowInputControls(true); // Show input and Simulate button again
  };

  const getRayCoordinates = (angle, refractedAngle) => {
    const canvasWidth = 600;
    const canvasHeight = 450;
    const slabTop = 150;
    const slabBottom = 300;
    const slabThickness = slabBottom - slabTop;

    const incidentX1 = 300;
    const incidentY1 = 0;
    const incidentX2 = 300;
    const incidentY2 = slabTop;

    const incidentDisplayLength = 150;
    const incidentDisplayX =
      incidentX2 - incidentDisplayLength * Math.sin((angle * Math.PI) / 180);
    const incidentDisplayY =
      incidentY2 - incidentDisplayLength * Math.cos((angle * Math.PI) / 180);

    const refractedX1 = incidentX2;
    const refractedY1 = slabTop;
    const refractedX2 =
      refractedX1 + slabThickness * Math.tan((refractedAngle * Math.PI) / 180);
    const refractedY2 = slabBottom;

    const emergentX1 = refractedX2;
    const emergentY1 = slabBottom;
    const emergentDisplayLength = 150;
    const emergentX2 =
      emergentX1 + emergentDisplayLength * Math.sin((angle * Math.PI) / 180);
    const emergentY2 =
      emergentY1 + emergentDisplayLength * Math.cos((angle * Math.PI) / 180);

    return {
      incidentDisplayX,
      incidentDisplayY,
      incidentX2,
      incidentY2,
      refractedX1,
      refractedY1,
      refractedX2,
      refractedY2,
      emergentX1,
      emergentY1,
      emergentX2,
      emergentY2,
    };
  };

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-extrabold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center gap-3">
          <Waves className="text-blue-500" />
          Light Refraction Simulator
          <Sparkles className="text-purple-500" />
        </h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto">
          Explore how light bends when passing through different media using
          Snell's Law
        </p>
      </motion.div>

      {/* User Input Controls */}
      <motion.div className="flex flex-col sm:flex-row gap-4 mb-6 items-center justify-center">
        <AnimatePresence>
          {showInputControls && (
            <motion.form
              onSubmit={handleSubmit}
              className="flex items-center gap-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-4 bg-white shadow-md rounded-lg p-3">
                <label className="text-sm font-medium text-gray-700">
                  Incident Angle (0-90°):
                </label>
                <input
                  type="number"
                  value={incidentAngle}
                  onChange={handleAngleChange}
                  min="0"
                  max="90"
                  step="1"
                  required
                  className="w-24 p-2 border-2 border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-md hover:from-blue-600 hover:to-purple-700 transition-all shadow-md"
              >
                Simulate
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Reset Button - Always visible, but with conditional positioning */}
        <motion.button
          type="button"
          onClick={resetSimulation}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-all shadow-md"
          animate={{
            marginLeft: showInputControls ? "0.5rem" : "0",
            transition: { duration: 0.3 },
          }}
        >
          Reset
        </motion.button>
      </motion.div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center text-red-600 mb-4"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Simulation Canvas */}
      <motion.svg
        key={showResult ? "simulation" : "empty"}
        width="600"
        height="450"
        className="border-2 border-blue-200 rounded-lg mx-auto mb-6 bg-white shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <defs>
          <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#87CEEB" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#E0F8FF" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width="600" height="450" fill="url(#skyGradient)" />

        <motion.rect
          x="150"
          y="150"
          width="300"
          height="150"
          fill="rgba(173, 216, 230, 0.5)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        />

        <line
          x1="300"
          y1="75"
          x2="300"
          y2="375"
          stroke="black"
          strokeDasharray="5"
        />

        {simulationData && showResult && (
          <>
            <motion.line
              x1={simulationData.coords.incidentDisplayX}
              y1={simulationData.coords.incidentDisplayY}
              x2={simulationData.coords.incidentX2}
              y2={simulationData.coords.incidentY2}
              stroke="red"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              onAnimationComplete={() => setAnimationStage(1)}
            />

            {animationStage >= 1 && (
              <motion.line
                x1={simulationData.coords.incidentX2}
                y1={simulationData.coords.incidentY2}
                x2={simulationData.coords.refractedX2}
                y2={simulationData.coords.refractedY2}
                stroke="orange"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1 }}
                onAnimationComplete={() => setAnimationStage(2)}
              />
            )}

            {animationStage >= 2 && (
              <motion.line
                x1={simulationData.coords.refractedX2}
                y1={simulationData.coords.refractedY2}
                x2={simulationData.coords.emergentX2}
                y2={simulationData.coords.emergentY2}
                stroke="red"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1 }}
                onAnimationComplete={() => setAnimationStage(3)}
              />
            )}

            <AnimatePresence>
              {animationStage === 3 && (
                <>
                  <motion.text
                    x={simulationData.coords.incidentDisplayX - 80}
                    y={simulationData.coords.incidentDisplayY + 20}
                    className="text-xs"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    Incident Ray
                  </motion.text>
                  <motion.text
                    x={
                      (simulationData.coords.incidentX2 +
                        simulationData.coords.refractedX2) /
                        2 +
                      30
                    }
                    y={
                      (simulationData.coords.incidentY2 +
                        simulationData.coords.refractedY2) /
                      2
                    }
                    className="text-xs"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    Refracted Ray
                  </motion.text>
                  <motion.text
                    x={simulationData.coords.emergentX2 + 30}
                    y={simulationData.coords.emergentY2}
                    className="text-xs"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    Emergent Ray
                  </motion.text>
                </>
              )}
            </AnimatePresence>
          </>
        )}
      </motion.svg>

      {/* Results */}
      <AnimatePresence>
        {showResult && simulationData && animationStage === 3 && (
          <motion.div
            className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-3 rounded-md text-center">
                <p className="text-sm text-gray-600">Incident Angle</p>
                <p className="text-2xl font-bold text-blue-600">
                  {simulationData.angle}°
                </p>
              </div>
              <div className="bg-purple-50 p-3 rounded-md text-center">
                <p className="text-sm text-gray-600">Refracted Angle</p>
                <p className="text-2xl font-bold text-purple-600">
                  {simulationData.refractedAngle.toFixed(2)}°
                </p>
              </div>
              <div className="bg-green-50 p-3 rounded-md text-center col-span-2">
                <p className="text-sm text-gray-600">Emergent Angle</p>
                <p className="text-2xl font-bold text-green-600">
                  {simulationData.angle}°
                </p>
                <p className="text-xs text-gray-500">
                  (Parallel to incident ray)
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default help_RefractionExperiment;
