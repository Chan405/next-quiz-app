import React from "react";
import useQuiz from "@/store/store";

function Input() {
  const addQuestionNumber = useQuiz((state) => state.addQuestionNumber);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-white font-bold"> Number of questions </label>
      <input
        type="number"
        defaultValue={10}
        className="h-8 rounded bg-white pl-3 focus:outline-none"
        onChange={(e) => {
          const temp = parseInt(e.target.value);
          addQuestionNumber(temp);
        }}
      />
    </div>
  );
}

export default Input;
