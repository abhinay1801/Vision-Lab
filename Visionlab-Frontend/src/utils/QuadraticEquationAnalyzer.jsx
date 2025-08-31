import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import emailjs from "emailjs-com";
import QuadraticEquationSimulation from "./help_QuadraticGrapher"; // Simulation component
import ChatInterface from "./ChatAi"; // Queries component

function QuadraticEquationAnalyzer() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("theory");
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(null);
  const [answers, setAnswers] = useState(Array(5).fill(null));

  const experiment = {
    title: "Quadratic Equation Analyzer",
    theory: (
      <div>
        <h2 className="text-2xl font-bold mb-4">Theoretical Overview</h2>

        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-2">
            What is a Quadratic Equation?
          </h3>
          <p>
            A quadratic equation is a polynomial equation of the second degree,
            typically represented in the standard form: ax² + bx + c = 0, where
            'a', 'b', and 'c' are constants, and 'a' ≠ 0.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Key Components</h3>
          <ul className="list-disc pl-6">
            <li>
              <strong>a</strong>: Quadratic coefficient (determines parabola's
              shape)
            </li>
            <li>
              <strong>b</strong>: Linear coefficient (affects horizontal shift)
            </li>
            <li>
              <strong>c</strong>: Constant term (vertical shift)
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2">Solution Methods</h3>
          <p>
            Quadratic equations can be solved using multiple methods: -
            Factorization - Quadratic Formula - Completing the Square
          </p>
        </section>
      </div>
    ),
    procedure: [
      "Identify the coefficients a, b, and c in the quadratic equation",
      "Choose an appropriate solving method",
      "Apply the selected method systematically",
      "Verify the solutions by substituting back into the original equation",
      "Interpret the nature of roots (real, complex, repeated)",
      "Analyze the graphical representation of the equation",
    ],
    resources: [
      {
        title: "Khan Academy - Quadratic Equations",
        link: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:quadratic-functions",
      },
      {
        title: "Wolfram MathWorld - Quadratic Equation",
        link: "https://mathworld.wolfram.com/QuadraticEquation.html",
      },
    ],
    quiz: [
      {
        question: "What is the standard form of a quadratic equation?",
        options: [
          "ax + b = 0",
          "ax² + bx + c = 0",
          "x² + y² = r²",
          "f(x) = mx + b",
        ],
        answer: "ax² + bx + c = 0",
      },
      {
        question: "What does the discriminant help determine?",
        options: [
          "Equation color",
          "Number of roots",
          "Equation complexity",
          "Graphical orientation",
        ],
        answer: "Number of roots",
      },
      {
        question: "When a > 0 in f(x) = ax² + bx + c, the parabola:",
        options: [
          "Opens downward",
          "Opens upward",
          "Remains horizontal",
          "Becomes a straight line",
        ],
        answer: "Opens upward",
      },
      {
        question: "The quadratic formula is used to:",
        options: [
          "Draw parabolas",
          "Calculate roots",
          "Measure area",
          "Find circumference",
        ],
        answer: "Calculate roots",
      },
      {
        question: "What is the vertex of a parabola?",
        options: [
          "Lowest point",
          "Highest point",
          "Turning point",
          "X-intercept",
        ],
        answer: "Turning point",
      },
    ],
    feedback:
      "Share your thoughts and suggestions about the Quadratic Equation Analyzer!",
  };

  const handleSelect = (index, option) => {
    const newAnswers = [...answers];
    newAnswers[index] = option;
    setAnswers(newAnswers);
  };

  const handleQuizSubmit = () => {
    let totalScore = 0;
    experiment.quiz.forEach((q, index) => {
      if (answers[index] === q.answer) totalScore += 1;
    });
    setScore(totalScore);
  };

  const sendFeedback = (e) => {
    e.preventDefault();

    if (!feedback.trim()) {
      setMessage("Please enter your feedback before submitting.");
      return;
    }

    const templateParams = {
      user_name: "Administrator",
      user_email: "rajeshgajula.1434@gmail.com",
      from_name: "Vision Lab Experiment - Simple Pendulum",
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

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/math")}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Math
      </button>

      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        {experiment.title}
      </h1>

      <div className="flex gap-4 mb-6 border-b pb-2 overflow-x-auto">
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
              activeTab === tab ? "bg-blue-300 font-bold" : "bg-gray-200"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {activeTab === "theory" && experiment.theory}

        {activeTab === "procedure" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Experimental Procedure
            </h2>
            <ol className="list-decimal pl-6 space-y-2">
              {experiment.procedure.map((step, index) => (
                <li key={index} className="text-gray-700">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        )}

        {activeTab === "queries" && (
          <div>
            <ChatInterface experiment="quadratic equation" />
          </div>
        )}

        {activeTab === "simulation" && <QuadraticEquationSimulation />}

        {activeTab === "video" && (
          <iframe
            width="100%"
            height="600"
            src="https://www.youtube.com/embed/WUvTyaaNkzM"
            title="Quadratic Equation Video"
            className="rounded-md"
            allowFullScreen
          ></iframe>
        )}

        {activeTab === "resources" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Learning Resources</h2>
            <ul className="list-disc pl-6">
              {experiment.resources.map((resource, index) => (
                <li key={index}>
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {resource.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "feedback" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Provide Feedback</h2>
            <p className="mb-4">{experiment.feedback}</p>
            <textarea
              className="w-full border p-3 rounded-md"
              placeholder="Write your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={5}
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
            <h2 className="text-2xl font-semibold mb-4">Test Your Knowledge</h2>
            {experiment.quiz.map((q, i) => (
              <div key={i} className="mb-6">
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
                    <label>{option}</label>
                  </div>
                ))}
              </div>
            ))}
            <button
              onClick={handleQuizSubmit}
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

export default QuadraticEquationAnalyzer;
