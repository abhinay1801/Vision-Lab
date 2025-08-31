import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Scatter,
  Legend,
  ResponsiveContainer,
} from "recharts";

const help_QuadraticGrapher = () => {
  // State for equation parameters
  const [a, setA] = useState("1");
  const [b, setB] = useState("0");
  const [c, setC] = useState("0");
  const [domain, setDomain] = useState("10");
  const [showDerivative, setShowDerivative] = useState(false);
  const [showIntegral, setShowIntegral] = useState(false);
  const [animation, setAnimation] = useState(true);

  // Helper function to parse input values
  const parseInput = (value) => {
    const num = parseFloat(value);
    return isNaN(num) ? 0 : num;
  };

  // Generate data points for the quadratic function
  const generateGraphData = () => {
    const data = [];
    const numA = parseInput(a);
    const numB = parseInput(b);
    const numC = parseInput(c);
    const numDomain = parseInput(domain);

    for (let x = -numDomain; x <= numDomain; x += 0.25) {
      const y = numA * x * x + numB * x + numC;
      const derivative = 2 * numA * x + numB;
      const integral = (numA * x * x * x) / 3 + (numB * x * x) / 2 + numC * x;
      data.push({
        x,
        y,
        derivative: showDerivative ? derivative : null,
        integral: showIntegral ? integral : null,
      });
    }
    return data;
  };

  // Calculate important points
  const calculatePoints = () => {
    const numA = parseInput(a);
    const numB = parseInput(b);
    const numC = parseInput(c);

    // Vertex calculations
    const vertexX = -numB / (2 * numA);
    const vertexY = numA * vertexX * vertexX + numB * vertexX + numC;

    // Find x-intercepts (roots)
    const discriminant = numB * numB - 4 * numA * numC;
    let roots = [];
    if (discriminant > 0) {
      const x1 = (-numB + Math.sqrt(discriminant)) / (2 * numA);
      const x2 = (-numB - Math.sqrt(discriminant)) / (2 * numA);
      roots = [
        { x: x1, y: 0, name: `Root 1 (${x1.toFixed(2)})` },
        { x: x2, y: 0, name: `Root 2 (${x2.toFixed(2)})` },
      ];
    } else if (discriminant === 0) {
      const x = -numB / (2 * numA);
      roots = [{ x, y: 0, name: `Double root (${x.toFixed(2)})` }];
    }

    // Y-intercept
    const yIntercept = {
      x: 0,
      y: numC,
      name: `Y-intercept (${numC.toFixed(2)})`,
    };

    // Axis of symmetry
    const axisOfSymmetry = vertexX;

    // Critical points (for derivative)
    const criticalPoints = [
      {
        x: vertexX,
        y: vertexY,
        name: `Vertex (${vertexX.toFixed(2)}, ${vertexY.toFixed(2)})`,
      },
    ];

    return {
      vertex: {
        x: vertexX,
        y: vertexY,
        name: `Vertex (${vertexX.toFixed(2)}, ${vertexY.toFixed(2)})`,
      },
      roots,
      yIntercept,
      axisOfSymmetry,
      criticalPoints,
    };
  };

  const graphData = generateGraphData();
  const points = calculatePoints();

  // Dynamic chart dimensions based on window size
  const [chartDimensions, setChartDimensions] = useState({
    width: 600,
    height: 400,
  });

  useEffect(() => {
    const handleResize = () => {
      setChartDimensions({
        width: Math.min(window.innerWidth - 40, 800),
        height: Math.min(window.innerHeight * 0.6, 500),
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="p-4 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Quadratic Function Analyzer
      </h1>

      {/* Controls Section */}
      <div className="bg-white p-4 rounded shadow-lg mb-6 w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">Controls</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Coefficient Inputs */}
          <div className="space-y-4">
            <h3 className="font-bold">Function Parameters</h3>
            <div className="flex flex-col">
              <label className="text-sm">a (Quadratic coefficient):</label>
              <input
                type="text"
                value={a}
                onChange={(e) => setA(e.target.value)}
                className="border p-2 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm">b (Linear coefficient):</label>
              <input
                type="text"
                value={b}
                onChange={(e) => setB(e.target.value)}
                className="border p-2 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm">c (Constant term):</label>
              <input
                type="text"
                value={c}
                onChange={(e) => setC(e.target.value)}
                className="border p-2 rounded"
              />
            </div>
          </div>

          {/* Display Options */}
          <div className="space-y-4">
            <h3 className="font-bold">Display Options</h3>
            <div className="flex flex-col">
              <label className="text-sm">Domain Range:</label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="border p-2 rounded"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="showDerivative"
                checked={showDerivative}
                onChange={() => setShowDerivative(!showDerivative)}
                className="mr-2"
              />
              <label htmlFor="showDerivative">Show Derivative</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="showIntegral"
                checked={showIntegral}
                onChange={() => setShowIntegral(!showIntegral)}
                className="mr-2"
              />
              <label htmlFor="showIntegral">Show Integral</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="animation"
                checked={animation}
                onChange={() => setAnimation(!animation)}
                className="mr-2"
              />
              <label htmlFor="animation">Enable Animation</label>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="space-y-4">
            <h3 className="font-bold">Quick Presets</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setA("1");
                  setB("0");
                  setC("0");
                }}
                className="bg-blue-100 p-2 rounded hover:bg-blue-200"
              >
                Basic (x²)
              </button>
              <button
                onClick={() => {
                  setA("1");
                  setB("-2");
                  setC("1");
                }}
                className="bg-blue-100 p-2 rounded hover:bg-blue-200"
              >
                Perfect Square
              </button>
              <button
                onClick={() => {
                  setA("-1");
                  setB("0");
                  setC("4");
                }}
                className="bg-blue-100 p-2 rounded hover:bg-blue-200"
              >
                Downward (4 - x²)
              </button>
              <button
                onClick={() => {
                  setA("0.5");
                  setB("3");
                  setC("-2");
                }}
                className="bg-blue-100 p-2 rounded hover:bg-blue-200"
              >
                Random Example
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Graph Container */}
      <div className="bg-white p-4 rounded shadow-lg mb-6 w-full max-w-4xl">
        <div style={{ height: chartDimensions.height }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={graphData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="x"
                label={{
                  value: "x-axis",
                  position: "insideBottomRight",
                  offset: -5,
                }}
              />
              <YAxis
                label={{ value: "y-axis", angle: -90, position: "insideLeft" }}
              />
              <Tooltip
                formatter={(value, name) => {
                  if (name === "y") return [value, "Function value"];
                  if (name === "derivative") return [value, "Derivative"];
                  if (name === "integral") return [value, "Integral"];
                  return [value, name];
                }}
                labelFormatter={(label) => `x = ${label}`}
              />
              <Legend />

              {/* Main Quadratic Line */}
              <Line
                type="monotone"
                dataKey="y"
                name={`f(x) = ${a}x² + ${b}x + ${c}`}
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 8 }}
                isAnimationActive={animation}
              />

              {/* Derivative Line */}
              {showDerivative && (
                <Line
                  type="monotone"
                  dataKey="derivative"
                  name="Derivative (f'(x))"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={animation}
                />
              )}

              {/* Integral Line */}
              {showIntegral && (
                <Line
                  type="monotone"
                  dataKey="integral"
                  name="Integral (∫f(x)dx)"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={animation}
                />
              )}

              {/* Axis of Symmetry */}
              <ReferenceLine
                x={points.axisOfSymmetry}
                stroke="red"
                strokeDasharray="3 3"
                label={{
                  position: "insideTopRight",
                  value: "Axis of Symmetry",
                  fill: "red",
                }}
              />

              {/* X-axis and Y-axis */}
              <ReferenceLine y={0} stroke="black" />
              <ReferenceLine x={0} stroke="black" />

              {/* Vertex Point */}
              <Scatter
                data={[points.vertex]}
                fill="#8b5cf6"
                shape="star"
                name={points.vertex.name}
              />

              {/* Root Points */}
              <Scatter
                data={points.roots}
                fill="#22c55e"
                shape="circle"
                name={points.roots.length > 0 ? points.roots[0].name : ""}
              />

              {/* Y-intercept Point */}
              <Scatter
                data={[points.yIntercept]}
                fill="#f59e0b"
                shape="diamond"
                name={points.yIntercept.name}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Analysis Section */}
      <div className="bg-white p-4 rounded shadow-lg w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">Function Analysis</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div>
            <h3 className="font-bold text-lg mb-2">Function</h3>
            <p className="text-xl mb-4">
              f(x) = {a !== "0" && `${a}x²`}{" "}
              {b > 0 ? `+ ${b}x` : b < 0 ? `- ${Math.abs(parseFloat(b))}x` : ""}{" "}
              {c > 0
                ? `+ ${c}`
                : c < 0
                ? `- ${Math.abs(parseFloat(c))}`
                : a === "0" && b === "0"
                ? c
                : ""}
            </p>

            <h3 className="font-bold text-lg mb-2">Key Features</h3>
            <ul className="space-y-2">
              <li>
                <strong>Vertex:</strong> ({points.vertex.x.toFixed(2)},{" "}
                {points.vertex.y.toFixed(2)})
              </li>
              <li>
                <strong>Axis of Symmetry:</strong> x ={" "}
                {points.axisOfSymmetry.toFixed(2)}
              </li>
              <li>
                <strong>Y-intercept:</strong> (0, {parseInput(c).toFixed(2)})
              </li>
              {points.roots.length > 0 ? (
                points.roots.map((root, index) => (
                  <li key={index}>
                    <strong>Root {index + 1}:</strong> ({root.x.toFixed(2)}, 0)
                  </li>
                ))
              ) : (
                <li>
                  <strong>Roots:</strong> No real roots (discriminant is
                  negative)
                </li>
              )}
              <li>
                <strong>Direction:</strong>{" "}
                {parseInput(a) > 0 ? "Opens upward" : "Opens downward"}
              </li>
            </ul>
          </div>

          {/* Advanced Information */}
          <div>
            <h3 className="font-bold text-lg mb-2">Calculus Properties</h3>
            <ul className="space-y-2">
              <li>
                <strong>Derivative:</strong> f'(x) = {2 * parseInput(a)}x{" "}
                {parseInput(b) >= 0 ? "+" : "-"} {Math.abs(parseInput(b))}
              </li>
              <li>
                <strong>Critical Point:</strong> x ={" "}
                {points.vertex.x.toFixed(2)}
                <span className="text-sm ml-2">
                  ({parseInput(a) > 0 ? "Minimum" : "Maximum"} point)
                </span>
              </li>
              <li>
                <strong>Integral:</strong> ∫f(x)dx =
                {parseInput(a) !== 0 && `(${a}/3)x³`}
                {parseInput(b) !== 0 &&
                  ` ${parseInput(b) > 0 ? "+" : "-"} (${Math.abs(
                    parseInput(b)
                  )}/2)x²`}
                {parseInput(c) !== 0 &&
                  ` ${parseInput(c) > 0 ? "+" : "-"} ${Math.abs(
                    parseInput(c)
                  )}x`}{" "}
                + C
              </li>
              <li>
                <strong>Discriminant:</strong> D ={" "}
                {parseInput(b) * parseInput(b) -
                  4 * parseInput(a) * parseInput(c)}
                <span className="text-sm ml-2">
                  (
                  {parseInput(b) * parseInput(b) -
                    4 * parseInput(a) * parseInput(c) >
                  0
                    ? "Two real roots"
                    : parseInput(b) * parseInput(b) -
                        4 * parseInput(a) * parseInput(c) ===
                      0
                    ? "One real root"
                    : "No real roots"}
                  )
                </span>
              </li>
            </ul>

            <h3 className="font-bold text-lg mt-4 mb-2">Graph Properties</h3>
            <ul className="space-y-2">
              <li>
                <strong>Domain:</strong> All real numbers
              </li>
              <li>
                <strong>Range:</strong>
                {parseInput(a) > 0
                  ? `[${points.vertex.y.toFixed(2)}, ∞)`
                  : `(-∞, ${points.vertex.y.toFixed(2)}]`}
              </li>
              <li>
                <strong>End Behavior:</strong> As x → ±∞, f(x) →{" "}
                {parseInput(a) > 0 ? "+∞" : "-∞"}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default help_QuadraticGrapher;
