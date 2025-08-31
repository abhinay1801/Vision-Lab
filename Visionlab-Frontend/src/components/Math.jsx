import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Math() {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState("All");

  const experiments = [
    {
      title: "Pythagorean Theorem",
      class: "8th Class",
      category: "Geometry",
      theory: "Verify the Pythagorean theorem using a right triangle.",
      image:
        "https://www.mathwarehouse.com/animated-gifs/images/pythagorean-theorem-sum-of-squares-demonstration-gif.gif",
      procedures: [
        "Draw a right triangle with known side lengths.",
        "Calculate the hypotenuse using a² + b² = c².",
        "Measure the hypotenuse and compare with the calculation.",
        "Analyze the results and confirm the theorem.",
      ],
    },
    {
      title: "Interest Calculator",
      class: "9th Class",
      category: "Geometry",
      theory: "Calculate and understand the volume of a cylinder.",
      image:
        "https://i.pinimg.com/originals/7d/95/56/7d95564c160833d13873f91ef36eb39d.gif",
      procedures: [
        "Measure the radius and height of a cylinder.",
        "Apply the formula V = πr²h.",
        "Calculate the volume using precise measurements.",
        "Compare theoretical and experimental results.",
      ],
    },
    {
      title: "Area Perimeter Calculator ",
      class: "8th Class",
      category: "Statistics",
      theory: "Analyze probability outcomes using dice rolls.",
      image:
        "https://www.mathwarehouse.com/animated-gifs/images/surface-area-of-cylinder-animation.gif",
      procedures: [
        "Roll a die 50 times and record the outcomes.",
        "Calculate the probability of each number appearing.",
        "Compare the experimental results with theoretical probability.",
        "Discuss factors affecting probability.",
      ],
    },
    {
      title: "Quadratic Equation Analyzer",
      class: "10th Class",
      category: "Statistics",
      theory: "Understand mean, median, and mode through data analysis.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIARCDYmgz9olKVlyvm3R9a-mI88JA7PqTPQ&s",
      procedures: [
        "Collect a set of numerical data.",
        "Calculate mean, median, and mode.",
        "Compare the different measures of central tendency.",
        "Discuss when each measure is most appropriate.",
      ],
    },
    {
      title: "Triangle Similarity",
      class: "9th Class",
      category: "Geometry",
      theory: "Investigate the properties of similar triangles.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEd_b-uZqeNtWaqmy-iwtUfNk38FNEhWQ5Ug&s",
      procedures: [
        "Draw two similar triangles.",
        "Compare their corresponding angles.",
        "Verify the proportionality of their sides.",
        "Calculate scale factor between the triangles.",
      ],
    },
    {
      title: "Trigonometric Ratios",
      class: "10th Class",
      category: "Trigonometry",
      theory: "Understand and apply trigonometric ratios in right triangles.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/3/3b/Circle_cos_sin.gif",
      procedures: [
        "Construct right triangles with different angle measurements.",
        "Calculate sine, cosine, and tangent for various angles.",
        "Verify trigonometric relationships.",
        "Apply ratios to solve real-world problems.",
      ],
    },
    // New Experiments
    {
      title: "Volume and Surface Area of Spheres",
      class: "8th Class",
      category: "Geometry",
      theory: "Explore the relationship between the volume and surface area of spheres.",
      image:
        "https://media.geeksforgeeks.org/wp-content/uploads/20230320122453/Surface-of-Sphere-gif.gif",
      procedures: [
        "Measure the radius of a spherical object (e.g., ball).",
        "Calculate surface area using the formula 4πr².",
        "Calculate volume using the formula (4/3)πr³.",
        "Compare theoretical and experimental values using real objects.",
      ],
    },
    {
      title: "Graphing Linear Equations",
      class: "9th Class",
      category: "Algebra",
      theory: "Understand the graphical representation of linear equations.",
      image:
        "https://mrkylebrown.weebly.com/uploads/2/3/0/6/23068672/772359551_orig.gif",
      procedures: [
        "Select a linear equation (e.g., y = 2x + 3).",
        "Create a table of values for different x values.",
        "Plot the points on a graph and draw the line.",
        "Analyze slope and y-intercept of the equation.",
      ],
    },
    {
      title: "Probability in head Games",
      class: "10th Class",
      category: "Probability",
      theory: "Analyze the probability of drawing specific cards from a deck.",
      image:
        "https://media.geeksforgeeks.org/wp-content/uploads/20230527151013/Coin-toss-gif-(1).gif",
      procedures: [
        "Shuffle a standard deck of 52 playing cards.",
        "Randomly draw a card and record the outcome.",
        "Calculate the probability of drawing a specific suit or number.",
        "Compare experimental probability with theoretical probability.",
      ],
    },
  ];


  // Convert experiment titles into URL-friendly format
  const formatTitleForURL = (title) => title.toLowerCase().replace(/\s+/g, "-");

  const filteredExperiments =
    selectedClass === "All"
      ? experiments
      : experiments.filter((exp) => exp.class === selectedClass);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/home")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
          aria-label="Back to Home"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        {/* Math Page Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-3xl font-bold mb-4">Math Virtual Laboratory</h1>
          <p className="text-gray-600 mb-6">
            Explore mathematical concepts through interactive simulations,
            helping students visualize and understand formulas better.
          </p>

          {/* Class Filter Buttons */}
          <div className="flex gap-4 mb-8">
            {["All", "8th Class", "9th Class", "10th Class"].map(
              (classOption) => (
                <button
                  key={classOption}
                  onClick={() => setSelectedClass(classOption)}
                  className={`px-4 py-2 rounded-md font-semibold ${
                    selectedClass === classOption
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-blue-100"
                  }`}
                >
                  {classOption}
                </button>
              )
            )}
          </div>
        </div>

        {/* Experiment List */}
        <div className="space-y-8">
          {filteredExperiments.length > 0 ? (
            filteredExperiments.map((experiment, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] hover:-translate-y-2 transition-all duration-300 ease-in-out overflow-hidden"
              >
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={experiment.image}
                      alt={experiment.title}
                      className="w-full h-40 md:h-48 lg:h-56 object-cover rounded-lg border-4 border-gray-500 shadow-lg"
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    {/* Experiment Category and Class */}
                    <div className="mb-4">
                      <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded">
                        {experiment.category}
                      </span>
                      <span className="ml-2 bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded">
                        {experiment.class}
                      </span>
                    </div>

                    {/* Experiment Title & Theory */}
                    <h2 className="text-2xl font-bold mb-4">
                      {experiment.title}
                    </h2>
                    <p className="text-gray-600 mb-4">{experiment.theory}</p>

                    {/* Start Experiment Button */}
                    <button
                      onClick={() =>
                        navigate(`/math/${formatTitleForURL(experiment.title)}`)
                      }
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Start Experiment
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">
              No experiments available for the selected class.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Math;
