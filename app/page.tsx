"use client";
import Input from "./components/Input";
import DropdownOptions from "./components/DropdownOptions";
import Button from "./components/Button";
import useQuiz from "@/store/store";

export default function Home() {
  const config = useQuiz((state: any) => state.config);
  return (
    <section className="flex flex-col items-center">
      <h1 className="text-4xl font-bold my-4"> Welcome to Channie Quiz </h1>

      <section className="bg-white p-6 mx-6 shadow-md rounded-lg w-1/2">
        <Input />
        <DropdownOptions />
        <Button />
      </section>
    </section>
  );
}
