import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "timeline", label: "Timeline" },
  { id: "services", label: "Services" }, // ✅ Added here
  { id: "skills", label: "Skills" },
  { id: "portfolio", label: "Portfolio" },
  { id: "myapps", label: "Apps" },
  { id: "contact", label: "Contact" },
];

const Navbar = () => {
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActive(id);
      setMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0f172a]/80 backdrop-blur-md shadow-lg px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="text-white font-bold text-2xl tracking-widest hover:scale-105 transition-transform duration-300 cursor-pointer">
        Abdul<span className="text-blue-500"> Qadeer</span>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex gap-10">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="relative text-white text-sm font-medium px-2 py-1 transition-all duration-300 hover:text-blue-400"
          >
            {section.label}
            <span
              className={`absolute left-0 bottom-0 h-[2px] transition-all duration-300 ${
                active === section.id ? "w-full bg-blue-500" : "w-0 bg-transparent"
              }`}
            ></span>
          </button>
        ))}
      </div>

      {/* Mobile Menu Toggle */}
      <div
        className="md:hidden text-white text-2xl z-50 cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Sidebar Menu for Mobile */}
      <div
        className={`fixed top-0 right-0 h-full w-[70%] sm:w-[60%] bg-black/90 backdrop-blur-md shadow-2xl border-l border-blue-500/10 transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden flex flex-col items-start px-6 pt-24 gap-6`}
      >
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`text-white text-lg font-semibold w-full text-left py-2 px-3 rounded-md transition-all duration-300
              hover:bg-gray-700 hover:text-white ${
                active === section.id ? "bg-gray-600 text-white" : ""
              }`}
          >
            {section.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
