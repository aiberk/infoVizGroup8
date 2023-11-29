import React, { useState, useEffect } from "react";
import Card from "@/app/components/organisms/card/card";
import { countries, selections } from "@/app/data/data";
import { useSelection } from "@/app/context/store";

import RadialChart from "@/app/components/organisms/d3/RadialChart";
import { sf as sfData, ny as nyData } from "@/app/data/sampleData.json";
import BarChart from "@/app/components/organisms/d3/BarChart";

type City = "sf" | "ny";

const VisMain = () => {
  const [city, setCity] = useState<City>("sf");
  const [range, setRange] = useState<Date[]>([]);
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

  const { selectedCountry, selectedSelection } = useSelection();

  const selectedCountryData =
    countries.find((country) => country.name === selectedCountry) ||
    countries[0];

  const selectedSelectionData =
    selections.find((selection) => selection.name === selectedSelection) ||
    selections[0];

  return (
    <div className="mainViz flex justify-center items-center cardandmap">
      <div className="cardanmapCard h-full">
        <Card
          country={selectedCountryData}
          selection={selectedSelectionData.name}
        />
      </div>
      <div className="cardanmapMap px-10  flex-col  h-full bg-cardColor flex items-center justify-center rounded-lg">
        <div className="w-full "> Temperatures</div>
        <BarChart data={data} range={range} updateRange={updateRange} />
      </div>
      <div className="cardanmapViz px-10  flex-col h-full bg-cardColor flex items-center justify-center rounded-lg">
        <div className="w-full "> Sentiment</div>
        <RadialChart data={data} range={range} />
      </div>
    </div>
  );
};

export default VisMain;
