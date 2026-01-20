import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import "./PracticeRun.css";

const PracticeRun = () => {
  const { subject } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [jumpValue, setJumpValue] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        let url = "";

        if (subject === "math") url = "/math";
        else if (subject === "gk") url = "/gk";
        else if (subject === "grammar") url = "/grammar";
        else if (subject === "intelligence") url = "/intelligence";
        else {
          navigate("/practice");
          return;
        }

        const res = await API.get(url);
        setQuestions(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchQuestions();
  }, [subject, navigate]);

  if (!questions.length) return <h3 className="pr-loading">Loading...</h3>;

  const q = questions[current];
  const options = [q.optionA, q.optionB, q.optionC, q.optionD];

  const handleSelect = (opt) => {
    setSelected(opt);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
    }
  };

  const handlePrevious = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setSelected(null);
    }
  };

  const handleJump = () => {
    const num = Number(jumpValue);

    if (num >= 1 && num <= questions.length) {
      setCurrent(num - 1);
      setSelected(null);
      setJumpValue("");
    }
  };

  return (
    <div className="pr-container">

      <h4 className="pr-question-count">
        Question {current + 1} of {questions.length}
      </h4>

      <div className="pr-card">
        <p className="pr-question-text">{q.question}</p>

        <div className="pr-options">
          {options.map((opt, idx) => {
            let cls = "pr-option";

            if (selected === opt) {
              cls += opt === q.correctAnswer ? " correct" : " wrong";
            }

            return (
              <div
                key={idx}
                className={cls}
                onClick={() => handleSelect(opt)}
              >
                <input
                  type="radio"
                  checked={selected === opt}
                  readOnly
                />
                <span>{opt}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pr-nav">
        <div className="pr-nav-buttons">
          <button
            disabled={current === 0}
            onClick={handlePrevious}
          >
            Previous
          </button>

          <button
            disabled={current === questions.length - 1}
            onClick={handleNext}
          >
            Next
          </button>
        </div>

        <div className="pr-jump">
          Jump To Question
          <input
            type="number"
            placeholder="Q No."
            value={jumpValue}
            onChange={(e) => setJumpValue(e.target.value)}
          />
          <button onClick={handleJump}>Go</button>
        </div>
      </div>
    </div>
  );
};

export default PracticeRun;
