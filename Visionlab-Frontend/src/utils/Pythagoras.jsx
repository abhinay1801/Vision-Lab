import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import Pythagoras from "./help_pythagoras";
import ChatInterface from "./ChatAi";

function PythagorasTheorem() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("theory");
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");
  const [quizAnswers, setQuizAnswers] = useState({});
  const [score, setScore] = useState(null);

  const experiment = {
    title: "Pythagoras' Theorem",
    theory: (
      <>
        <h2 className="text-xl font-bold mt-4">Aim</h2>
        <p>
          To understand and apply Pythagoras' Theorem, which defines the
          relationship between the sides of a right-angled triangle.
        </p>

        <h2 className="text-xl font-bold mt-4">Theory</h2>
        <p>
          Pythagoras' Theorem states that in a right-angled triangle, the square
          of the length of the hypotenuse is equal to the sum of the squares of
          the lengths of the other two sides.
        </p>
        <p>
          This fundamental theorem in geometry helps in determining the length
          of a missing side in a right-angled triangle.
        </p>
        <p>
          - Hypotenuse (c): The longest side of the right-angled triangle,
          opposite the right angle.
        </p>
        <p>
          - Legs (a, b): The two shorter sides that form the right angle.
        </p>
        <p>- Right Angle (90°): The angle between the two legs.</p>

        <h2 className="text-xl font-bold mt-4">Mathematical Model</h2>
        <p>The mathematical expression of Pythagoras' Theorem is:</p>
        <p className="text-center font-mono bg-gray-100 p-2 rounded-md">
          a² + b² = c²
        </p>
        <p>
          - a: One leg of the triangle <br />
          - b: The other leg of the triangle <br />
          - c: The hypotenuse (longest side)
        </p>

        <h2 className="text-xl font-bold mt-4">Applications</h2>
        <p>
          - Calculating distances in navigation and construction <br />
          - Designing ramps, stairs, and roofs <br />
          - Used in GPS and mapping systems <br />- Solving problems in physics,
          engineering, and architecture
        </p>
      </>
    ),
    procedure: [
      "Access the Pythagoras simulator: Open the virtual Pythagorean theorem simulation software or website and ensure it is functioning correctly.",
      "Familiarize with the interface: Explore the simulator’s tools, such as the grid, triangle creator, measurement tools, and calculation features.",
      "Create a right-angled triangle: Use the simulator to construct a right-angled triangle by selecting three points and ensuring one angle is exactly **90°*.",
      "Measure the triangle's sides: Identify and label the base (a), height (b), and hypotenuse (c) using the measurement tools.",
      "Apply the Pythagorean theorem: Verify that the sum of the squares of the two shorter sides equals the square of the hypotenuse (a² + b² = c²*).",
      "Test different triangle sizes: Create triangles of varying side lengths and confirm that the Pythagorean theorem holds for each case.",
      "Compare calculated and measured values: Use the simulator’s calculator to compute the hypotenuse using the formula and compare it with the measured length.",
      "Modify the triangle: Adjust the lengths of a and b and observe how the hypotenuse c changes accordingly.",
      "Explore real-world applications: Use the simulator to simulate real-world scenarios where the Pythagorean theorem is applied, such as finding distances.",
      "Visualize the theorem graphically: Check if the simulator allows visualization by representing a², b², and c² as squares on the triangle’s sides.",
      "Analyze sources of error: Consider limitations of the simulation, such as rounding errors, digital approximations, and the lack of real-world constraints.",
      "Document findings: Compile observations, side measurements, calculations, and conclusions based on the simulator’s output.",
    ],
    queries: "/assets/pythagoras-animation.gif",
    video: "https://www.youtube.com/embed/YompsDlEdtc",
    resources: [
      {
        title: "Pythagoras Theorem - Khan Academy",
        link: "https://www.khanacademy.org",
      },
      {
        title: "Pythagoras Theorem - Wikipedia",
        link: "https://en.wikipedia.org/wiki/Pythagorean_theorem",
      },
    ],
    feedback: "Please share your feedback on this experiment!",
    quiz: [
      {
        question: "What is the formula for Pythagoras' theorem?",
        options: [
          "a² + b² = c²",
          "a² - b² = c²",
          "a² + c² = b²",
          "a² * b² = c²",
        ],
        answer: "a² + b² = c²",
      },
      {
        question: "What type of triangle does Pythagoras' theorem apply to?",
        options: ["Equilateral", "Isosceles", "Scalene", "Right-angled"],
        answer: "Right-angled",
      },
      {
        question:
          "If a right-angled triangle has sides 3 and 4, what is the hypotenuse?",
        options: ["5", "6", "7", "4.5"],
        answer: "5",
      },
      {
        question:
          "Which of the following is an example of a Pythagorean triplet?",
        options: ["3, 4, 5", "2, 3, 4", "5, 6, 7", "7, 8, 10"],
        answer: "3, 4, 5",
      },
      {
        question: "What is the hypotenuse in a triangle with sides 6 and 8?",
        options: ["10", "12", "14", "8"],
        answer: "10",
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
      from_name: "Vision Lab Experiment - Pythagoras' Theorem",
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
        onClick={() => navigate("/math")}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Math
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
              Pythagoras Theorem Experiment
            </h2>

            <div className="mb-6 p-4 bg-blue-100 rounded-lg">
              <h3 className="text-lg font-medium text-blue-800 mb-2">
                Objectives
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>
                  Understand the relationship between the sides of a
                  right-angled triangle
                </li>
                <li>Verify the Pythagorean Theorem through measurements</li>
                <li>Apply the theorem to solve real-world problems</li>
              </ul>
            </div>

            <div className="mb-6 p-4 bg-blue-100 rounded-lg">
              <h3 className="text-lg font-medium text-blue-800 mb-2">
                Required Materials
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Graph Paper
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Ruler
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Compass
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm text-gray-700">
                  Protractor
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
                <li>Handle sharp tools like the compass and ruler carefully</li>
                <li>Use a flat surface for accurate measurements</li>
                <li>Ensure correct alignment when drawing triangles</li>
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
                  The square of the hypotenuse equals the sum of the squares of
                  the other two sides
                </li>
                <li>
                  Triangles drawn according to the theorem will be right-angled
                </li>
                <li>
                  Results will be consistent with theoretical calculations
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
                      <th className="border border-blue-200 p-2">Triangle</th>
                      <th className="border border-blue-200 p-2">Side A</th>
                      <th className="border border-blue-200 p-2">Side B</th>
                      <th className="border border-blue-200 p-2">Hypotenuse</th>
                      <th className="border border-blue-200 p-2">
                        Verification
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {["Triangle 1", "Triangle 2", "Triangle 3"].map(
                      (triangle, index) => (
                        <tr key={index}>
                          <td className="border border-blue-200 p-2">
                            {triangle}
                          </td>
                          <td className="border border-blue-200 p-2"></td>
                          <td className="border border-blue-200 p-2"></td>
                          <td className="border border-blue-200 p-2"></td>
                          <td className="border border-blue-200 p-2"></td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "queries" && (
          <div>
            <ChatInterface experiment="ph scale simulator" />
          </div>
        )}

        {activeTab === "simulation" && <Pythagoras />}

        {activeTab === "video" && (
          <iframe
            width="100%"
            height="600"
            src={experiment.video}
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

export default PythagorasTheorem;
