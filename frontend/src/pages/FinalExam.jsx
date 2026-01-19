import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "./FinalExam.css";

const FINAL_EXAM_TIME = 90 * 60; 

const FinalExam = () => {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(FINAL_EXAM_TIME);

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchFinalExam = async () => {
      const res = await API.get("/finalexam");
      setQuestions(res.data);
    };
    fetchFinalExam();
  }, []);


  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  if (!questions.length) {
    return <h3 className="final-loading">Loading Final Exam...</h3>;
  }

  const q = questions[current];
  const options = [q.optionA, q.optionB, q.optionC, q.optionD];

  const handleSelect = (opt) => {
    setAnswers({ ...answers, [q._id]: opt });
  };

  const handleSubmit = (auto = false) => {
    navigate("/test/result", {
      state: {
        questions,
        answers,
        autoSubmitted: auto,
      },
    });
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const solvedCount = Object.keys(answers).length;
  const remainingCount = questions.length - solvedCount;

  return (
    <div className="final-container">
      
      <div className="final-header">
        <h2>Final Examination</h2>
        <div className={`final-timer ${timeLeft <= 300 ? "danger" : ""}`}>
          ⏱ {formatTime(timeLeft)}
        </div>
      </div>

      <h4 className="final-question-number">
        Question {current + 1} of {questions.length}
      </h4>

      <div className="final-question-card">
        <h3 className="final-question-text">{q.question}</h3>

        <div className="final-options">
          {options.map((opt, i) => (
            <label key={i} className="final-option">
              <input
                type="radio"
                checked={answers[q._id] === opt}
                onChange={() => handleSelect(opt)}
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="final-nav">
        <button disabled={current === 0} onClick={() => setCurrent(current - 1)}>
          Previous
        </button>
        <button
          disabled={current === questions.length - 1}
          onClick={() => setCurrent(current + 1)}
        >
          Next
        </button>
      </div>

      <div className="final-question-grid">
        {questions.map((q, idx) => {
          let cls = "final-grid-box";
          if (current === idx) cls += " active";
          else if (answers[q._id]) cls += " answered";

          return (
            <div
              key={q._id}
              className={cls}
              onClick={() => setCurrent(idx)}
            >
              {idx + 1}
            </div>
          );
        })}
      </div>

      {questions.length === 100 && (
        <div className="final-submit-wrap">
          <button
            className="final-submit-btn"
            onClick={() => setShowPopup(true)}
          >
            Submit
          </button>
        </div>
      )}

      {showPopup && (
        <div className="final-popup-overlay">
          <div className="final-popup">
            <h3>Confirm Final Submission</h3>

            <p>
              <strong>Solved Questions:</strong> {solvedCount}
            </p>
            <p>
              <strong>Remaining Questions:</strong> {remainingCount}
            </p>

            <div className="final-popup-actions">
              <button
                className="confirm"
                onClick={() => handleSubmit(false)}
              >
                Submit Exam
              </button>
              <button
                className="cancel"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinalExam;
