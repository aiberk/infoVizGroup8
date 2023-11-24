// @ts-nocheck
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useSelection } from "@/app/context/store";

// Sample countries data
const countriesData = {
  Bolivia: { sentiment: 0.1, denial: 0.1, aggressive: 0.9 },
  China: { sentiment: 0.1, denial: 0.9, aggressive: 0.05 },
  // ... other countries
};

const VisMap = () => {
  const { selectedCountry, selectedSelection } = useSelection();
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const svgElement = d3
      .select(mapContainerRef.current)
      .append("svg")
      .attr("width", 1000)
      .attr("height", 600);

    const createMap = async () => {
      const geoData = await d3.json("geo.json");
      if (!geoData) return;

      const projection = d3.geoNaturalEarth1().scale(220).translate([480, 350]);
      const pathGenerator = d3.geoPath().projection(projection);

      const colorScale = d3
        .scaleLinear()
        .domain([0, 1]) // Assuming data is between 0 and 1
        .range(["#ffffcc", "#800026"]); // Color range

      svgElement
        .selectAll("path")
        .data(geoData.features)
        .enter()
        .append("path")
        .attr("d", pathGenerator)
        .attr("fill", (d) => {
          const countryName = d.properties.name;
          const data = countriesData[countryName];
          if (data) {
            // Select the metric based on selectedSelection
            let metricValue;
            switch (selectedSelection) {
              case "Sentiment":
                metricValue = data.sentiment;
                break;
              case "Denial Rate":
                metricValue = data.denial;
                break;
              case "Aggressiveness":
                metricValue = data.aggressive;
                break;
              default:
                metricValue = 0; // Default value if selection is not recognized
            }
            return colorScale(metricValue);
          }
          return "#ccc"; // Default color for countries without data
        })
        .attr("class", "country");
    };

    createMap();

    return () => {
      if (mapContainerRef.current) {
        d3.select(mapContainerRef.current).select("svg").remove();
      }
    };
  }, [selectedCountry, selectedSelection]);

  return (
    <div
      ref={mapContainerRef}
      className="mainViz flex justify-center items-center bg-white rounded-sm bg-opacity-5"></div>
  );
};

export default VisMap;
