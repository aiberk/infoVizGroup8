import React from "react";
import { useSelection } from "@/app/context/store";

interface ColorScales {
  Sentiment: string[];
  "Denial Rate": string[];
  Aggressiveness: string[];
}

const VizLegend = () => {
  const { selectedSelection } = useSelection();

  // Define the color scales without gray for missing data
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

  // Calculate the range each color represents
  const percentageStep = 100 / (currentColorScale.length + 1); // Add 1 for the "missing data" gray

  return (
    <div className="legend">
      <div className="bg-cardColor p-4 rounded-sm h-1/2">
        <h1>Legend</h1>
        <div>
          <div className="flex flex-row items-center">
            <div
              className="h-4 w-4 mr-2"
              style={{ backgroundColor: "gray" }}></div>
            <div>Missing Data</div>
          </div>
          {currentColorScale.map((color, index) => (
            <div key={index} className="flex flex-row items-center">
              <div
                className="h-4 w-4 mr-2"
                style={{ backgroundColor: color }}></div>
              <div>
                {Math.round(percentageStep * index)}% -{" "}
                {index === currentColorScale.length - 1
                  ? "100%"
                  : `${Math.round(percentageStep * (index + 1))}%`}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VizLegend;
