import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import HelpElectrolysisOfWater from "./help_ElectrolysisOfWater";
import ChatInterface from "./ChatAi";

function ElectrolysisExperiment() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("theory");
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);

  const experiment = {
    title: "Electrolysis of Water",
    theory: (
      <>
        <h2 className="text-xl font-bold mt-4">Aim</h2>
        <p>
          To study the electrolysis of water and understand the chemical
          reactions involved in the production of hydrogen and oxygen gases.
        </p>

        <h2 className="text-xl font-bold mt-4">Theory</h2>
        <p>
          Electrolysis of water is a process in which an electric current is
          passed through water containing an electrolyte, leading to the
          decomposition of water molecules into hydrogen and oxygen gases. Since
          pure water has low conductivity, an electrolyte such as sulfuric acid
          (H₂SO₄) or sodium hydroxide (NaOH) is added to enhance ion movement.
        </p>
        <p>
          The process takes place in an electrolytic cell, where two electrodes
          (cathode and anode) are immersed in the electrolyte solution. When a
          direct current is applied, oxidation and reduction reactions occur at
          the electrodes, leading to the formation of gas bubbles.
        </p>
        <p>
          - At the cathode (-): Reduction of hydrogen ions takes place,
          leading to the release of hydrogen gas.
        </p>
        <p>
          - At the anode (+): Oxidation of hydroxide ions occurs, producing
          oxygen gas and water molecules.
        </p>

        <h2 className="text-xl font-bold mt-4">Chemical Reactions</h2>
        <p>
          - Overall Reaction: 2H₂O (l) → 2H₂ (g) + O₂ (g) <br />
          - At the cathode (-): 2H₂O + 2e⁻ → H₂ (gas) + 2OH⁻ <br />
          - At the anode (+): 4OH⁻ → O₂ (gas) + 2H₂O + 4e⁻
        </p>

        <h2 className="text-xl font-bold mt-4">Applications</h2>
        <p>
          - Hydrogen fuel production <br />
          - Industrial oxygen supply <br />
          - Electroplating and metal refining <br />- Water splitting for
          renewable energy
        </p>
      </>
    ),
    procedure: [
      "Set up the pendulum apparatus: Secure a rigid support to suspend the pendulum. Ensure the support is stable and the string or rod is firmly attached.",

      "Measure the length of the pendulum: Using a meter scale, carefully measure the distance from the point of suspension to the center of the bob. Record this value as L (in meters).",

      "Prepare timing equipment: Have a stopwatch or timer ready with precision to at least 0.01 seconds. Alternatively, use a photogate timer for more accurate measurements.",

      "Mark the equilibrium position: Note the position where the pendulum hangs at rest. This is your reference point for counting oscillations.",

      "Displace the pendulum: Gently pull the pendulum bob to one side, keeping the string taut. For the simple pendulum approximation to be valid, limit the displacement to small angles (preferably less than 15° from vertical).",

      "Release the pendulum: Let go of the bob without imparting any additional velocity. The pendulum should swing smoothly in a plane.",

      "Start timing multiple oscillations: Begin timing as the pendulum passes through the equilibrium position. Counting this as oscillation zero, count at least 20 complete oscillations for better accuracy.",

      "Record the total time: Stop the timer after the predetermined number of oscillations. Record this value as the total time t (in seconds).",

      "Calculate the experimental period: Divide the total time by the number of oscillations to find the experimental period: Tₑₓₚ = t/n.",

      "Calculate the theoretical period: Using the formula T = 2π √(L/g), calculate the theoretical period where g = 9.81 m/s².",

      "Compare experimental and theoretical values: Calculate the percentage error: % error = |Tₑₓₚ - Tₜₕₑₒᵣᵧ| / Tₜₕₑₒᵣᵧ × 100%.",

      "Repeat with different lengths: Change the length of the pendulum and repeat steps 2-11. Create a graph of T² vs L, which should be a straight line with slope 4π²/g.",

      "Investigate the effect of mass: Keeping the length constant, replace the bob with different masses and repeat the experiment to verify that mass does not affect the period.",

      "Analyze sources of error: Consider air resistance, friction at the pivot, measurement uncertainties, and timing errors in your analysis.",

      "Document your findings: Prepare a comprehensive lab report including your methodology, data tables, calculations, graphs, and conclusions.",
    ],
    queries: "/assets/electrolysis-animation.gif",
    video: "https://www.youtube.com/embed/6pM5to36Rws",
    resources: [
      {
        title: "Electrolysis of Water - Khan Academy",
        link: "https://www.khanacademy.org",
      },
      {
        title: "Electrolysis - Wikipedia",
        link: "https://en.wikipedia.org/wiki/Electrolysis",
      },
    ],
    feedback: "Please share your feedback on this experiment!",
    quiz: [
      {
        question: "What is the main purpose of electrolysis of water?",
        options: [
          "To create electricity",
          "To break water into hydrogen and oxygen",
          "To heat water",
          "To filter water",
        ],
        answer: "To break water into hydrogen and oxygen",
      },
      {
        question: "Which gas is released at the cathode?",
        options: ["Oxygen", "Nitrogen", "Hydrogen", "Carbon Dioxide"],
        answer: "Hydrogen",
      },
      {
        question: "What role does the electrolyte play in electrolysis?",
        options: [
          "Slows down the reaction",
          "Increases water purity",
          "Enhances conductivity",
          "Prevents gas formation",
        ],
        answer: "Enhances conductivity",
      },
      {
        question: "Which electrode attracts oxygen gas?",
        options: ["Cathode", "Anode", "Both", "None"],
        answer: "Anode",
      },
      {
        question: "What type of energy is used in electrolysis?",
        options: ["Thermal", "Electrical", "Mechanical", "Solar"],
        answer: "Electrical",
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
      from_name: "Vision Lab Experiment - Electrolysis of Water",
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
            <h2 className="text-2xl font-semibold text-orange-600 mb-4">
              Experimental Procedure
            </h2>

            <div className="mb-6 p-4 bg-blue-100 rounded-lg">
              <h3 className="text-lg font-medium text-blue-800 mb-2">
                Objectives
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Demonstrate the process of electrolysis of water</li>
                <li>Identify the gases produced at each electrode</li>
                <li>Verify the 2:1 volume ratio of hydrogen to oxygen</li>
              </ul>
            </div>

            <div className="mb-6 p-4 bg-blue-100 rounded-lg">
              <h3 className="text-lg font-medium text-blue-800 mb-2">
                Required Materials
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Beaker with distilled water
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Two graphite electrodes or platinum electrodes
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Battery or DC power supply (6V - 12V)
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Connecting wires with alligator clips
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Test tubes or gas collection tubes
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Sodium sulfate or sulfuric acid (electrolyte)
                </div>
              </div>
            </div>

            <div className="mb-6 p-4 bg-blue-100 rounded-lg">
              <h3 className="text-lg font-medium text-blue-800 mb-2">
                Safety Precautions
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>
                  Use safety goggles and gloves when handling the electrolyte
                </li>
                <li>Ensure proper ventilation to prevent gas buildup</li>
                <li>
                  Avoid using metal electrodes that may react with the
                  electrolyte
                </li>
                <li>
                  Do not ignite the collected gases without proper precautions
                </li>
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
                  Hydrogen gas is collected at the cathode, oxygen at the anode
                </li>
                <li>
                  The volume of hydrogen is approximately twice that of oxygen
                </li>
                <li>Electrolysis efficiency depends on the electrolyte used</li>
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
                      <th className="border border-blue-200 p-2">Trial #</th>
                      <th className="border border-blue-200 p-2">
                        Electrolyte Used
                      </th>
                      <th className="border border-blue-200 p-2">
                        Voltage (V)
                      </th>
                      <th className="border border-blue-200 p-2">
                        Current (A)
                      </th>
                      <th className="border border-blue-200 p-2">Time (s)</th>
                      <th className="border border-blue-200 p-2">
                        H₂ Volume (mL)
                      </th>
                      <th className="border border-blue-200 p-2">
                        O₂ Volume (mL)
                      </th>
                      <th className="border border-blue-200 p-2">
                        H₂:O₂ Ratio
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4, 5].map((row) => (
                      <tr key={row}>
                        <td className="border border-blue-200 p-2">{row}</td>
                        {[...Array(7)].map((_, i) => (
                          <td
                            key={i}
                            className="border border-blue-200 p-2"
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
            <ChatInterface experiment="electrolysis"/>
            </div>
        )}

        {activeTab === "simulation" && <HelpElectrolysisOfWater />}
        {activeTab === "video" && (
          <iframe
            width="100%"
            height="600"
            src={"https://www.youtube.com/embed/WmtaMq36jaE"}
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

export default ElectrolysisExperiment;
