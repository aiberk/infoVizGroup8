import React from "react";
import clsx from "clsx";

type Props = {};

const VizColor = (props: Props) => {
  const colorScale = [1, 2, 3, 4, 5, 6, 7];
  return (
    <div className="colorScale flex justify-center items-center pb-8">
      <div className="w-6 h-full bg-cardColor shadow-md flex flex-col items-center py-6 px-6 rounded-lg">
        <div className="text-xs mb-2">0%</div>
        {colorScale.map((color) => (
          <div
            key={color}
            className={clsx("w-2 h-full", {
              "bg-sky-100": color === 1,
              "bg-sky-200": color === 2,
              "bg-sky-300": color === 3,
              "bg-sky-400": color === 4,
              "bg-sky-500": color === 5,
              "bg-sky-600": color === 6,
              "bg-sky-700": color === 7,
              // Add more cases as needed
            })}></div>
        ))}
        <div className="text-xs mt-2">100%</div>
      </div>
    </div>
  );
};

export default VizColor;
