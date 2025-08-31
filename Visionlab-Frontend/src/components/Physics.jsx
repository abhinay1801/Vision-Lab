import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Physics() {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState("All");

  const experiments = [
    // 7th Class Experiments
    {
      title: "Refraction",
      class: "10th Class",
      category: "Optics",
      theory:
        "Study the phenomenon of light refraction and dispersion using a glass prism.",
      image:
        "https://i.pinimg.com/originals/a9/0e/a7/a90ea7849edc28ba3547e36287a424a9.gif",
    },
    
    {
      title: "Simple Pendulum",
      class: "10th Class",
      category: "Oscillations",
      theory:
        "Study the motion of a simple pendulum and calculate acceleration due to gravity.",
      image:
        "https://i.pinimg.com/originals/1c/e2/de/1ce2de2710c8176c2a64fb4a0ec2413b.gif",
    },
    {
      title: "Reflection",
      class: "7th Class",
      category: "Measurement",
      theory:
        "Learn to measure the length of various objects using different measuring instruments with precision.",
      image: "https://media.tenor.com/VTLXGOL17m4AAAAM/light-reflection.gif",
    },

    // 8th Class Experiments
    {
      title: "Ohm's Law",
      class: "8th Class",
      category: "Electricity and Magnetism",
      theory:
        "Study the relationship between voltage, current, and resistance in electrical circuits.",
      image:
        "https://blogger.googleusercontent.com/img/a/AVvXsEimMupg1EhQ7i_JvTurOMlaAh0rNKN5YWey37wEbZTz7mIPI3kFGHopZ_4bjgyxmAruFD4LRxivj8qfRW01ueQoMAtg9hKcBfOpz2j7Ur94xZswv0SZcFpdfGbxAXEKj_lvP32nm-kPnO7pzjLodCKkP5MsR-k9UMcVvouRf6bnx61qz_QpGjG2NhbA=w640-h360-rw",
    },
    {
      title: "Series and Parallel Circuits",
      class: "8th Class",
      category: "Electricity",
      theory:
        "Understand the difference between series and parallel electrical circuits and their characteristics.",
      image:
        "https://i.pinimg.com/originals/31/53/d9/3153d945340446501f145fd556e04f40.gif",
    },

    // 9th Class Experiments
    {
      title: "Verification of Hooke's Law",
      class: "9th Class",
      category: "Mechanics",
      theory:
        "Investigate the relationship between force and extension in a spring.",
      image:
        "https://imgs.search.brave.com/zj2H6zc3M8-1DSp2Ahn7QCzCg5W6D2KP8QnWOXcJy7k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuZWRyYXdtYXgu/Y29tL2FydGljbGUv/c2NpZW5jZS1kaWFn/cmFtcy9ob29rZSdz/LWxhdy9ob29rZXMt/bGF3LWRpYWdyYW0u/anBn",
    },
    {
      title: "Velocity of a Pulse in a String",
      class: "9th Class",
      category: "Waves",
      theory:
        "Determine the velocity of wave propagation in a stretched string or medium.",
      image: "https://ophysics.com/images/pulses.gif",
    },

    // 10th Class Experiments
    {
      title: "Focal Length of Concave and Convex Mirrors",
      class: "10th Class",
      category: "Optics",
      theory:
        "Determine the focal length of concave and convex mirrors using experimental methods.",
      image:
        "https://www.physics.louisville.edu/cldavis/phys299/notes/lo_sm_anim2.gif",
    },
    {
      title: "Density Determination",
      class: "7th Class", 
      category: "Physics",
      theory: "Calculate and compare the density of different solid objects using precise measurement techniques.",
      image: "https://www.docbrown.info/ephysics/ephyspics/density1.gif"
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

        {/* Physics Page Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Physics Virtual Laboratory
          </h1>
          <p className="text-gray-600 mb-6">
            Welcome to the Physics Virtual Lab! Here you can perform various
            physics experiments in a simulated environment. These virtual
            experiments help you understand physics concepts through practical
            applications.
          </p>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <h3 className="font-bold text-xl mb-2">Experiments</h3>
              <p className="text-gray-600">
                Comprehensive collection of physics experiments.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <h3 className="font-bold text-xl mb-2">Real-time Simulation</h3>
              <p className="text-gray-600">
                Interactive virtual lab environment.
              </p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg text-center">
              <h3 className="font-bold text-xl mb-2">Detailed Theory</h3>
              <p className="text-gray-600">Complete theoretical background.</p>
            </div>
          </div>

          {/* Class Filter Buttons */}
          <div className="flex gap-4 mb-8">
            {["All", "7th Class", "8th Class", "9th Class", "10th Class"].map(
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
                    {/* Experiment Category */}
                    <div className="mb-4">
                      <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded">
                        {experiment.category}
                      </span>
                      {/* Add class tag */}
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
                        navigate(
                          `/physics/${formatTitleForURL(experiment.title)}`
                        )
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

export default Physics;
