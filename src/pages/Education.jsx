import { useEffect, useState } from "react";
import EMAlgorithmGMM from "../animations/GMM";

// Placeholder for your CubicRegression animation - replace with your actual component
const CubicRegression = () => (
  <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 -z-10">
    <div className="absolute inset-0 bg-black/20"></div>
  </div>
);

export default function Education() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  return (
    <div className="relative">
      <EMAlgorithmGMM />
      
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center px-4 z-10">
        <div 
          className="transition-all duration-700 ease-out"
          style={{
            opacity: Math.max(0, 1 - scrollY / 600),
            transform: `translateY(${scrollY * 0.2}px)`
          }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Education
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 font-light">
            Academic Journey & Research Excellence
          </p>
        </div>
      </section>

      {/* Dense Academic Information Grid */}
      <section className="relative px-4 py-12 z-10">
        <div 
          className="max-w-7xl mx-auto transition-all duration-700 ease-out"
          style={{
            opacity: Math.min(1, Math.max(0, (scrollY - 300) / 400)),
            transform: `translateY(${Math.max(0, 50 - (scrollY - 300) * 0.2)}px)`
          }}
        >
          {/* Current Institution & Academic Details */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Left Column - Institution & Academic Stats */}
            <div className="space-y-6">
            <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-gray-700 relative overflow-visible">
            {/* Static University Logo in upper right area */}
            <div className="absolute -top-4 -right-4 w-40 h-40">
              <img
                src={`${import.meta.env.BASE_URL}icons/blockm.png`}
                alt="University Logo"
                className="w-full h-full object-contain"
              />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Current Institution</h2>
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-semibold text-[#AA74E6]">University of Michigan - Ann Arbor</h3>
                <p className="text-gray-300">Bachelor of Science in Engineering in Computer Science</p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <span className="text-sm text-gray-400 block">GPA</span>
                  <span className="text-xl font-bold text-white">3.9/4.0</span>
                </div>
                <div>
                  <span className="text-sm text-gray-400 block">Enrollment</span>
                  <span className="text-lg font-semibold text-white">August 2023 - December 2025</span>
                </div>
              </div>
            </div>
          </div>
              <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">Graduate Plans</h3>
                <p className="text-gray-300 leading-relaxed">
                  Pursuing an an institution in which to obtain a Master's degree in Computer Science with a focus on
                  machine learning and artificial intelligence. I am interested in programs that emphasize research in information
                  theory and interpretable machine learning.
                </p>
              </div>
            </div>

            {/* Right Column - Research Interests */}
            <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
              <h3 className="text-xl font-bold text-white mb-4">Research Interests</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Interpretable Machine Learning",
                  "Information Theory",
                  "AI Education and Policy",
                  "Deep Learning Theory",
                  "Generative Models",
                  "Participatory Design"
                ].map((interest, index) => (
                  <div key={index} className="bg-white/10 rounded-lg p-3 hover:bg-white/20 transition-colors duration-200">
                    <span className="text-white text-sm font-medium">{interest}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Coursework & Research Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Relevant Coursework */}
            <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Relevant Coursework</h3>
              <ul className="space-y-2">
                {[
                  "Machine Learning (A)",
                  "Reinforcement Learning (TBD)",
                  "Parallel Computing with GPUs (TBD)",
                  "Data Structures & Algorithms (A-)",
                  "Linear Algebra (A)",
                  "Discrete Mathematics (A)",
                  "Web Systems (A)"
                ].map((course, index) => (
                  <li key={index} className="text-gray-300 text-sm flex justify-between">
                    <span>{course.split('(')[0]}</span>
                    <span className="text-[#AA74E6] font-semibold">
                      {course.match(/\(([^)]+)\)/)?.[1]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Current Research */}
            <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Current Research</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-[#AA74E6] mb-1">Undergraduate Research</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                  “Community Engaged Design: Working Collaboratively with Communities to Design Fusion Energy Systems”
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#AA74E6] mb-1">Independent Study</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    TBD
                  </p>
                </div>
              </div>
            </div>

            {/* Publications & Presentations */}
            <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Publications & Presentations</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-[#AA74E6] mb-1">Conference Papers</h4>
                  <ul className="text-gray-300 text-xs space-y-1">
                    {/* <li>"Visual Attention in CNNs for Medical Imaging" - ICML Workshop 2024</li>
                    <li>"Interpretable Deep Learning: A Survey" - Undergraduate Research Symposium 2024</li> */}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#AA74E6] mb-1">Presentations</h4>
                  <ul className="text-gray-300 text-xs space-y-1">
                    <li>“Global Fusion Forum: An online platform for public engagement and participation in the development of fusion energy technologies”; Presented at the 66th Annual Meeting of the APS Division of Plasma Physics, October 2024; <b>N. Kawamoto</b> (A. Verma, K. Snyder, D. Hoover, J. Xie, J. Walters)</li>
                    <li>“Community Engaged Design: Working Collaboratively with Communities to Design Fusion Energy Systems”; Presented at Phoenix Project: From Kikuchi to Fastest Path, November 2024; <b>N. Kawamoto</b> & D.Hoover (A. Verma, K. Snyder, J. Xie, J. Walters)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Achievements */}
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Academic Achievements</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-2">🏆</div>
                <h4 className="text-lg font-semibold text-white mb-1">Dean's List</h4>
                <p className="text-sm text-gray-300">All semesters</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🎓</div>
                <h4 className="text-lg font-semibold text-white mb-1">Summa Cum Laude</h4>
                <p className="text-sm text-gray-300">Expected graduation honors</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">📖</div>
                <h4 className="text-lg font-semibold text-white mb-1">James B Angell Scholar</h4>
                <p className="text-sm text-gray-300">3+ straight semesters of all A marks</p>
              </div>
              {/* <div className="text-center">
                <div className="text-3xl mb-2">📚</div>
                <h4 className="text-lg font-semibold text-white mb-1">Honor Society</h4>
                <p className="text-sm text-gray-300">Phi Beta Kappa Member</p>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      {/* <section className="relative px-4 py-16 z-10">
        <div 
          className="max-w-3xl mx-auto text-center transition-all duration-700 ease-out"
          style={{
            opacity: Math.min(1, Math.max(0, (scrollY - 800) / 400)),
            transform: `translateY(${Math.max(0, 30 - (scrollY - 800) * 0.1)}px)`
          }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Explore My Academic Journey
          </h2>
          <p className="text-lg text-gray-300 mb-6">
            Dive deeper into my research projects, coursework, and academic achievements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105">
              View Research
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold py-3 px-8 rounded-lg transition-all duration-300">
              Academic CV
            </button>
          </div>
        </div>
      </section> */}
    </div>
  );
}