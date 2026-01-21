import { useState } from "react";
import API from "../api/api";
import {
  FaUser,
  FaEnvelope,
  FaPaperPlane,
  FaCode,
  FaGithub,
  FaLinkedin,
  FaPhone,
  FaUniversity,
  FaAddressCard,
} from "react-icons/fa";
import "./Contact.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/contact", {
        name,
        email,
        message,
      });

      if (res.data.success) {
        setStatus("✅ Message sent successfully");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("❌ Failed to send message");
      }
    } catch (err) {
      setStatus("❌ Server error");
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <FaAddressCard />
        <h1>Contact Us</h1>
      </div>

      <div className="contact-content">
        <div className="developer-card">
          <div className="dev-icon">
            <FaCode />
          </div>

          <h2>Gitesh Gopinath Pawar</h2>
          <p className="dev-role">Full Stack Developer</p>

          <div className="dev-info">
            <p><FaUniversity /> SSGMCE, Shegaon</p>
            <p><FaEnvelope /> giteshpawar3516@gmail.com</p>
            <p><FaPhone /> +91 9322083516</p>
            <p>
              <FaGithub />
              <a
                href="https://github.com/giteshpawar"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </p>
            <p>
              <FaLinkedin />
              <a
                href="https://www.linkedin.com/in/gitesh-pawar-23a524371"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </p>
          </div>
        </div>

        <div className="contact-card">
          <h2>Send a Message</h2>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <FaUser />
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <FaEnvelope />
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />

            {/* ✅ FIXED: removed onClick */}
            <button type="submit">
              <FaPaperPlane /> Send Message
            </button>
          </form>

          {status && <p className="form-status">{status}</p>}
        </div>
      </div>
    </div>
  );
};

export default Contact;
