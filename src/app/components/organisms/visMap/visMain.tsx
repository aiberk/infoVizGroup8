//@ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { useSelection } from "@/app/context/store";
import { countriesData } from "@/app/data/testData";

const VisMap = () => {
  const { selectedCountry, selectedSelection } = useSelection();
  const mapContainerRef = useRef(null);
  const [tooltip, setTooltip] = useState({
    show: false,
    content: "",
    position: { x: 0, y: 0 },
  });

  useEffect(() => {
    const projection = d3.geoNaturalEarth1().scale(220).translate([480, 350]);
    const geoGenerator = d3.geoPath().projection(projection);

    const createMap = async () => {
      const geoData = await d3.json("geo.json");
      if (!geoData) return;

      // Clear previous SVG to prevent duplication
      d3.select(mapContainerRef.current).selectAll("svg").remove();

      const svgElement = d3
        .select(mapContainerRef.current)
        .append("svg")
        .attr("width", 1000)
        .attr("height", 600);

      const colorScale = d3
        .scaleLinear()
        .domain([0, 1])
        .range(["#ffffcc", "#800026"]);

      svgElement
        .selectAll("path")
        .data(geoData.features)
        .enter()
        .append("path")
        .attr("d", geoGenerator)
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
        .attr("class", "country")
        .on("mouseover", (event, d) => {
          const countryName = d.properties.name;
          const data = countriesData[countryName];
          let content = `${countryName}: ${
            data ? data[selectedSelection.toLowerCase()] : "No data"
          }`;
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
      className="mainViz flex justify-center items-center bg-white rounded-xl bg-opacity-5">
      {tooltip.show && (
        <div
          style={{
            left: tooltip.position.x,
            top: tooltip.position.y,
            position: "absolute",
          }}
          className="tooltip">
          {tooltip.content}
        </div>
      )}
    </div>
  );
};

export default VisMap;
