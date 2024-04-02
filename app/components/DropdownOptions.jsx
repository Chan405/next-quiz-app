"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useQuiz from "@/store/store";

function DropdownOptions() {
  const [categories, setCategory] = useState([]);

  const config = useQuiz((state) => state.config);
  const addCategory = useQuiz((state) => state.addCategory);
  const addLevel = useQuiz((state) => state.addLevel);
  const addType = useQuiz((state) => state.addType);

  const fetchCategory = async () => {
    const { data } = await axios.get("https://opentdb.com/api_category.php");
    setCategory(data?.trivia_categories);
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div className="my-4 flex flex-col md:flex-row md:items-center md:justify-between">
      <select
        className="border border-slate-500 px-4 py-2 rounded-md"
        onChange={(e) => {
          const id = parseInt(e.target.value);
          const name = e.target.options[e.target.selectedIndex].text;
          addCategory(id, name);
        }}
        defaultValue={""}
      >
        <option value="" disabled>
          Select Category
        </option>

        {categories.map((category) => (
          <option value={category.id} key={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <select
        className="border border-slate-500 px-4 py-2 rounded-md"
        onChange={(e) => {
          addLevel(e.target.value);
        }}
        defaultValue=""
      >
        <option value="" disabled>
          Select Level
        </option>
        <option value="hard"> Hard </option>
        <option value="medium"> Meduim </option>
        <option value="easy"> Easy</option>
      </select>

      <select
        className="border border-slate-500 px-4 py-2 rounded-md"
        onChange={(e) => {
          addType(e.target.value);
        }}
        defaultValue=""
      >
        <option value="" disabled>
          Select Type
        </option>
        <option value="boolean">boolean </option>
        <option value="multiple"> multiple </option>
      </select>
    </div>
  );
}

export default DropdownOptions;
