import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import {
  FaEnvelope,
  FaLock,
  FaSignInAlt,
  FaUserShield,
  FaTimes,
  FaKey,
} from "react-icons/fa";
import "../styles/Auth.css";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotStatus, setForgotStatus] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    setMessage("");

    if (!email || !password) {
      setMessageType("error");
      setMessage("Please enter both email and password.");
      return;
    }

    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", "true");
      setIsLoggedIn(true);

      setMessageType("success");
      setMessage("Login successful");

      setTimeout(() => navigate("/"), 1000);
    } catch {
      setMessageType("error");
      setMessage("Invalid email or password.");
    }
  };

  const handleForgotPassword = async () => {
    if (!forgotEmail) {
      setForgotStatus("❌ Enter your email");
      return;
    }

    try {
      await API.post("/auth/forgot-password", {
        email: forgotEmail,
      });

      setEmail(forgotEmail);
      setShowForgot(false);
      setForgotEmail("");
      setForgotStatus("");
      setMessageType("success");
      setMessage("Reset link sent to your email");
    } catch {
      setForgotStatus("❌ Email not found");
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-header">
        <FaUserShield />
        <h1>Login</h1>
      </div>

      <div className="auth-card">
        <h2>Welcome Back</h2>

        <div className="auth-input">
          <FaEnvelope />
          <input
            type="email"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="auth-btn" onClick={handleLogin}>
          <FaSignInAlt /> Login
        </button>

        {message && (
          <p className={`auth-message ${messageType}`}>
            {message}
          </p>
        )}

        <p
          className="auth-forgot"
          onClick={() => { setShowForgot(true); setMessage(""); setMessageType(""); }}
        >
          Forgot Password?
        </p>
      </div>

      {showForgot && (
        <div className="modal-overlay">
          <div className="modal-box">
          
            <div className="modal-logo">
              <FaKey />
            </div>

            <h2>Reset Password</h2>

            <div className="modal-input">
              <FaEnvelope />
              <input
                type="email"
                placeholder="Enter your email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
              />
            </div>

            <div className="modal-actions">
              <button
                className="btn cancel"
                onClick={() => setShowForgot(false)}
              >
                Cancel
              </button>

              <button
                className="btn submit"
                onClick={handleForgotPassword}
              >
                Send Link
              </button>
            </div>

            {forgotStatus && (
              <p className="modal-status">{forgotStatus}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
