"use client";
import React from "react";
import { useEffect } from "react";
import Image from "next/image";

import VizColor from "@/app/components/organisms/vizColor/vizColor";
import VizLegend from "@/app/components/organisms/vizLegend/vizLegend";
import VizTimeline from "@/app/components/organisms/vizTimeLine/vizTimeline";
import VisMap from "@/app/components/organisms/visMap/visMain";
import VizheaderMap from "@/app/components/organisms/visMap/vizheader";
import { useSelection } from "@/app/context/store";

export default function Home() {
  const { selectedCountry, setSelectedCountry } = useSelection();
  useEffect(() => {
    console.log("Current selected country:", selectedCountry);
  }, [selectedCountry]);
  return (
    <main className="row-auto flex-grow flex flex-col items-center">
      <div className="bg-whit bg-opacity-5 w-full max-w-8xl h-full text-white vizParent">
        <VizheaderMap />
        <VizLegend />

        <VisMap />
        <VizColor />
      </div>
    </main>
  );
}
