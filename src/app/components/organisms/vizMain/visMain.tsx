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
  return <div className="mainViz part">Main Viz</div>;
};

export default VisMain;
