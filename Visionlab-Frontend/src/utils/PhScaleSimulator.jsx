import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import HelpPHScale from "./help_PHSensor";
import ChatInterface from "./ChatAi";


function PhScaleSimulator() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("theory");
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);

  const experiment = {
    title: "pH Scale Simulator",
    theory:(
    <>
    <h2 className="text-xl font-bold mt-4">Aim</h2>
    <p>
      To study the pH scale and understand the classification of substances as acidic, neutral, or basic based on their pH values.
    </p>
  
    <h2 className="text-xl font-bold mt-4">Theory</h2>
    <p>
      The pH scale is a logarithmic scale used to measure the acidity or basicity of a solution. It ranges from 0 to 14, where 7 is neutral, values below 7 indicate acidity, and values above 7 indicate basicity.
    </p>
    <p>
      The pH of a solution depends on the concentration of **hydrogen ions (H⁺) present in it. Strong acids have a low pH (closer to 0), while strong bases have a high pH (closer to 14).
    </p>
    <p>
      - Acidic Solutions (pH less than 7): High concentration of H⁺ ions (e.g., lemon juice, vinegar).  
    </p>
    <p>
      - Neutral Solutions (pH = 7): Equal concentration of H⁺ and OH⁻ ions (e.g., pure water).  
    </p>
    <p>
      - Basic Solutions (pH greater than 7): High concentration of OH⁻ ions (e.g., soap, ammonia).  
    </p>
  
    <h2 className="text-xl font-bold mt-4">Mathematical Model</h2>
    <p>
      The pH of a solution is calculated using the formula:
    </p>
    <p className="text-center font-mono bg-gray-100 p-2 rounded-md">
      pH = -log[H⁺]
    </p>
    <p>
      - pH: A measure of acidity or basicity. <br />
      - [H⁺]: The concentration of hydrogen ions in moles per liter (M).  
    </p>
  
    <h2 className="text-xl font-bold mt-4">Applications</h2>
    <p>
      - Monitoring water quality in lakes, rivers, and drinking water. <br />
      - Testing soil pH for agriculture and plant growth. <br />
      - Determining the acidity of food and beverages. <br />
      - Maintaining the pH balance in medical and pharmaceutical applications.  
    </p>
  </>
),  
    procedure: [
      "Access the pH simulator: Open the virtual pH simulation software or website and ensure it is functioning correctly.",
      "Familiarize with the interface: Explore the simulator’s tools, such as the pH scale, solution selection, dropper, beakers, and virtual probes.",
      "Select the solution: Choose an acidic, neutral, or basic solution from the simulator's options to analyze its pH.",
      "Calibrate the virtual pH meter: If required, adjust the pH meter in the simulator using standard buffer solutions to ensure accurate readings.",
      "Immerse the virtual pH probe: Drag and place the pH probe into the selected solution to measure its pH value.",
      "Observe the pH reading: Note the pH value displayed on the simulator. Identify whether the solution is acidic (pH < 7), neutral (pH = 7), or basic (pH > 7).",
      "Test different solutions: Repeat the process with different solutions, including strong acids, weak acids, strong bases, and weak bases, to compare pH values.",
      "Add acids or bases: Use the simulator’s tools to add a few drops of a strong acid (e.g., HCl) or a strong base (e.g., NaOH) to the solution and observe how the pH changes.",
      "Analyze buffer solutions: If available, test buffer solutions in the simulator by adding acids and bases to see how they resist changes in pH.",
      "Plot a pH change graph: Record the pH values before and after adding acids or bases, and create a pH vs. volume graph if the simulator allows data visualization.",
      "Compare with real-life experiments: Relate the simulated pH values to expected real-world results based on known pH scales of common substances.",
      "Identify the equivalence point: If the simulator includes titration, perform an acid-base titration and note the pH at the equivalence point.",
      "Analyze sources of error: Consider limitations of the simulation, such as preset values, digital approximations, and the absence of real-world factors like temperature effects.",
      "Document findings: Compile observations, pH values, comparisons, and conclusions on acid-base properties based on the simulator’s output.",
    ],
    queries: "/assets/ph-scale-animation.gif",
    video: "https://www.youtube.com/embed/pHScaleVideo",
    resources: [
      { title: "pH Scale - Khan Academy", link: "https://www.khanacademy.org" },
      { title: "pH - Wikipedia", link: "https://en.wikipedia.org/wiki/PH" },
    ],
    feedback: "Please share your feedback on this simulation!",
    quiz: [
      {
        question: "What is the pH of a neutral solution?",
        options: ["0", "7", "14", "10"],
        answer: "7",
      },
      {
        question: "Which of the following is a strong acid?",
        options: ["NaOH", "HCl", "NH3", "H2O"],
        answer: "HCl",
      },
      {
        question: "What does a pH of 14 indicate?",
        options: ["Neutral", "Weak acid", "Strong base", "Weak base"],
        answer: "Strong base",
      },
      {
        question: "Which ion is responsible for acidity?",
        options: ["OH-", "H+", "Na+", "Cl-"],
        answer: "H+",
      },
      {
        question: "What is the pH of pure water?",
        options: ["5", "6", "7", "8"],
        answer: "7",
      },
    ],
  };

  const handleOptionChange = (questionIndex, option) => {
    setSelectedAnswers({ ...selectedAnswers, [questionIndex]: option });
  };

  const handleSubmitQuiz = () => {
    let correctAnswers = 0;
    experiment.quiz.forEach((q, index) => {
      if (selectedAnswers[index] === q.answer) correctAnswers++;
    });
    setScore(correctAnswers);
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
      from_name: "Vision Lab Experiment - pH Scale Simulator",
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
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              pH Simulation Procedure
            </h2>

            <div className="mb-6 p-4 bg-blue-100 rounded-lg">
              <h3 className="text-lg font-medium text-blue-800 mb-2">
                Objectives
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Measure the pH of various solutions</li>
                <li>Understand the pH scale and its significance</li>
                <li>Analyze how acids and bases affect pH levels</li>
              </ul>
            </div>

            <div className="mb-6 p-4 bg-blue-100 rounded-lg">
              <h3 className="text-lg font-medium text-blue-800 mb-2">
                Required Materials
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  pH Meter
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Litmus Paper
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Beakers
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Distilled Water
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Acidic and Basic Solutions
                </div>
              </div>
            </div>

            <div className="mb-6 p-4 bg-blue-100 rounded-lg">
              <h3 className="text-lg font-medium text-blue-800 mb-2">
                Safety Precautions
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Wear protective gloves and goggles</li>
                <li>Avoid direct contact with acidic or basic solutions</li>
                <li>Rinse equipment thoroughly after use</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-5 rounded-lg">
              <h3 className="text-lg font-medium text-blue-800 mb-4">
                Step-by-Step Procedure
              </h3>
              <ol className="list-none pl-0">
                {experiment.procedure.map((step, index) => (
                  <li key={index} className="mb-4 flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3 mt-1">
                      {index + 1}
                    </div>
                    <div className="bg-white p-3 rounded-md shadow-sm flex-grow">
                      <p
                        className="text-gray-700"
                        dangerouslySetInnerHTML={{
                          __html: step.replace(
                            /\\(.?)\\*/g,
                            "<strong>$1</strong>"
                          ),
                        }}
                      ></p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-6 p-4 bg-blue-100 rounded-lg">
              <h3 className="text-lg font-medium text-blue-800 mb-2">
                Expected Results
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>
                  pH values will range from 0 to 14, indicating acidity or
                  basicity
                </li>
                <li>
                  Neutral solutions (e.g., distilled water) will have a pH
                  around 7
                </li>
                <li>Acids will have pH values below 7, and bases above 7</li>
              </ul>
            </div>

            <div className="mt-6 p-4 bg-blue-100 rounded-lg">
              <h3 className="text-lg font-medium text-blue-800 mb-2">
                Data Collection Table
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full bg-white border border-blue-200 rounded-md">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="border border-blue-200 p-2">Solution</th>
                      <th className="border border-blue-200 p-2">pH Reading</th>
                      <th className="border border-blue-200 p-2">
                        Observation
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {["Water", "Vinegar", "Soap"].map((solution, index) => (
                      <tr key={index}>
                        <td className="border border-blue-200 p-2">
                          {solution}
                        </td>
                        <td className="border border-blue-200 p-2"></td>
                        <td className="border border-blue-200 p-2"></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        {activeTab === "queries" && (
          // <div className="flex gap-2">
          //   <input
          //     type="search"
          //     className="w-[300px] h-[30px] rounded border border-gray-400 px-2"
          //     placeholder="Enter Query"
          //   />
          //   <button
          //     className="bg-blue-500 text-white rounded-lg px-4 py-1 hover:bg-blue-600"
          //     onClick={divHandler}
          //   >
          //     Submit
          //   </button>
          // </div>
          <div>
            <ChatInterface experiment="ph scale simulator"/>
            </div>
        )}

        {activeTab === "simulation" && <HelpPHScale />}
        {activeTab === "video" && (
          <iframe
            width="100%"
            height="600"
            src={"https://www.youtube.com/embed/KfWvdSyW6Io"}
            title="pH Scale Video"
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
                <p className="font-semibold mb-2">
                  {i + 1}. {q.question}
                </p>
                {q.options.map((option, j) => (
                  <div key={j} className="flex items-center mb-2">
                    <input
                      type="radio"
                      name={`question-${i}`}
                      checked={selectedAnswers[i] === option}
                      onChange={() => handleOptionChange(i, option)}
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
              onClick={handleSubmitQuiz}
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

export default PhScaleSimulator;
