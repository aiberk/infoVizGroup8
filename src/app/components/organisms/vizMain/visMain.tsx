import React, { useState, useEffect } from "react";
import Card from "@/app/components/organisms/card/card";
import { countries } from "@/app/data/data";
import { useSelection } from "@/app/context/store"; // Assuming this is the path to your context

import RadialChart from "@/app/components/organisms/sample/RadialChart";
import { sf as sfData, ny as nyData } from "@/app/data/sampleData.json";
import BarChart from "@/app/components/organisms/sample/BarChart";

type City = "sf" | "ny";

const VisMain = () => {
  const [city, setCity] = useState<City>("sf"); // city whose temperatures to show
  const [range, setRange] = useState<Date[]>([]); // time range set by the brush

  // Process the imported data (convert dates)
  const temps = {
    sf: sfData.map((day) => ({ ...day, date: new Date(day.date) })),
    ny: nyData.map((day) => ({ ...day, date: new Date(day.date) })),
  };

  const updateCity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(e.target.value as City);
  };

  const updateRange = (newRange: Date[]) => {
    setRange(newRange);
  };

  const data = temps[city];

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
      <div className="cardanmapMap  h-full bg-cardColor flex items-center justify-center rounded-lg">
        <BarChart data={data} range={range} updateRange={updateRange} />
      </div>
      <div className="cardanmapViz  h-full bg-cardColor flex items-center justify-center rounded-lg">
        <RadialChart data={data} range={range} />
      </div>
    </div>
  );
};

export default VisMain;
