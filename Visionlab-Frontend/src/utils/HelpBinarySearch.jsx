import React, { useState } from "react";
import { motion } from "framer-motion";

const setSortedArray = (input) => {
  return input
    .split(",")
    .map((num) => parseInt(num.trim(), 10))
    .filter((num) => !isNaN(num))
    .sort((a, b) => a - b);
};

const binarySearch = async (
  array,
  target,
  setMid,
  setLow,
  setHigh,
  setFoundIndex,
  setSearchStep,
  setIsSearching
) => {
  if (!array.length || target === "") return;
  setIsSearching(true);
  setFoundIndex(null);
  setSearchStep("");

  let left = 0;
  let right = array.length - 1;
  let targetNum = parseInt(target);

  while (left <= right) {
    let middle = Math.floor((left + right) / 2);
    setMid(middle);
    setLow(left);
    setHigh(right);
    setSearchStep(`Checking middle index ${middle}, value: ${array[middle]}`);

    await new Promise((resolve) => setTimeout(resolve, 1600)); // Slower animation delay

    if (array[middle] === targetNum) {
      setFoundIndex(middle);
      setSearchStep(`✅ Element found at index ${middle}`);
      setIsSearching(false);
      return;
    } else if (array[middle] < targetNum) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }

  setSearchStep("❌ Element not found in the array");
  setFoundIndex(-1);
  setIsSearching(false);
};

const HelpBinarySearch = () => {
  const [arrayInput, setArrayInput] = useState("");
  const [array, setArray] = useState([]);
  const [target, setTarget] = useState("");
  const [low, setLow] = useState(null);
  const [high, setHigh] = useState(null);
  const [mid, setMid] = useState(null);
  const [foundIndex, setFoundIndex] = useState(null);
  const [searchStep, setSearchStep] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSetArray = () => {
    const sortedArray = setSortedArray(arrayInput);
    setArray(sortedArray);
    setLow(0);
    setHigh(sortedArray.length - 1);
    setMid(null);
    setFoundIndex(null);
    setSearchStep("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-700 text-center">
        Binary Search Animation
      </h1>

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
          Set Array (Sorted)
        </button>
      </div>

      <div className="mb-4 flex flex-col items-center">
        <input
          type="number"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="Enter number to search"
          className="border p-2 rounded w-64 text-center"
        />
        <button
          onClick={() =>
            binarySearch(array, target, setMid, setLow, setHigh, setFoundIndex, setSearchStep, setIsSearching)
          }
          disabled={isSearching}
          className={`px-4 py-2 mt-2 rounded ${
            isSearching ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          } text-white transition`}
        >
          {isSearching ? "Searching..." : "Search"}
        </button>
      </div>

      <div className="border-4 border-black flex mt-6 overflow-hidden">
        {array.map((num, index) => (
          <motion.div
            key={index}
            animate={{
              backgroundColor:
                index === mid
                  ? foundIndex === index
                    ? "#4CAF50"
                    : "#FF5733"
                  : index >= low && index <= high
                  ? "#FFD700"
                  : "white",
              scale: 1,
            }}
            transition={{ duration: 1.2 }} // Slower animation
            className="w-14 h-14 flex items-center justify-center text-lg font-bold border-r-2 border-black"
          >
            {num}
          </motion.div>
        ))}
      </div>

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

      <button
        onClick={() => {
          setArray([]);
          setArrayInput("");
          setTarget("");
          setFoundIndex(null);
          setMid(null);
          setLow(null);
          setHigh(null);
          setSearchStep("");
        }}
        className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition mt-4"
      >
        Reset
      </button>
    </div>
  );
};

export default HelpBinarySearch;