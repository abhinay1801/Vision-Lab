import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import InterestCalculatorSimulation from "./help_InterestCalculator";
import ChatInterface from "./ChatAi";

function InterestCalculator() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("theory");
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");
  const [answers, setAnswers] = useState(Array(5).fill(null));
  const [score, setScore] = useState(null);
  const [principal, setPrincipal] = useState(1000);
  const [rate, setRate] = useState(5);
  const [time, setTime] = useState(1);
  const [compoundFrequency, setCompoundFrequency] = useState(1);
  const [results, setResults] = useState(null);

  const experiment = {
    title: "Interest Calculator",
    theory: (
      <>
        <h2 className="text-xl font-bold mt-4">Aim</h2>
        <p>
          To understand the concepts of simple and compound interest and how
          they affect financial calculations over time.
        </p>

        <h2 className="text-xl font-bold mt-4">Theory</h2>
        <p>
          Interest is the cost of borrowing money or the return on invested
          capital. There are two main types of interest calculations:
        </p>
        <p>
          <strong>Simple Interest:</strong> Calculated only on the original
          principal amount throughout the loan or investment period.
        </p>
        <p>
          <strong>Compound Interest:</strong> Calculated on the initial
          principal and also on the accumulated interest of previous periods.
        </p>

        <h2 className="text-xl font-bold mt-4">Mathematical Formulas</h2>
        <p>Simple Interest Formula:</p>
        <p className="text-center font-mono bg-gray-100 p-2 rounded-md">
          I = P × r × t
        </p>
        <p>
          Where: <br />
          - I = Interest <br />
          - P = Principal amount <br />
          - r = Annual interest rate (decimal) <br />- t = Time in years
        </p>

        <p>Compound Interest Formula:</p>
        <p className="text-center font-mono bg-gray-100 p-2 rounded-md">
          A = P × (1 + r/n)<sup>n×t</sup>
        </p>
        <p>
          Where: <br />
          - A = Final amount <br />
          - P = Principal amount <br />
          - r = Annual interest rate (decimal) <br />
          - n = Number of compounding periods per year <br />- t = Time in years
        </p>

        <h2 className="text-xl font-bold mt-4">Key Concepts</h2>
        <p>
          - <strong>Principal (P):</strong> The initial amount of money <br />-{" "}
          <strong>Interest Rate (r):</strong> Percentage charged or earned per
          period <br />- <strong>Time (t):</strong> Duration of the investment
          or loan <br />- <strong>Compounding Frequency (n):</strong> How often
          interest is calculated and added to principal <br />-{" "}
          <strong>Future Value (A):</strong> Total amount after interest
          accumulation
        </p>

        <h2 className="text-xl font-bold mt-4">Applications</h2>
        <p>
          - Calculating loan repayments <br />
          - Planning investments and savings <br />
          - Comparing different financial products <br />
          - Understanding long-term financial growth <br />- Retirement planning
        </p>
      </>
    ),
    procedure: [
      "Understand the difference between simple and compound interest.",
      "Identify the principal amount (P) you want to calculate interest for.",
      "Determine the annual interest rate (r) as a decimal (divide percentage by 100).",
      "Specify the time period (t) in years for the calculation.",
      "For compound interest, determine the compounding frequency (n) per year.",
      "Apply the appropriate formula based on whether you're calculating simple or compound interest.",
      "For compound interest, calculate the periodic interest rate by dividing the annual rate by the number of compounding periods.",
      "Calculate the number of compounding periods by multiplying the time in years by the compounding frequency.",
      "Compute the final amount using the compound interest formula.",
      "Compare results between simple and compound interest for the same parameters.",
      "Analyze how different compounding frequencies affect the final amount.",
      "Create a table showing year-by-year growth for both simple and compound interest.",
      "Plot a graph comparing the growth of simple vs. compound interest over time.",
      "Experiment with different principal amounts, rates, and time periods.",
      "Document your findings and observations about how each variable affects the results.",
    ],
    resources: [
      {
        title: "Compound Interest - Khan Academy",
        link: "https://www.khanacademy.org",
      },
      {
        title: "Interest Calculation - Investopedia",
        link: "https://www.investopedia.com",
      },
    ],
    feedback: "Please share your feedback on this interest calculator!",
    quiz: [
      {
        question:
          "What is the key difference between simple and compound interest?",
        options: [
          "Simple interest is always higher",
          "Compound interest earns interest on interest",
          "Simple interest is calculated monthly",
          "There is no difference",
        ],
        answer: "Compound interest earns interest on interest",
      },
      {
        question:
          "If you invest $1000 at 5% annual simple interest for 2 years, how much interest will you earn?",
        options: ["$50", "$100", "$105", "$110.25"],
        answer: "$100",
      },
      {
        question:
          "What happens to compound interest when the compounding frequency increases?",
        options: [
          "Total interest decreases",
          "Total interest increases",
          "No effect on total interest",
          "Principal amount decreases",
        ],
        answer: "Total interest increases",
      },
      {
        question:
          "Which formula would you use to calculate monthly compounding interest?",
        options: [
          "A = P × r × t",
          "A = P × (1 + r)^t",
          "A = P × (1 + r/12)^(12×t)",
          "I = P × r × t",
        ],
        answer: "A = P × (1 + r/12)^(12×t)",
      },
      {
        question: "What is the 'rule of 72' used for in finance?",
        options: [
          "Calculating tax rates",
          "Estimating doubling time for investments",
          "Determining loan eligibility",
          "Calculating inflation rates",
        ],
        answer: "Estimating doubling time for investments",
      },
    ],
  };

  const calculateInterest = () => {
    // Simple Interest Calculation
    const simpleInterest = principal * (rate / 100) * time;
    const simpleTotal = principal + simpleInterest;

    // Compound Interest Calculation
    const compoundTotal =
      principal *
      Math.pow(1 + rate / 100 / compoundFrequency, compoundFrequency * time);
    const compoundInterest = compoundTotal - principal;

    setResults({
      simpleInterest,
      simpleTotal,
      compoundInterest,
      compoundTotal,
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
      from_name: "Vision Lab Experiment - Interest Calculator",
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
        <ArrowLeft className="w-4 h-4" /> Back to Mathematics
      </button>
      <h1 className="text-3xl font-bold text-orange-600 mb-4">
        {experiment.title}
      </h1>
      <div className="flex gap-4 mb-6 border-b pb-2">
        {[
          "theory",
          "procedure",
          "simulation",
          "queries",
          "video",
          "resources",
          "feedback",
          "quiz",
        ].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md ${
              activeTab === tab ? "bg-green-300 font-bold" : "bg-gray-200"
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
            <h2 className="text-2xl font-semibold text-green-600 mb-4">
              Experimental Procedure
            </h2>

            <div className="mb-6 p-4 bg-green-100 rounded-lg">
              <h3 className="text-lg font-medium text-green-800 mb-2">
                Objectives
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>
                  Understand the difference between simple and compound interest
                </li>
                <li>Learn how to calculate both types of interest</li>
                <li>
                  Analyze how different parameters affect interest calculations
                </li>
              </ul>
            </div>

            <div className="mb-6 p-4 bg-green-100 rounded-lg">
              <h3 className="text-lg font-medium text-green-800 mb-2">
                Required Materials
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Calculator
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Spreadsheet software
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Paper and pen
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-5 rounded-lg">
              <h3 className="text-lg font-medium text-green-800 mb-4">
                Step-by-Step Procedure
              </h3>
              <ol className="list-none pl-0">
                {experiment.procedure.map((step, index) => (
                  <li key={index} className="mb-4 flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center mr-3 mt-1">
                      {index + 1}
                    </div>
                    <div className="bg-white p-3 rounded-md shadow-sm flex-grow">
                      <p className="text-gray-700">{step}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-6 p-4 bg-green-100 rounded-lg">
              <h3 className="text-lg font-medium text-green-800 mb-2">
                Data Collection Table
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full bg-white border border-green-200 rounded-md">
                  <thead>
                    <tr className="bg-green-50">
                      <th className="border border-green-200 p-2">Year</th>
                      <th className="border border-green-200 p-2">
                        Simple Interest
                      </th>
                      <th className="border border-green-200 p-2">
                        Simple Total
                      </th>
                      <th className="border border-green-200 p-2">
                        Compound Interest
                      </th>
                      <th className="border border-green-200 p-2">
                        Compound Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4, 5].map((year) => (
                      <tr key={year}>
                        <td className="border border-green-200 p-2">{year}</td>
                        {[...Array(4)].map((_, i) => (
                          <td
                            key={i}
                            className="border border-green-200 p-2"
                          ></td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        {activeTab === "queries" && (
          <div>
            <ChatInterface experiment="interest calculator" />
          </div>
        )}
        {activeTab === "simulation" && <InterestCalculatorSimulation />}

        {activeTab === "video" && (
          <iframe
            width="100%"
            height="600"
            src={"https://www.youtube.com/embed/Rm6UdfRs3gw"}
            title="Interest Calculation Video"
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

export default InterestCalculator;
