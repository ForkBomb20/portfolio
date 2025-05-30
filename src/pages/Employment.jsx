import { useEffect, useState } from "react";
import NeuralNetworkAnimation from "../animations/FF";

export default function Employment() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sample employment data - replace with your actual employment information
  const employmentData = [
    {
      employer: "Y Combinator | AI Startup School",
      role: "Attendee",
      term: "June 16, 2025 - June 17, 2025",
      responsibilities: [
        "Selected among 2,500 top CS students nationwide for YC’s exclusive AI Startup School",
        "Attended talks by leaders in AI, including Elon Musk, Sam Altman, Fei-Fei Li, and Andrew Ng",
        "Gained insight into AI startups, model deployment, and scaling infrastructure",
        "Participated in breakout sessions with YC founders and top researchers",
        "Networked with peers and industry leaders at events hosted by Google, Microsoft, and Amazon"
      ],
      impact: "Gained exposure to cutting-edge AI research and startup strategies; strengthened technical knowledge and entrepreneurial mindset while building a high-caliber professional network in the AI space.",
      skills: ["Leadership", "Startup Strategy", "Networking", "Professional Development"],
      logo: "/icons/y_combinator.png"
    },
    {
      employer: "University of Michigan Transportation Research Institute",
      role: "Undergraduate Researcher",
      term: "May 2024 - Jan 2025",
      responsibilities: [
        "Designed and tested advanced Federated Learning (FL) algorithms for real-world, decentralized ML use cases, focusing on improving scalability and reducing communication overhead",
        "Collaborated with graduate researchers to benchmark FL algorithms across distributed training pipelines; produced reproducible experiments and publication-ready plots using PyTorch and Pandas",
        "Pioneered a novel low-rank approximation strategy for FedDIP, cutting communication costs by 50%, enabling more efficient federated model updates across heterogeneous clients"
      ],
      impact: "Advanced the state of scalable Federated Learning by enabling more efficient model updates in bandwidth-constrained environments; contributed to research with potential for publication and real-world deployment in decentralized systems",
      skills: ["Data Analysis", "Python", "PyTorch", "Research Methods", "Academic Writing", "Federated Learning", "Algorithm Design"],
      logo: "/icons/umtri.png"
    },
    {
      employer: "Nuclear Engineering and Radiological Sciences | University of Michigan",
      role: "Undergraduate Researcher",
      term: "January 2024 - Present",
      responsibilities: [
        "Provided data collection and analysis skills for the study of the socially engaged design of nuclear energy, specifically fusion energy and community sentiment regarding it",
        "Conducted in-person and virtual interviews, prepared data analysis presentations to draw meaningful conclusions, drafted public communications about the research topics including, but not limited to, emails, published research papers, and web applications",
        "Developed a novel framework for engaging community members in the design of fusion energy systems through collaborative workshops, thus allowing affected community members to better collaborate and convey their concerns with facility designers"
      ],
      impact: "Advanced considereations in community consultation and engagement in the design of fusion energy systems; contributed to research with potential for publication and real-world impact in the field of nuclear engineering",
      skills: ["Data Analysis", "Python", "Research Methods", "Academic Writing", "Public Speaking", "Community Engagement"],
      logo: "/icons/ners.png"
    },
    {
        employer: "Graph Academy",
        role: "Software Development Intern",
        term: "May 2024 - August 2024",
        responsibilities: [
          "Contributed full-stack development and optimization skills to a stealth-mode ML-focused startup, improving API query speed and graphical rendering performance by over 30%",
          "Led security and access auditing protocols for production ML datasets and customer-facing databases, ensuring robust data privacy",
          "Collaborated remotely with cross-functional teams of employees and interns to develop and secure a scalable, high-performance codebase"
        ],
        impact: "Improved system performance and security infrastructure in a fast-paced startup environment; delivered tangible gains in speed and reliability for customer-facing tools",
        skills: ["Full-Stack Development", "APIs", "Security", "Database Management", "Collaboration", "Optimization"],
        logo: "/icons/graph-academy.jpeg"
      }
      
  ];

  return (
    <div className="relative">
      <NeuralNetworkAnimation />
      
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
            Employment
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 font-light">
            Professional Experience & Career Journey
          </p>
        </div>
      </section>

      {/* Employment Cards Section */}
      <section className="relative px-4 py-12 z-10">
        <div 
          className="max-w-7xl mx-auto transition-all duration-700 ease-out"
          style={{
            opacity: Math.min(1, Math.max(0, (scrollY - 300) / 400)),
            transform: `translateY(${Math.max(0, 50 - (scrollY - 300) * 0.2)}px)`
          }}
        >
          {/* Employment Cards Grid */}
          <div className="space-y-8">
            {employmentData.map((job, index) => (
              <div 
                key={index}
                className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-gray-700 relative overflow-visible hover:border-purple-500/50 transition-all duration-300"
              >
                {/* Company Logo */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full p-2 backdrop-blur-sm border border-gray-600 z-20">
                  <img
                    src={job.logo}
                    alt={`${job.employer} Logo`}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Left Column - Basic Info */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{job.employer}</h3>
                      <h4 className="text-xl font-semibold text-[#AA74E6] mb-2">{job.role}</h4>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-400">Term:</span>
                        <span className="text-white font-medium">{job.term}</span>
                      </div>
                    </div>

                    {/* Responsibilities */}
                    <div>
                      <h5 className="text-lg font-semibold text-white mb-3">Key Responsibilities</h5>
                      <ul className="space-y-2">
                        {job.responsibilities.map((responsibility, idx) => (
                          <li key={idx} className="text-gray-300 text-sm flex items-start">
                            <span className="text-[#AA74E6] mr-2 mt-1">•</span>
                            <span>{responsibility}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Column - Impact & Skills */}
                  <div className="space-y-4">
                    {/* Impact */}
                    <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30">
                      <h5 className="text-lg font-semibold text-white mb-3 flex items-center">
                        <span className="text-2xl mr-2">🎯</span>
                        Impact & Achievements
                      </h5>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {job.impact}
                      </p>
                    </div>

                    {/* Skills Used */}
                    <div>
                      <h5 className="text-lg font-semibold text-white mb-3">Skills & Technologies</h5>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, idx) => (
                          <span 
                            key={idx}
                            className="bg-white/10 text-white text-xs px-3 py-1 rounded-full border border-gray-600 hover:bg-white/20 transition-colors duration-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Career Stats Section */}
          <div className="mt-12 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Career Highlights</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-2">💼</div>
                <h4 className="text-lg font-semibold text-white mb-1">Total Positions</h4>
                <p className="text-2xl font-bold text-[#AA74E6]">{employmentData.length}</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🏢</div>
                <h4 className="text-lg font-semibold text-white mb-1">Companies</h4>
                <p className="text-2xl font-bold text-[#AA74E6]">{new Set(employmentData.map(job => job.employer)).size}</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">⚡</div>
                <h4 className="text-lg font-semibold text-white mb-1">Skills Gained</h4>
                <p className="text-2xl font-bold text-[#AA74E6]">
                  {new Set(employmentData.flatMap(job => job.skills)).size}+
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🚀</div>
                <h4 className="text-lg font-semibold text-white mb-1">Years Experience</h4>
                <p className="text-2xl font-bold text-[#AA74E6]">2+</p>
              </div>
            </div>
          </div>

          {/* Professional Philosophy */}
          <div className="mt-12 bg-black/40 backdrop-blur-sm rounded-lg p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Professional Philosophy</h3>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-300 leading-relaxed text-center mb-8">
                "I believe in combining technical excellence with meaningful impact. Every project is an opportunity 
                to learn, grow, and contribute to solutions that make a difference in people's lives."
              </p>
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="text-center p-4">
                  <div className="text-3xl mb-3">🎯</div>
                  <h4 className="text-lg font-semibold text-white mb-2">Results-Driven</h4>
                  <p className="text-sm text-gray-300">Focused on delivering measurable outcomes and continuous improvement</p>
                </div>
                <div className="text-center p-4">
                  <div className="text-3xl mb-3">🤝</div>
                  <h4 className="text-lg font-semibold text-white mb-2">Collaborative</h4>
                  <p className="text-sm text-gray-300">Thriving in team environments and cross-functional partnerships</p>
                </div>
                <div className="text-center p-4">
                  <div className="text-3xl mb-3">📈</div>
                  <h4 className="text-lg font-semibold text-white mb-2">Growth-Minded</h4>
                  <p className="text-sm text-gray-300">Always seeking new challenges and opportunities to expand expertise</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}