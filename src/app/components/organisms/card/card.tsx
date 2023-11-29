import React, { useEffect, useState } from "react";
import { ICountry } from "@/app/types/types";
import CountryShape from "./countryShape";
import { useSelection } from "@/app/context/store";

type Props = {
  country: ICountry;
  selection: string;
};
type DataKey = "Sentiment" | "Denial Rate" | "Aggressiveness";

function Card({ country, selection }: Props) {
  const worldAverage = 6;
  const sentiment = country.data ? country.data[0].sentiment * 100 : 0;
  const aggressiveness = country.data ? country.data[0].aggressive * 100 : 0;
  const denial = country.data ? country.data[0].denial * 100 : 0;

  const dataMapping = {
    Sentiment: sentiment,
    "Denial Rate": denial,
    Aggressiveness: aggressiveness,
  };

  const selectionKey = selection as DataKey;

  return (
    <div className="bg-cardColor w-full h-full p-10 rounded-lg">
      <div className="h-12 border-b mb-2 text-2xl">{country.name}</div>
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
            <span className="text-3xl">{worldAverage}%</span>
            <span className="text-[0.5rem] uppercase mt-1">World Average</span>
          </div>
        </div>
        <p className="prose mb-6 leading-relaxed">
          The average climate
          <span className="font-bold text-sky-400">
            {" "}
            {selection.toLowerCase()}
          </span>{" "}
          in <span className="font-bold">{country.name}</span> is
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
        <CountryShape countryName={country.name} />
      </div>
    </div>
  );
}

export default Card;
