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
  // Test setting and getting the context value
  useEffect(() => {
    console.log("Current selected country:", selectedCountry);
  }, [selectedCountry]);
  return (
    <main className="row-auto flex-grow flex flex-col items-center rounded-xl mt-5">
      <div className="bg-white bg-opacity-5 w-full max-w-8xl text-white rounded-xl ">
        <div className="p-10 flex flex-col ">
          <h1 className="text-3xl mb-4">About</h1>
          <div className="flex flex-row gap-8 border-t border-white">
            <div className="flex flex-row flex-grow gap-5 mt-4">
              <p className="text-block">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quaerat odio at soluta iusto quos rem incidunt eius,
                perspiciatis pariatur, neque velit! Magnam tenetur nulla maiores
                possimus, et natus a illum. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Quaerat odio at soluta iusto quos
                rem incidunt eius, perspiciatis pariatur, neque velit! Magnam
                tenetur nulla maiores possimus, et natus a illum. Lorem ipsum
                dolor sit amet, consectetur adipisicing elit. Quaerat odio at
                soluta iusto quos rem incidunt eius, perspiciatis pariatur,
                neque velit! Magnam tenetur nulla maiores possimus, et natus a
                illum. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quaerat odio at soluta iusto quos rem incidunt eius,
                perspiciatis pariatur, neque velit! Magnam tenetur nulla maiores
                possimus, et natus a illum.
              </p>

              <p className="text-block">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quaerat odio at soluta iusto quos rem incidunt eius,
                perspiciatis pariatur, neque velit! Magnam tenetur nulla maiores
                possimus, et natus a illum. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Quaerat odio at soluta iusto quos
                rem incidunt eius, perspiciatis pariatur, neque velit! Magnam
                tenetur nulla maiores possimus, et natus a illum.
              </p>
            </div>
          </div>
        </div>
        <div className="p-10 flex flex-col  ">
          <h1 className="text-3xl mb-4">About</h1>
          <div className="flex flex-row gap-8 border-t border-white">
            <div className="flex flex-row flex-grow gap-5 mt-4">
              <p className="text-block">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quaerat odio at soluta iusto quos rem incidunt eius,
                perspiciatis pariatur, neque velit! Magnam tenetur nulla maiores
                possimus, et natus a illum. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Quaerat odio at soluta iusto quos
                rem incidunt eius, perspiciatis pariatur, neque velit! Magnam
                tenetur nulla maiores possimus, et natus a illum. Lorem ipsum
                dolor sit amet, consectetur adipisicing elit. Quaerat odio at
                soluta iusto quos rem incidunt eius, perspiciatis pariatur,
                neque velit! Magnam tenetur nulla maiores possimus, et natus a
                illum. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quaerat odio at soluta iusto quos rem incidunt eius,
                perspiciatis pariatur, neque velit! Magnam tenetur nulla maiores
                possimus, et natus a illum.
              </p>

              <p className="text-block">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quaerat odio at soluta iusto quos rem incidunt eius,
                perspiciatis pariatur, neque velit! Magnam tenetur nulla maiores
                possimus, et natus a illum. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Quaerat odio at soluta iusto quos
                rem incidunt eius, perspiciatis pariatur, neque velit! Magnam
                tenetur nulla maiores possimus, et natus a illum.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
