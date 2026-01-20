import { useNavigate } from "react-router-dom";
import "./PracticeHome.css";
import PracticeImage from "../assets/PracticeImage.jpeg";

const PracticeHome = () => {
  const navigate = useNavigate();

  return (
    <div className="practice-home">
      <h2 className="page-title">Select Practice Subject</h2>

      <div className="practice-card-container">

        <div className="practice-card">
          <img src={PracticeImage} alt="Math Practice" />
          <h3>Mathematics</h3>
          <p>Improve calculations & problem-solving skills</p>
          <button onClick={() => navigate("/practice/math")}>
            Start Practice
          </button>
        </div>

        <div className="practice-card">
          <img src={PracticeImage} alt="General Knowledge Practice" />
          <h3>General Knowledge</h3>
          <p>Boost awareness with updated GK questions</p>
          <button onClick={() => navigate("/practice/generalknowledge")}>
            Start Practice
          </button>
        </div>

        <div className="practice-card">
          <img src={PracticeImage} alt="Marathi Grammar Practice" />
          <h3>Marathi Grammar</h3>
          <p>Master grammar rules with practice MCQs</p>
          <button onClick={() => navigate("/practice/marathigrammar")}>
            Start Practice
          </button>
        </div>

        <div className="practice-card">
          <img src={PracticeImage} alt="Intelligence Practice" />
          <h3>Reasoning</h3>
          <p>Enhance logical & reasoning abilities</p>
          <button onClick={() => navigate("/practice/intelligence")}>
            Start Practice
          </button>
        </div>

      </div>
    </div>
  );
};

export default PracticeHome;
