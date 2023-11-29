//@ts-nocheck
import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import geoJsonData from "@/app/data/geo.json";

const CountryShape = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
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
          .attr("fill", "currentColor");
      }
    }
  }, []);

  return <svg ref={ref} viewBox="0 0 420 250" className="w-full h-auto" />;
};

export default CountryShape;
