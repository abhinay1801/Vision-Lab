import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import Help_RefractionExperiment from "./help_RefractionExperiment";
import ChatInterface from "./ChatAi";

function Refraction() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("theory");
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");
  const [answers, setAnswers] = useState(Array(5).fill(null));
  const [score, setScore] = useState(null);

  const experiment = {
    title: "Refraction of Light through Different Media",
    theory: (
      <>
        <p>
          Refraction is the phenomenon of change in the direction of light when
          it passes from one medium to another with different optical densities.
          When light travels from a medium with lower optical density to a
          medium with higher optical density, it bends towards the normal.
          Conversely, when light travels from a medium with higher optical
          density to a medium with lower optical density, it bends away from the
          normal.
        </p>
        <p>Key factors affecting refraction include:</p>
        <ul>
          <li>Angle of incidence</li>
          <li>Refractive indices of the media</li>
          <li>Wavelength of light</li>
        </ul>
      </>
    ),
    procedure: [
      "Set up a ray box or light source in a dark room",
      "Place a glass slab or prism on a white sheet of paper",
      "Mark the incident ray before entering the medium",
      "Observe and mark the refracted ray as it passes through the medium",
      "Measure the angles of incidence and refraction using a protractor",
      "Repeat the experiment with different angles and media",
    ],
    queries: "image.gif",
    video: "https://www.youtube.com",
    resources: [
      {
        title: "NCERT Physics Textbook",
        link: "https://ncert.nic.in/textbook.php",
      },
      {
        title: "Physics Optics Resource",
        link: "https://www.physicsclassroom.com/class/refrn",
      },
    ],
    feedback: "Please share your feedback on this refraction simulation!",
    quiz: [
      {
        question: "What is refraction?",
        options: [
          "Bending of light when it passes from one medium to another",
          "Reflection of light from a surface",
          "Absorption of light by a medium",
          "Scattering of light in all directions",
        ],
        answer: "Bending of light when it passes from one medium to another",
      },
      {
        question: "When light moves from a denser to a rarer medium, it bends:",
        options: [
          "Towards the normal",
          "Away from the normal",
          "Stays straight",
          "Splits into colors",
        ],
        answer: "Away from the normal",
      },
      {
        question: "Which factor determines the extent of refraction?",
        options: [
          "Temperature",
          "Refractive index",
          "Light color",
          "Surface roughness",
        ],
        answer: "Refractive index",
      },
      {
        question: "What instrument is used to measure angles in refraction?",
        options: ["Ammeter", "Voltmeter", "Protractor", "Thermometer"],
        answer: "Protractor",
      },
      {
        question: "Which of these has the highest refractive index?",
        options: ["Air", "Water", "Glass", "Vacuum"],
        answer: "Glass",
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
      user_name: "User",
      user_email: "rajeshgajula.1434@gmail.com",
      from_name: "Vision Lab Refraction Experiment Simulator",
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
            className={`px-4 py-2 rounded-md whitespace-nowrap ${
              activeTab === tab ? "bg-orange-300 font-bold" : "bg-gray-200"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {activeTab === "theory" && (
          <div className="text-gray-700 space-y-4">{experiment.theory}</div>
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
                <li>Understand the phenomenon of light refraction</li>
                <li>Measure angles of incidence and refraction</li>
                <li>Observe light behavior in different media</li>
              </ul>
            </div>

            <div className="mb-6 p-4 bg-blue-100 rounded-lg">
              <h3 className="text-lg font-medium text-blue-800 mb-2">
                Required Materials
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Glass slab or prism
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
                <li>Handle glass slab or prism carefully to avoid breakage</li>
                <li>
                  Work in a dimly lit room for better visibility of light rays
                </li>
                <li>
                  Use protective eyewear if working with intense light sources
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
                      <p className="text-gray-700">{step}</p>
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
                <li>Light bends when passing from one medium to another</li>
                <li>Angle of refraction depends on refractive indices</li>
                <li>Different media cause different degrees of bending</li>
                <li>Verify Snell's law of refraction</li>
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
                        Angle of Refraction (°)
                      </th>
                      <th className="border border-blue-200 p-2">Medium</th>
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
            <ChatInterface experiment="Refraction of Light through Different Media" />
          </div>
        )}
        {activeTab === "simulation" && <Help_RefractionExperiment />}
        {activeTab === "video" && (
          <iframe
            width="100%"
            height="600"
            src={"https://www.youtube.com/embed/ON1QGqB6vxg"}
            title="Refraction of Light Experiment"
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

export default Refraction;
