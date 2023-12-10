import React from "react";
import { useSelection } from "@/app/context/store";

// Define an interface for the color scales
interface ColorScales {
  Sentiment: string[];
  "Denial Rate": string[];
  Aggressiveness: string[];
}

const VizColor = () => {
  const { selectedSelection } = useSelection();

  // Define the color scales
  const colorScales: ColorScales = {
    Sentiment: ["#b3cde3", "#6497b1", "#005b96", "#03396c", "#011f4b"],
    "Denial Rate": [
      "#ffffcc",
      "#ffeda0",
      "#fed976",
      "#feb24c",
      "#fd8d3c",
      "#fc4e2a",
      "#e31a1c",
      "#bd0026",
      "#800026",
    ],
    Aggressiveness: [
      "#ffd2a0",
      "#ffaa76",
      "#ff823c",
      "#ff5900",
      "#cc4600",
      "#993400",
      "#662200",
    ],
  };

  // Determine which color scale to use based on the selected selection
  const currentColorScale =
    colorScales[selectedSelection as keyof ColorScales] ||
    colorScales["Denial Rate"];

  return (
    <div className="colorScale flex justify-center items-center pb-8">
      <div className="w-6 h-full bg-cardColor shadow-md flex flex-col items-center py-6 px-6 rounded-lg">
        <div className="text-xs mb-2">0%</div>
        {currentColorScale.map((color: string, index: number) => (
          <div
            key={index}
            style={{
              backgroundColor: color,
              height: `${100 / currentColorScale.length}%`,
            }}
            className="w-2"></div>
        ))}
        <div className="text-xs mt-2">100%</div>
      </div>
    </div>
  );
};

export default VizColor;
