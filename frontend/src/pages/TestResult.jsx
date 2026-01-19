import { useLocation, useNavigate } from "react-router-dom";
import "./TestResult.css";

const TestResult = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const questions = location.state?.questions || [];
  const answers = location.state?.answers || {};

  if (!questions.length) {
    return <h3>No result data found</h3>;
  }

  const isFinalExam = questions.length === 100;

  let score = 0;

  const sectionScore = {
    gk: 0,
    math: 0,
    grammar: 0,
    intelligence: 0,
  };

  questions.forEach((q, index) => {
    const userAnswer = answers[q._id];

    if (userAnswer === q.correctAnswer) {
      score++;

      if (isFinalExam) {
        if (index < 25) sectionScore.gk++;
        else if (index < 50) sectionScore.math++;
        else if (index < 75) sectionScore.grammar++;
        else sectionScore.intelligence++;
      }
    }
  });

  const total = questions.length;

  const getEmoji = () => {
    const percent = (score / total) * 100;
    if (percent >= 80) return "🎉😄";
    if (percent >= 50) return "👍🙂";
    return "📘😢";
  };

  return (
    <div className="result-page">
      <h2>{isFinalExam ? "Final Exam Result" : "Test Result"}</h2>

      <div className="result-summary-card">
        <div className="result-score">
          <div className="result-emoji">{getEmoji()}</div>
          <h3>
            {score} / {total}
          </h3>
          <p>Total Score</p>
        </div>
      </div>

      {isFinalExam && (
        <div className="section-score-card">
          <h3>Section-wise Marks</h3>

          <div className="section-row">
            <span>General Knowledge</span>
            <strong>{sectionScore.gk} / 25</strong>
          </div>

          <div className="section-row">
            <span>Math</span>
            <strong>{sectionScore.math} / 25</strong>
          </div>

          <div className="section-row">
            <span>Grammar</span>
            <strong>{sectionScore.grammar} / 25</strong>
          </div>

          <div className="section-row">
            <span>Intelligence</span>
            <strong>{sectionScore.intelligence} / 25</strong>
          </div>
        </div>
      )}

      {questions.map((q, index) => {
        const userAnswer = answers[q._id];

        return (
          <div key={q._id} className="result-card">
            <h4>
              {index + 1}. {q.question}
            </h4>

            <div className="result-options">
              {["A", "B", "C", "D"].map((opt) => {
                const value = q[`option${opt}`];
                let cls = "result-option";

                if (value === q.correctAnswer) cls += " correct";

                if (userAnswer === value && value !== q.correctAnswer) {
                  cls += " wrong";
                }

                return (
                  <div key={opt} className={cls}>
                    {value}
                  </div>
                );
              })}
            </div>

            <div className="your-answer">
              <strong>Your Answer:</strong>{" "}
              {userAnswer ? userAnswer : "Not Attempted"}
            </div>
          </div>
        );
      })}

      <button
        className="result-back-btn"
        onClick={() => navigate("/test")}
      >
        Back to Test
      </button>
    </div>
  );
};

export default TestResult;
