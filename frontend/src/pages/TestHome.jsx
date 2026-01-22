import { useNavigate } from "react-router-dom";
import "./TestHome.css";
import TestImage from "../assets/Teste.jpge";
import FinalExamImage  from "../assets/Finalexamm.jpg";
const TestHome = () => {
  const navigate = useNavigate();

  return (
    <div className="test-home">
      <h2 className="page-title">Select Test</h2>

      <div className="test-card-container">

        <div className="test-card">
          <img src={TestImage} alt="Math Test" />
          <h3>Mathematics</h3>
          <p>Evaluate your problem-solving skills</p>
          <button onClick={() => navigate("/test/math")}>
            Start Test
          </button>
        </div>

        <div className="test-card">
          <img src={TestImage} alt="General Knowledge Test" />
          <h3>General Knowledge</h3>
          <p>Check your current knowledge</p>
          <button onClick={() => navigate("/test/gk")}>
            Start Test
          </button>
        </div>

        <div className="test-card">
          <img src={TestImage} alt="Intelligence Test" />
          <h3>Reasoning</h3>
          <p>Check your reasoning skill</p>
          <button onClick={() => navigate("/test/intelligence")}>
            Start Test
          </button>
        </div>

        <div className="test-card">
          <img src={TestImage} alt="Grammar Test" />
          <h3>Marathi Grammar</h3>
          <p>Test your grammar and language skills</p>
          <button onClick={() => navigate("/test/grammar")}>
            Start Test
          </button>
        </div>

        <div className="final-exam-card">
          <img src={FinalExamImage} alt="Final Exam" />
          <h3>Final Exam</h3>
          <p>Attempt the complete final examination</p>
          <button onClick={() => navigate("/finalexam")}>
            Start Final Exam
          </button>
        </div>

      </div>
    </div>
  );
};

export default TestHome;
