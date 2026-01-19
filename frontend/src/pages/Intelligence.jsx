import { useEffect, useState } from "react";
import Question from "../components/Questions";
import API from "../api/api";


const Intelligence = () => {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const fetchIntelligence = async () => {
      const res = await API.get("/intelligence");
      setQuestions(res.data);
    };
    fetchIntelligence();
  }, []);

  if (!questions.length) return <h3>Loading...</h3>;

  const handleSelect = (option) => {
    setSelected(option);
    setShowAnswer(true);
  };

  const handleNext = () => {
    setCurrent(current + 1);
    setSelected(null);
    setShowAnswer(false);
  };

  const handlePrevious = () => {
    setCurrent(current - 1);
    setSelected(null);
    setShowAnswer(false);
  };

  return (
    <div className="math-container">
      <h4 className="question-number">
        Question {current + 1} of {questions.length}
      </h4>

      <Question
        data={questions[current]}
        selected={selected}
        showAnswer={showAnswer}
        onSelect={handleSelect}
      />

      <div className="math-buttons">
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
    </div>
  );
};

export default Intelligence;
