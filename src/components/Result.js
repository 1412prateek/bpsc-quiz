import React from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import "../styles/quiz.css";

const Result = ({ score, total, onQuit, questions = [], userAnswers = [] }) => {
  const wrong = total - score;
  const scorePercent = ((score / total) * 100).toFixed(2);
  const wrongPercent = ((wrong / total) * 100).toFixed(2);

  const data = [
    { name: "Correct", value: score },
    { name: "Wrong", value: wrong },
  ];

  const COLORS = ["#00C49F", "#FF8042"];

  return (
    <div className="result-container">
      <motion.h2
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Quiz Results
      </motion.h2>

      <p>
        Correct: {score} ({scorePercent}%) | Wrong: {wrong} ({wrongPercent}%)
      </p>

      {/* Existing bar chart remains untouched */}
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

      {/* New Animated Pie Chart Section */}
      <div style={{ width: "100%", height: 250, marginTop: 30 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* New: Question-by-Question Review (Optional & Safe) */}
      {questions.length > 0 && userAnswers.length > 0 && (
        <motion.div
          className="question-review-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ marginTop: "30px" }}
        >
          <h3>Review Your Answers</h3>
          {questions.map((q, index) => {
            const isCorrect = userAnswers[index] === q.correctAnswer;
            return (
              <div
                key={index}
                className={`review-question ${isCorrect ? "correct" : "wrong"}`}
                style={{
                  marginBottom: "15px",
                  padding: "10px",
                  borderRadius: "8px",
                  background: isCorrect ? "#e6ffed" : "#ffe6e6",
                }}
              >
                <p><strong>Q{index + 1}:</strong> {q.question}</p>
                <p><strong>Your Answer:</strong> {userAnswers[index]}</p>
                <p><strong>Correct Answer:</strong> {q.correctAnswer}</p>
                <p style={{ color: isCorrect ? "green" : "red" }}>
                  {isCorrect ? "✅ Correct" : "❌ Incorrect"}
                </p>
              </div>
            );
          })}
        </motion.div>
      )}

      <motion.button
        className="home-button"
        onClick={onQuit}
        style={{ marginTop: "20px" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Back to Home
      </motion.button>
    </div>
  );
};

export default Result;
