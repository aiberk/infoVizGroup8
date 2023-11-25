//@ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { useSelection } from "@/app/context/store";
import { countriesData } from "@/app/data/testData";

const VisMap = () => {
  const { selectedYear, selectedSelection } = useSelection();
  const mapContainerRef = useRef(null);
  const [tooltip, setTooltip] = useState({
    show: false,
    content: "",
    position: { x: 0, y: 0 },
  });

  const colorScale = d3
    .scaleLinear()
    .domain([0, 1])
    .range(["#ffffcc", "#800026"]);

  const generateTooltipContent = (countryName) => {
    const yearData = countriesData[countryName]
      ? countriesData[countryName][selectedYear]
      : null;

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

  const updateColors = () => {
    d3.select(mapContainerRef.current)
      .selectAll("path")
      .transition()
      .duration(500)
      .attr("fill", (d) => {
        const countryName = d.properties.name;
        const yearData = countriesData[countryName]
          ? countriesData[countryName][selectedYear]
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
            // No default needed, metricValue already set to 0
          }
          return colorScale(metricValue);
        }
        return "#ccc";
      });
  };

  useEffect(() => {
    let svgElement = d3.select(mapContainerRef.current).select("svg");
    if (svgElement.empty()) {
      svgElement = d3
        .select(mapContainerRef.current)
        .append("svg")
        .attr("width", 1000)
        .attr("height", 600);

      const projection = d3.geoNaturalEarth1().scale(220).translate([480, 350]);
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
