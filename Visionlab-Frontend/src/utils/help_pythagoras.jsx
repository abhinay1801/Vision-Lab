import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

const Pythagoras = () => {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [error, setError] = useState("");
  const svgRef = useRef(null);

  // Calculate hypotenuse
  const c = a > 0 && b > 0 ? Math.sqrt(a * a + b * b).toFixed(2) : "";

  // Define SVG Scaling Factors
  const maxSize = 200;
  const scaleFactor = Math.min(maxSize / Math.max(a, b), 30);
  const triangleBase = a * scaleFactor;
  const triangleHeight = b * scaleFactor;

  // Positioning of labels with proper spacing
  const labelOffset = 20; // For a and b
  const cOffset = 64; // `4rem` (64px) for c label gap from the hypotenuse

  // Update SVG when values change
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous drawings

    if (a > 0 && b > 0) {
      // Draw the right-angled triangle
      svg.append("polygon")
        .attr("points", `0,${triangleHeight} ${triangleBase},${triangleHeight} ${triangleBase},0`)
        .attr("fill", "rgba(59,130,246,0.5)")
        .attr("stroke", "blue")
        .attr("stroke-width", 2);

      // Side labels
      svg.append("text")
        .attr("x", triangleBase / 2)
        .attr("y", triangleHeight + labelOffset)
        .attr("font-size", "16px")
        .attr("fill", "black")
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle")
        .text(`a = ${a}`);

      svg.append("text")
        .attr("x", triangleBase + labelOffset)
        .attr("y", triangleHeight / 2)
        .attr("font-size", "16px")
        .attr("fill", "black")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start")
        .text(`b = ${b}`);

      // Side c label (Centered with 4rem spacing)
      svg.append("text")
        .attr("x", triangleBase / 200 + cOffset) // Move away from hypotenuse
        .attr("y", triangleHeight / 1.3 - cOffset)
        .attr("font-size", "16px")
        .attr("fill", "black")
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle")
        .text(`c = ${c}`);
    }
  }, [a, b, c, triangleBase, triangleHeight]);

  // Input Validation
  const handleInputChange = (setter) => (e) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) {
      setError("Only positive numbers are allowed!");
    } else {
      setError("");
      setter(value === "" ? "" : Number(value));
    }
  };

  // Clear inputs
  const handleClear = () => {
    setA("");
    setB("");
    setError("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-blue-700 text-center">
        Pythagoras' Theorem Simulation
      </h1>

      {/* Triangle Display */}
      <div className="relative w-[320px] h-[320px] flex items-center justify-center">
        <svg ref={svgRef} width="100%" height="100%"></svg>
      </div>

      {/* Inputs for a and b */}
      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <div>
          <label className="block font-semibold text-gray-700 text-lg text-center mb-2">Side a:</label>
          <input
            type="text"
            value={a}
            onChange={handleInputChange(setA)}
            className="border rounded p-3 w-32 text-center text-lg shadow-md"
            placeholder="Enter a value"
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-700 text-lg text-center mb-2">Side b:</label>
          <input
            type="text"
            value={b}
            onChange={handleInputChange(setB)}
            className="border rounded p-3 w-32 text-center text-lg shadow-md"
            placeholder="Enter a value"
          />
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {/* Buttons */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={handleClear}
          className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
        >
          Clear
        </button>
      </div>

      {/* Calculation Display */}
      {a > 0 && b > 0 && (
        <div className="mt-6 bg-blue-100 p-4 rounded-lg shadow-md w-full max-w-md text-center">
          <h2 className="text-lg font-bold mb-2">Calculation:</h2>
          <p className="text-gray-700 text-lg">
            Hypotenuse (c) = √({a}² + {b}²) = {c}
          </p>
        </div>
      )}

    </div>
  );
};

export default Pythagoras;