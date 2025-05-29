import { useEffect, useState } from "react";
import CubicRegression from "../animations/Regression";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      <CubicRegression />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 py-20 z-10">
        <div 
          className="transition-all duration-700 ease-out"
          style={{
            opacity: Math.max(0, 1 - scrollY / 300),
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Nathan Kawamoto
          </h1>
          <div className="animate-bounce">
            <svg className="w-8 h-8 text-white mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* About/Bio Section with Profile Picture */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-4 py-20 z-10">
        <div 
          className="max-w-6xl mx-auto text-center transition-all duration-700 ease-out"
          style={{
            opacity: Math.min(1, Math.max(0, (scrollY - 200) / 400)),
            transform: `translateY(${Math.max(0, 100 - (scrollY - 200) * 0.3)}px)`
          }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 md:mb-12">
            About Me
          </h2>
          
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-center">
            {/* Profile Picture - Responsive sizing */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-[#AA74E6] shadow-2xl shadow-[#AA74E6]/30">
                  <img 
                    src="pfp.jpeg" 
                    alt="Nathan Kawamoto" 
                    className="w-full h-full object-cover filter contrast-110 brightness-110"
                  />
                </div>
                {/* CRT scanlines overlay */}
                <div className="absolute inset-0 rounded-full pointer-events-none bg-gradient-to-b from-transparent via-[#AA74E6]/5 to-transparent bg-[length:100%_4px] animate-pulse"></div>
              </div>
            </div>

            {/* Bio Text and Tech Icons */}
            <div className="flex-1 max-w-2xl">
              <div className="bg-black bg-opacity-40 backdrop-blur-sm rounded-lg p-6 md:p-8 border border-gray-700">
                <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed mb-6 md:mb-8 text-left">
                  I'm a passionate computer scientist and machine learning engineer with a deep fascination 
                  with algorithms that can learn and adapt. My journey began with curiosity about how 
                  computers could mimic human learning, and has evolved into expertise in building 
                  intelligent systems, but specifically a passion for interpretable machine learning and AI education.
                </p>
                
                {/* Tech Stack Icons - Responsive grid */}
                <div className="border-t border-gray-600 pt-4 md:pt-6">
                  <h3 className="text-xs sm:text-sm font-semibold text-[#AA74E6] mb-4 md:mb-6 tracking-wider uppercase text-center">Tech Stack</h3>
                  <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
                    <div className="flex flex-col items-center group hover:scale-110 transition-transform duration-200">
                      <img src="/icons/python.png" alt="Python" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                      <span className="text-xs text-gray-300 mt-1 group-hover:text-white transition-colors duration-200">Python</span>
                    </div>
                    <div className="flex flex-col items-center group hover:scale-110 transition-transform duration-200">
                      <img src="/icons/pytorch.png" alt="PyTorch" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                      <span className="text-xs text-gray-300 mt-1 group-hover:text-white transition-colors duration-200">PyTorch</span>
                    </div>
                    <div className="flex flex-col items-center group hover:scale-110 transition-transform duration-200">
                      <img src="/icons/js.png" alt="JavaScript" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                      <span className="text-xs text-gray-300 mt-1 group-hover:text-white transition-colors duration-200">JavaScript</span>
                    </div>
                    <div className="flex flex-col items-center group hover:scale-110 transition-transform duration-200">
                      <img src="/icons/react.png" alt="React" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                      <span className="text-xs text-gray-300 mt-1 group-hover:text-white transition-colors duration-200">React</span>
                    </div>
                    <div className="flex flex-col items-center group hover:scale-110 transition-transform duration-200">
                      <img src="/icons/tensorflow.png" alt="TensorFlow" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                      <span className="text-xs text-gray-300 mt-1 group-hover:text-white transition-colors duration-200">TensorFlow</span>
                    </div>
                    <div className="flex flex-col items-center group hover:scale-110 transition-transform duration-200">
                      <img src="/icons/sql.png" alt="SQL" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                      <span className="text-xs text-gray-300 mt-1 group-hover:text-white transition-colors duration-200">SQL</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-4 py-20 z-10">
        <div 
          className="max-w-4xl mx-auto text-center transition-all duration-700 ease-out"
          style={{
            opacity: Math.min(1, Math.max(0, (scrollY - 1000) / 400)),
            transform: `translateY(${Math.max(0, 100 - (scrollY - 1000) * 0.3)}px)`
          }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 md:mb-8">
            My Mission
          </h2>
          <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-sm rounded-lg p-6 md:p-8 border border-purple-500/30">
            <p className="text-lg sm:text-xl md:text-2xl text-white leading-relaxed mb-6 md:mb-8 font-medium">
              "To champion interpretable machine learning algorithms that empower deep learning
              that is accessible, transparent, and understood."
            </p>
            <div className="grid sm:grid-cols-3 gap-4 md:gap-6 text-center">
              <div className="p-3 md:p-4">
                <div className="text-2xl md:text-3xl mb-2">🤖</div>
                <h3 className="text-base md:text-lg font-semibold text-white mb-2">Innovation</h3>
                <p className="text-sm md:text-base text-gray-300">Pushing boundaries with cutting-edge ML techniques</p>
              </div>
              <div className="p-3 md:p-4">
                <div className="text-2xl md:text-3xl mb-2">🎯</div>
                <h3 className="text-base md:text-lg font-semibold text-white mb-2">Impact</h3>
                <p className="text-sm md:text-base text-gray-300">Building solutions that create real-world value</p>
              </div>
              <div className="p-3 md:p-4">
                <div className="text-2xl md:text-3xl mb-2">📚</div>
                <h3 className="text-base md:text-lg font-semibold text-white mb-2">Education</h3>
                <p className="text-sm md:text-base text-gray-300">Making complex concepts accessible to everyone</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-4 py-20 z-10">
        <div 
          className="max-w-3xl mx-auto text-center transition-all duration-700 ease-out"
          style={{
            opacity: Math.min(1, Math.max(0, (scrollY - 1800) / 400)),
            transform: `translateY(${Math.max(0, 100 - (scrollY - 1800) * 0.3)}px)`
          }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 md:mb-8">
            Let's Build the Future
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-6 md:mb-8">
            Ready to explore my projects, education, and achievements? 
            Dive deeper into my journey in machine learning and data science.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 md:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm md:text-base">
              View Projects
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold py-3 px-6 md:px-8 rounded-lg transition-all duration-300 text-sm md:text-base">
              Contact Me
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}