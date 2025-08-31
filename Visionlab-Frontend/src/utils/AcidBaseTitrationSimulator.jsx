import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import HelpAcidBaseTitration from "./help_acidbasetitration";
import ChatInterface from "./ChatAi";

function AcidBaseTitrationSimulator() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("theory");
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");
  const [answers, setAnswers] = useState(Array(5).fill(null));
  const [score, setScore] = useState(null);

  const experiment = {
    title: "Acid-Base Titration Simulator",
    theory: (
      <>
        <h2 className="text-xl font-bold mt-4">Aim</h2>
        <p>
          To study acid-base titration and understand how the concentration of
          an acid or a base is determined using a neutralization reaction.
        </p>

        <h2 className="text-xl font-bold mt-4">Theory</h2>
        <p>
          Acid-base titration is a quantitative analytical technique used to
          determine the concentration of an unknown acid or base solution. It is
          based on a neutralization reaction between an acid and a base.
        </p>
        <p>
          The process involves adding a titrant (a solution of known
          concentration) to an analyte (a solution of unknown concentration)
          until the reaction reaches the equivalence point, where the acid and
          base completely neutralize each other.
        </p>
        <p>
          - Acid (H⁺ donor): A substance that releases hydrogen ions (H⁺) in
          solution.
        </p>
        <p>
          - Base (OH⁻ donor): A substance that releases hydroxide ions (OH⁻)
          in solution.
        </p>
        <p>
          - Equivalence Point: The point where the number of moles of acid
          equals the number of moles of base.
        </p>
        <p>
          - Indicator: A chemical that changes color at or near the
          equivalence point to signal the end of the titration.
        </p>

        <h2 className="text-xl font-bold mt-4">Mathematical Model</h2>
        <p>The titration formula is:</p>
        <p className="text-center font-mono bg-gray-100 p-2 rounded-md">
          N₁V₁ = N₂V₂
        </p>
        <p>
          - N₁: Normality of the acid (eq/L) <br />
          - V₁: Volume of the acid (L) <br />
          - N₂: Normality of the base (eq/L) <br />
          - V₂: Volume of the base (L)
        </p>

        <h2 className="text-xl font-bold mt-4">Applications</h2>
        <p>
          - Determining the concentration of acids and bases <br />
          - Testing the purity of pharmaceuticals <br />
          - Analyzing water quality and pH levels <br />- Studying buffer
          solutions in chemistry and biology
        </p>
      </>
    ),
    procedure: [
      "Set up the titration apparatus: Assemble a burette, pipette, conical flask, burette stand, and a white tile. Ensure all glassware is clean and free from contaminants.",
      "Prepare the acid solution: Fill the burette with the standardized acid solution (e.g., HCl) using a funnel. Remove the funnel after filling to avoid additional drops altering the volume.",
      "Prepare the base solution: Use a pipette to measure a fixed volume of the base solution (e.g., NaOH) and transfer it into the conical flask. Add a few drops of a suitable indicator (e.g., phenolphthalein for strong acid-strong base titration).",
      "Record the initial burette reading: Note the starting volume of the acid in the burette to ensure accurate volume measurement.",
      "Start the titration slowly: Open the burette tap and allow the acid to flow into the conical flask drop by drop while swirling continuously to mix the reactants.",
      "Observe color changes: Look for the first permanent color change in the indicator, signaling that the endpoint is near.",
      "Approach the endpoint carefully: As the color begins to change, reduce the acid flow to single drops to avoid overshooting the endpoint.",
      "Determine the endpoint: The endpoint is reached when a single drop of acid causes a permanent color change (e.g., phenolphthalein turns from pink to colorless). Close the burette tap immediately.",
      "Record the final burette reading: Measure the final volume of acid in the burette and calculate the volume of acid used in the titration.",
      "Repeat for accuracy: Conduct at least three titrations to obtain concordant readings (values within 0.1 mL of each other). Discard any rough trials.",
      "Calculate the unknown concentration: Use the titration formula ( M_1V_1 = M_2V_2 ) to determine the unknown concentration of the acid or base.",
      "Plot a titration curve: If required, create a pH vs. volume graph to visualize the neutralization process and identify the equivalence point.",
      "Verify the reaction stoichiometry: Ensure that the molar ratio of the acid and base matches the expected chemical equation.",
      "Test with different indicators: Repeat the titration using different indicators (e.g., methyl orange, bromothymol blue) to observe how the endpoint varies.",
      "Analyze sources of error: Consider parallax errors in burette readings, incorrect endpoint detection, improper swirling, or variations in room temperature.",
      "Document findings: Compile a detailed lab report including observations, data tables, calculations, graphs, and conclusions on the precision and accuracy of the titration.",
    ],
    queries: "/assets/acid-base-titration-animation.gif",

    resources: [
      {
        title: "Acid-Base Titration - Khan Academy",
        link: "https://www.khanacademy.org",
      },
      {
        title: "Titration - Wikipedia",
        link: "https://en.wikipedia.org/wiki/Titration",
      },
    ],
    feedback: "Please share your feedback on this simulation!",
    quiz: [
      {
        question: "What is the main purpose of an acid-base titration?",
        options: [
          "To measure temperature",
          "To determine pH",
          "To find unknown concentration",
          "To create a new solution",
        ],
        answer: "To find unknown concentration",
      },
      {
        question: "What indicator is commonly used in acid-base titration?",
        options: ["Phenolphthalein", "Litmus", "Bromine", "Methyl Orange"],
        answer: "Phenolphthalein",
      },
      {
        question: "What is the equivalence point in a titration?",
        options: [
          "When pH is 7",
          "When moles of acid and base are equal",
          "When color changes",
          "When the solution boils",
        ],
        answer: "When moles of acid and base are equal",
      },
      {
        question: "What is the formula for molarity?",
        options: [
          "M = moles/volume",
          "M = volume/moles",
          "M = mass/volume",
          "M = moles × volume",
        ],
        answer: "M = moles/volume",
      },
      {
        question:
          "Which apparatus is commonly used to measure the titrant volume?",
        options: ["Burette", "Pipette", "Beaker", "Test tube"],
        answer: "Burette",
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
            <h2 className="text-2xl font-semibold text-red-600 mb-4">
              Experimental Procedure
            </h2>

            <div className="mb-6 p-4 bg-red-100 rounded-lg">
              <h3 className="text-lg font-medium text-red-800 mb-2">
                Objectives
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Determine the concentration of an unknown acid/base</li>
                <li>
                  Understand the neutralization reaction between acids and bases
                </li>
                <li>Identify the endpoint using an appropriate indicator</li>
              </ul>
            </div>

            <div className="mb-6 p-4 bg-red-100 rounded-lg">
              <h3 className="text-lg font-medium text-red-800 mb-2">
                Required Materials
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Burette
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Pipette (25 mL)
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Conical flask
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Acid solution (unknown concentration)
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Base solution (standard solution)
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Phenolphthalein or methyl orange indicator
                </div>
              </div>
            </div>

            <div className="mb-6 p-4 bg-red-100 rounded-lg">
              <h3 className="text-lg font-medium text-red-800 mb-2">
                Safety Precautions
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Wear protective gloves and safety goggles</li>
                <li>Handle acids and bases with care to prevent spills</li>
                <li>Rinse any spills immediately with plenty of water</li>
              </ul>
            </div>

            <div className="bg-red-50 p-5 rounded-lg">
              <h3 className="text-lg font-medium text-red-800 mb-4">
                Step-by-Step Procedure
              </h3>
              <ol className="list-none pl-0">
                {experiment.procedure.map((step, index) => (
                  <li key={index} className="mb-4 flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center mr-3 mt-1">
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

            <div className="mt-6 p-4 bg-red-100 rounded-lg">
              <h3 className="text-lg font-medium text-red-800 mb-2">
                Expected Results
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>The solution changes color at the equivalence point</li>
                <li>
                  The volume of the titrant required to reach the endpoint is
                  recorded
                </li>
                <li>
                  The unknown concentration is calculated using the titration
                  formula
                </li>
              </ul>
            </div>

            <div className="mt-6 p-4 bg-red-100 rounded-lg">
              <h3 className="text-lg font-medium text-red-800 mb-2">
                Data Collection Table
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full bg-white border border-red-200 rounded-md">
                  <thead>
                    <tr className="bg-red-50">
                      <th className="border border-red-200 p-2">Trial #</th>
                      <th className="border border-red-200 p-2">
                        Initial Burette Reading (mL)
                      </th>
                      <th className="border border-red-200 p-2">
                        Final Burette Reading (mL)
                      </th>
                      <th className="border border-red-200 p-2">
                        Volume Used (mL)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3].map((row) => (
                      <tr key={row}>
                        <td className="border border-red-200 p-2">{row}</td>
                        {[...Array(3)].map((_, i) => (
                          <td
                            key={i}
                            className="border border-red-200 p-2"
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
            <ChatInterface experiment="acid base titration"/>
            </div>
        )}
        {activeTab === "simulation" && <HelpAcidBaseTitration />}
        {activeTab === "video" && (
          <iframe
            width="100%"
            height="600"
            src={"https://www.youtube.com/embed/sFpFCPTDv2w"}
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

export default AcidBaseTitrationSimulator;
