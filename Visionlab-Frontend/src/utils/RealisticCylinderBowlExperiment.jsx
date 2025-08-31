import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import ChatInterface from "./ChatAi";
import HelpRealisticCylinderBowlExperiment from "./HelpRealisticCylinderBowlExperiment";

function RealisticCylinderBowlExperiment() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("theory");
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");
  const [answers, setAnswers] = useState(Array(5).fill(null));
  const [score, setScore] = useState(null);

  const experiment = {
    title: "Realistic Cylinder Bowl Volume Measurement",
    theory: (
      <>
        <h2 className="text-xl font-bold mt-4">Aim</h2>
        <p>
          To accurately measure the volume of an irregular cylindrical bowl 
          using precise volumetric techniques and mathematical calculations.
        </p>

        <h2 className="text-xl font-bold mt-4">Theory</h2>
        <p>
          Volume measurement of irregular containers requires precise scientific 
          techniques that combine direct measurement and displacement methods.
        </p>
        <p>
          Key principles include:
          - Accurate dimensional measurements
          - Water displacement technique
          - Mathematical volume calculation
        </p>

        <h2 className="text-xl font-bold mt-4">Mathematical Model</h2>
        <p>Volume Calculation Methods:</p>
        <p className="text-center font-mono bg-gray-100 p-2 rounded-md">
          V = π r² h (Cylindrical Volume) <br />
          V = Displaced Water Volume
        </p>
        <p>
          - r: Radius of base <br />
          - h: Height of cylinder <br />
          - π: Mathematical constant (3.14159)
        </p>

        <h2 className="text-xl font-bold mt-4">Applications</h2>
        <p>
          - Industrial container volume measurement <br />
          - Scientific precise volume calculations <br />
          - Material science research <br />
          - Engineering dimensional analysis
        </p>
      </>
    ),
    procedure: [
      "Gather precise measurement tools: Vernier caliper, graduated cylinder, digital scale, water, and the cylindrical bowl.",
      "Clean and dry the cylindrical bowl thoroughly to ensure accurate measurements.",
      "Measure the internal dimensions of the bowl using a Vernier caliper: diameter, height, and base curvature.",
      "Weigh the empty bowl using a digital scale and record its mass.",
      "Fill the graduated cylinder with a known volume of water, ensuring no air bubbles.",
      "Gradually and carefully submerge the cylindrical bowl into the water, observing the water displacement.",
      "Record the new water level and calculate the volume displaced by the bowl.",
      "Cross-verify volume calculations using different measurement techniques.",
      "Calculate the volume using both geometric and displacement methods.",
      "Compare and analyze the results for precision and accuracy.",
      "Repeat the measurement at least three times to ensure consistency.",
      "Document all measurements, calculations, and observations in a detailed lab report.",
      "Calculate percentage error between different measurement techniques.",
      "Clean and dry all equipment after completing the experiment."
    ],
    queries: "/assets/cylinder-volume-measurement.gif",
    resources: [
      {
        title: "Volume Measurement Techniques",
        link: "https://www.scientificmethod.com"
      },
      {
        title: "Precision Measurement in Science",
        link: "https://www.sciencemethods.org"
      }
    ],
    feedback: "Please share your feedback on this volume measurement experiment!",
    quiz: [
      {
        question: "What is the primary method for measuring irregular container volume?",
        options: [
          "Weight measurement",
          "Water displacement",
          "Laser scanning",
          "Temperature analysis"
        ],
        answer: "Water displacement"
      },
      {
        question: "Which tool provides the most precise linear measurements?",
        options: ["Ruler", "Tape measure", "Vernier caliper", "String"],
        answer: "Vernier caliper"
      },
      {
        question: "What mathematical constant is used in volume calculations?",
        options: ["e", "π (pi)", "φ", "√2"],
        answer: "π (pi)"
      },
      {
        question: "Why is multiple measurement important in scientific experiments?",
        options: [
          "To waste time",
          "To increase precision",
          "To use more equipment",
          "To make graphs"
        ],
        answer: "To increase precision"
      },
      {
        question: "What should be checked to ensure accurate water displacement?",
        options: [
          "Water temperature",
          "Water color",
          "Absence of air bubbles",
          "Water brand"
        ],
        answer: "Absence of air bubbles"
      }
    ]
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
      user_email: "admin@visionlab.com",
      from_name: "Vision Lab Experiment - Cylinder Bowl Volume",
      message: feedback,
    };

    emailjs
      .send(
        "service_0updalp", 
        "template_gga1aol", 
        templateParams,
        "eQ_JCPczgpDZ1uk7d"
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
        onClick={() => navigate("/physics")}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Physics
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
          "video",
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
          <p className="text-gray-700">{experiment.theory}</p>
        )}
        {activeTab === "procedure" && (
          <div className="procedure-section">
            <h2 className="text-2xl font-semibold text-red-600 mb-4">
              Experimental Procedure
            </h2>

            <div className="mb-6 p-4 bg-red-100 rounded-lg">
              <h3 className="text-lg font-medium text-red-800 mb-2">
                Objectives
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Measure volume of an irregular cylindrical container</li>
                <li>Compare multiple measurement techniques</li>
                <li>Calculate precise dimensional characteristics</li>
              </ul>
            </div>

            <div className="mb-6 p-4 bg-red-100 rounded-lg">
              <h3 className="text-lg font-medium text-red-800 mb-2">
                Required Materials
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Vernier Caliper
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Graduated Cylinder
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Digital Scale
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Cylindrical Bowl
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Distilled Water
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Notebook for Recording
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab ==="simulation" && (<div> <HelpRealisticCylinderBowlExperiment /> </div>)}
        {activeTab === "queries" && (
          <div>
            <ChatInterface experiment="cylinder bowl volume"/>
          </div>
        )}
        {activeTab === "video" && (
          <iframe
            width="100%"
            height="600"
            src={"https://www.youtube.com/embed/dQw4w9WgXcQ"}
            title="Experiment Video"
            className="rounded-md"
            allowFullScreen
          ></iframe>
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

export default RealisticCylinderBowlExperiment;