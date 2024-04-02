import React from "react";
import Image from "next/image";

function Score({ score }) {
  return (
    <section className=" flex justify-center items-center h-screen">
      <div className="flex flex-col items-center">
        <Image
          src={score >= 5 ? "/gold-winner.gif" : "/fail.gif"}
          alt="GIF"
          width={300}
          height={200}
        />

        <h1 className="text-4xl text-blue-500 font-bold my-4 text-center">
          Your score : {score}
        </h1>

        <button
          className="w-[40%] my-4 bg-white hover:bg-gray-100   text-gray-800 font-semibold py-4 px-4 shadow-blue-200   rounded-lg shadow-2xl"
          onClick={() => window.location.reload()}
        >
          Play again
        </button>
      </div>
    </section>
  );
}

export default Score;
