//@ts-nocheck
import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import geoJsonData from "@/app/data/geo.json";

const CountryShape = ({ countryName }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const projection = d3.geoMercator().fitSize([420, 250], geoJsonData);
      const pathGenerator = d3.geoPath().projection(projection);

      const svg = d3.select(ref.current);
      svg
        .selectAll("path")
        .data(geoJsonData.features)
        .join("path")
        .attr("d", pathGenerator)
        .attr("fill", (d) =>
          d.properties.name === countryName ? "#ffcc00" : "#dddd"
        )
        .attr("stroke", "#fff")
        .attr("stroke-width", 0.5);

      svg
        .selectAll("path")
        .filter((d) => d.properties.name === countryName)
        .raise();
    }
  }, [countryName]);

  return (
    <svg
      ref={ref}
      viewBox="0 0 420 250"
      className="w-full h-auto border border-white border-opacity-20 rounded-lg bg-white bg-opacity-5 p-6"
    />
  );
};

export default CountryShape;
