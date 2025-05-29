import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  
  // Debug logs to check if props are being passed correctly
  console.log('Sidebar isOpen:', isOpen);
  console.log('Sidebar toggleSidebar function:', toggleSidebar);
  
  const navLinks = [
    { path: "/", label: "Home", icon: "🏠" },
    { path: "/education", label: "Education", icon: "🎓" },
    { path: "/projects", label: "Projects", icon: "💻" },
    { path: "/achievements", label: "Achievements", icon: "🏆" },
    { path: "/contact", label: "Contact", icon: "📧" },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen w-80 z-50 transform transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Glassmorphism background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-purple-900/40 to-blue-900/40 backdrop-blur-xl border-r border-purple-500/20" />
        
        {/* Animated background overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#AA74E6]/5 to-transparent bg-[length:100%_4px] animate-pulse opacity-30" />
        
        <div className="relative h-full flex flex-col">
          {/* Sidebar header */}
          <div className="p-6 border-b border-purple-500/20">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Navigation
              </h2>
              {/* Close button - always visible */}
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 py-6">
            <ul className="space-y-2 px-4">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={(e) => {
                    //   e.preventDefault();
                      // Close sidebar after clicking a link
                      toggleSidebar();
                    }}
                    className={`
                      group flex items-center px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-105
                      ${
                        location.pathname === link.path
                          ? 'bg-gradient-to-r from-purple-600/40 to-blue-600/40 text-white border border-purple-500/30 shadow-lg shadow-purple-500/20'
                          : 'text-gray-300 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-blue-600/20 hover:text-white hover:border hover:border-purple-500/20'
                      }
                    `}
                  >
                    <span className="text-xl mr-3 group-hover:scale-110 transition-transform duration-200">
                      {link.icon}
                    </span>
                    <span className="font-medium">{link.label}</span>
                    
                    {/* Active indicator */}
                    {location.pathname === link.path && (
                      <div className="ml-auto w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-pulse" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sidebar footer */}
          <div className="p-6 border-t border-purple-500/20">
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-2">Nathan Kawamoto</p>
              <p className="text-xs text-gray-500">© 2025 Portfolio</p>
              
              {/* Social links or additional info */}
              <div className="flex justify-center space-x-4 mt-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600/30 to-blue-600/30 flex items-center justify-center border border-purple-500/20">
                  <span className="text-xs text-white">ML</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600/30 to-blue-600/30 flex items-center justify-center border border-purple-500/20">
                  <span className="text-xs text-white">AI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;