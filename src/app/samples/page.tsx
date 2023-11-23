"use client";
import React from "react";
import Image from "next/image";

import Vizheader from "@/app/components/organisms/vizHeader/vizheader";
import VizColor from "@/app/components/organisms/vizColor/vizColor";
import VizLegend from "@/app/components/organisms/vizLegend/vizLegend";
import VizTimeline from "@/app/components/organisms/vizTimeLine/vizTimeline";
import VisMain from "@/app/components/organisms/vizSample/visMain";
import data from "@/app/data/sampleData.json";

export default function Home() {
  console.log(data.sf);
  return (
    <main className="row-auto flex-grow flex flex-col items-center">
      <div className="bg-whit bg-opacity-5 w-full max-w-8xl h-full text-white vizParent">
        <Vizheader />
        <VizLegend />
        <VizTimeline />
        <VisMain />
        <VizColor />
      </div>
    </main>
  );
}
