import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import HelpOhmsLaw from "./help_OhmsLawExperiment";
import ChatInterface from "./ChatAi";

function OhmsLawSimulator() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("theory");
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");
  const [answers, setAnswers] = useState(Array(5).fill(null));
  const [score, setScore] = useState(null);

  const experiment = {
    title: "Ohm's Law Simulator",
    theory:(
    <>
    <h2 className="text-xl font-bold mt-4">Aim</h2>
    <p>
      To study Ohm's Law and understand the relationship between voltage, current, and resistance in an electrical circuit.
    </p>
  
    <h2 className="text-xl font-bold mt-4">Theory</h2>
    <p>
      Ohm's Law states that the current (I) flowing through a conductor between two points is directly proportional to the voltage (V) across the conductor and inversely proportional to the resistance (R) of the conductor.
    </p>
    <p>
      The law is fundamental to electrical circuits and helps in understanding how electrical components behave under different voltages and resistances.
    </p>
    <p>
      - Voltage (V): The potential difference applied across the circuit (measured in volts).  
    </p>
    <p>
      - Current (I): The flow of electric charge through the circuit (measured in amperes).  
    </p>
    <p>
      - Resistance (R): The opposition offered by the material to the flow of current (measured in ohms, Ω).  
    </p>
  
    <h2 className="text-xl font-bold mt-4">Mathematical Model</h2>
    <p>
      The mathematical expression of Ohm's Law is:
    </p>
    <p className="text-center font-mono bg-gray-100 p-2 rounded-md">
      V = I × R
    </p>
    <p>
      - V: Voltage (Volts) <br />
      - I: Current (Amperes) <br />
      - R: Resistance (Ohms, Ω)  
    </p>
  
    <h2 className="text-xl font-bold mt-4">Applications</h2>
    <p>
      - Designing electrical circuits and components <br />
      - Calculating resistance in wires and conductors <br />
      - Determining the required voltage for electrical appliances <br />
      - Troubleshooting electrical and electronic devices  
    </p>
  </>
  ),
    procedure: [
      "Set up the electrical circuit: Assemble a simple circuit with a power supply, ammeter, voltmeter, resistors of different values, and connecting wires. Ensure all connections are secure.",
      "Connect the ammeter in series: Place the ammeter in series with the resistor to measure the current flowing through the circuit. Verify the ammeter is set to the appropriate range.",
      "Connect the voltmeter in parallel: Connect the voltmeter in parallel across the resistor to measure the potential difference. Ensure the voltmeter is set to the appropriate range.",
      "Prepare the data collection tools: Have your lab notebook ready for recording measurements, with prepared tables for voltage, current, and calculated resistance values.",
      "Begin with zero voltage: Ensure the power supply is set to zero volts before closing the circuit. This provides a reference point and protects the components.",
      "Increase the voltage gradually: Slowly increase the voltage from the power supply in small, consistent increments (e.g., 0.5V or 1.0V steps), up to the maximum safe value for your components.",
      "Record measurements at each voltage level: At each voltage setting, record both the voltage reading from the voltmeter and the current reading from the ammeter.",
      "Calculate the resistance: For each pair of voltage (V) and current (I) readings, calculate the resistance using Ohm's Law: R = V/I. Record this value in your data table.",
      "Create a voltage vs. current graph: Plot voltage on the y-axis against current on the x-axis. For an ohmic conductor, this should be a straight line with slope equal to the resistance.",
      "Repeat with different resistors: Change the resistor in the circuit and repeat steps 5-9 to verify that different resistors give different slopes on the V-I graph.",
      "Verify the relationship: Confirm that the resistance calculated from V/I remains constant (within experimental error) at different voltage levels for ohmic conductors.",
      "Test a non-ohmic component: Replace the resistor with a non-ohmic component (like a diode or light bulb) and repeat measurements to observe non-linear V-I relationship.",
      "Investigate temperature effects: For comprehensive analysis, observe how the resistance changes when the component heats up during extended operation.",
      "Analyze sources of error: Consider contact resistance, instrument precision, temperature variations, and other factors that might affect your measurements.",
      "Document your findings: Prepare a lab report including your methodology, data tables, calculations, graphs, and conclusions about the validity of Ohm's Law for different components.",
    ],
    queries: "/assets/ohms-law-animation.gif",
    video: "https://www.youtube.com/embed/OhmsLawVideo",
    resources: [
      {
        title: "Ohm's Law - Khan Academy",
        link: "https://www.khanacademy.org",
      },
      {
        title: "Ohm's Law - Wikipedia",
        link: "https://en.wikipedia.org/wiki/Ohm's_law",
      },
    ],
    feedback: "Please share your feedback on this simulation!",
    quiz: [
      {
        question: "What is the formula of Ohm's Law?",
        options: ["V = IR", "P = IV", "R = V/I", "I = VR"],
        answer: "V = IR",
      },
      {
        question: "What happens to current when resistance increases?",
        options: ["Increases", "Remains same", "Decreases", "Becomes infinite"],
        answer: "Decreases",
      },
      {
        question: "What is the SI unit of resistance?",
        options: ["Volt", "Ohm", "Ampere", "Watt"],
        answer: "Ohm",
      },
      {
        question:
          "If voltage is 10V and resistance is 5Ω, what is the current?",
        options: ["0.5A", "2A", "5A", "10A"],
        answer: "2A",
      },
      {
        question: "Who discovered Ohm's Law?",
        options: ["Isaac Newton", "James Watt", "Georg Ohm", "Albert Einstein"],
        answer: "Georg Ohm",
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
                <li>
                  Verify Ohm's Law relationship between voltage, current, and
                  resistance
                </li>
                <li>Determine the resistance values of various conductors</li>
                <li>
                  Investigate the behavior of ohmic vs non-ohmic components
                </li>
              </ul>
            </div>

            <div className="mb-6 p-4 bg-blue-100 rounded-lg">
              <h3 className="text-lg font-medium text-blue-800 mb-2">
                Required Materials
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  DC power supply (variable)
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Digital multimeter or ammeter
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Digital multimeter or voltmeter
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Resistors of various values
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Connecting wires
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Non-ohmic components (diode, bulb)
                </div>
              </div>
            </div>

            <div className="mb-6 p-4 bg-blue-100 rounded-lg">
              <h3 className="text-lg font-medium text-blue-800 mb-2">
                Safety Precautions
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>
                  Ensure all connections are secure before applying voltage
                </li>
                <li>Do not exceed the power rating of resistors</li>
                <li>Turn off power supply when modifying circuits</li>
                <li>
                  Be cautious with metal components to avoid short circuits
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
                  For ohmic conductors, the voltage (V) should be directly
                  proportional to the current (I)
                </li>
                <li>
                  The V-I graph for ohmic conductors should be a straight line
                  with slope equal to the resistance
                </li>
                <li>
                  Non-ohmic components will show a curved line on the V-I graph
                </li>
                <li>
                  The calculated resistance should match the nominal value of
                  the resistors
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
                        Resistor (Ω)
                      </th>
                      <th className="border border-blue-200 p-2">
                        Voltage (V)
                      </th>
                      <th className="border border-blue-200 p-2">
                        Current (A)
                      </th>
                      <th className="border border-blue-200 p-2">
                        R<sub>calc</sub> (Ω)
                      </th>
                      <th className="border border-blue-200 p-2">
                        R<sub>nominal</sub> (Ω)
                      </th>
                      <th className="border border-blue-200 p-2">% Error</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4, 5].map((row) => (
                      <tr key={row}>
                        <td className="border border-blue-200 p-2">{row}</td>
                        {[...Array(6)].map((_, i) => (
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
            <ChatInterface experiment="ohms law"/>
            </div>
        )}
        {activeTab === "simulation" && <HelpOhmsLaw />}
        {activeTab === "video" && (
          <iframe
            width="100%"
            height="600"
            src={"https://www.youtube.com/embed/E_DsqQARbFg"}
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

export default OhmsLawSimulator;
