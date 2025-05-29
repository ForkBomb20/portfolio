import { Link, useLocation } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Education", path: "/education" },
//   { name: "Projects", path: "/projects" },
//   { name: "Achievements", path: "/achievements" },
//   { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-gray-950 text-white shadow-md p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-xl font-bold tracking-wide">My ML Portfolio</div>
        <div className="flex gap-6 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`hover:text-blue-400 transition-colors ${
                location.pathname === item.path ? "text-blue-400" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
