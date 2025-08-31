import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import {
  Search,
  Beaker,
  Brain,
  Atom,
  Calculator,
  ChevronRight,
  Download,
  ChevronDown,
} from "lucide-react";
import Physics from "./components/Physics";
import Chemistry from "./components/Chemistry";
import ComputerScience from "./components/ComputerScience";
import Math from "./components/Math";

import Login from "./components/Login";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ElectrolysisExperiment from "./utils/ElectrolysisOfWater";
import PhScaleSimulator from "./utils/PhScaleSimulator";

import FeaturedSimulations from "./components/FeaturedSimulations";
import Reflection from "./utils/Reflection";
import Refraction from "./utils/Refraction";
import PythagorasTheorem from "./utils/Pythagoras";
import AcidBaseTitrationSimulator from "./utils/AcidBaseTitrationSimulator";
import OhmsLawSimulator from "./utils/OhmsLawExperiment";
import HookesLawExperiment from "./utils/HookesLawExperiment";
import SimplePendulumExperiment from "./utils/SimplePendulumExperiment";
import LinearSearchExperiment from "./utils/LinearSearchExperiment";
import BinarySearchExperiment from "./utils/BinarySearchExperiment";
import BubbleSortExperiment from "./utils/BubbleSort.Experiment";
import InterestCalculator from "./utils/InterestCalculator";
import QuadraticEquationAnalyzer from "./utils/QuadraticEquationAnalyzer";
import AreaPerimeterCalculator from "./utils/AreaPerimeterCalculator";
import Register from "./components/Register";
import RealisticCylinderBowlExperiment from "./utils/RealisticCylinderBowlExperiment";
import IronCopperSulphateExperiment from "./utils/IronCopperSulphateReaction";

function SimulationCard({ title, image, subject, grade }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="bg-blue-100 px-2 py-1 rounded">{subject}</span>
          <span className="bg-green-100 px-2 py-1 rounded">{grade}</span>
        </div>
      </div>
    </div>
  );
}

SimulationCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  grade: PropTypes.string.isRequired,
};

function DropdownMenu({ title, items }) {
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    const routeMap = {
      Physics: "/physics",
      Chemistry: "/chemistry",
      Math: "/math",
      ComputerScience: "/ComputerScience",
    };

    if (routeMap[item]) {
      navigate(routeMap[item]);
    }
  };

  return (
    <div className="relative group">
      <button
        className="flex items-center gap-2 text-white 
                   py-2 px-3 rounded-md 
                   transition-all duration-300 
                   hover:bg-white/20 
                   hover:shadow-lg 
                   hover:scale-105"
      >
        {title}
        <ChevronDown
          className="w-4 h-4 transition-transform duration-300 
                     group-hover:rotate-180"
        />
      </button>
      <div
        className="absolute top-full left-0 mt-4 w-64 
                   bg-white text-gray-800 
                   rounded-xl 
                   shadow-2xl 
                   border border-gray-200 
                   overflow-hidden 
                   transition-all duration-300 
                   opacity-0 invisible 
                   group-hover:opacity-100 group-hover:visible
                   transform origin-top 
                   scale-95 group-hover:scale-100"
      >
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => handleItemClick(item)}
            className="block w-full text-left px-4 py-3 
                       transition-all duration-300 
                       hover:bg-blue-100 
                       hover:text-blue-800 
                       hover:pl-6 
                       border-b border-gray-100 
                       last:border-b-0 
                       group/item"
          >
            <span className="transition-all duration-300 group-hover/item:ml-2">
              {item}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

DropdownMenu.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

function HomePage() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const dropdowns = {
    simulations: {
      title: "Simulations",
      items: ["Physics", "Chemistry", "Math", "ComputerScience"],
    },
    teachers: {
      title: "For Teachers",
      items: [
        "Teacher Tips",
        "Workshops",
        "Activity Ideas",
        "Browse Activities",
        "Submit Activity",
        "Virtual Workshop",
        "Professional Development",
      ],
    },
    support: {
      title: "Support",
      items: [
        "Help Center",
        "Troubleshooting",
        "Donate",
        "Technical Requirements",
        "Report a Problem",
        "Accessibility",
      ],
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#0B3F75] text-white relative z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 px-10">
                <Atom className="w-8 h-8" />
                <span className="text-2xl font-bold">VisionLab</span>
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div className="hidden md:flex items-center gap-4">
                <DropdownMenu
                  {...dropdowns.simulations}
                  isOpen={activeDropdown === "simulations"}
                  onToggle={() => toggleDropdown("simulations")}
                />
                <DropdownMenu
                  {...dropdowns.teachers}
                  isOpen={activeDropdown === "teachers"}
                  onToggle={() => toggleDropdown("teachers")}
                />
                <DropdownMenu
                  {...dropdowns.support}
                  isOpen={activeDropdown === "support"}
                  onToggle={() => toggleDropdown("support")}
                />
              </div>
            </div>
            <div className="md:hidden">
              <DropdownMenu
                {...dropdowns.simulations}
                isOpen={activeDropdown === "simulations"}
                onToggle={() => toggleDropdown("simulations")}
              />
            </div>
          </div>
        </div>
      </header>

      {activeDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setActiveDropdown(null)}
        />
      )}

      {/* Hero Section */}
      <div
        className="relative h-[400px] flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background_image.jpg')" }}
      >
        <div className="absolute inset-0  bg-opacity-40"></div>

        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-100">
            Interactive Simulations for Science and Math
          </h1>

          <button>
            <a
              href="#target-section"
              className="mt-4 inline-block px-6 py-3  bg-gray-100 text-black rounded-full text-lg font-bold hover:bg-gray-150 hover:text-black transition"
            >
              EXPLORE OUR SIMS
            </a>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-5" id="about">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#0B3F75]">About VisionLab</h1>
          <p className="text-gray-700 text-lg mt-4">
            VisionLab is an innovative virtual learning platform that provides
            interactive science and math simulations. We help students,
            teachers, and researchers explore STEM concepts through engaging
            digital experiments.
          </p>
        </div>

        <div className="bg-blue-100 p-8 rounded-lg shadow-md w-full mb-8 hidden md:block">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">Overview</h2>
          <p className="text-gray-700">
            VisionLab is designed to revolutionize STEM education by making
            science and math more interactive. Our platform allows students to
            visualize concepts, conduct experiments, and analyze results in a
            virtual lab environment.
          </p>
          <p className="text-gray-700 mt-4">Key Features of VisionLab:</p>
          <ul className="list-disc list-inside text-gray-700 mt-4">
            <li>
              interactive simulations covering physics, chemistry,
              ComputerScience, earth science, and math.
            </li>
            <li>
              Designed for students and teachers—ideal for classrooms and
              self-learning.
            </li>
            <li>Accessible from anywhere on desktop, mobile, and tablets.</li>
          </ul>
        </div>

        <div className="bg-green-100 p-8 rounded-lg shadow-md w-full mb-8 hidden md:block">
          <h2 className="text-3xl font-bold text-green-800 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700">
            Our mission is to transform STEM education by providing engaging,
            easy-to-use, and effective learning experiences.
          </p>
          <p className="text-gray-700 mt-4">What We Aim to Achieve:</p>
          <ul className="list-disc list-inside text-gray-700 mt-4">
            <li>Make science and math fun with interactive simulations.</li>
            <li>
              Bridge the gap between theory and practice through a realistic
              virtual lab.
            </li>
            <li>
              Ensure global access to education with free and low-cost solutions
              for schools.
            </li>
            <li>
              Support teachers with resources, including ready-to-use
              simulations and teaching guides.
            </li>
          </ul>
        </div>
      </div>
      {/* Subject Categories */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Browse by Subject
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Beaker className="w-8 h-8 text-purple-500" />
            <button onClick={() => navigate("/chemistry")}>
              <div>
                <h3 className="font-bold">Chemistry</h3>
                <p className="text-sm text-gray-600">simulations</p>
              </div>
            </button>
          </div>
          <div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Atom className="w-8 h-8 text-blue-500" />
            <button onClick={() => navigate("/physics")}>
              <div>
                <h3 className="font-bold">Physics</h3>
                <p className="text-sm text-gray-600">simulations</p>
              </div>
            </button>
          </div>
          <div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Brain className="w-8 h-8 text-green-500" />
            <button onClick={() => navigate("/ComputerScience")}>
              <div>
                <h3 className="font-bold">ComputerScience</h3>
                <p className="text-sm text-gray-600">simulations</p>
              </div>
            </button>
          </div>
          <div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <Calculator className="w-8 h-8 text-red-500" />
            <button onClick={() => navigate("/math")}>
              <div>
                <h3 className="font-bold">Math</h3>
                <p className="text-sm text-gray-600">simulations</p>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div id="target-section">
        <FeaturedSimulations />
      </div>
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">About VisionLab</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-blue-300">
                    Our Mission
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-300">
                    History
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-300">
                    Team
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-300">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div className="hidden md:block">
              <h3 className="font-bold text-lg mb-4">For Teachers</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-blue-300">
                    Teacher Tips
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-300">
                    Workshops
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-300">
                    Activity Ideas
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-300">
                    Research
                  </a>
                </li>
              </ul>
            </div>
            <div className="hidden md:block">
              <h3 className="font-bold text-lg mb-4">Support Us</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-blue-300">
                    Donate
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-300">
                    Volunteer
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-300">
                    Partners
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-300">
                    Sponsors
                  </a>
                </li>
              </ul>
            </div>
            <div className="hidden md:block">
              <h3 className="font-bold text-lg mb-4">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-blue-300">
                    Newsletter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-300">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-300">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-300">
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
            <p>
              &copy; 2025 VisionLab Interactive Simulations, CVR COLLEGE OF
              ENGINEERING
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/physics" element={<Physics />} />
          <Route path="/chemistry" element={<Chemistry />} />
          <Route path="/computerscience" element={<ComputerScience />} />
          <Route path="/math" element={<Math />} />

          <Route
            path="/math/pythagorean-theorem"
            element={<PythagorasTheorem />}
          />
          <Route
            path="/math/interest-calculator"
            element={<InterestCalculator />}
          />
          <Route
            path="/math/quadratic-equation-analyzer"
            element={<QuadraticEquationAnalyzer />}
          />
          <Route
            path="/math/area-perimeter-calculator-"
            element={<AreaPerimeterCalculator />}
          />

          <Route
            path="/chemistry/ph-scale-simulator"
            element={<PhScaleSimulator />}
          />
          <Route
            path="/chemistry/acid-base-titration"
            element={<AcidBaseTitrationSimulator />}
          />
          <Route
            path="/chemistry/realistic-cylinder-bowl-experiment"
            element={<RealisticCylinderBowlExperiment />}
          />
          <Route
            path="/chemistry/electrolysis-of-water"
            element={<ElectrolysisExperiment />}
          />
          <Route
            path="/chemistry/iron-copper-sulphate-reaction"
            element={<IronCopperSulphateExperiment />}
          />

          <Route path="/physics/ohm's-law" element={<OhmsLawSimulator />} />
          <Route
            path="/physics/verification-of-hooke's-law"
            element={<HookesLawExperiment />}
          />
          <Route
            path="/physics/simple-pendulum"
            element={<SimplePendulumExperiment />}
          ></Route>
          <Route path="/physics/Reflection" element={<Reflection />}></Route>
          <Route path="/physics/Refraction" element={<Refraction />}></Route>

          <Route
            path="/computerscience/linearsearch"
            element={<LinearSearchExperiment />}
          />
          <Route
            path="/computerscience/binarysearch"
            element={<BinarySearchExperiment />}
          />
          <Route
            path="/computerscience/bubblesort"
            element={<BubbleSortExperiment />}
          />
        </Routes>
      </Router>
    </DndProvider>
  );
}

export default App;
