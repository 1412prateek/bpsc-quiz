import React from "react";
import "../styles/quiz.css";

const Result = ({ score, total, onQuit }) => {
  const wrong = total - score;
  const scorePercent = ((score / total) * 100).toFixed(2);
  const wrongPercent = ((wrong / total) * 100).toFixed(2);

  return (
    <div className="result-container">
      <h2>Quiz Results</h2>
      <p>
        Correct: {score} ({scorePercent}%) | Wrong: {wrong} ({wrongPercent}%)
      </p>

      <div className="result-bar-container">
        <div
          className="result-bar correct-bar"
          style={{ width: `${scorePercent}%` }}
          title={`Correct: ${scorePercent}%`}
        />
        <div
          className="result-bar wrong-bar"
          style={{ width: `${wrongPercent}%` }}
          title={`Wrong: ${wrongPercent}%`}
        />
      </div>

      <button className="home-button" onClick={onQuit} style={{ marginTop: "20px" }}>
        Back to Home
      </button>
    </div>
  );
};

export default Result;
