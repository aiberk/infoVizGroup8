import React from "react";
import clsx from "clsx";

import { useSelection } from "@/app/context/store";

type Props = {};

const VizColor = () => {
  const colorScale = [1, 2, 3, 4, 5, 6, 7];

  // Function to interpolate between two colors
  function interpolateColor(
    color1: string,
    color2: string,
    factor?: number
  ): string {
    if (factor === undefined) {
      factor = 0.5;
    }
    let result = color1
      .slice(1)
      .match(/.{2}/g)!
      .map((hex: string) => parseInt(hex, 16));

    let color2Components = color2
      .slice(1)
      .match(/.{2}/g)!
      .map((hex: string) => parseInt(hex, 16));

    for (let i = 0; i < 3; i++) {
      result[i] = Math.round(
        result[i] + factor * (color2Components[i] - result[i])
      );
    }
    return `#${result.map((n) => n.toString(16).padStart(2, "0")).join("")}`;
  }

  // Generate intermediate colors
  const generatedColors = colorScale.map((step) =>
    interpolateColor("#ffffcc", "#800026", step / 7)
  );

  return (
    <div className="colorScale flex justify-center items-center pb-8">
      <div className="w-6 h-full bg-cardColor shadow-md flex flex-col items-center py-6 px-6 rounded-lg">
        <div className="text-xs mb-2">0%</div>
        {generatedColors.map((color, index) => (
          <div
            key={index}
            style={{ backgroundColor: color }}
            className="w-2 h-full"></div>
        ))}
        <div className="text-xs mt-2">100%</div>
      </div>
    </div>
  );
};

export default VizColor;
