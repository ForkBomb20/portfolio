import { createBrowserRouter, Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Education from "./pages/Education";
import Projects from "./pages/Projects";
import Employment from "./pages/Employment";
import Contact from "./pages/Contact";

const RootLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Main content area */}
      <div className="flex flex-col flex-1 min-h-screen">
        {/* Hamburger menu button - top right */}
        <button
          onClick={toggleSidebar}
          className="fixed top-4 right-4 z-50 text-white hover:text-gray-300 focus:outline-none bg-gray-800 p-2 rounded-md"
          aria-label="Toggle sidebar"
        >
          {/* Hamburger icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Main content */}
        <main className="flex-grow">
          <Outlet /> {/* Renders child route */}
        </main>
        
        <Footer />
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "education", element: <Education /> },
      { path: "projects", element: <Projects /> },
      { path: "employment", element: <Employment /> },
      { path: "contact", element: <Contact /> },
    ],
  },
], {
  basename: "/portfolio" // Add this basename option
});