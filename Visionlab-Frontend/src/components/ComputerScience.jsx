import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ComputerScience() {
  const navigate = useNavigate();

  const experiments = [
    {
      title: "linearsearch",
      category: "Algorithms",
      theory:
        "Step through an array to find an element and visualize the searching process.",
      image:
        "https://i.pinimg.com/originals/f5/27/0a/f5270acbc4b98112fcd520d2eea023de.gif",
    },
    {
      title: "bubblesort",
      category: "Data Structures & Algorithms",
      theory:
        "Understand sorting techniques such as Bubble Sort, Selection Sort, and Quick Sort.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/c/c8/Bubble-sort-example-300px.gif",
    },
    {
      title: "binarysearch",
      category: "Algorithms",
      theory:
        "See how binary search efficiently finds elements in a sorted array.",
      image:
        "https://assets-global.website-files.com/639bfa046fb02601716f7a57/639fbaf3bf9aaf5d9007e924_629c05d44bf2b531c3ae8c0d_binarySearchAlgorithmDroppingRight.gif",
    },
  ];

  const formatTitleForURL = (title) =>
    title.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/home")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
          aria-label="Back to Home"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        {/* Computer Science Page Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-3xl font-bold mb-4">Computer Science Virtual Laboratory</h1>
          <p className="text-gray-600 mb-6">
            Welcome to the Computer Science Virtual Lab! Explore key algorithms and data structures through interactive experiments.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <h3 className="font-bold text-xl mb-2">Interactive Algorithms</h3>
              <p className="text-gray-600">Visualize and understand key algorithms.</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <h3 className="font-bold text-xl mb-2">Step-by-Step Execution</h3>
              <p className="text-gray-600">See how each step of an algorithm works.</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg text-center">
              <h3 className="font-bold text-xl mb-2">Real-Time Demonstrations</h3>
              <p className="text-gray-600">Learn through interactive simulations.</p>
            </div>
          </div>
        </div>

        {/* Experiment List */}
        <div className="space-y-8">
          {experiments.map((experiment, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] hover:-translate-y-2 transition-all duration-300 ease-in-out overflow-hidden"
            >
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img
                    src={experiment.image}
                    alt={experiment.title}
                    className="w-full h-56 object-cover rounded-lg border-4 border-gray-500 shadow-lg"
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  {/* Experiment Category */}
                  <div className="mb-4">
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded">
                      {experiment.category}
                    </span>
                  </div>

                  {/* Experiment Title & Theory */}
                  <h2 className="text-2xl font-bold mb-4">{experiment.title}</h2>
                  <p className="text-gray-600 mb-4">{experiment.theory}</p>

                  {/* Start Experiment Button */}
                  <button
                    onClick={() => navigate(`/computerscience/${formatTitleForURL(experiment.title)}`)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Start Experiment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ComputerScience;