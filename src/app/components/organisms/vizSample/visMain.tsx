import React, { useState, useEffect } from "react";

import BarChart from "@/app/components/organisms/sample/BarChart";
import Chart from "@/app/components/organisms/sample/Chart";
import RadialChart from "@/app/components/organisms/sample/RadialChart";
import { sf as sfData, ny as nyData } from "@/app/data/sampleData.json";

type Props = {};
type City = "sf" | "ny";

const VisMain = (props: Props) => {
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
  return (
    <div className="mainViz">
      <h1>
        2017 Temperatures for
        <select name="city" onChange={updateCity}>
          {[
            { label: "San Francisco", value: "sf" },
            { label: "New York", value: "ny" },
            // {label: 'Amsterdam', value: 'am'},
          ].map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="text-black">
              {option.label}
            </option>
          ))}
        </select>
      </h1>
      <BarChart data={data} range={range} updateRange={updateRange} />
      <RadialChart data={data} range={range} />
      {/* <Chart data={data} range={range} updateRange={updateRange} /> */}
    </div>
  );
};

export default VisMain;
