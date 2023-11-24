//@ts-nocheck
import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import geoJsonData from "@/app/data/geo.json"; // Ensure this path is correct

const CountryShape = ({ countryName }) => {
  // Add a prop for the country name
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      // Set up the projection and path generator
      const projection = d3.geoMercator().fitSize([420, 250], geoJsonData);
      const pathGenerator = d3.geoPath().projection(projection);

      // Select the svg element using ref and bind the GeoJSON data
      const svg = d3.select(ref.current);
      svg
        .selectAll("path")
        .data(geoJsonData.features)
        .join("path")
        .attr("d", pathGenerator)
        .attr("fill", (d) =>
          d.properties.name === countryName ? "#ffcc00" : "#dddd"
        ) // Use the countryName prop to determine which country to highlight
        .attr("stroke", "#fff")
        .attr("stroke-width", 0.5);

      // Optionally, bring the highlighted country to the front
      svg
        .selectAll("path")
        .filter((d) => d.properties.name === countryName)
        .raise(); // This moves the selected country's path to the front
    }
  }, [countryName]); // Add countryName to the dependency array to update when it changes

  return (
    <svg
      ref={ref}
      viewBox="0 0 420 250" // Adjust the viewBox depending on your sizing needs
      className="w-full h-auto border border-white border-opacity-20 rounded-lg bg-white bg-opacity-5 p-6"
    />
  );
};

export default CountryShape;
