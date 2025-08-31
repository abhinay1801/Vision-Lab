import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HelpBubbleSort from "./HelpBubbleSort";
import ChatInterface from "./ChatAi";

function BubbleSortExperiment() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("theory");
  const [quizAnswers, setQuizAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");

  const experiment = {
    title: "Bubble Sort Simulator",
    theory: (
        <>
            <h2 className="text-xl font-bold mt-4">Aim</h2>
            <p>To understand and implement the Bubble Sort algorithm.</p>
    
            <h2 className="text-xl font-bold mt-4">Theory</h2>
            <p>
                <strong>Definition:</strong> Bubble sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.
            </p>
            <p>
                <strong>Working of Bubble Sort:</strong>
            </p>
            <ol className="list-decimal pl-5">
                <li>Start from the first element of the array.</li>
                <li>Compare the current element with the next element.</li>
                <li>If the current element is greater than the next element, swap them.</li>
                <li>Move to the next element and repeat steps 2 and 3.</li>
                <li>Repeat the process for the entire array until no more swaps are needed.</li>
            </ol>
            <p>
                <strong>Algorithm (Pseudo Code):</strong>
            </p>
            <ul className="list-disc pl-5 bg-gray-200 p-2 rounded-md">
                <li>
                    <pre className="bg-gray-100 p-2 rounded">
                        <code>
                            {`function BubbleSort(arr) {`}
                            {"\n    let n = arr.length;"}
                            {"\n    for (let i = 0; i < n - 1; i++) {"}
                            {"\n        for (let j = 0; j < n - i - 1; j++) {"}
                            {"\n            if (arr[j] > arr[j + 1]) {"}
                            {"\n                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // Swap"}
                            {"\n            }"}
                            {"\n        }"}
                            {"\n    }"}
                            {"\n}"}
                        </code>
                    </pre>
                </li>
            </ul>
            <p>
                <strong>Time Complexity:</strong>
            </p>
            <ul className="list-disc pl-5">
                <li>Best Case: O(n) - When the array is already sorted.</li>
                <li>Worst Case: O(n²) - When the array is sorted in reverse order.</li>
                <li>Average Case: O(n²) - Due to nested loops.</li>
            </ul>
            <p>
                <strong>Space Complexity:</strong> O(1) (Constant space) as sorting is done in place.
            </p>
            <p>
                <strong>Advantages:</strong>
            </p>
            <ul className="list-disc pl-5">
                <li>Simple to implement.</li>
                <li>Does not require extra memory.</li>
            </ul>
            <p>
                <strong>Disadvantages:</strong>
            </p>
            <ul className="list-disc pl-5">
                <li>Inefficient for large datasets.</li>
                <li>Slower compared to advanced sorting algorithms like QuickSort and MergeSort.</li>
            </ul>
            <p>
                <strong>Use Cases:</strong>
            </p>
            <ul className="list-disc pl-5">
                <li>When teaching sorting algorithms due to its simplicity.</li>
                <li>When working with small datasets where performance is not a concern.</li>
                <li>When memory space is limited and an in-place sorting algorithm is required.</li>
            </ul>
        </>
    ),
    
    procedure: [
      "Start with an unsorted array of elements.",
      "Compare each pair of adjacent elements.",
      "Swap them if they are in the wrong order.",
      "Repeat the process for all elements until the array is sorted.",
    ],
    video: "https://www.youtube.com/embed/bubbleSortVideo",
    resources: [
      { title: "Bubble Sort - GeeksforGeeks", link: "https://www.geeksforgeeks.org/bubble-sort/" },
      { title: "Bubble Sort - Wikipedia", link: "https://en.wikipedia.org/wiki/Bubble_sort" },
    ],
  };

  const quizQuestions = [
    {
      question: "What is the worst-case time complexity of Bubble Sort?",
      options: ["O(n)", "O(log n)", "O(n²)", "O(n log n)"],
      correct: "O(n²)",
    },
    {
      question: "Bubble Sort is best suited for which of the following cases?",
      options: ["Small datasets", "Large datasets", "Reverse-sorted data", "Randomly ordered data"],
      correct: "Small datasets",
    },
    {
      question: "How many passes does Bubble Sort take in the best case?",
      options: ["n", "n-1", "1", "log n"],
      correct: "1",
    },
    {
      question: "What happens if the array is already sorted?",
      options: ["No swaps occur", "Extra passes are required", "Algorithm breaks", "Time complexity increases"],
      correct: "No swaps occur",
    },
    {
      question: "What is the main drawback of Bubble Sort?",
      options: ["High space complexity", "Slow performance on large lists", "Requires additional data structures", "Does not guarantee sorting"],
      correct: "Slow performance on large lists",
    },
  ];

  const handleQuizChange = (questionIndex, answer) => {
    setQuizAnswers({ ...quizAnswers, [questionIndex]: answer });
  };

  const submitQuiz = () => {
    let totalScore = 0;
    quizQuestions.forEach((q, index) => {
      if (quizAnswers[index] === q.correct) totalScore++;
    });
    setScore(totalScore);
  };
  const sendFeedback = (e) => {
    e.preventDefault();
    if (!feedback.trim()) {
        setMessage("Please enter your feedback before submitting.");
        return;
    }

    emailjs
        .send("service_0updalp", "template_gga1aol", {
            user_name: "Administrator",
            user_email: "your-email@example.com",
            from_name: "Vision Lab Experiment - Linear Search Simulator",
            message: feedback,
        }, "eQ_JCPczgpDZ1uk7d")
        .then(() => {
            setMessage("Thank you for your feedback!");
            setFeedback("");
        })
        .catch(() => setMessage("Error sending feedback. Please try again."));
};

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/computerscience")}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Computer Science
      </button>
      <h1 className="text-3xl font-bold text-orange-600 mb-4">
        {experiment.title}
      </h1>
      <div className="flex gap-4 mb-6 border-b pb-2">
        {["theory", "procedure", "simulation", "video","queries", "resources", "quiz","feedback"].map((tab) => (
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
        {activeTab === "theory" && <div>{experiment.theory}</div>}
        {activeTab === "procedure" && (
          <ol className="list-decimal pl-5">
            {experiment.procedure.map((step, index) => (
              <li key={index} className="mb-2">{step}</li>
            ))}
          </ol>
        )}
        {activeTab === "simulation" && <HelpBubbleSort />}
        {activeTab === "queries" && <ChatInterface experiment="linear search" />}
        {activeTab === "video" && (
          <iframe
            width="100%"
            height="400"
            src={experiment.video}
            title="Bubble Sort Video"
            className="rounded-md"
            allowFullScreen
          ></iframe>
        )}
        {activeTab === "resources" && (
          <ul className="list-disc pl-5">
            {experiment.resources.map((res, i) => (
              <li key={i}>
                <a href={res.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {res.title}
                </a>
              </li>
            ))}
          </ul>
        )}
        {activeTab === "quiz" && (
          <div>
            {quizQuestions.map((q, index) => (
              <div key={index} className="mb-4">
                <p className="font-bold">{index+1}.{q.question}</p>
                {q.options.map((option) => (
                  <label key={option} className="block">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      onChange={() => handleQuizChange(index, option)}
                    /> {option}
                  </label>
                ))}
              </div>
            ))}
            <button onClick={submitQuiz} className="bg-blue-600 text-white px-4 py-2 rounded-md">Submit Quiz</button>
            {score !== null && <p className="mt-4 font-bold">Your Score: {score}/5</p>}
          </div>
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
      </div>
    </div>
  );
}

export default BubbleSortExperiment;
