import { Link } from "react-router-dom";
import { useState } from "react";
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

  const isLoggedIn = !!localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
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
          <Link to="/"><FaHome /> Home</Link>
        </li>

        <li className="desktop-only">
          <Link to="/Practice"><FaBook /> Practice</Link>
        </li>

        <li className="desktop-only">
          <Link to="/test"><FaClipboardList /> Test</Link>
        </li>

        <li className="desktop-only">
          <Link to="/contact"><FaHeadset /> Contact Us</Link>
        </li>
      </ul>

      {/* RIGHT ACTIONS */}
      <div className="right-actions">
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
                    <Link to="/login">
                      <FaSignInAlt /> Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register">
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
