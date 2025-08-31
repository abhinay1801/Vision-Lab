import React, { useState } from "react";
import { motion } from "framer-motion";

// Linear Search with Animated Step Display
const help_LinearSearch = () => {
  const [arrayInput, setArrayInput] = useState("");
  const [array, setArray] = useState([]);
  const [target, setTarget] = useState("");
  const [currentIndex, setCurrentIndex] = useState(null);
  const [foundIndex, setFoundIndex] = useState(null);
  const [searchStep, setSearchStep] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Set the user-input array
  const handleSetArray = () => {
    const parsedArray = arrayInput
      .split(",")
      .map((num) => parseInt(num.trim(), 10))
      .filter((num) => !isNaN(num));
    setArray(parsedArray);
    setFoundIndex(null);
    setCurrentIndex(null);
    setSearchStep("");
  };

  // Perform Animated Linear Search
  const performSearch = async () => {
    if (!array.length || target === "") return;
    setIsSearching(true);
    setFoundIndex(null);
    setCurrentIndex(null);
    setSearchStep("");

    for (let i = 0; i < array.length; i++) {
      setCurrentIndex(i);
      setSearchStep(`Checking index ${i}, value: ${array[i]}`);

      await new Promise((resolve) => setTimeout(resolve, 700)); // Animation delay

      if (array[i] === parseInt(target)) {
        setFoundIndex(i);
        setSearchStep(`✅ Element found at index ${i}`);
        setIsSearching(false);
        return;
      }
    }

    setSearchStep("❌ Element not found in the array");
    setFoundIndex(-1);
    setIsSearching(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-700 text-center">
        Linear Search Animation
      </h1>

      {/* Input for Array */}
      <div className="mb-4 flex flex-col items-center">
        <input
          type="text"
          value={arrayInput}
          onChange={(e) => setArrayInput(e.target.value)}
          placeholder="Enter numbers separated by commas"
          className="border p-2 rounded w-64 text-center"
        />
        <button
          onClick={handleSetArray}
          className="bg-green-500 text-white px-4 py-2 mt-2 rounded hover:bg-green-600 transition"
        >
          Set Array
        </button>
      </div>

      {/* Input for Target */}
      <div className="mb-4 flex flex-col items-center">
        <input
          type="number"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="Enter number to search"
          className="border p-2 rounded w-64 text-center"
        />
        <button
          onClick={performSearch}
          disabled={isSearching}
          className={`px-4 py-2 mt-2 rounded ${
            isSearching ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          } text-white transition`}
        >
          {isSearching ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Animated Array Display */}
      {/* Array Display as a Single Rectangle */}
      <div className="border-4 border-black flex mt-6">
        {array.map((num, index) => (
          <motion.div
            key={index}
            animate={{
              backgroundColor:
                currentIndex === index
                  ? foundIndex === index
                    ? "#4CAF50" // Green if found
                    : "#FF5733" // Red if checking
                  : "white",
            }}
            transition={{ duration: 0.4 }}
            className="w-14 h-14 flex items-center justify-center text-lg font-bold border-r-2 border-black"
          >
            {num}
          </motion.div>
        ))}
      </div>

      {/* Real-Time Search Step */}
      {searchStep && (
        <p
          className={`mt-6 text-lg font-semibold ${
            foundIndex === -1
              ? "text-red-600"
              : foundIndex !== null
              ? "text-green-600"
              : "text-blue-600"
          }`}
        >
          {searchStep}
        </p>
      )}

      {/* Reset Button */}
      <button
        onClick={() => {
          setArray([]);
          setArrayInput("");
          setTarget("");
          setFoundIndex(null);
          setCurrentIndex(null);
          setSearchStep("");
        }}
        className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition mt-4"
      >
        Reset
      </button>
    </div>
  );
};

export default help_LinearSearch;