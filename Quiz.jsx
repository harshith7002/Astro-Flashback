import React, { useState } from 'react';

const quizQuestions = [
  {
    question: "What was the first artificial Earth satellite?",
    options: ["Apollo 11", "Sputnik 1", "Hubble Telescope", "Voyager 1"],
    answer: "Sputnik 1",
  },
  {
    question: "Which mission first landed humans on the Moon?",
    options: ["Apollo 11", "Gemini 7", "Soyuz 1", "Mercury-Redstone 3"],
    answer: "Apollo 11",
  },
  {
    question: "The James Webb Space Telescope is the successor to which observatory?",
    options: ["Chandra", "Kepler", "Hubble", "Spitzer"],
    answer: "Hubble",
  },
  {
    question: "The New Horizons spacecraft flew past which planet?",
    options: ["Ceres", "Eris", "Makemake", "Pluto"],
    answer: "Pluto",
  },
];

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnswerClick = (option) => {
    if (isAnswered) return;

    setSelectedAnswer(option);
    setIsAnswered(true);

    if (option === quizQuestions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setIsAnswered(false);
        setSelectedAnswer(null);
      } else {
        setQuizFinished(true);
      }
    }, 1500);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setQuizFinished(false);
  };

  const getButtonClass = (option) => {
    if (!isAnswered) return "bg-slate-700 hover:bg-indigo-600";
    const correct = quizQuestions[currentQuestionIndex].answer;
    if (option === correct) return "bg-green-500";
    if (option === selectedAnswer && option !== correct) return "bg-red-500";
    return "bg-slate-700";
  };

  return (
    <div className="p-8 text-white flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      <h1 className="text-3xl font-bold mb-6 text-indigo-300">Astro Quiz</h1>
      <div className="bg-slate-800 p-6 rounded-lg shadow-lg text-center max-w-2xl w-full">
        {quizFinished ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
            <p className="text-xl text-indigo-200 mb-6">
              You scored {score} out of {quizQuestions.length}
            </p>
            <button
              onClick={restartQuiz}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-6 rounded-full transition-transform duration-300 transform hover:scale-105"
            >
              Play Again
            </button>
          </div>
        ) : (
          <>
            <p className="text-indigo-200 mb-4">
              Question {currentQuestionIndex + 1} of {quizQuestions.length}
            </p>
            <h2 className="text-xl font-semibold mb-4">
              {quizQuestions[currentQuestionIndex].question}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {quizQuestions[currentQuestionIndex].options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswerClick(option)}
                  disabled={isAnswered}
                  className={`p-4 rounded-lg font-medium transition-all duration-300 ${getButtonClass(
                    option
                  )} ${!isAnswered ? "cursor-pointer" : "cursor-not-allowed"}`}
                >
                  {option}
                </button>
              ))}
            </div>
            {isAnswered && (
              <p className="text-lg font-semibold">
                {selectedAnswer === quizQuestions[currentQuestionIndex].answer
                  ? "Correct! 🎉"
                  : `Incorrect. Correct: ${quizQuestions[currentQuestionIndex].answer}`}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
