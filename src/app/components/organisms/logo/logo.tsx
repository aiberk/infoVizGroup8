import Link from "next/link";
import React from "react";

type Props = {};

const Logo = (props: Props) => {
  const letters = ["A", "C", "J", "R"];
  return (
    <Link
      href="/"
      className="flex flex-row gap-2 m-10 font-bold uppercase bg-white text-black px-2 rounded-xl ">
      {/* {letters.map((letter) => (
        <div
          key={letter}
          className="bg-white w-8 h-8 flex justify-center items-center text-2xl font-bold text-gray-700">
          {letter}
        </div>
      ))} */}
      The World Tweets about Climate Change
    </Link>
  );
};

export default Logo;
