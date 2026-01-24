import { FaGithub, FaLinkedin } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>Email: <span>giteshpawar2611@gmail.com</span></p>
        <p>Contact: <span>+91 9322083516</span></p>
        <p>Devloped by: <span>Gitesh Pawar</span></p>

        <div className="footer-icons">
          <a
            href="https://github.com/giteshpawar"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
          </a>

          <a
            href="https://www.linkedin.com/in/gitesh-pawar-23a524371?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin />
          </a>
        </div>

        <p className="footer-copy">
          © {new Date().getFullYear()} QuizPro. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
