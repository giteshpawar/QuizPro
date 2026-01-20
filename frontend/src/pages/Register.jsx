import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api/api";
import "../styles/Auth.css";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaUserPlus,
  FaUserShield,
} from "react-icons/fa";


const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState(location.state?.email || "");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const isValidEmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const isValidPassword = (password) =>
    password.length >= 6 &&
    /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const handleRegister = async () => {
    setMessage("");

    if (!name || !email || !password) {
      setMessageType("error");
      setMessage("All fields are required.");
      return;
    }

    if (!isValidEmail(email)) {
      setMessageType("error");
      setMessage("Please enter a valid email.");
      return;
    }

    if (!isValidPassword(password)) {
      setMessageType("error");
      setMessage(
        "Password must be at least 6 characters & contain a special symbol."
      );
      return;
    }

    try {
      await API.post("/auth/register", { name, email, password });

      setMessageType("success");
      setMessage("Registration successful. Redirecting...");

      setTimeout(() => navigate("/login"), 1300);
    } catch (err) {
      setMessageType("error");
      setMessage(err.response?.data?.msg || "Registration failed.");
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-header">
        <FaUserShield />
        <h1>Register</h1>
      </div>

      <div className="auth-card">
        <h2>Create Account</h2>

        <div className="auth-input">
          <FaUser />
          <input
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="auth-input">
          <FaEnvelope />
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="auth-input">
          <FaLock />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="auth-btn" onClick={handleRegister}>
          <FaUserPlus /> Register
        </button>

        {message && (
          <p className={`auth-message ${messageType}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Register;
