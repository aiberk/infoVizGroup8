//@ts-nocheck

// This file is based on the following sources:
// - https://geojson-maps.ash.ms/
// - https://github.com/xihai01/d3-mapping-with-react/tree/main
// - https://www.d3indepth.com/geographic/

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { useSelection } from "@/app/context/store";
import { data } from "@/app/data/realData";

const VisMap = () => {
  // Controls the maps state (year, selection)
  const { selectedYear, selectedSelection } = useSelection();
  const mapContainerRef = useRef(null);
  const [tooltip, setTooltip] = useState({
    show: false,
    content: "",
    position: { x: 0, y: 0 },
  });

  // Define different color scales for each selection
  const colorScales = {
    Sentiment: d3.scaleLinear().domain([0, 1]).range(["#b3cde3", "#011f4b"]),
    "Denial Rate": d3
      .scaleLinear()
      .domain([0, 1])
      .range(["#ffffcc", "#800026"]),
    Aggressiveness: d3
      .scaleLinear()
      .domain([0, 1])
      .range(["#ffd2a0", "#662200"]),
  };

  // Generate the tooltip content
  const generateTooltipContent = (countryName) => {
    const yearData = data[countryName] ? data[countryName][selectedYear] : null;

    let metricValue;
    if (yearData) {
      switch (selectedSelection) {
        case "Sentiment":
          metricValue = `Sentiment: ${yearData.sentiment}`;
          break;
        case "Denial Rate":
          metricValue = `Denial Rate: ${yearData.denial}`;
          break;
        case "Aggressiveness":
          metricValue = `Aggressiveness: ${yearData.aggressive}`;
          break;
        default:
          metricValue = "No data";
      }
    } else {
      metricValue = "No data";
    }

    return `${countryName}: ${metricValue}`;
  };

  // Update the colors of the map when a selection is changed
  const updateColors = () => {
    const currentColorScale =
      colorScales[selectedSelection] || colorScales["Denial Rate"];

    d3.select(mapContainerRef.current)
      .selectAll("path")
      .transition()
      .duration(500)
      .attr("fill", (d) => {
        const countryName = d.properties.name;
        const yearData = data[countryName]
          ? data[countryName][selectedYear]
          : null;
        if (yearData) {
          let metricValue = 0;
          switch (selectedSelection) {
            case "Sentiment":
              metricValue = yearData.sentiment;
              break;
            case "Denial Rate":
              metricValue = yearData.denial;
              break;
            case "Aggressiveness":
              metricValue = yearData.aggressive;
              break;
          }
          return currentColorScale(metricValue);
        }
        return "#ccc";
      });
  };

  // Creates the map and listens for changes in the selection
  useEffect(() => {
    let svgElement = d3.select(mapContainerRef.current).select("svg");
    if (svgElement.empty()) {
      svgElement = d3
        .select(mapContainerRef.current)
        .append("svg")
        .attr("width", 1000)
        .attr("height", 600);

      const projection = d3.geoMercator().scale(150).translate([480, 420]);
      const geoGenerator = d3.geoPath().projection(projection);

      const geoDataPromise = d3.json("geo.json");

      Promise.all([geoDataPromise]).then(([geoData]) => {
        if (!geoData) return;

        svgElement
          .selectAll("path")
          .data(geoData.features)
          .enter()
          .append("path")
          .attr("d", geoGenerator)
          .attr("class", "country")
          .on("mouseover", (event, d) => {
            const countryName = d.properties.name;
            let content = generateTooltipContent(countryName);

            setTooltip({
              show: true,
              content,
              position: { x: event.pageX, y: event.pageY },
            });
          })
          .on("mousemove", (event) => {
            setTooltip((prev) => ({
              ...prev,
              position: { x: event.pageX, y: event.pageY },
            }));
          })
          .on("mouseout", () => {
            setTooltip({ show: false, content: "", position: { x: 0, y: 0 } });
          });

        updateColors();
      });
    }

    return () => {
      if (mapContainerRef.current) {
        d3.select(mapContainerRef.current).select("svg").remove();
      }
    };
  }, []);

  useEffect(() => {
    updateColors();
  }, [selectedSelection, selectedYear]);

  return (
    // Actual map rendering happens here
    <div
      ref={mapContainerRef}
      className="mainViz flex justify-center items-center bg-white rounded-xl bg-opacity-5">
      {tooltip.show && (
        <div
          style={{
            left: tooltip.position.x,
            top: tooltip.position.y,
            position: "absolute",
            color: "white",
            backgroundColor: "black",
            padding: "0.5rem",
            borderRadius: "0.2rem",
            pointerEvents: "none",
          }}
          className="tooltip">
          {tooltip.content}
        </div>
      )}
    </div>
  );
};

export default VisMap;
