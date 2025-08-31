import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Chemistry() {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState("All");

  const experiments = [
    // Existing Experiments
    {
      title: "Acid-Base Titration",
      class: "8th Class",
      category: "Analytical Chemistry",
      theory:
        "Determine the concentration of an unknown acid or base using titration.",
      image:
        "https://imgs.search.brave.com/Q5sncTBgXGmXuebRGf37N_VmYx-bYGesQbqIntayoUI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wcmFj/dGljYWwtc2NpZW5j/ZS5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMTcvMDcvdGl0/cmF0aW9uLnBuZz93/PTgwMCZoPTQxMg",
    },
    {
      title: "Electrolysis of Water",
      class: "8th Class",
      category: "Electrochemistry",
      theory:
        "Decompose water into hydrogen and oxygen gases using electrical energy.",
      image: "https://i.makeagif.com/media/6-04-2019/CKarn5.gif",
    },
    {
      title: "Realistic Cylinder Bowl Experiment",
      class: "8th Class",
      category: "Electrochemistry",
      theory:
        "Decompose water into hydrogen and oxygen gases using electrical energy.",
      image: "https://i.ytimg.com/vi/rflWPVE_XtY/maxresdefault.jpg",
    },
    {
      title: "Separation of Mixtures",
      class: "7th Class",
      category: "Practical Chemistry",
      theory:
        "Demonstrate various methods of separating mixtures including handpicking, sieving, winnowing, and magnetic separation.",
      image:
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgtXTOxuhxyuqpsINpGaKXChnAoEDkaoaOzpvFkeivSHR65fa2CeJ93b8Xp6vVwbQvJt9jgs_bkkP9fKA3M1aMOoD_1P8YDAF0qnjBxd0KeoKKT4Jea71ysbPalmhSfb0eJ9Qe48bOCneBN/s700/sep102.gif",
    },
    {
      title: "pH Scale Simulator",
      class: "7th Class",
      category: "Acid-Base Chemistry",
      theory:
        "Understand the pH levels of different solutions and mix them to observe changes in acidity and alkalinity.",
      image:
        "https://img.freepik.com/free-vector/hand-drawn-ph-scale-infographic_23-2150294094.jpg?t=st=1741251154~exp=1741254754~hmac=2bdab59e4d71d21831d5d238b4f74e5a907b7c96b8e8bd797b6d2c4cc78e97fb&w=996",
    },

    // NCERT 7th Class Experiments

    {
      title: "Water Purification Techniques",
      class: "9th Class",
      category: "Environmental Chemistry",
      theory:
        "Explore different methods of water purification including filtration, boiling, and chemical treatment.",
      image:
        "https://cdn.myportfolio.com/cde743a9e80f16ac017e7b053fad2e74/7b1a0b5a-b69f-4184-80fe-499e3f894872_rw_1920.gif?h=9ca16283bb819fcf7beb5b2624df599d",
    },

    // NCERT 8th Class Experiments
    {
      title: "Acid-Base Indicators",
      class: "8th Class",
      category: "Acid-Base Chemistry",
      theory:
        "Use natural and synthetic indicators to identify acidic and basic solutions.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4llR7udEyVwzi-5UcsQiy4a7AVz96-Hu1UA&s",
    },
    {
      title: "Chemical Reactions and Observations",
      class: "8th Class",
      category: "Chemical Reactions",
      theory:
        "Observe and classify different types of chemical reactions including combination, decomposition, and displacement reactions.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSXp_9OvbHc8-SFimjjZ6Yx09oe5Jr8PJgxA&s",
    },
    {
      title: "Metals and Non-Metals",
      class: "8th Class",
      category: "Elemental Chemistry",
      theory:
        "Investigate physical and chemical properties of metals and non-metals through various experiments.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIDMQ5OJoOL12PTQOHZ8ftlzVOVfFGl7XhdQ&s",
    },

    // NCERT 9th Class Experiments

    {
      title: "Chemical Reactions and Equations",
      class: "9th Class",
      category: "Reaction Balancing",
      theory:
        "Write and balance chemical equations, understand conservation of mass in chemical reactions.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI43Mepb5BoaMs3Co-wS1VcSXi65PzA3P31g&s",
    },

    // NCERT 10th Class Experiments
    {
      title: "Acids, Bases, and Salts",
      class: "10th Class",
      category: "Chemical Reactions",
      theory:
        "Investigate properties of acids, bases, and salts through various experimental techniques.",
      image:
        "https://www.shutterstock.com/image-vector/vector-illustration-electrolytic-dissociation-molecules-600nw-2177370983.jpg",
    },
    {
      title: "Iron Copper Sulphate Reaction",
      class: "10th Class",
      category: "Chemical Reactions",
      theory:
        "Investigate properties of acids, bases, and salts through various experimental techniques.",
      image:
        "https://generic.wordpress.soton.ac.uk/discoverelectrochemistry/wp-content/uploads/sites/313/2020/09/Daniell-Cell-with-salt-bridge.gif",
    },
    {
      title: "Periodic Classification of Elements",
      class: "10th Class",
      category: "Elemental Chemistry",
      theory:
        "Explore the periodic table, understand element classification, and periodic trends.",
      image:
        "https://media4.giphy.com/media/eNYe5fkB63We8jRhvP/200w.gif?cid=6c09b952eopiz3tj9n53h0yd6jddghuwvxu8jqy9lo9pvkvk&ep=v1_gifs_search&rid=200w.gif&ct=g",
    },
    {
      title: "Types of Substances",
      class: "7th Class",
      category: "Material Classification",
      theory:
        "Identify and classify different types of substances based on their physical and chemical properties.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeHsG5ZUHgKMJahi45NCLOja7XEsRAD8tSKg&s",
    },
    {
      title: "Plant Parts Identification",
      class: "7th Class",
      category: "Biology",
      theory: "Explore and identify different parts of plants through hands-on dissection and microscopic observation.",
      image: "https://i.gifer.com/9Yaj.gif"
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

        {/* Chemistry Page Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Chemistry Virtual Laboratory
          </h1>
          <p className="text-gray-600 mb-6">
            Welcome to the Chemistry Virtual Lab! Perform various chemistry
            experiments in a simulated environment. These virtual experiments
            help you understand chemistry concepts better through practical
            application.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <h3 className="font-bold text-xl mb-2">Experiments</h3>
              <p className="text-gray-600">
                Comprehensive collection of chemistry experiments.
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
                      className="w-full h-56 object-cover rounded-lg border-4 border-gray-500 shadow-lg"
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <div className="mb-4">
                      <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded">
                        {experiment.category}
                      </span>
                      <span className="ml-2 bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded">
                        {experiment.class}
                      </span>
                    </div>

                    <h2 className="text-2xl font-bold mb-4">
                      {experiment.title}
                    </h2>
                    <p className="text-gray-600 mb-4">{experiment.theory}</p>

                    <button
                      onClick={() =>
                        navigate(
                          `/chemistry/${formatTitleForURL(experiment.title)}`
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

export default Chemistry;
