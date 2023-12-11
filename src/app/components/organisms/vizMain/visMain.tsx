//@tsignore
import React, { useState, useEffect } from "react";
import Card from "@/app/components/organisms/card/card";
import { countries, selections } from "@/app/data/data";
import { useSelection } from "@/app/context/store";
import { countryData, worldData } from "@/app/data/realData";

import { sf as sfData, ny as nyData } from "@/app/data/sampleData.json";
import BarChart from "@/app/components/organisms/d3/BarChart";
import LinkedChart from "@/app/components/organisms/d3/LinkedChart";

type City = "sf" | "ny";

interface YearData {
  total_count: number;
  sentiment_std: number | null;
  beliver_v_denier: number | null;
  aggressive_rate_believer: number | null;
  aggressive_rate_denier: number | null;
  sentiment: number;
  believer: number;
  neutral: number;
  denial: number;
  aggressive: number;
}

interface CountryData {
  [year: number]: YearData;
}

interface DataStructure {
  [country: string]: CountryData;
}

const VisMain = () => {
  const [city, setCity] = useState<City>("sf");
  const [range, setRange] = useState<Date[]>([]);
  const temps = {
    sf: sfData.map((day) => ({ ...day, date: new Date(day.date) })),
    ny: nyData.map((day) => ({ ...day, date: new Date(day.date) })),
  };

  const countryNames = Object.keys(countryData);

  const updateCity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(e.target.value as City);
  };

  const updateRange = (newRange: Date[]) => {
    setRange(newRange);
  };

  const data = temps[city];

  const { selectedCountry, selectedSelection } = useSelection();

  const selectedCountryData =
    selectedCountry && selectedCountry in countryData
      ? countryData[selectedCountry]
      : null;

  const selectedSelectionData =
    selections.find((selection) => selection.name === selectedSelection) ||
    selections[0];

  return (
    <div className="mainVizMain flex justify-center items-center cardandmap">
      <div className="cardanmapCard h-full">
        <Card
          country={selectedCountryData}
          selection={selectedSelectionData.name}
          name={selectedCountry}
        />
      </div>
      <div className="cardanmapMap px-10  flex-col  h-full bg-cardColor flex items-center justify-center rounded-lg">
        <div className="w-full "> World Average {selectedSelection}</div>
        <BarChart data={worldData} range={range} updateRange={updateRange} />
      </div>
      <div className="cardanmapViz px-10  flex-col h-full bg-cardColor flex items-center justify-center rounded-lg">
        <div className="w-full "> Sentiment</div>
        <LinkedChart data={worldData} range={range} />
      </div>
    </div>
  );
};

export default VisMain;
