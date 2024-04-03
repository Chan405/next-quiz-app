"use client";
import React, { useEffect, useState } from "react";
import useQuiz from "@/store/store";
import axios from "axios";
import Score from "./Score";

function Quiz() {
  const [questions, setQuestions] = useState(null);

  const config = useQuiz((state) => state.config);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [correctlyAnswered, setCorrectlyAnswered] = useState({});

  const handleAnswerButtonClick = (answer) => {
    setSelectedAnswer(answer);
    setShowNextButton(true);
    if (
      answer === questions[currentQuestion].correct_answer &&
      !correctlyAnswered[currentQuestion]
    ) {
      setScore(score + 1);
      setCorrectlyAnswered({ ...correctlyAnswered, [currentQuestion]: true });
    }
  };

  const handleNextButtonClick = () => {
    setSelectedAnswer(null);
    setShowNextButton(false);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setQuizCompleted(true);
    }
  };

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://opentdb.com/api.php?amount=${config.numberOfQuestion}&category=${config.category.id}&difficulty=${config.level}&type=${config.type}`
      );

      let shuffledResults = data.results.map((e) => {
        let value = [...e.incorrect_answers, e.correct_answer]
          .map((value) => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value);

        e.answers = [...value];
        return e;
      });

      setQuestions(shuffledResults);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchQuestions();
  }, [config.category, config.level, config.type]);

  if (loading)
    return (
      <section className=" flex justify-center items-center h-screen">
        <h1 className="text-2xl text-red-400"> Loading ....</h1>
      </section>
    );

  return (
    <>
      {!quizCompleted ? (
        <div className="flex justify-center items-center h-screen">
          <section className="flex flex-col items-center">
            <h1 className="text-4xl text-red-500 my-4">
              Question
              <span className="text-rose-500 font-bold mx-1">
                #{currentQuestion + 1}
              </span>
            </h1>

            <h3 className="text-2xl text-red-500 font-bold my-4">
              Score : <span className="text-rose-500 font-bold"> {score} </span>
            </h3>

            <section className="bg-red-400 p-6 mx-6 shadow-md rounded-lg flex flex-col items-center">
              <h1 className="text-3xl text-white font-bolder my-4 text-center">
                {questions?.length > 0 &&
                  questions[currentQuestion].question
                    .replace(/&quot;/g, '"')
                    .replace(/&#039;/g, "'")}
              </h1>

              <div className="flex justify-evenly items-center flex-wrap w-full">
                {questions?.length > 0 &&
                  questions[currentQuestion].answers.map((answer) => (
                    <button
                      key={answer}
                      onClick={() => handleAnswerButtonClick(answer)}
                      className={`w-[40%] my-4 bg-white text-red-500 font-semibold py-4 rounded-lg shadow-sm ${
                        selectedAnswer === answer
                          ? answer === questions[currentQuestion].correct_answer
                            ? "bg-pink-500 text-white  "
                            : "bg-red-800 text-white"
                          : "hover:bg-gray-100 shadow-blue-200"
                      }`}
                    >
                      {answer}
                    </button>
                  ))}
              </div>

              <button
                className="w-[40%] my-4 bg-white hover:bg-gray-100 text-red-500 font-semibold py-4 px-4 shadow-blue-200   rounded-lg shadow-sm"
                onClick={handleNextButtonClick}
              >
                Next Question
              </button>
            </section>
          </section>
        </div>
      ) : (
        <Score score={score} />
      )}
    </>
  );
}

export default Quiz;
