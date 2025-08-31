import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import ChatInterface from "./ChatAi";
import HelpIronCopperSulphateReaction from "./HelpIronCopperSulphateReaction "

function IronCopperSulfateSimulator() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("theory");
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");
  const [answers, setAnswers] = useState(Array(5).fill(null));
  const [score, setScore] = useState(null);

  const experiment = {
    title: "Iron-Copper Sulfate Displacement Reaction",
    theory: (
      <>
        <h2 className="text-xl font-bold mt-4">Aim</h2>
        <p>
          To investigate the displacement reaction between iron and copper sulfate solution, demonstrating the principles of metal reactivity and single displacement reactions.
        </p>

        <h2 className="text-xl font-bold mt-4">Theoretical Background</h2>
        <p>
          A displacement reaction occurs when a more reactive metal replaces a less reactive metal in a chemical compound. In this experiment, iron (Fe) will displace copper (Cu) from copper sulfate (CuSO₄) solution, showcasing the fundamental principles of electrochemical series.
        </p>

        <h2 className="text-xl font-bold mt-4">Chemical Principles</h2>
        <ul className="list-disc pl-5">
          <li>Reactivity Series: Metals are ranked based on their tendency to lose electrons</li>
          <li>Oxidation-Reduction: Iron is oxidized while copper is reduced</li>
          <li>Spontaneous Reaction: Driven by the difference in metal reactivity</li>
        </ul>

        <h2 className="text-xl font-bold mt-4">Reaction Equation</h2>
        <p className="text-center font-mono bg-gray-100 p-2 rounded-md">
          Fe (s) + CuSO₄ (aq) → FeSO₄ (aq) + Cu (s)
        </p>

        <h2 className="text-xl font-bold mt-4">Key Observations</h2>
        <ul className="list-disc pl-5">
          <li>Color change of the solution from blue to pale green</li>
          <li>Formation of solid copper metal</li>
          <li>Potential temperature change during the reaction</li>
        </ul>

        <h2 className="text-xl font-bold mt-4">Significance</h2>
        <p>
          This experiment demonstrates:
          - Metal reactivity principles
          - Single displacement reaction mechanism
          - Practical applications in metallurgy and chemistry
        </p>
      </>
    ),
    procedure: [
      "Wear appropriate personal protective equipment (safety goggles, lab coat, gloves)",
      "Clean and dry all glassware thoroughly to prevent contamination",
      "Prepare a standard copper sulfate solution using distilled water",
      "Weigh a precise amount of iron filings using an analytical balance",
      "Measure a specific volume of copper sulfate solution into a clean test tube",
      "Carefully add the weighed iron filings to the copper sulfate solution",
      "Observe and record the immediate reaction characteristics",
      "Monitor the reaction progress, noting color changes and copper precipitation",
      "Allow sufficient time for the reaction to complete (typically 10-15 minutes)",
      "Filter the reaction mixture to separate solid copper from the solution",
      "Wash the copper precipitate with distilled water",
      "Dry the copper precipitate and weigh it accurately",
      "Calculate the percentage yield of copper",
      "Clean up the workspace and dispose of chemicals properly"
    ],
    queries: "/assets/metal-displacement-reaction.gif",
    resources: [
      {
        title: "Metal Displacement Reactions - Chemistry Guide",
        link: "https://www.chemistryworld.com/displacement-reactions",
      },
      {
        title: "Electrochemical Series - Scientific Reference",
        link: "https://www.rsc.org/periodic-table-trends",
      }
    ],
    feedback: "Share your experimental observations and insights about this fascinating chemical reaction!",
    quiz: [
      {
        question: "What color change occurs in the copper sulfate solution?",
        options: [
          "Blue to red",
          "Blue to pale green",
          "Green to blue",
          "No color change"
        ],
        answer: "Blue to pale green",
      },
      {
        question: "Which metal is more reactive in this displacement reaction?",
        options: ["Copper", "Iron", "Zinc", "Silver"],
        answer: "Iron",
      },
      {
        question: "What is the primary solid product formed in the reaction?",
        options: ["Iron sulfate", "Copper metal", "Water", "Hydrogen gas"],
        answer: "Copper metal",
      },
      {
        question: "What type of chemical reaction occurs?",
        options: [
          "Synthesis reaction",
          "Decomposition reaction", 
          "Single displacement reaction", 
          "Double displacement reaction"
        ],
        answer: "Single displacement reaction",
      },
      {
        question: "What drives the displacement reaction?",
        options: [
          "Temperature change",
          "Pressure difference",
          "Difference in metal reactivity",
          "Random chemical interaction"
        ],
        answer: "Difference in metal reactivity",
      },
    ],
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
      user_email: "admin@visionlab.edu",
      from_name: "Vision Lab - Iron-Copper Sulfate Experiment",
      message: feedback,
    };

    emailjs
      .send(
        "service_experimental", 
        "template_feedback", 
        templateParams,
        "public_key_placeholder" 
      )
      .then(() => {
        setMessage("Thank you for your feedback!");
        setFeedback("");
      })
      .catch(() => setMessage("Error sending feedback. Please try again."));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/chemistry")}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Chemistry
      </button>
      <h1 className="text-3xl font-bold text-orange-600 mb-4">
        {experiment.title}
      </h1>
      <div className="flex gap-4 mb-6 border-b pb-2">
        {[
          "theory",
          "procedure",
          "queries",
          "simulation",
          "resources",
          "feedback",
          "quiz",
        ].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md ${
              activeTab === tab ? "bg-orange-300 font-bold" : "bg-gray-200"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {activeTab === "theory" && (
          <div className="text-gray-700">{experiment.theory}</div>
        )}
        {activeTab === "procedure" && (
          <div className="procedure-section">
            <h2 className="text-2xl font-semibold text-red-600 mb-4">
              Experimental Procedure
            </h2>

            <div className="mb-6 p-4 bg-red-100 rounded-lg">
              <h3 className="text-lg font-medium text-red-800 mb-2">
                Safety Precautions
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Wear protective safety goggles and lab coat</li>
                <li>Use chemical-resistant gloves</li>
                <li>Work in a well-ventilated area</li>
                <li>Handle chemicals with care and avoid skin contact</li>
              </ul>
            </div>

            <div className="mb-6 p-4 bg-red-100 rounded-lg">
              <h3 className="text-lg font-medium text-red-800 mb-2">
                Required Materials
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  "Copper sulfate solution",
                  "Iron filings",
                  "Test tubes",
                  "Analytical balance",
                  "Filter paper",
                  "Safety goggles",
                  "Lab coat",
                  "Chemical-resistant gloves",
                  "Distilled water"
                ].map((item, index) => (
                  <div key={index} className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-red-50 p-5 rounded-lg">
              <h3 className="text-lg font-medium text-red-800 mb-4">
                Detailed Steps
              </h3>
              <ol className="list-decimal pl-5">
                {experiment.procedure.map((step, index) => (
                  <li key={index} className="mb-3 text-gray-700">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
        {activeTab === "queries" && (
          <div>
            <ChatInterface experiment="iron copper sulfate reaction"/>
          </div>
        )}

        {activeTab==="simulation" && (<div><HelpIronCopperSulphateReaction/></div>)}
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
              Submit Feedback
            </button>
            {message && <p className="mt-4 text-green-600">{message}</p>}
          </div>
        )}
        {activeTab === "quiz" && (
          <div>
            {experiment.quiz.map((q, i) => (
              <div key={i} className="mb-4">
                <p className="font-semibold mb-2">{`${i + 1}. ${q.question}`}</p>
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
              Submit Quiz
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

export default IronCopperSulfateSimulator;