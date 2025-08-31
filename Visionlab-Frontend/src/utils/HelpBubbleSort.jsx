import React, { useState } from "react";
import { motion } from "framer-motion";

const bubbleSort = async (array, setArray, setSwapping, setSorted, setIsSorting) => {
  setIsSorting(true);
  let arr = [...array];
  let n = arr.length;
  let swapped;

  for (let i = 0; i < n - 1; i++) {
    swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      setSwapping([j, j + 1]); // Highlight elements being swapped
      await new Promise((resolve) => setTimeout(resolve, 500)); // Pause for animation

      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        setArray([...arr]); // Update array to trigger re-render
        swapped = true;
      }

      await new Promise((resolve) => setTimeout(resolve, 500)); // Pause after swap
      setSwapping([]); // Remove highlighting
    }

    if (!swapped) break; // If no swaps were made, array is already sorted
  }

  setSorted(true);
  setIsSorting(false);
};

const HelpBubbleSort = () => {
  const [arrayInput, setArrayInput] = useState("");
  const [array, setArray] = useState([]);
  const [swapping, setSwapping] = useState([]);
  const [sorted, setSorted] = useState(false);
  const [isSorting, setIsSorting] = useState(false);

  const handleSetArray = () => {
    const parsedArray = arrayInput
      .split(",")
      .map((num) => parseInt(num.trim(), 10))
      .filter((num) => !isNaN(num));
    setArray(parsedArray);
    setSorted(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 to-yellow-300 p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-700 text-center">
        Bubble Sort 
      </h1>

      <div className="mb-4 flex flex-col items-center">
        <input
          type="text"
          value={arrayInput}
          onChange={(e) => setArrayInput(e.target.value)}
          placeholder="Enter numbers separated by commas"
          className="border p-2 rounded w-64 text-center shadow-lg"
        />
        <button
          onClick={handleSetArray}
          className="bg-green-500 text-white px-4 py-2 mt-2 rounded hover:bg-green-600 transition shadow-md"
        >
          Set Array
        </button>
      </div>

      <button
        onClick={() => bubbleSort(array, setArray, setSwapping, setSorted, setIsSorting)}
        disabled={isSorting || array.length === 0}
        className={`px-4 py-2 mt-2 rounded shadow-md ${
          isSorting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
        } text-white transition`}
      >
        {isSorting ? "Sorting..." : "Sort"}
      </button>

      <div className="border-4 border-blue-500 flex mt-6 overflow-hidden p-4 bg-white shadow-lg rounded-lg">
        {array.map((num, index) => (
          <motion.div
            key={index}
            animate={{
              x: swapping.includes(index) ? (swapping[0] === index ? 50 : -50) : 0, // Move boxes left/right
              backgroundColor: swapping.includes(index)
                ? "#FF5733" // Swap highlight color
                : sorted
                ? "#4CAF50"
                : "white",
              transition: { duration: 0.5, ease: "easeInOut" },
            }}
            className="w-14 h-14 flex items-center justify-center text-lg font-bold border-2 border-blue-500 m-1 rounded-md shadow-md"
          >
            {num}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HelpBubbleSort;
