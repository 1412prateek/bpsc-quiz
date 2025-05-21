import React, { useState } from "react";
import Quiz from "./components/Quiz";
import { week1 } from "./data/week1";
import week2 from "./data/week2";


import { getRandomQuestions } from "./utils/getRandomQuestions";
import "./styles/quiz.css";

function App() {
  const [screen, setScreen] = useState("home");
  const [questions, setQuestions] = useState([]);
  const [quizTitle, setQuizTitle] = useState("");

  const handleStartWeek = (week, title) => {
    setQuestions(week);
    setQuizTitle(title);
    setScreen("quiz");
  };

  const handleStartMisc = () => {
    const random = getRandomQuestions([...week1, ...week2]); // add more weeks as needed
    setQuestions(random);
    setQuizTitle("Miscellaneous Questions");
    setScreen("quiz");
  };

  const goHome = () => {
    setScreen("home");
  };

  if (screen === "quiz") {
    return <Quiz questions={questions} onQuit={goHome} quizTitle={quizTitle} />;
  }

  return (
    <div className="quiz-container">
      <h1 className="title">BPSC Weekly Quiz</h1>
      <button className="week-button" onClick={() => handleStartWeek(week1, "Week 1")}>
        Week 1
      </button>

      {/* Future weeks */}
      <button className="week-button" onClick={() => handleStartWeek(week2, "Week 2")}>
        Week 2
        </button>

      <button className="week-button" onClick={handleStartMisc}>
        Miscellaneous Questions
      </button>
    </div>
  );
}

export default App;
