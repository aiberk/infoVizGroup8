//@ts-nocheck
import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import geoJsonData from "@/app/data/geo.json"; // Ensure this path is correct

const CountryShape = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      // Adjust this line to match the structure of your GeoJSON data
      const countryFeature = geoJsonData.features.find(
        (f) => f.properties.name === "Bolivia"
      );

      if (countryFeature) {
        const projection = d3.geoMercator().fitSize([420, 250], countryFeature);
        const pathGenerator = d3.geoPath().projection(projection);

        d3.select(ref.current)
          .selectAll("path")
          .data([countryFeature])
          .join("path")
          .attr("d", pathGenerator)
          .attr("fill", "currentColor"); // You can set a class or direct style here for the fill color
      }
    }
  }, []); // This effect runs once on mount and not on every render

  return (
    <svg
      ref={ref}
      viewBox="0 0 420 250" // Adjust the viewBox depending on your sizing needs
      className="w-full h-auto"
    />
  );
};

export default CountryShape;
