import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/api";
import "./Test.css";

const Test = () => {
  const { subject } = useParams(); 
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const [timeLeft, setTimeLeft] = useState(25 * 60);

  const [showPopup, setShowPopup] = useState(false);
  const [popupMode, setPopupMode] = useState("confirm");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        let url = "";

        if (subject === "math") url = "/math/random";
        else if (subject === "gk") url = "/general-knowledge/random";
        else if (subject === "grammar") url = "/marathi-grammar/random";
        else if (subject === "intelligence") url = "/intelligence";

        const res = await API.get(url);
        setQuestions(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchQuestions();
  }, [subject]);

  useEffect(() => {
    if (!questions.length) return;

    if (timeLeft <= 0) {
      submitTest(); 
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, questions.length]);

  const handleSelect = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
  };

  const solvedQuestions = Object.keys(answers).length;
  const totalQuestions = questions.length;
  const remainingQuestions = totalQuestions - solvedQuestions;

  const submitTest = async () => {
    try {
      await API.post("/test/submit", { answers });

      navigate("/test/result", {
        state: { questions, answers },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!questions.length) return <h3>Loading...</h3>;

  const currentQuestion = questions[current];

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const Question = ({ data, selected, onSelect }) => {
    return (
      <div className="question-card">
        <p className="question-text">{data.question}</p>

        {["A", "B", "C", "D"].map((opt) => {
          const value = data[`option${opt}`];
          const isSelected = selected === value;

          return (
            <label
              key={opt}
              className={`option ${isSelected ? "selected" : ""}`}
            >
              <input
                type="radio"
                name={`question-${data._id}`}
                value={value}
                checked={isSelected}
                onChange={() => onSelect(value)}
              />
              <span className="option-text">{value}</span>
            </label>
          );
        })}
      </div>
    );
  };

  return (
    <div className="test-container">
      <div className="test-header">
        <h4 className="question-number">
          Question {current + 1} of {questions.length}
        </h4>

        <div
          className={`test-timer ${
            timeLeft <= 120 ? "danger" : ""
          }`}
        >
          ⏱ {formatTime(timeLeft)}
        </div>
      </div>

      <Question
        data={currentQuestion}
        selected={answers[currentQuestion._id]}
        onSelect={(ans) =>
          handleSelect(currentQuestion._id, ans)
        }
      />

      <div className="buttons top-buttons">
        <button
          disabled={current === 0}
          onClick={() => setCurrent(current - 1)}
        >
          Previous
        </button>

        {current === questions.length - 1 ? (
          <button
            onClick={() => {
              setPopupMode("confirm");
              setShowPopup(true);
            }}
          >
            Submit
          </button>
        ) : (
          <button onClick={() => setCurrent(current + 1)}>
            Next
          </button>
        )}
      </div>

      <div className="question-box-section">
        {questions.map((q, index) => {
          const isAnswered = answers[q._id];
          const isActive = current === index;

          let className = "question-box";
          if (isActive) className += " active";
          else if (isAnswered) className += " answered";

          return (
            <div
              key={q._id}
              className={className}
              onClick={() => setCurrent(index)}
            >
              {index + 1}
            </div>
          );
        })}
      </div>

      {showPopup && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Submission</h3>

            <p>
              <strong>Solved Questions:</strong>{" "}
              {solvedQuestions}
            </p>
            <p>
              <strong>Remaining Questions:</strong>{" "}
              {remainingQuestions}
            </p>

            <div className="modal-buttons">
              <button onClick={submitTest}>Submit exam</button>
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

export default Test;
