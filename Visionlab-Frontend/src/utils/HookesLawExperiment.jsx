import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import HelpHookesLaw from "./help_HookesLawExperiment";
import ChatInterface from "./ChatAi";

function HookesLawExperiment() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("theory");
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");

  const experiment = {
    title: "Hooke's Law Simulator",
    theory: (
      <>
        <h2 className="text-xl font-bold mt-4">Aim</h2>
        <p>
          To study Hooke's Law and understand the relationship between force,
          displacement, and the stiffness of a spring.
        </p>

        <h2 className="text-xl font-bold mt-4">Theory</h2>
        <p>
          Hooke's Law states that the force (F) required to extend or compress a
          spring is directly proportional to the displacement (x) of the spring
          from its equilibrium position.
        </p>
        <p>
          The law describes the elastic behavior of materials within their
          proportional limit, where they return to their original shape when the
          force is removed.
        </p>
        <p>
          - Force (F): The applied force causing the extension or
          compression (measured in Newtons, N).
        </p>
        <p>
          - Displacement (x): The change in length of the spring from its
          rest position (measured in meters, m).
        </p>
        <p>
          - Spring Constant (k): A measure of the stiffness of the spring
          (measured in Newtons per meter, N/m).
        </p>

        <h2 className="text-xl font-bold mt-4">Mathematical Model</h2>
        <p>The mathematical expression of Hooke's Law is:</p>
        <p className="text-center font-mono bg-gray-100 p-2 rounded-md">
          F = k × x
        </p>
        <p>
          - F: Force (Newtons, N) <br />
          - k: Spring Constant (Newtons per meter, N/m) <br />
          - x: Displacement (Meters, m)
        </p>

        <h2 className="text-xl font-bold mt-4">Applications</h2>
        <p>
          - Designing springs in mechanical systems <br />
          - Understanding material elasticity <br />
          - Developing shock absorbers and suspension systems <br />- Measuring
          forces using spring-based force meters
        </p>
      </>
    ),
    procedure: [
      "Set up the experimental apparatus: Arrange a clamp stand, a helical spring, a meter ruler, and a set of known weights. Ensure the setup is stable and the ruler is positioned vertically.",

      "Measure the spring’s natural length: Before adding any weight, measure and record the initial length of the spring without any load using a meter ruler.",

      "Attach the first weight: Suspend a small known mass (e.g., 100g) from the spring and allow it to come to rest before measuring the new length of the spring.",

      "Record the extension: Calculate the extension by subtracting the original length from the stretched length and note it in a data table along with the applied force.",

      "Increase the load gradually: Add more weights in small, equal increments (e.g., 100g each time) and record the corresponding extension after each addition.",

      "Plot force vs. extension graph: Plot the applied force (y-axis) against the extension (x-axis). If Hooke’s Law is followed, the graph should be a straight line through the origin with a slope equal to the spring constant (k).",

      "Determine the spring constant: Calculate the spring constant (k) using Hooke’s Law formula: F = kx, where F is the force and x is the extension.",

      "Check the elastic limit: Continue adding weights until the spring no longer returns to its original length after removing the load. This indicates the elastic limit, beyond which Hooke’s Law no longer applies.",

      "Repeat for accuracy: Perform multiple trials for the same weights and take the average extension values to reduce measurement errors.",

      "Investigate different materials: Repeat the experiment using different springs or elastic bands and compare their spring constants.",

      "Analyze sources of error: Consider human errors in measuring length, parallax errors while reading the scale, and possible variations in material properties.",

      "Document your findings: Prepare a lab report with detailed observations, data tables, calculations, graphs, and conclusions on the validity of Hooke’s Law for different materials.",
    ],
    queries: "/assets/hookes-law-animation.gif",
    resources: [
      {
        title: "Hooke's Law - Khan Academy",
        link: "https://www.khanacademy.org",
      },
      {
        title: "Hooke's Law - Wikipedia",
        link: "https://en.wikipedia.org/wiki/Hooke%27s_law",
      },
    ],
    feedback: "Please share your feedback on this simulation!",
  };

  const quizQuestions = [
    {
      question: "What does Hooke’s Law state?",
      options: [
        "Force is inversely proportional to extension",
        "Force is directly proportional to extension",
        "Force is equal to mass times acceleration",
        "Force is independent of extension",
      ],
      answer: "Force is directly proportional to extension",
    },
    {
      question: "What is the unit of the spring constant (k)?",
      options: ["Newton", "Newton/meter", "Joule", "Watt"],
      answer: "Newton/meter",
    },
    {
      question: "What happens if the elastic limit is exceeded?",
      options: [
        "The spring returns to its original shape",
        "The spring breaks immediately",
        "The deformation becomes permanent",
        "The spring constant increases",
      ],
      answer: "The deformation becomes permanent",
    },
    {
      question: "Which of these graphs represents Hooke’s Law?",
      options: [
        "A straight line passing through the origin",
        "A curved line",
        "A horizontal line",
        "A vertical line",
      ],
      answer: "A straight line passing through the origin",
    },
    {
      question:
        "If the force applied is doubled, what happens to the extension?",
      options: ["Remains the same", "Doubles", "Halves", "Becomes zero"],
      answer: "Doubles",
    },
  ];

  const [answers, setAnswers] = useState(
    Array(quizQuestions.length).fill(null)
  );
  const [score, setScore] = useState(null);

  const handleSelect = (index, option) => {
    const newAnswers = [...answers];
    newAnswers[index] = option;
    setAnswers(newAnswers);
  };

  const handleSubmitQuiz = () => {
    let totalScore = 0;
    quizQuestions.forEach((q, index) => {
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
      from_name: "Vision Lab Experiment Hooke's Law Simulator",
      message: feedback,
    };

    emailjs
      .send(
        "service_0updalp",
        "template_gga1aol",
        templateParams,
        "eQ_JCPczgpDZ1uk7d"
      )
      .then(
        (response) => {
          console.log("Email sent successfully:", response);
          setMessage("Thank you for your feedback!");
          setFeedback("");
        },
        (error) => {
          console.error("Email sending failed:", error);
          setMessage("Error sending feedback. Please try again.");
        }
      );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/physics")}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Physics
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
                <li>Verify Hooke's Law by analyzing force vs. extension</li>
                <li>Determine the spring constant (k) for a given spring</li>
                <li>Identify the elastic limit of the spring</li>
              </ul>
            </div>

            <div className="mb-6 p-4 bg-blue-100 rounded-lg">
              <h3 className="text-lg font-medium text-blue-800 mb-2">
                Required Materials
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Clamp stand with a helical spring
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Set of standard weights
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Meter ruler
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Pointer attached to the spring
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Graph paper for plotting results
                </div>
              </div>
            </div>

            <div className="mb-6 p-4 bg-blue-100 rounded-lg">
              <h3 className="text-lg font-medium text-blue-800 mb-2">
                Safety Precautions
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Ensure the clamp stand is stable before adding weights</li>
                <li>Do not exceed the elastic limit of the spring</li>
                <li>Handle weights carefully to avoid dropping them</li>
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
                  The force (F) should be directly proportional to the extension
                  (x) up to the elastic limit
                </li>
                <li>
                  The graph of force vs. extension should be a straight line
                  passing through the origin
                </li>
                <li>The slope of the graph gives the spring constant (k)</li>
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
                      <th className="border border-blue-200 p-2">Mass (g)</th>
                      <th className="border border-blue-200 p-2">Force (N)</th>
                      <th className="border border-blue-200 p-2">
                        Initial Length (cm)
                      </th>
                      <th className="border border-blue-200 p-2">
                        Final Length (cm)
                      </th>
                      <th className="border border-blue-200 p-2">
                        Extension (cm)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4, 5].map((row) => (
                      <tr key={row}>
                        <td className="border border-blue-200 p-2">{row}</td>
                        {[...Array(5)].map((_, i) => (
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
            <ChatInterface experiment="hooks law"/>
            </div>
        )}
        {activeTab === "simulation" && <HelpHookesLaw />}

        {activeTab === "video" && (
          <iframe
            width="100%"
            height="600"
            src={"https://www.youtube.com/embed/g2pyBUQSigI"}
            title="Ohm's Law Video"
            className="rounded-md"
            allowFullScreen
          ></iframe>
        )}

        {activeTab === "resources" && (
          <ul className="list-disc pl-5">
            {experiment.resources.map((resource, index) => (
              <li key={index} className="mb-2">
                <a
                  href={resource.link}
                  className="text-blue-600 hover:underline"
                >
                  {resource.title}
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
            {quizQuestions.map((q, index) => (
              <div key={index} className="mb-6">
                <p className="text-gray-700 font-semibold mb-2">{`${
                  index + 1
                }. ${q.question}`}</p>
                {q.options.map((option, i) => (
                  <div key={i} className="flex items-center mb-2">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      checked={answers[index] === option}
                      onChange={() => handleSelect(index, option)}
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
                Your Score: {score} / {quizQuestions.length}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default HookesLawExperiment;
