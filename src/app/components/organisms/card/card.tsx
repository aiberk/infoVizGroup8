import React, { useEffect, useState } from "react";
import { ICountry } from "@/app/types/types";
import CountryShape from "./countryShape";
import { useSelection } from "@/app/context/store";
import { worldDataAverage } from "@/app/data/realData";

type Props = {
  country: any;
  selection: string;
  name: string;
};
type DataKey = "Sentiment" | "Denial Rate" | "Aggressiveness";

function Card({ country, selection, name }: Props) {
  const { selectedSelection } = useSelection();
  const worldAverage = 6;
  const selectedKey = selectedSelection as DataKey;

  let totalSentiment = 0;
  let totalAggressiveness = 0;
  let totalDenial = 0;
  let yearsCounted = 0;

  Object.keys(country).forEach((year) => {
    const yearData = country[year];
    if (
      yearData.sentiment !== undefined &&
      yearData.aggressive !== undefined &&
      yearData.denial !== undefined
    ) {
      totalSentiment += yearData.sentiment;
      totalAggressiveness += yearData.aggressive;
      totalDenial += yearData.denial;
      yearsCounted++;
    }
  });

  const averageSentiment =
    yearsCounted > 0 ? Math.round((totalSentiment / yearsCounted) * 100) : 0;
  const averageAggressiveness =
    yearsCounted > 0
      ? Math.round((totalAggressiveness / yearsCounted) * 100)
      : 0;
  const averageDenial =
    yearsCounted > 0 ? Math.round((totalDenial / yearsCounted) * 100) : 0;

  const dataMapping = {
    Sentiment: averageSentiment,
    "Denial Rate": averageDenial,
    Aggressiveness: averageAggressiveness,
  };

  const selectionKey = selection as DataKey;
  console.log(selectedSelection);

  return (
    <div className="bg-cardColor w-full h-full p-10 rounded-lg">
      <div className="h-12 border-b mb-2 text-2xl">{name}</div>
      <div>
        <div className="flex flex-row gap-5 mb-3 mt-3">
          {" "}
          <div className="flex flex-col">
            <span className="text-3xl">{dataMapping[selectionKey]}%</span>
            <span className="text-[0.5rem]  uppercase mt-1 ">
              Country Average
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl">
              {" "}
              {selectedSelection === "Sentiment"
                ? `${Math.round(worldDataAverage.sentiment * 100)}%`
                : selectedSelection === "Denial Rate"
                ? `${Math.round(worldDataAverage.denial * 100)}%`
                : `${Math.round(worldDataAverage.aggressive * 100)}%`}
            </span>
            <span className="text-[0.5rem] uppercase mt-1">World Average</span>
          </div>
        </div>
        <p className="prose mb-6 leading-relaxed">
          The average climate
          <span className="font-bold text-sky-400">
            {" "}
            {selection.toLowerCase()}
          </span>{" "}
          in <span className="font-bold">{name}</span> is
          <span className="font-bold text-sky-400">
            {" "}
            {dataMapping[selectionKey]}%
          </span>
          <br /> This is {Math.abs(dataMapping[selectionKey] - worldAverage)}%
          {dataMapping[selectionKey] > worldAverage ? (
            <>
              {" "}
              <span
                className="text-green-400"
                dangerouslySetInnerHTML={{ __html: "&#9650;" }}
              />{" "}
              <span> higher</span>
            </>
          ) : (
            <>
              {" "}
              <span
                className="text-red-400"
                dangerouslySetInnerHTML={{ __html: "&#9660;" }}
              />{" "}
              <span> lower</span>
            </>
          )}{" "}
          than the average of the other countries.
          {/* <br /> This means, A, B, and C. */}
        </p>
      </div>
      <div className="w-full mt-5 max-h-10 pb-5">
        <CountryShape countryName={name} />
      </div>
    </div>
  );
}

export default Card;
