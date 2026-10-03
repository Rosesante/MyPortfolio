import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const theme = darkMode ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((current) => !current);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">

        <NavLink to="/" className="navbar-logo">
          Rose<span>.</span>
        </NavLink>

        <nav className="navbar-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/creative">Creative</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          title={darkMode ? "Light mode" : "Dark mode"}
        >
          {darkMode ? <Sun size={19} /> : <Moon size={19} />}
        </button>

      </div>
    </header>
  );
};

export default Navbar;