//@ts-nocheck
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useSelection } from "@/app/context/store";
import { countriesData } from "@/app/data/testData";

const VisMap = () => {
  const { selectedCountry, selectedSelection } = useSelection();
  const mapContainerRef = useRef(null);

  // Create and draw the map
  useEffect(() => {
    const svgElement = d3
      .select(mapContainerRef.current)
      .append("svg")
      .attr("width", 1000)
      .attr("height", 600);

    const projection = d3.geoNaturalEarth1().scale(220).translate([480, 350]);
    const pathGenerator = d3.geoPath().projection(projection);

    const createMap = async () => {
      const geoData = await d3.json("geo.json");
      if (!geoData) return;

      const projection = d3.geoNaturalEarth1().scale(220).translate([480, 350]);
      const pathGenerator = d3.geoPath().projection(projection);

      const colorScale = d3
        .scaleLinear()
        .domain([0, 1])
        .range(["#ffffcc", "#800026"]);

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
                metricValue = 0;
            }
            return colorScale(metricValue);
          }
          return "#ccc";
        })
        .attr("class", "country");
    };

    createMap();

    return () => {
      if (mapContainerRef.current) {
        d3.select(mapContainerRef.current).select("svg").remove();
      }
    };
  }, [selectedCountry]);

  // Update colors when selection changes
  useEffect(() => {
    const colorScale = d3
      .scaleLinear()
      .domain([0, 1]) // Assuming data is between 0 and 1
      .range(["#ffffcc", "#800026"]); // Color range

    const updateColors = () => {
      d3.select(mapContainerRef.current)
        .selectAll("path")
        .transition() // Smooth transition
        .duration(500) // Duration of the transition
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
                metricValue = 0;
            }
            return colorScale(metricValue);
          }
          return "#ccc";
        });
    };

    updateColors();
  }, [selectedSelection]);

  return (
    <div
      ref={mapContainerRef}
      className="mainViz flex justify-center items-center bg-white rounded-xl bg-opacity-5"></div>
  );
};

export default VisMap;
