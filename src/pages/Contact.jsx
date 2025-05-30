import { useEffect, useState } from "react";
import { Mail, Github, Linkedin, MapPin, Phone, Calendar, Download, ExternalLink } from "lucide-react";
import DecisionTreeLearning from "../animations/DecisionTree";

export default function Contact() {
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus(''), 5000);
    }, 2000);
  };

  return (
    <div className="relative">
      <DecisionTreeLearning />
      
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
            Get In Touch
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 font-light max-w-2xl">
            Let's collaborate on machine learning research, open source projects, or discuss opportunities in AI
          </p>
        </div>
      </section>

      {/* Contact Information & Form Section */}
      <section className="relative px-4 py-12 z-10">
        <div 
          className="max-w-7xl mx-auto transition-all duration-700 ease-out"
          style={{
            opacity: Math.min(1, Math.max(0, (scrollY - 300) / 400)),
            transform: `translateY(${Math.max(0, 50 - (scrollY - 300) * 0.2)}px)`
          }}
        >
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Let's Connect</h2>
                <p className="text-gray-300 leading-relaxed mb-8">
                  I'm always interested in discussing machine learning research, open source contributions, 
                  graduate school opportunities, or potential collaborations. Feel free to reach out through 
                  any of the channels below.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-4">
                <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#AA74E6]/20 rounded-lg">
                      <Mail className="w-6 h-6 text-[#AA74E6]" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Email</h3>
                      <a 
                        href="mailto:njkawamoto@gmail.com" 
                        className="text-gray-300 hover:text-[#AA74E6] transition-colors duration-200"
                      >
                        njkawamoto@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#AA74E6]/20 rounded-lg">
                      <Linkedin className="w-6 h-6 text-[#AA74E6]" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">LinkedIn</h3>
                      <a 
                        href="https://linkedin.com/in/yourprofile" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-[#AA74E6] transition-colors duration-200 flex items-center gap-1"
                      >
                        www.linkedin.com/in/nathan-kawamoto


                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#AA74E6]/20 rounded-lg">
                      <Github className="w-6 h-6 text-[#AA74E6]" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">GitHub</h3>
                      <a 
                        href="https://github.com/ForkBomb20" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-[#AA74E6] transition-colors duration-200 flex items-center gap-1"
                      >
                        github.com/ForkBomb20
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#AA74E6]/20 rounded-lg">
                      <MapPin className="w-6 h-6 text-[#AA74E6]" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Location</h3>
                      <span className="text-gray-300">Denver, CO</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resume/CV Download */}
              <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
                <h3 className="text-xl font-bold text-white mb-4">Academic Documents</h3>
                <div className="space-y-3">
                  <a 
                    href="/portfolio/resume.pdf" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white/10 rounded-lg p-3 hover:bg-white/20 transition-all duration-300 group"
                  >
                    <div className="p-2 bg-[#AA74E6]/20 rounded-lg group-hover:bg-[#AA74E6]/30 transition-colors duration-300">
                      <Download className="w-5 h-5 text-[#AA74E6]" />
                    </div>
                    <div className="flex-1">
                      <span className="text-white font-medium">Resume/CV</span>
                      <p className="text-gray-300 text-sm">Download my latest academic resume</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#AA74E6] transition-colors duration-300" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form
            <div className="bg-black/40 backdrop-blur-sm rounded-lg p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-600/20 border border-green-500/30 rounded-lg">
                  <p className="text-green-400 text-sm">
                    Thank you for your message! I'll get back to you soon.
                  </p>
                </div>
              )}

              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <div className="block text-sm font-medium text-gray-300 mb-2">
                      Name *
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#AA74E6] focus:border-transparent transition-all duration-300"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <div className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#AA74E6] focus:border-transparent transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <div className="block text-sm font-medium text-gray-300 mb-2">
                    Subject *
                  </div>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#AA74E6] focus:border-transparent transition-all duration-300"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <div className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#AA74E6] focus:border-transparent transition-all duration-300 resize-vertical"
                    placeholder="Tell me about your project, research ideas, collaboration opportunities, or just say hello!"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Sending...
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Quick Contact Options */}
      <section className="relative px-4 py-12 z-10">
        <div 
          className="max-w-5xl mx-auto transition-all duration-700 ease-out"
          style={{
            opacity: Math.min(1, Math.max(0, (scrollY - 800) / 400)),
            transform: `translateY(${Math.max(0, 50 - (scrollY - 800) * 0.2)}px)`
          }}
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Quick Connect
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 text-center group">
              <div className="p-4 bg-[#AA74E6]/20 rounded-full w-16 h-16 mx-auto mb-4 group-hover:bg-[#AA74E6]/30 transition-colors duration-300">
                <Calendar className="w-8 h-8 text-[#AA74E6] mx-auto mt-1" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Schedule a Meeting</h3>
              <p className="text-gray-300 text-sm mb-4">
                Book a time to discuss research, projects, or collaboration opportunities
              </p>
              <button className="text-[#AA74E6] hover:text-white transition-colors duration-200 text-sm font-medium">
                Coming Soon
              </button>
            </div>

            <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 text-center group">
              <div className="p-4 bg-[#AA74E6]/20 rounded-full w-16 h-16 mx-auto mb-4 group-hover:bg-[#AA74E6]/30 transition-colors duration-300">
                <Github className="w-8 h-8 text-[#AA74E6] mx-auto mt-1" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Open Source</h3>
              <p className="text-gray-300 text-sm mb-4">
                Contribute to my projects or discuss new collaboration ideas
              </p>
              <a 
                href="https://github.com/ForkBomb20" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#AA74E6] hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                View Projects →
              </a>
            </div>

            <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 text-center group sm:col-span-2 lg:col-span-1">
              <div className="p-4 bg-[#AA74E6]/20 rounded-full w-16 h-16 mx-auto mb-4 group-hover:bg-[#AA74E6]/30 transition-colors duration-300">
                <Mail className="w-8 h-8 text-[#AA74E6] mx-auto mt-1" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Direct Contact</h3>
              <p className="text-gray-300 text-sm mb-4">
                For urgent matters or quick questions, reach out directly
              </p>
              <a 
                href="mailto:njkawamoto@gmail.com" 
                className="text-[#AA74E6] hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                Send Email →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Call to Action */}
      <section className="relative px-4 py-16 z-10">
        <div 
          className="max-w-3xl mx-auto text-center transition-all duration-700 ease-out"
          style={{
            opacity: Math.min(1, Math.max(0, (scrollY - 1200) / 400)),
            transform: `translateY(${Math.max(0, 30 - (scrollY - 1200) * 0.1)}px)`
          }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Collaborate?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Whether you're interested in machine learning research, open source projects, 
            or have opportunities in AI and computer science, I'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:njkawamoto@gmail.com"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Get In Touch
            </a>
            <a 
              href="/portfolio/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold py-3 px-8 rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download Resume
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}