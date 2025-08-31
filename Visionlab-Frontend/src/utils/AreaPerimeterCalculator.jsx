import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import ChatInterface from "./ChatAi";

function AreaPerimeterCalculator() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("theory");
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");
  const [answers, setAnswers] = useState(Array(5).fill(null));
  const [score, setScore] = useState(null);
  const [shape, setShape] = useState("Triangle");
  const [side, setSide] = useState(10);
  const [results, setResults] = useState(null);

  const experiment = {
    title: "Area & Perimeter Calculator",
    theory: (
      <>
        <h2 className="text-xl font-bold mt-4">Aim</h2>
        <p>
          To understand and calculate the area and perimeter of regular polygons
          including triangles, squares, pentagons, and hexagons.
        </p>

        <h2 className="text-xl font-bold mt-4">Theory</h2>
        <p>
          Regular polygons are shapes with all sides and all angles equal. Their
          area and perimeter can be calculated using specific formulas based on
          their side length.
        </p>

        <h2 className="text-xl font-bold mt-4">Mathematical Formulas</h2>

        <h3 className="font-bold mt-2">Equilateral Triangle</h3>
        <p className="text-center font-mono bg-gray-100 p-2 rounded-md">
          Area = (√3/4) × side² <br />
          Perimeter = 3 × side
        </p>

        <h3 className="font-bold mt-2">Square</h3>
        <p className="text-center font-mono bg-gray-100 p-2 rounded-md">
          Area = side² <br />
          Perimeter = 4 × side
        </p>

        <h3 className="font-bold mt-2">Regular Pentagon</h3>
        <p className="text-center font-mono bg-gray-100 p-2 rounded-md">
          Area = (1/4) × √(5(5+2√5)) × side² <br />
          Perimeter = 5 × side
        </p>

        <h3 className="font-bold mt-2">Regular Hexagon</h3>
        <p className="text-center font-mono bg-gray-100 p-2 rounded-md">
          Area = (3√3/2) × side² <br />
          Perimeter = 6 × side
        </p>

        <h2 className="text-xl font-bold mt-4">Key Concepts</h2>
        <p>
          - <strong>Regular Polygon:</strong> All sides and angles are equal{" "}
          <br />- <strong>Side Length:</strong> The length of one edge of the
          shape <br />- <strong>Apothem:</strong> The line from center to
          midpoint of a side <br />- <strong>Perimeter:</strong> Sum of all side
          lengths <br />- <strong>Area:</strong> The space enclosed within the
          shape
        </p>

        <h2 className="text-xl font-bold mt-4">Applications</h2>
        <p>
          - Architecture and design <br />
          - Land area calculations <br />
          - Material estimation <br />
          - Engineering designs <br />- Computer graphics
        </p>
      </>
    ),
    procedure: [
      "Select the shape you want to calculate from the available options.",
      "Measure or input the side length of the shape.",
      "For triangles, ensure all sides are equal (equilateral triangle).",
      "For pentagons and hexagons, ensure the shape is regular (all sides and angles equal).",
      "Apply the appropriate formula based on the selected shape.",
      "Calculate the perimeter by multiplying the side length by the number of sides.",
      "Calculate the area using the specific formula for the selected shape.",
      "Record both the area and perimeter values.",
      "Compare results between different shapes with the same side length.",
      "Analyze how area and perimeter change with different side lengths.",
      "Create a table showing area and perimeter for different side lengths.",
      "Plot a graph comparing area vs. perimeter for different shapes.",
      "Document your findings and observations.",
    ],
    resources: [
      {
        title: "Regular Polygon Formulas - Math is Fun",
        link: "https://www.mathsisfun.com/geometry/regular-polygons.html",
      },
      {
        title: "Area and Perimeter - Khan Academy",
        link: "https://www.khanacademy.org/math/geometry-home/geometry-area-perimeter",
      },
    ],
    feedback: "Please share your feedback on this calculator!",
    quiz: [
      {
        question:
          "What is the perimeter of a regular hexagon with side length 5?",
        options: ["20", "25", "30", "35"],
        answer: "30",
      },
      {
        question: "Which shape has the largest area for the same side length?",
        options: ["Triangle", "Square", "Pentagon", "Hexagon"],
        answer: "Hexagon",
      },
      {
        question:
          "What is the area of an equilateral triangle with side length 4?",
        options: ["4√3", "6√3", "8√3", "10√3"],
        answer: "4√3",
      },
      {
        question: "How many sides does a pentagon have?",
        options: ["3", "4", "5", "6"],
        answer: "5",
      },
      {
        question: "What is the area formula for a square?",
        options: [
          "side × side",
          "½ × base × height",
          "π × radius²",
          "length × width",
        ],
        answer: "side × side",
      },
    ],
  };

  const calculate = () => {
    let area, perimeter, formula;
    const sideNum = parseFloat(side);

    switch (shape) {
      case "Triangle":
        area = (Math.sqrt(3) / 4) * sideNum ** 2;
        perimeter = 3 * sideNum;
        formula = "Area = (√3/4) × side², Perimeter = 3 × side";
        break;
      case "Square":
        area = sideNum ** 2;
        perimeter = 4 * sideNum;
        formula = "Area = side², Perimeter = 4 × side";
        break;
      case "Pentagon":
        area = (1 / 4) * Math.sqrt(5 * (5 + 2 * Math.sqrt(5))) * sideNum ** 2;
        perimeter = 5 * sideNum;
        formula = "Area = (1/4) × √(5(5+2√5)) × side², Perimeter = 5 × side";
        break;
      case "Hexagon":
        area = ((3 * Math.sqrt(3)) / 2) * sideNum ** 2;
        perimeter = 6 * sideNum;
        formula = "Area = (3√3/2) × side², Perimeter = 6 × side";
        break;
      default:
        area = 0;
        perimeter = 0;
        formula = "";
    }

    setResults({
      area,
      perimeter,
      formula,
      side: sideNum,
    });
  };

  // Function to handle quiz answer selection
  const handleSelect = (index, option) => {
    const newAnswers = [...answers];
    newAnswers[index] = option;
    setAnswers(newAnswers);
  };

  // Function to submit quiz and calculate score
  const handleSubmit = () => {
    let totalScore = 0;
    experiment.quiz.forEach((q, index) => {
      if (answers[index] === q.answer) totalScore += 1;
    });
    setScore(totalScore);
  };

  // Function to send feedback with template parameters
  const sendFeedback = (e) => {
    e.preventDefault();

    if (!feedback.trim()) {
      setMessage("Please enter your feedback before submitting.");
      return;
    }

    const templateParams = {
      user_name: "Administrator",
      user_email: "rajeshgajula.1434@gmail.com",
      from_name: "Vision Lab Experiment - Area & Perimeter Calculator",
      message: feedback,
    };

    emailjs
      .send(
        "service_0updalp", // Your EmailJS service ID
        "template_gga1aol", // Your EmailJS template ID
        templateParams,
        "eQ_JCPczgpDZ1uk7d" // Your EmailJS public key
      )
      .then(() => {
        setMessage("Thank you for your feedback!");
        setFeedback("");
      })
      .catch(() => setMessage("Error sending feedback. Please try again."));
  };

  const renderShapeSVG = () => {
    switch (shape) {
      case "Triangle":
        return (
          <svg width="100" height="100" viewBox="0 0 100 100">
            <polygon
              points="50,10 10,90 90,90"
              stroke="black"
              strokeWidth="2"
              fill="lightblue"
            />
          </svg>
        );
      case "Square":
        return (
          <svg width="100" height="100" viewBox="0 0 100 100">
            <rect
              x="20"
              y="20"
              width="60"
              height="60"
              stroke="black"
              strokeWidth="2"
              fill="lightgreen"
            />
          </svg>
        );
      case "Pentagon":
        return (
          <svg width="100" height="100" viewBox="0 0 100 100">
            <polygon
              points="50,10 90,35 75,85 25,85 10,35"
              stroke="black"
              strokeWidth="2"
              fill="lightcoral"
            />
          </svg>
        );
      case "Hexagon":
        return (
          <svg width="100" height="100" viewBox="0 0 100 100">
            <polygon
              points="50,10 90,30 90,70 50,90 10,70 10,30"
              stroke="black"
              strokeWidth="2"
              fill="lightgoldenrodyellow"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/math")}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Mathematics
      </button>
      <h1 className="text-3xl font-bold text-purple-600 mb-4">
        {experiment.title}
      </h1>
      <div className="flex gap-4 mb-6 border-b pb-2">
        {[
          "theory",
          "procedure",
          "simulation",
          "queries",
          "resources",
          "feedback",
          "quiz",
        ].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md ${
              activeTab === tab ? "bg-purple-300 font-bold" : "bg-gray-200"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {activeTab === "theory" && (
          <p className="text-gray-700">{experiment.theory}</p>
        )}
        {activeTab === "procedure" && (
          <div className="procedure-section">
            <h2 className="text-2xl font-semibold text-purple-600 mb-4">
              Experimental Procedure
            </h2>

            <div className="mb-6 p-4 bg-purple-100 rounded-lg">
              <h3 className="text-lg font-medium text-purple-800 mb-2">
                Objectives
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Understand area and perimeter concepts</li>
                <li>Learn formulas for regular polygons</li>
                <li>Compare properties of different shapes</li>
              </ul>
            </div>

            <div className="bg-purple-50 p-5 rounded-lg">
              <h3 className="text-lg font-medium text-purple-800 mb-4">
                Step-by-Step Procedure
              </h3>
              <ol className="list-none pl-0">
                {experiment.procedure.map((step, index) => (
                  <li key={index} className="mb-4 flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center mr-3 mt-1">
                      {index + 1}
                    </div>
                    <div className="bg-white p-3 rounded-md shadow-sm flex-grow">
                      <p className="text-gray-700">{step}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
        {activeTab === "simulation" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4 text-purple-700">
                  Input Parameters
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Shape
                    </label>
                    <select
                      value={shape}
                      onChange={(e) => setShape(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="Triangle">Equilateral Triangle</option>
                      <option value="Square">Square</option>
                      <option value="Pentagon">Regular Pentagon</option>
                      <option value="Hexagon">Regular Hexagon</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Side Length
                    </label>
                    <input
                      type="number"
                      value={side}
                      onChange={(e) => setSide(e.target.value)}
                      className="w-full p-2 border rounded-md"
                      min="0.1"
                      step="0.1"
                    />
                  </div>

                  <button
                    onClick={calculate}
                    className="w-full py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                  >
                    Calculate
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg flex flex-col items-center justify-center">
                <h2 className="text-xl font-bold mb-4 text-purple-700">
                  Shape Visualization
                </h2>
                <div className="mb-4">{renderShapeSVG()}</div>
                <p className="text-gray-700 text-center">Selected: {shape}</p>
              </div>
            </div>

            {results && (
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4 text-purple-700">
                  Results
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-md shadow-sm">
                    <h3 className="font-medium text-gray-700">Area</h3>
                    <p className="text-2xl font-bold text-purple-600">
                      {results.area.toFixed(4)}
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-md shadow-sm">
                    <h3 className="font-medium text-gray-700">Perimeter</h3>
                    <p className="text-2xl font-bold text-purple-600">
                      {results.perimeter.toFixed(4)}
                    </p>
                  </div>

                  <div className="md:col-span-2 bg-white p-4 rounded-md shadow-sm">
                    <h3 className="font-medium text-gray-700">Formula Used</h3>
                    <p className="text-lg text-purple-600 font-mono">
                      {results.formula}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {activeTab === "queries" && (
          <div>
            <ChatInterface experiment="area and perimeter calculator" />
          </div>
        )}
        {activeTab === "resources" && (
          <ul className="list-disc pl-5">
            {experiment.resources.map((res, i) => (
              <li key={i}>
                <a
                  href={res.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {res.title}
                </a>
              </li>
            ))}
          </ul>
        )}
        {activeTab === "feedback" && (
          <div>
            <p className="text-gray-700 mb-4">{experiment.feedback}</p>
            <textarea
              className="w-full border p-3 rounded-md"
              placeholder="Write your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
            <button
              onClick={sendFeedback}
              className="mt-3 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
            {message && <p className="mt-4 text-green-600">{message}</p>}
          </div>
        )}
        {activeTab === "quiz" && (
          <div>
            {experiment.quiz.map((q, i) => (
              <div key={i}>
                <p className="font-semibold mb-2">{`${i + 1}. ${
                  q.question
                }`}</p>
                {q.options.map((option, j) => (
                  <div key={j} className="flex items-center mb-2">
                    <input
                      type="radio"
                      name={`question-${i}`}
                      checked={answers[i] === option}
                      onChange={() => handleSelect(i, option)}
                      className="mr-2"
                    />
                    <label className="cursor-pointer text-gray-700">
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            ))}
            <button
              onClick={handleSubmit}
              className="mt-3 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
            {score !== null && (
              <p className="mt-4 text-lg font-bold text-green-600">
                Your Score: {score} / {experiment.quiz.length}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AreaPerimeterCalculator;
