// import React, { useState, useEffect, useRef } from "react";
// import * as d3 from "d3";
// import { useDrag, useDrop } from "react-dnd";

// const pHScaleColors = [
//   "#ff0000", "#ff4500", "#ff8c00", "#ffd700", "#9acd32",
//   "#32cd32", "#008000", "#008b8b", "#1e90ff", "#0000ff",
//   "#4b0082", "#8a2be2", "#9400d3", "#9932cc",
// ];

// const solutions = [
//   { name: "Lemon Juice (Citric Acid)", type: "acid", pH: 2 },
//   { name: "Vinegar (Acetic Acid)", type: "acid", pH: 3 },
//   { name: "Pure Water", type: "neutral", pH: 7 },
//   { name: "Baking Soda (Sodium Bicarbonate)", type: "base", pH: 8 },
//   { name: "Soapy Water", type: "base", pH: 10 },
//   { name: "Bleach (Sodium Hypochlorite)", type: "base", pH: 13 },
// ];

// const Beaker = ({ onDrop, mixedPH }) => {
//   const [{ isOver }, drop] = useDrop(() => ({
//     accept: "solution",
//     drop: (item) => onDrop(item),
//     collect: (monitor) => ({
//       isOver: !!monitor.isOver(),
//     }),
//   }));

//   return (
//     <div
//       ref={drop}
//       className="relative w-40 h-60 border-4 rounded-lg overflow-hidden transition"
//       style={{
//         backgroundColor: mixedPH ? pHScaleColors[Math.min(Math.max(Math.round(mixedPH), 0), 13)] : "#ccc",
//         borderColor: isOver ? "blue" : "gray"
//       }}
//     >
//       <div className="absolute bottom-0 left-0 w-full h-[70%] transition-all duration-500"></div>
//       <p className="absolute top-2 w-full text-center font-semibold text-white">Beaker</p>
//     </div>
//   );
// };

// const DraggableSolution = ({ solution }) => {
//   const [{ isDragging }, drag] = useDrag(() => ({
//     type: "solution",
//     item: solution,
//     collect: (monitor) => ({
//       isDragging: !!monitor.isDragging(),
//     }),
//   }));

//   return (
//     <div
//       ref={drag}
//       className={`p-3 border rounded-md cursor-pointer bg-white shadow-md transition ${
//         isDragging ? "opacity-50" : "opacity-100"
//       }`}
//     >
//       {solution.name}
//     </div>
//   );
// };

// const PHSensor = () => {
//   const [selectedSolutions, setSelectedSolutions] = useState([]);
//   const [mixedPH, setMixedPH] = useState(null);
//   const svgRef = useRef(null);

//   // Function to mix solutions and calculate new pH
//   const mixSolutions = () => {
//     if (selectedSolutions.length === 0) return;
//     const totalPH = selectedSolutions.reduce((sum, sol) => sum + sol.pH, 0);
//     setMixedPH(totalPH / selectedSolutions.length);
//   };

//   useEffect(() => {
//     const svg = d3.select(svgRef.current);
//     svg.selectAll("*").remove();

//     if (mixedPH !== null) {
//       svg.append("rect")
//         .attr("x", 20)
//         .attr("y", 50)
//         .attr("width", 260)
//         .attr("height", 40)
//         .attr("fill", pHScaleColors[Math.min(Math.max(Math.round(mixedPH), 0), 13)]);

//       svg.append("text")
//         .attr("x", 150)
//         .attr("y", 80)
//         .attr("text-anchor", "middle")
//         .attr("font-size", "16px")
//         .attr("fill", "#ffffff")
//         .attr("font-weight", "bold")
//         .text(`pH: ${mixedPH.toFixed(2)}`);
//     }
//   }, [mixedPH]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold mb-6 text-blue-700 text-center">
//         Interactive pH Scale Simulator
//       </h1>

//       {/* Solution Options */}
//       <div className="flex flex-wrap justify-center gap-4">
//         {solutions.map((sol, index) => (
//           <DraggableSolution key={index} solution={sol} />
//         ))}
//       </div>

//       {/* Beaker */}
//       <div className="flex gap-8 mt-6">
//         <Beaker onDrop={(solution) => setSelectedSolutions([...selectedSolutions, solution])} mixedPH={mixedPH} />
//       </div>

//       {/* Mix Button */}
//       <button
//         onClick={mixSolutions}
//         className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition mt-4 animate-bounce"
//       >
//         Mix Solutions
//       </button>

//       {/* pH Scale Visualization */}
//       <div className="mt-6">
//         <svg ref={svgRef} width="300" height="100"></svg>
//       </div>

//       {/* Reset Button */}
//       <button
//         onClick={() => { setSelectedSolutions([]); setMixedPH(null); }}
//         className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition mt-4"
//       >
//         Reset
//       </button>
//     </div>
//   );
// };

// export default PHSensor;











// import React, { useState, useEffect, useRef } from "react";
// import * as d3 from "d3";
// import { useDrag, useDrop } from "react-dnd";

// // Color Scale for pH values
// const pHColors = [
//   "#ff0000", "#ff4500", "#ff8c00", "#ffd700", "#9acd32",
//   "#32cd32", "#008000", "#008b8b", "#1e90ff", "#0000ff",
//   "#4b0082", "#8a2be2", "#9400d3", "#9932cc",
// ];

// // Solutions with pH and molarity
// const solutions = [
//   { name: "Lemon Juice", type: "acid", pH: 2, molarity: 0.01 },
//   { name: "Vinegar", type: "acid", pH: 3, molarity: 0.005 },
//   { name: "Pure Water", type: "neutral", pH: 7, molarity: 1e-7 },
//   { name: "Baking Soda", type: "base", pH: 8, molarity: 0.001 },
//   { name: "Soap Water", type: "base", pH: 10, molarity: 0.0001 },
//   { name: "Bleach", type: "base", pH: 13, molarity: 0.01 },
// ];

// // Draggable Solution Component
// const DraggableSolution = ({ solution, quantity, setQuantity }) => {
//   const [{ isDragging }, drag] = useDrag(() => ({
//     type: "solution",
//     item: { solution, quantity },
//     collect: (monitor) => ({
//       isDragging: !!monitor.isDragging(),
//     }),
//   }));

//   return (
//     <div
//       ref={drag}
//       className={`p-3 border rounded-md cursor-pointer bg-white shadow-md transition ${
//         isDragging ? "opacity-50" : "opacity-100"
//       } flex flex-col items-center`}
//     >
//       <p className="font-bold">{solution.name}</p>
//       <input
//         type="number"
//         min="1"
//         value={quantity}
//         onChange={(e) => setQuantity(solution.name, parseInt(e.target.value) || 1)}
//         className="border rounded p-1 w-16 mt-1 text-center"
//         placeholder="mL"
//       />
//     </div>
//   );
// };

// // Beaker Component
// const Beaker = ({ onDrop, mixedPH, solutionsMixed }) => {
//   const [{ isOver }, drop] = useDrop(() => ({
//     accept: "solution",
//     drop: (item) => onDrop(item.solution, item.quantity),
//     collect: (monitor) => ({
//       isOver: !!monitor.isOver(),
//     }),
//   }));

//   return (
//     <div
//       ref={drop}
//       className="relative w-40 h-60 border-4 rounded-lg overflow-hidden transition p-2"
//       style={{
//         backgroundColor: mixedPH
//           ? pHColors[Math.min(Math.max(Math.round(mixedPH), 0), 13)]
//           : "#ccc",
//         borderColor: isOver ? "blue" : "gray",
//       }}
//     >
//       <p className="absolute top-2 w-full text-center font-semibold text-white">
//         Beaker
//       </p>
//       <div className="absolute bottom-2 left-2 text-white font-bold">
//         {solutionsMixed.map((sol, index) => (
//           <p key={index}>{sol.name}: {sol.quantity}mL</p>
//         ))}
//       </div>
//     </div>
//   );
// };

// // pH Scale Simulator Component
// const PHScaleSimulator = () => {
//   const [selectedSolutions, setSelectedSolutions] = useState([]);
//   const [quantities, setQuantities] = useState({});
//   const [mixedPH, setMixedPH] = useState(null);
//   const svgRef = useRef(null);

//   // Update solution quantity
//   const updateQuantity = (name, quantity) => {
//     setQuantities((prev) => ({ ...prev, [name]: quantity }));
//   };

//   // Function to mix solutions and compute final pH
//   const mixSolutions = (solution, quantity) => {
//     setSelectedSolutions((prev) => [...prev, { ...solution, quantity }]);
//   };

//   // Compute final pH based on acid/base mixing
//   useEffect(() => {
//     if (selectedSolutions.length === 0) return;
    
//     let totalVolume = selectedSolutions.reduce((sum, sol) => sum + sol.quantity, 0);
//     let acidMoles = 0, baseMoles = 0;

//     selectedSolutions.forEach(({ name, quantity }) => {
//       const solution = solutions.find(sol => sol.name === name);
//       if (solution.type === "acid") {
//         acidMoles += solution.molarity * quantity;
//       } else if (solution.type === "base") {
//         baseMoles += solution.molarity * quantity;
//       }
//     });

//     let finalPH;
//     if (acidMoles > baseMoles) {
//       const excessH = (acidMoles - baseMoles) / totalVolume;
//       finalPH = -Math.log10(excessH);
//     } else if (baseMoles > acidMoles) {
//       const excessOH = (baseMoles - acidMoles) / totalVolume;
//       const pOH = -Math.log10(excessOH);
//       finalPH = 14 - pOH;
//     } else {
//       finalPH = 7; // Neutral after neutralization
//     }

//     setMixedPH(Math.min(Math.max(finalPH, 0), 14));
//   }, [selectedSolutions]);

//   // pH Scale Visualization
//   useEffect(() => {
//     const svg = d3.select(svgRef.current);
//     svg.selectAll("*").remove();

//     if (mixedPH !== null) {
//       svg.append("rect")
//         .attr("x", 20)
//         .attr("y", 50)
//         .attr("width", 260)
//         .attr("height", 40)
//         .attr("fill", pHColors[Math.min(Math.max(Math.round(mixedPH), 0), 13)]);

//       svg.append("text")
//         .attr("x", 150)
//         .attr("y", 80)
//         .attr("text-anchor", "middle")
//         .attr("font-size", "16px")
//         .attr("fill", "#ffffff")
//         .attr("font-weight", "bold")
//         .text(`pH: ${mixedPH.toFixed(2)}`);
//     }
//   }, [mixedPH]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold mb-6 text-blue-700 text-center">
//         Interactive pH Scale Simulator
//       </h1>

//       {/* Solution List */}
//       <div className="flex flex-wrap justify-center gap-4">
//         {solutions.map((sol, index) => (
//           <DraggableSolution key={index} solution={sol} quantity={quantities[sol.name] || 1} setQuantity={updateQuantity} />
//         ))}
//       </div>

//       {/* Beaker */}
//       <div className="flex gap-8 mt-6">
//         <Beaker onDrop={mixSolutions} mixedPH={mixedPH} solutionsMixed={selectedSolutions} />
//       </div>

//       {/* pH Scale Visualization */}
//       <div className="mt-6">
//         <svg ref={svgRef} width="300" height="100"></svg>
//       </div>

//       <button onClick={() => setSelectedSolutions([])} className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition mt-4">
//         Reset
//       </button>
//     </div>
//   );
// };

// export default PHScaleSimulator;






import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

// pH Color Scale
const pHColors = [
  "#ff0000", "#ff4500", "#ff8c00", "#ffd700", "#9acd32",
  "#32cd32", "#008000", "#008b8b", "#1e90ff", "#0000ff",
  "#4b0082", "#8a2be2", "#9400d3", "#9932cc",
];

// Solutions Data
const solutions = [
  { name: "Lemon Juice", type: "acid", pH: 2, molarity: 0.01 },
  { name: "Vinegar", type: "acid", pH: 3, molarity: 0.005 },
  { name: "Pure Water", type: "neutral", pH: 7, molarity: 1e-7 },
  { name: "Baking Soda", type: "base", pH: 8, molarity: 0.001 },
  { name: "Soap Water", type: "base", pH: 10, molarity: 0.0001 },
  { name: "Bleach", type: "base", pH: 13, molarity: 0.01 },
];

// pH Scale Simulator Component
const help_PHSensor = () => {
  const [selectedSolutions, setSelectedSolutions] = useState([]);
  const [inputQuantities, setInputQuantities] = useState({});
  const [mixedPH, setMixedPH] = useState(null);
  const svgRef = useRef(null);

  // Update quantity input field
  const handleQuantityChange = (name, quantity) => {
    setInputQuantities((prev) => ({ ...prev, [name]: parseFloat(quantity) || 0 }));
  };

  // Add solution to the beaker
  const addSolution = (solution) => {
    const quantity = inputQuantities[solution.name] || 0;
    if (quantity <= 0) return; // Prevent adding 0 mL

    setSelectedSolutions((prev) => [...prev, { ...solution, quantity }]);
  };

  // Compute final pH dynamically based on acid/base mixing
  useEffect(() => {
    if (selectedSolutions.length === 0) {
      setMixedPH(null);
      return;
    }

    let totalVolume = selectedSolutions.reduce((sum, sol) => sum + sol.quantity, 0);
    let acidMoles = 0, baseMoles = 0;

    selectedSolutions.forEach(({ name, quantity }) => {
      const solution = solutions.find(sol => sol.name === name);
      if (solution.type === "acid") {
        acidMoles += solution.molarity * quantity;
      } else if (solution.type === "base") {
        baseMoles += solution.molarity * quantity;
      }
    });

    let finalPH;
    if (acidMoles > baseMoles) {
      const excessH = (acidMoles - baseMoles) / totalVolume;
      finalPH = -Math.log10(excessH);
    } else if (baseMoles > acidMoles) {
      const excessOH = (baseMoles - acidMoles) / totalVolume;
      const pOH = -Math.log10(excessOH);
      finalPH = 14 - pOH;
    } else {
      finalPH = 7; // Neutral after neutralization
    }

    setMixedPH(Math.min(Math.max(finalPH, 0), 14));
  }, [selectedSolutions]);

  // pH Scale Visualization
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    if (mixedPH !== null) {
      svg.append("rect")
        .attr("x", 20)
        .attr("y", 50)
        .attr("width", 260)
        .attr("height", 40)
        .attr("fill", pHColors[Math.min(Math.max(Math.round(mixedPH), 0), 13)]);

      svg.append("text")
        .attr("x", 150)
        .attr("y", 80)
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")
        .attr("fill", "#ffffff")
        .attr("font-weight", "bold")
        .text(`pH: ${mixedPH.toFixed(2)}`);
    }
  }, [mixedPH]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-700 text-center">
        Interactive pH Scale Simulator
      </h1>

      {/* Solution List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {solutions.map((sol, index) => (
          <div key={index} className="p-4 border rounded-md bg-white shadow-md text-center">
            <p className="font-bold">{sol.name}</p>
            <input
              type="number"
              min="1"
              value={inputQuantities[sol.name] || ""}
              onChange={(e) => handleQuantityChange(sol.name, e.target.value)}
              className="border rounded p-1 w-20 mt-2 text-center"
              placeholder="mL"
            />
            <p className="text-sm text-gray-600">mL to add</p>
            <button
              onClick={() => addSolution(sol)}
              className="bg-green-500 text-white px-4 py-1 mt-2 rounded hover:bg-green-600 transition"
            >
              Add
            </button>
          </div>
        ))}
      </div>

      {/* Beaker */}
      <div className="relative w-48 h-72 border-4 rounded-lg mt-6 flex flex-col justify-end items-center overflow-hidden"
        style={{ backgroundColor: mixedPH ? pHColors[Math.min(Math.max(Math.round(mixedPH), 0), 13)] : "#ccc" }}>
        <p className="absolute top-2 text-white font-bold">Beaker</p>
        <div className="absolute bottom-2 text-white text-center font-semibold">
          {selectedSolutions.map((sol, index) => (
            <p key={index}>{sol.name}: {sol.quantity}mL</p>
          ))}
        </div>
      </div>

      {/* pH Scale Visualization */}
      <div className="mt-6">
        <svg ref={svgRef} width="300" height="100"></svg>
      </div>

      {/* Reset Button */}
      <button onClick={() => setSelectedSolutions([])}
        className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition mt-4">
        Reset
      </button>
    </div>
  );
};

export default help_PHSensor;
