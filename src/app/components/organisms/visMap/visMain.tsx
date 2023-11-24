import React, { useState, useEffect } from "react";
import Card from "@/app/components/organisms/card/card";
import { countries } from "@/app/data/data";
import { useSelection } from "@/app/context/store"; // Assuming this is the path to your context

const VisMap = () => {
  const { selectedCountry } = useSelection(); // Use the context to get the selected country

  // Find the country data based on the selected country from the context
  const selectedCountryData =
    countries.find((country) => country.name === selectedCountry) ||
    countries[0];

  return <div className="mainViz part">Map</div>;
};

export default VisMap;
