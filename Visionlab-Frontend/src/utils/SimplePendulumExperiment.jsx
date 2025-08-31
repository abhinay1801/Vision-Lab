import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import HelpSPE from "./help_SimplePendulum"; // Simulation Component
import ChatInterface from "./ChatAi";


function SimplePendulumExperiment() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("theory");
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");
  const [quizAnswers, setQuizAnswers] = useState({});
  const [score, setScore] = useState(null);
  // const [userRole, setUserRole] = useState("");

  // // Fetch user role from localStorage on component mount
  // useEffect(() => {
  //   const role = localStorage.getItem("userRole");
  //   setUserRole(role);
  // }, []);

  const experiment = {
    title: "Simple Pendulum Simulator",
    theory: (
      <>
        <h2 className="text-xl font-bold mt-4">Aim</h2>
        <p>
          To study the motion of a simple pendulum and understand the factors
          affecting its time period.
        </p>

        <h2 className="text-xl font-bold mt-4">Theory</h2>
        <p>
          A simple pendulum consists of a small mass (bob) suspended from a
          fixed point by a string or rod of length L. When displaced and
          released, it oscillates back and forth under the influence of gravity.
        </p>
        <p>
          The motion of a simple pendulum approximates simple harmonic motion
          (SHM) for small angles of displacement (θ &lt; 15°). The restoring
          force responsible for the motion is provided by the component of
          gravitational force acting tangentially to the path of motion.
        </p>
        <p>
          - Restoring Force: The force acting to bring the pendulum back to
          equilibrium is proportional to its displacement.
        </p>
        <p>
          - Time Period Dependence: The time period of oscillation depends
          on the length of the string and the acceleration due to gravity.
        </p>

        <h2 className="text-xl font-bold mt-4">Mathematical Model</h2>
        <p>The time period (T) of a simple pendulum is given by the formula:</p>
        <p className="text-center font-mono bg-gray-100 p-2 rounded-md">
          T = 2π √(L/g)
        </p>
        <p>
          - T: Time period of one complete oscillation (s) <br />
          - L: Length of the pendulum (m) <br />
          - g: Acceleration due to gravity (9.81 m/s²)
        </p>

        <h2 className="text-xl font-bold mt-4">Applications</h2>
        <p>
          - Timekeeping in pendulum clocks <br />
          - Measurement of gravitational acceleration <br />
          - Seismometers for detecting earthquakes <br />- Demonstration of
          Earth's rotation using Foucault’s pendulum
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
    queries: "/assets/simple-pendulum-animation.gif",

    resources: [
      {
        title: "Simple Pendulum - Khan Academy",
        link: "https://www.khanacademy.org",
      },
      {
        title: "Simple Pendulum - Wikipedia",
        link: "https://en.wikipedia.org/wiki/Pendulum",
      },
    ],
    feedback: "Please share your feedback on this simulation!",
    quiz: [
      {
        question:
          "What is the formula for the time period of a simple pendulum?",
        options: ["T = 2π √(L/g)", "T = L/g", "T = 2πg/L", "T = g/L"],
        answer: "T = 2π √(L/g)",
      },
      {
        question: "Which factor affects the time period of a simple pendulum?",
        options: [
          "Mass of the bob",
          "Length of the string",
          "Amplitude",
          "All of the above",
        ],
        answer: "Length of the string",
      },
      {
        question: "What happens if the length of the pendulum is increased?",
        options: [
          "Time period decreases",
          "Time period remains the same",
          "Time period increases",
          "Pendulum stops oscillating",
        ],
        answer: "Time period increases",
      },
      {
        question: "What is the acceleration due to gravity (g) on Earth?",
        options: ["8.9 m/s²", "9.81 m/s²", "10.5 m/s²", "12 m/s²"],
        answer: "9.81 m/s²",
      },
      {
        question: "What kind of motion does a simple pendulum exhibit?",
        options: [
          "Linear motion",
          "Rotational motion",
          "Oscillatory motion",
          "Random motion",
        ],
        answer: "Oscillatory motion",
      },
    ],
  };

  const handleOptionChange = (questionIndex, option) => {
    setQuizAnswers({ ...quizAnswers, [questionIndex]: option });
  };

  const handleSubmitQuiz = () => {
    let correctAnswers = 0;
    experiment.quiz.forEach((q, index) => {
      if (quizAnswers[index] === q.answer) correctAnswers++;
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
      from_name: "Vision Lab Experiment - Simple Pendulum",
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
        <ArrowLeft className="w-4 h-4" />
        Back to Physics
      </button>

      <h1 className="text-3xl font-bold text-orange-600 mb-4">
        {experiment.title}
      </h1>

      {/* ✅ Show Assign Project only if user is a mentor */}
      {/* {userRole === "mentor" && (
        <div className="mb-6 p-4 bg-yellow-200 rounded-md shadow-md">
          <h2 className="text-xl font-bold text-yellow-800">Assign Project</h2>
          <button
            onClick={() => navigate("/assign-project")}
            className="mt-3 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
          >
            Assign New Project
          </button>
        </div>5
      )} */}

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
                <li>
                  Verify the relationship between pendulum length and period
                </li>
                <li>Determine the local value of gravitational acceleration</li>
                <li>
                  Investigate the independence of period from mass and amplitude
                  (for small angles)
                </li>
              </ul>
            </div>

            <div className="mb-6 p-4 bg-blue-100 rounded-lg">
              <h3 className="text-lg font-medium text-blue-800 mb-2">
                Required Materials
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  String or thin rod
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Pendulum bobs of various masses
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Rigid support with clamp
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Meter rule or measuring tape
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Stopwatch or timer
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Protractor for measuring angles
                </div>
              </div>
            </div>

            <div className="mb-6 p-4 bg-blue-100 rounded-lg">
              <h3 className="text-lg font-medium text-blue-800 mb-2">
                Safety Precautions
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>
                  Ensure the support structure is stable to prevent tipping
                </li>
                <li>Keep a safe distance when the pendulum is in motion</li>
                <li>Be cautious when handling heavy bobs to avoid injury</li>
                <li>
                  Secure loose clothing and long hair when working near moving
                  apparatus
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
                  The square of the period (T²) should be directly proportional
                  to the length (L)
                </li>
                <li>
                  From the slope of the T² vs. L graph, you should be able to
                  calculate g ≈ 9.81 m/s²
                </li>
                <li>
                  Changing the mass should not significantly affect the period
                </li>
                <li>Larger amplitudes should slightly increase the period</li>
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
                      <th className="border border-blue-200 p-2">Length (m)</th>
                      <th className="border border-blue-200 p-2">Mass (g)</th>
                      <th className="border border-blue-200 p-2">Angle (°)</th>
                      <th className="border border-blue-200 p-2">
                        # of Oscillations
                      </th>
                      <th className="border border-blue-200 p-2">
                        Total Time (s)
                      </th>
                      <th className="border border-blue-200 p-2">
                        Period T<sub>exp</sub> (s)
                      </th>
                      <th className="border border-blue-200 p-2">
                        T<sub>theo</sub> (s)
                      </th>
                      <th className="border border-blue-200 p-2">% Error</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4, 5].map((row) => (
                      <tr key={row}>
                        <td className="border border-blue-200 p-2">{row}</td>
                        {[...Array(8)].map((_, i) => (
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
            <ChatInterface experiment="simple pendulum" />
          </div>
        )}

        {activeTab === "simulation" && <HelpSPE />}

        {activeTab === "video" && (
          <iframe
            width="100%"
            height="600"
            src={"https://www.youtube.com/embed/t5kAuqtw7Ns"}
            title="Simple Pendulum Video"
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
              <div key={i} className="mb-4">
                <p className="font-semibold">
                  {i + 1}. {q.question}
                </p>
                {q.options.map((option, j) => (
                  <label key={j} className="block">
                    <input
                      type="radio"
                      name={`question-${i}`}
                      value={option}
                      onChange={() => handleOptionChange(i, option)}
                    />
                    {" " + option}
                  </label>
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
                Your Score: {score}/{experiment.quiz.length}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SimplePendulumExperiment;
