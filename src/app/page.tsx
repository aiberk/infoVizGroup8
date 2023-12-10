"use client";
import React from "react";
import { useEffect } from "react";
import Image from "next/image";

import Vizheader from "@/app/components/organisms/vizHeader/vizheader";
import VizColor from "@/app/components/organisms/vizColor/vizColor";
import VizLegend from "@/app/components/organisms/vizLegend/vizLegend";
import VizTimeline from "@/app/components/organisms/vizTimeLine/vizTimeline";
import VisMain from "@/app/components/organisms/vizMain/visMain";
import data from "@/app/data/sampleData.json";
import { useSelection } from "@/app/context/store";

export default function Home() {
  const { selectedCountry, setSelectedCountry } = useSelection();

  return (
    <main className="row-auto flex-grow flex flex-col items-center">
      <div className="bg-whit bg-opacity-5 w-full max-w-8xl h-full text-white vizParentMain">
        <Vizheader />

        <VisMain />
      </div>
    </main>
  );
}
