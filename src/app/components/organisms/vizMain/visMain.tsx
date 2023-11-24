import React, { useState, useEffect } from "react";
import Card from "@/app/components/organisms/card/card";
import { countries } from "@/app/data/data";
import { useSelection } from "@/app/context/store"; // Assuming this is the path to your context

const VisMain = () => {
  const { selectedCountry } = useSelection(); // Use the context to get the selected country

  // Find the country data based on the selected country from the context
  const selectedCountryData =
    countries.find((country) => country.name === selectedCountry) ||
    countries[0];

  return (
    <div className="mainViz flex justify-center items-center cardandmap">
      <div className="cardanmapCard h-full">
        {/* Pass the found country data to the Card component */}
        <Card country={selectedCountryData} />
      </div>
      <div className="cardanmapMap part h-full">Map</div>
      <div className="cardanmapViz part h-full">Chart</div>
    </div>
  );
};

export default VisMain;
