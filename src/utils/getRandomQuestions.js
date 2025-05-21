// src/utils/getRandomQuestions.js

export function getRandomQuestions(weeks, count = 10) {
  // weeks should be an array of arrays
  const combined = weeks.flat();
  return shuffle(combined).slice(0, count);
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}
