import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

const help_InterestCalculator = () => {
  const [principal, setPrincipal] = useState(1000.0);
  const [rate, setRate] = useState(5.0);
  const [time, setTime] = useState(5); // Ensure time is always an integer
  const [compound, setCompound] = useState(1);
  const [interestType, setInterestType] = useState("simple");
  const [data, setData] = useState([]);
  const [finalAmount, setFinalAmount] = useState({ simple: 0, compound: 0 });

  useEffect(() => {
    calculateInterest();
  }, [principal, rate, time, compound, interestType]);

  const calculateInterest = () => {
    let P = parseFloat(principal);
    let R = parseFloat(rate) / 100;
    let T = parseInt(time); // Convert time to integer
    let n = parseInt(compound);
    let resultData = [];
    let simpleTotal = P;
    let compoundTotal = P;

    for (let t = 1; t <= T; t++) {
      // Ensure only whole numbers are used for years
      let SI = P * R * t;
      let CI = P * Math.pow(1 + R / n, n * t) - P;

      simpleTotal = P + SI;
      compoundTotal = P + CI;

      resultData.push({
        year: t, // Keep year as an integer
        simple: parseFloat(SI.toFixed(2)),
        compound: parseFloat(CI.toFixed(2)),
      });
    }

    setData(resultData);
    setFinalAmount({
      simple: simpleTotal.toFixed(2),
      compound: compoundTotal.toFixed(2),
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-lg font-bold text-center mb-4">
        Interest Calculator
      </h2>

      {/* Input Fields */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm">Principal (₹):</label>
          <input
            type="number"
            step="0.01"
            value={principal}
            onChange={(e) => setPrincipal(parseFloat(e.target.value) || 0)}
            className="w-full p-1 border rounded-md text-sm"
          />
        </div>
        <div>
          <label className="text-sm">Rate (% per year):</label>
          <input
            type="number"
            step="0.01"
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
            className="w-full p-1 border rounded-md text-sm"
          />
        </div>
        <div>
          <label className="text-sm">Time (Years):</label>
          <input
            type="number"
            value={time}
            onChange={(e) =>
              setTime(Math.max(1, parseInt(e.target.value) || 1))
            } // Ensure integer & minimum 1
            className="w-full p-1 border rounded-md text-sm"
          />
        </div>
        <div>
          <label className="text-sm">Interest Type:</label>
          <select
            className="w-full p-1 border rounded-md text-sm"
            onChange={(e) => setInterestType(e.target.value)}
          >
            <option value="simple">Simple</option>
            <option value="compound">Compound</option>
          </select>
        </div>
      </div>

      {/* Compound Interest Extra Field */}
      {interestType === "compound" && (
        <div className="mt-2">
          <label className="text-sm">Compounding Frequency:</label>
          <select
            className="w-full p-1 border rounded-md text-sm"
            onChange={(e) => setCompound(e.target.value)}
          >
            <option value="1">Yearly</option>
            <option value="4">Quarterly</option>
            <option value="12">Monthly</option>
          </select>
        </div>
      )}

      {/* Final Amount Display */}
      {data.length > 0 && (
        <div className="mt-4 text-sm text-center">
          <p>
            <strong>Final Amount (Simple Interest):</strong> ₹
            {finalAmount.simple}
          </p>
          {interestType === "compound" && (
            <p>
              <strong>Final Amount (Compound Interest):</strong> ₹
              {finalAmount.compound}
            </p>
          )}
        </div>
      )}

      {/* Smooth Interest Growth Chart */}
      {data.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-center mb-2">
            Interest Growth Over Time
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <XAxis
                dataKey="year"
                tick={{ fontSize: 12 }}
                domain={[1, "auto"]}
                allowDecimals={false}
              />{" "}
              {/* Only whole numbers */}
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Line
                type="monotone"
                dataKey="simple"
                stroke="#8884d8"
                strokeWidth={2}
                name="Simple Interest"
                dot={false}
              />
              {interestType === "compound" && (
                <Line
                  type="monotone"
                  dataKey="compound"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  name="Compound Interest"
                  dot={false}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default help_InterestCalculator;
