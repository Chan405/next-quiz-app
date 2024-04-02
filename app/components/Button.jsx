"use client";
import React from "react";
import useQuiz from "@/store/store";

function Button() {
  const changeStatus = useQuiz((state) => state.changeStatus);

  return (
    <button
      className="bg-white border border-slate-700 font-bold py-2 px-4 rounded mx-auto"
      onClick={() => changeStatus("start")}
    >
      Start Quiz
    </button>
  );
}

export default Button;
