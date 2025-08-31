import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import ChatInterface from "./ChatAi";
import Help_ReflectionExperiment from "./help_ReflectionExperiment";

function Reflection() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("theory");
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");
  const [answers, setAnswers] = useState(Array(5).fill(null));
  const [score, setScore] = useState(null);

  const experiment = {
    title: "Verification of the Laws of Reflection of Light",
    theory: (
      <>
        <h2 className="text-xl font-bold mt-4">Aim</h2>
        <p>
          To study the laws of reflection and verify the relationship between
          the angle of incidence and angle of reflection.
        </p>
        <h2 className="text-xl font-bold mt-4">Theory</h2>
        <p>
          Reflection is the change in direction of a wavefront at an interface
          between two different media so that the wavefront returns into the
          medium from which it originated.
        </p>
        <p>
          <strong>Laws of Reflection:</strong>
        </p>
        <p>
          1. The incident ray, reflected ray, and normal all lie in the same
          plane.
        </p>
        <p>
          2. The angle of incidence (θᵢ) is equal to the angle of reflection
          (θᵣ).
        </p>
        <h2 className="text-xl font-bold mt-4">Mathematical Model</h2>
        <p>The law of reflection is expressed as:</p>
        <p className="text-center font-mono bg-gray-100 p-2 rounded-md">
          θᵢ = θᵣ
        </p>
        <p>
          Where: <br />
          - θᵢ = Angle of incidence (between incident ray and normal) <br />- θᵣ
          = Angle of reflection (between reflected ray and normal)
        </p>
        <h2 className="text-xl font-bold mt-4">Types of Reflection</h2>
        <p>
          <strong>Regular Reflection:</strong> Occurs on smooth surfaces where
          parallel rays remain parallel after reflection.
        </p>
        <p>
          <strong>Diffuse Reflection:</strong> Occurs on rough surfaces where
          parallel rays scatter in different directions.
        </p>
        <h2 className="text-xl font-bold mt-4">Applications</h2>
        <p>
          - Design of mirrors and optical devices <br />
          - Periscopes and kaleidoscopes <br />
          - Architectural lighting design <br />
          - Road signs and safety reflectors <br />- Solar concentrators
        </p>
        ,
      </>
    ),
    procedure: ["procedure"],
    queries: "image.gif",
    video: "https://www.youtube.com",
    resources: [
      {
        title: "title1",
        link: "link.org",
      },
      {
        title: "title2",
        link: "link2.org",
      },
    ],
    feedback: "Please share your feedback on this simulation!",
    quiz: [
      {
        question: "What is the law of reflection?",
        options: [
          "Angle of incidence = Angle of reflection",
          "Angle of incidence > Angle of reflection",
          "Angle of incidence < Angle of reflection",
          "Light always travels straight",
        ],
        answer: "Angle of incidence = Angle of reflection",
      },
      {
        question: "What happens when light hits a smooth surface?",
        options: [
          "Scatters in all directions",
          "Reflects uniformly",
          "Gets absorbed",
          "Bends away",
        ],
        answer: "Reflects uniformly",
      },
      {
        question:
          "Which instrument is commonly used to measure angles in a reflection experiment?",
        options: ["Ammeter", "Protractor", "Voltmeter", "Micrometer"],
        answer: "Protractor",
      },
      {
        question:
          "If the angle of incidence is 30°, what is the angle of reflection?",
        options: ["30°", "60°", "90°", "45°"],
        answer: "30°",
      },
      {
        question: "What is the normal in the reflection experiment?",
        options: [
          "The incident ray",
          "The reflected ray",
          "A perpendicular line to the surface at the point of incidence",
          "The light source",
        ],
        answer: "A perpendicular line to the surface at the point of incidence",
      },
    ],
  };

  const handleSelect = (index, option) => {
    const newAnswers = [...answers];
    newAnswers[index] = option;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
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
      user_name: "User", // Replace with actual user name if available
      user_email: "rajeshgajula.1434@gmail.com", // Replace with user's email if available
      from_name: "Vision Lab Experiment Ohm's Law Simulator ", // Ensure this matches your EmailJS template
      message: feedback, // The actual feedback message
    };

    emailjs
      .send(
        "service_0updalp", // Replace with your EmailJS service ID
        "template_gga1aol", // Replace with your EmailJS template ID
        templateParams,
        "eQ_JCPczgpDZ1uk7d" // Replace with your EmailJS user ID
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
                <li>Verify the law of reflection</li>
                <li>Measure the angle of incidence and angle of reflection</li>
                <li>Observe the behavior of light on different surfaces</li>
              </ul>
            </div>

            <div className="mb-6 p-4 bg-blue-100 rounded-lg">
              <h3 className="text-lg font-medium text-blue-800 mb-2">
                Required Materials
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Plane mirror
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Ray box or laser pointer
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Protractor
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  White paper or graph sheet
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Ruler
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Pencil
                </div>
              </div>
            </div>

            <div className="mb-6 p-4 bg-blue-100 rounded-lg">
              <h3 className="text-lg font-medium text-blue-800 mb-2">
                Safety Precautions
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Do not look directly into the laser beam</li>
                <li>Ensure the mirror is placed securely to avoid breakage</li>
                <li>
                  Handle sharp instruments like protractors and rulers carefully
                </li>
                <li>
                  Work in a dimly lit room for better visibility of light rays
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
                  The angle of incidence should be equal to the angle of
                  reflection
                </li>
                <li>
                  The light ray should follow a predictable path based on the
                  mirror surface
                </li>
                <li>The reflected ray should appear clearly on the paper</li>
                <li>
                  Different surfaces may cause variations in reflection quality
                </li>
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
                        Angle of Incidence (°)
                      </th>
                      <th className="border border-blue-200 p-2">
                        Angle of Reflection (°)
                      </th>
                      <th className="border border-blue-200 p-2">
                        Surface Type
                      </th>
                      <th className="border border-blue-200 p-2">
                        Observation
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4, 5].map((row) => (
                      <tr key={row}>
                        <td className="border border-blue-200 p-2">{row}</td>
                        {[...Array(4)].map((_, i) => (
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
            <ChatInterface experiment="Verification of the Laws of Reflection of Light" />
          </div>
        )}
        {activeTab === "simulation" && <Help_ReflectionExperiment />}
        {activeTab === "video" && (
          <iframe
            width="100%"
            height="600"
            src={"https://www.youtube.com/embed/axKQt0ARypY"}
            title="Verification of the Laws of Reflection of Light"
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
            {experiment.quiz.map((q, index) => (
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

export default Reflection;
