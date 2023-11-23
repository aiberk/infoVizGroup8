import React from "react";

type Props = {};

const Logo = (props: Props) => {
  const letters = ["A", "C", "J", "R"];
  return (
    <div className="flex flex-row gap-2">
      {letters.map((letter) => (
        <div
          key={letter}
          className="bg-white w-8 h-8 flex justify-center items-center text-2xl font-bold text-gray-700">
          {letter}
        </div>
      ))}
    </div>
  );
};

export default Logo;
