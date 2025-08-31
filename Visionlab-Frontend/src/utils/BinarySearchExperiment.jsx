import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import HelpBinarySearch from "./HelpBinarySearch";
import ChatInterface from "./ChatAi";

function BinarySearchExperiment() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("theory");
    const [quizAnswers, setQuizAnswers] = useState({});
    const [score, setScore] = useState(null);
     const [feedback, setFeedback] = useState("");
    const [message, setMessage] = useState("");

    const experiment = {
        title: "Binary Search Simulator",
        theory: (
            <>
                <h2 className="text-xl font-bold mt-4">Aim</h2>
                <p>To understand and implement the Binary Search algorithm.</p>
        
                <h2 className="text-xl font-bold mt-4">Theory</h2>
                <p>
                    <strong>Definition:</strong> Binary search is an efficient searching algorithm used to find the position of a target element in a sorted list or array. It works by repeatedly dividing the search interval in half until the target element is found or the interval becomes empty.
                </p>
                <p>
                    <strong>Working of Binary Search:</strong>
                </p>
                <ol className="list-decimal pl-5">
                    <li>Ensure the array is sorted.</li>
                    <li>Set two pointers: one at the start (low) and one at the end (high) of the array.</li>
                    <li>Find the middle element of the current search range.</li>
                    <li>If the middle element matches the target, return its index.</li>
                    <li>If the target is smaller than the middle element, search the left half by updating the high pointer.</li>
                    <li>If the target is larger than the middle element, search the right half by updating the low pointer.</li>
                    <li>Repeat steps 3–6 until the element is found or the search range is empty.</li>
                    <li>If the element is not present, return -1.</li>
                </ol>
                <p>
                    <strong>Algorithm (Pseudo Code):</strong>
                </p>
                <ul className="list-disc pl-5 bg-gray-200 p-2 rounded-md">
                    <li>
                        <pre className="bg-gray-100 p-2 rounded">
                            <code>
                                {`function BinarySearch(arr, target) {`}
                                {"\n    let low = 0, high = arr.length - 1;"}
                                {"\n    while (low <= high) {"}
                                {"\n        let mid = Math.floor((low + high) / 2);"}
                                {"\n        if (arr[mid] === target) {"}
                                {"\n            return mid; // Target found"}
                                {"\n        } else if (arr[mid] < target) {"}
                                {"\n            low = mid + 1; // Search right half"}
                                {"\n        } else {"}
                                {"\n            high = mid - 1; // Search left half"}
                                {"\n        }"}
                                {"\n    }"}
                                {"\n    return -1; // Target not found"}
                                {"\n}"}
                            </code>
                        </pre>
                    </li>
                </ul>
                <p>
                    <strong>Time Complexity:</strong>
                </p>
                <ul className="list-disc pl-5">
                    <li>Best Case: O(1) - When the element is found at the middle position.</li>
                    <li>Worst Case: O(log n) - When the search continues until the array is exhausted.</li>
                    <li>Average Case: O(log n) - As the search space halves in each iteration.</li>
                </ul>
                <p>
                    <strong>Space Complexity:</strong> O(1) (Constant space) for iterative implementation, O(log n) for recursive implementation due to function call stack.
                </p>
                <p>
                    <strong>Advantages:</strong>
                </p>
                <ul className="list-disc pl-5">
                    <li>Much faster than linear search, especially for large datasets.</li>
                    <li>Efficient with a time complexity of O(log n).</li>
                </ul>
                <p>
                    <strong>Disadvantages:</strong>
                </p>
                <ul className="list-disc pl-5">
                    <li>Requires the array to be sorted beforehand.</li>
                    <li>Not suitable for dynamic datasets where frequent insertions and deletions occur.</li>
                </ul>
                <p>
                    <strong>Use Cases:</strong>
                </p>
                <ul className="list-disc pl-5">
                    <li>When searching large datasets efficiently.</li>
                    <li>When the data is already sorted.</li>
                    <li>For applications like searching in dictionaries, phonebooks, and databases.</li>
                </ul>
            </>
        ),
        procedure: [
            "Start with a sorted array and a target element.",
            "Find the middle element of the array.",
            "If the middle element matches the target, return its index.",
            "If the target is smaller, repeat on the left half; if larger, repeat on the right half.",
            "Continue until the target is found or the search space is empty.",
        ],
        video: "https://www.youtube.com/embed/binarySearchVideo",
        resources: [
            { title: "Binary Search - GeeksforGeeks", link: "https://www.geeksforgeeks.org/binary-search/" },
            { title: "Binary Search - Wikipedia", link: "https://en.wikipedia.org/wiki/Binary_search_algorithm" },
        ],
    };

    const quizQuestions = [
        {
            question: "What is the worst-case time complexity of Binary Search?",
            options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
            correct: "O(log n)",
        },
        {
            question: "What is a prerequisite for Binary Search to work?",
            options: ["Array must be sorted", "Array must be unsorted", "Array must contain unique elements", "Array size must be even"],
            correct: "Array must be sorted",
        },
        {
            question: "What happens if the target element is not found?",
            options: ["The algorithm returns -1", "The algorithm throws an error", "The algorithm crashes", "It returns the last element"],
            correct: "The algorithm returns -1",
        },
        {
            question: "Binary Search follows which algorithm paradigm?",
            options: ["Divide and Conquer", "Greedy Algorithm", "Brute Force", "Dynamic Programming"],
            correct: "Divide and Conquer",
        },
        {
            question: "What is the best-case time complexity of Binary Search?",
            options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
            correct: "O(1)",
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
                        className={`px-4 py-2 rounded-md ${activeTab === tab ? "bg-orange-300 font-bold" : "bg-gray-200"}`}
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
                {activeTab === "simulation" && <HelpBinarySearch />}
                {activeTab === "video" && (
                    <iframe
                        width="100%"
                        height="400"
                        src={experiment.video}
                        title="Binary Search Video"
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
                {activeTab === "queries" && <ChatInterface experiment="binary search" />}
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

export default BinarySearchExperiment;