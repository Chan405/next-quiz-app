"use client";
import Input from "./components/Input";
import DropdownOptions from "./components/DropdownOptions";
import Button from "./components/Button";
import useQuiz from "@/store/store";

export default function Home() {
  const config = useQuiz((state: any) => state.config);
  return (
    <div className="flex justify-center items-center h-screen">
      <section className="flex flex-col items-center w-full ">
        <h1 className="text-4xl text-red-500 font-bold mb-5">
          Welcome to Channie Quiz
        </h1>

        <section className="bg-red-400 p-6 mx-6 shadow-md rounded-lg w-1/2">
          <Input />
          <DropdownOptions />
          <Button />
        </section>
      </section>
    </div>
  );
}
