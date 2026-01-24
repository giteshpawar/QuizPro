import { Link } from "react-router-dom";
import { inject } from '@vercel/analytics';
import "./Home.css";
import PracticeImage from "../assets/PracticeImage.jpeg";

const Home = () => {
  return (
    <div className="home">

      <section className="welcome">
        <h1 className="welcome-title">
          Welcome to <span>Smart Practice Hub</span>
        </h1>
        <p className="welcome-subtitle">
          Learn • Practice • Improve • Succeed
        </p>
      </section>

      <section className="section">
        <h2 className="section-title">Practice Subjects</h2>

        <div className="card-container">
          <div className="card">
            <img src={PracticeImage}  alt="General Knowledge" />
            <h3>General Knowledge</h3>
            <p>Improve your GK with daily practice</p>
            <Link to="practice/gk">Start Practice</Link>
          </div>

          <div className="card">
            <img src={PracticeImage}  alt="Marathi Grammar" />
            <h3>Marathi Grammar</h3>
            <p>Master Marathi grammar concepts</p>
            <Link to="practice/grammar">Start Practice</Link>
          </div>

          <div className="card">
            <img src={PracticeImage}  alt="Math" />
            <h3>Mathematics</h3>
            <p>Sharpen your math skills</p>
            <Link to="practice/math">Start Practice</Link>
          </div>

           <div className="card">
            <img src={PracticeImage}  alt="Math" />
            <h3>Reasoning</h3>
            <p>Practice to improve Intelligence</p>
            <Link to="practice/intelligence">Start Practice</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Why Choose Us?</h2>

        <div className="feature-container">

            <div className="feature-card">
            <h3>Unlimited Practice</h3>
            <p>Practice MCQs anytime with unlimited attempts to strengthen weak topics.</p>
          </div>

          <div className="feature-card">
            <h3>Timed Mock Tests</h3>
            <p>Attempt full-length mock tests with real exam time limits to improve speed and accuracy.</p>
          </div>

          <div className="feature-card">
            <h3>Instant Results</h3>
            <p>Get instant score, correct answers, and performance summary after test submission.</p>
          </div>
        </div>
      </section>
      inject();

    </div>
  );
};

export default Home;
