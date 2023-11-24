// @ts-nocheck
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useSelection } from "@/app/context/store";

const VisMap = () => {
  const { selectedCountry } = useSelection();
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const svgElement = d3
      .select(mapContainerRef.current)
      .append("svg")
      .attr("width", 800)
      .attr("height", 500);

    const createMap = async () => {
      const geoData = await d3.json("geo.json");

      if (!geoData) return;

      const projection = d3.geoNaturalEarth1().scale(150).translate([400, 250]);
      const pathGenerator = d3.geoPath().projection(projection);

      svgElement
        .selectAll("path")
        .data(geoData.features)
        .enter()
        .append("path")
        .attr("d", pathGenerator)
        .attr("class", "country")
        .attr("fill", "#ccc");
    };

    createMap();

    // Cleanup function to remove the svg element on unmount
    return () => {
      if (mapContainerRef.current) {
        d3.select(mapContainerRef.current).select("svg").remove();
      }
    };
  }, [selectedCountry]); // Dependencies array for useEffect

  return <div ref={mapContainerRef} className="mainViz part"></div>;
};

export default VisMap;
