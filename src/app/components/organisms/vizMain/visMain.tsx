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
  const [range, setRange] = useState<Date[]>([]);

  const countryNames = Object.keys(countryData);

  const updateRange = (newRange: Date[]) => {
    setRange(newRange);
    // console.log(newRange);
  };

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
        <h2 className="w-full font-medium"> World Average &#40;Brush&#41;</h2>
        <p className="w-full text-xs mt-1 ">
          {" "}
          Brush over chart to compare between adjacent time periods
        </p>
        <BarChart data={worldData} range={range} updateRange={updateRange} />
      </div>
      <div className="cardanmapViz px-10  flex-col h-full bg-cardColor flex items-center justify-center rounded-lg">
        <h2 className="w-full font-medium"> World Average &#40;Linked&#41;</h2>
        <p className="w-full text-xs mt-1 ">
          {" "}
          Reaction from brush can be observed here.
        </p>
        <LinkedChart data={worldData} range={range} />
      </div>
    </div>
  );
};

export default VisMain;
