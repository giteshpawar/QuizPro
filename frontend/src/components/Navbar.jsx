import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaHome,
  FaBook,
  FaClipboardList,
  FaUserCircle,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
  FaHeadset,
} from "react-icons/fa";

import logo from "../assets/quizpro-logo.png";
import "./Navbar.css";

const Navbar = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Check login status
  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, [location]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setShowProfileMenu(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* LOGO */}
      <div className="brand">
        <img src={logo} alt="QuizPro Logo" />
      </div>

      {/* DESKTOP MENU */}
      <ul className="nav-links">
        <li className="desktop-only">
          <Link to="/">
            <FaHome /> Home
          </Link>
        </li>

        <li className="desktop-only">
          <Link to="/Practice">
            <FaBook /> Practice
          </Link>
        </li>

        {/* NOW OPEN WITHOUT LOGIN */}
        <li className="desktop-only">
          <Link to="/test">
            <FaClipboardList /> Test
          </Link>
        </li>

        <li className="desktop-only">
          <Link to="/contact">
            <FaHeadset /> Contact Us
          </Link>
        </li>
      </ul>

      {/* RIGHT ACTIONS */}
      <div className="right-actions">
        {/* PROFILE */}
        <div
          className="profile"
          onClick={() => setShowProfileMenu(!showProfileMenu)}
        >
          <FaUserCircle /> Profile ▾

          {showProfileMenu && (
            <ul className="dropdown">
              {!isLoggedIn ? (
                <>
                  <li>
                    <Link
                      to="/login"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <FaSignInAlt /> Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <FaUserPlus /> Register
                    </Link>
                  </li>
                </>
              ) : (
                <li className="logout-btn" onClick={handleLogout}>
                  <span>
                    <FaSignOutAlt /> Logout
                  </span>
                </li>
              )}
            </ul>
          )}
        </div>

        {/* HAMBURGER */}
        <div
          className="hamburger"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* MOBILE MENU */}
      {showMobileMenu && (
        <div className="mobile-menu">
          <Link to="/" onClick={() => setShowMobileMenu(false)}>
            <FaHome /> Home
          </Link>

          <Link to="/Practice" onClick={() => setShowMobileMenu(false)}>
            <FaBook /> Practice
          </Link>

          {/* NOW OPEN WITHOUT LOGIN */}
          <Link to="/test" onClick={() => setShowMobileMenu(false)}>
            <FaClipboardList /> Test
          </Link>

          <Link to="/contact" onClick={() => setShowMobileMenu(false)}>
            <FaHeadset /> Contact Us
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
