import React from "react";
import "../styles/quiz.css";

const QuestionCard = ({ data, onAnswer, selectedOption }) => {
  const { question, options, answer } = data;

  const handleClick = (option) => {
    if (selectedOption) return; // prevent multiple clicks
    const isCorrect = option === answer;
    onAnswer(option, isCorrect);
  };

  return (
    <div className="question-card">
      <div className="question" dangerouslySetInnerHTML={{ __html: question }} />

      <div className="options">
        {options.map((option, index) => {
          let className = "option-button";
          if (selectedOption) {
            if (option === answer) className += " correct";
            else if (option === selectedOption) className += " incorrect";
          }

          return (
            <button
              key={index}
              className={className}
              onClick={() => handleClick(option)}
              disabled={!!selectedOption}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
