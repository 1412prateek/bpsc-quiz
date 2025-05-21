import React, { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";
import Result from "./Result";
import "../styles/quiz.css";

const Quiz = ({ questions, onQuit, title = "Quiz" }) => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showFirework, setShowFirework] = useState(false);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(questions.length * 15); // Total time for the quiz

  useEffect(() => {
    if (timeLeft <= 0) {
      setTimeout(() => setShowScore(true), 2000); // Show result after 2 seconds
      return;
    }
    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleAnswer = (selectedOption, isCorrect) => {
    if (answers[current] != null) return;

    setAnswers({ ...answers, [current]: selectedOption });

    if (isCorrect) {
      setScore(score + 1);
      triggerFirework();
    }
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    }
  };

  const handlePrevious = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const triggerFirework = () => {
    setShowFirework(true);
    setTimeout(() => setShowFirework(false), 800);
  };

  const handleShowResults = () => {
    setShowScore(true);
  };

  const progress = ((current + 1) / questions.length) * 100;

  if (showScore) {
    return (
      <Result score={score} total={questions.length} onQuit={onQuit} />
    );
  }

  return (
    <div className="quiz-container">
      <h1 className="title">{title}</h1>

      <div className="progress-bar">
        <div className="filler" style={{ width: `${progress}%` }}></div>
      </div>

      <p className="timer">Time left: {timeLeft}s</p>

      {showFirework && <div className="firework">🎆</div>}

      <QuestionCard
        data={questions[current]}
        onAnswer={handleAnswer}
        selectedOption={answers[current]}
      />

      <div className="nav-buttons">
        <button onClick={handlePrevious} disabled={current === 0}>
          Previous
        </button>
        {current < questions.length - 1 ? (
          <button onClick={handleNext}>Next</button>
        ) : (
          <button onClick={handleShowResults}>Show Results</button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
