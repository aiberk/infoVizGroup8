// @ts-nocheck
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useSelection } from "@/app/context/store";

// Sample countries data
const countriesData = {
  Bolivia: { sentiment: 0.3, denial: 0.1, aggressive: 0.05 },
  China: { sentiment: 0.1, denial: 0.9, aggressive: 0.1 },
  // ... other countries
};

const VisMap = () => {
  const { selectedCountry } = useSelection();
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

      // Create a color scale (modify this based on your data)
      const colorScale = d3
        .scaleLinear()
        .domain([0, 1]) // Assuming the data is between 0 and 1
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
          return data ? colorScale(data.sentiment) : "#ccc"; // Use sentiment for color
        })
        .attr("class", "country");
    };

    createMap();

    // Cleanup function to remove the svg element on unmount
    return () => {
      if (mapContainerRef.current) {
        d3.select(mapContainerRef.current).select("svg").remove();
      }
    };
  }, [selectedCountry]); // Dependencies array for useEffect

  return (
    <div
      ref={mapContainerRef}
      className="mainViz flex justify-center items-center"></div>
  );
};

export default VisMap;
