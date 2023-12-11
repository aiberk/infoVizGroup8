import React, { useEffect, useState } from "react";
import { ICountry } from "@/app/types/types";
import CountryShape from "./countryShape";
import { useSelection } from "@/app/context/store";

type Props = {
  country: any;
  selection: string;
  name: string;
};
type DataKey = "Sentiment" | "Denial Rate" | "Aggressiveness";

function Card({ country, selection, name }: Props) {
  const tempCountry = {
    2010: {
      total_count: 3,
      sentiment_std: 0.45630738853825686,
      beliver_v_denier: 1.0,
      aggressive_rate_believer: 0.0,
      aggressive_rate_denier: NaN,
      sentiment: 0.03207326853540212,
      believer: 0.3333333333333333,
      neutral: 0.6666666666666666,
      denial: 0.0,
      aggressive: 0.0,
    },
    2011: {
      total_count: 1,
      sentiment_std: NaN,
      beliver_v_denier: NaN,
      aggressive_rate_believer: NaN,
      aggressive_rate_denier: NaN,
      sentiment: 0.104726037979126,
      believer: 0.0,
      neutral: 1.0,
      denial: 0.0,
      aggressive: 0.0,
    },
    2012: {
      total_count: 2,
      sentiment_std: 0.48456209705345965,
      beliver_v_denier: NaN,
      aggressive_rate_believer: NaN,
      aggressive_rate_denier: NaN,
      sentiment: 0.1744918528556824,
      believer: 0.0,
      neutral: 1.0,
      denial: 0.0,
      aggressive: 0.0,
    },
    2013: {
      total_count: 1,
      sentiment_std: NaN,
      beliver_v_denier: 1.0,
      aggressive_rate_believer: 0.0,
      aggressive_rate_denier: NaN,
      sentiment: 0.4751899268150329,
      believer: 1.0,
      neutral: 0.0,
      denial: 0.0,
      aggressive: 0.0,
    },
    2014: {
      total_count: 5,
      sentiment_std: 0.40707550720469404,
      beliver_v_denier: 0.8,
      aggressive_rate_believer: 0.0,
      aggressive_rate_denier: 0.0,
      sentiment: -0.05440258692105604,
      believer: 0.8,
      neutral: 0.0,
      denial: 0.2,
      aggressive: 0.0,
    },
    2015: {
      total_count: 28,
      sentiment_std: 0.4380025580904402,
      beliver_v_denier: 0.92,
      aggressive_rate_believer: 0.21739130434782608,
      aggressive_rate_denier: 1.0,
      sentiment: 0.0562254303872659,
      believer: 0.8214285714285714,
      neutral: 0.10714285714285714,
      denial: 0.07142857142857142,
      aggressive: 0.25,
    },
    2016: {
      total_count: 28,
      sentiment_std: 0.4471782693738333,
      beliver_v_denier: 0.9615384615384616,
      aggressive_rate_believer: 0.4,
      aggressive_rate_denier: 0.0,
      sentiment: 0.08731865677406458,
      believer: 0.8928571428571429,
      neutral: 0.07142857142857142,
      denial: 0.03571428571428571,
      aggressive: 0.39285714285714285,
    },
    2017: {
      total_count: 43,
      sentiment_std: 0.45059949752027173,
      beliver_v_denier: 0.9761904761904762,
      aggressive_rate_believer: 0.24390243902439024,
      aggressive_rate_denier: 0.0,
      sentiment: 0.1337442418084472,
      believer: 0.9534883720930233,
      neutral: 0.023255813953488372,
      denial: 0.023255813953488372,
      aggressive: 0.2558139534883721,
    },
    2018: {
      total_count: 119,
      sentiment_std: 0.411885705596782,
      beliver_v_denier: 0.9907407407407407,
      aggressive_rate_believer: 0.18691588785046728,
      aggressive_rate_denier: 1.0,
      sentiment: 0.15778988006131778,
      believer: 0.8991596638655462,
      neutral: 0.09243697478991597,
      denial: 0.008403361344537815,
      aggressive: 0.19327731092436976,
    },
    2019: {
      total_count: 30,
      sentiment_std: 0.38522682120167223,
      beliver_v_denier: 1.0,
      aggressive_rate_believer: 0.15,
      aggressive_rate_denier: NaN,
      sentiment: 0.08447368246164805,
      believer: 0.6666666666666666,
      neutral: 0.3333333333333333,
      denial: 0.0,
      aggressive: 0.16666666666666666,
    },
  };
  const worldAverage = 6;
  const test = country;
  const year = 2019;
  const sentiment = country[year].sentiment * 100;
  const aggressiveness = country[year].aggressive * 100;
  const denial = country[year].denial * 100;
  // const sentiment = country.data ? country.data[0].sentiment * 100 : 0;
  // const aggressiveness = country.data ? country.data[0].aggressive * 100 : 0;
  // const denial = country.data ? country.data[0].denial * 100 : 0;

  const dataMapping = {
    Sentiment: sentiment,
    "Denial Rate": denial,
    Aggressiveness: aggressiveness,
  };

  const selectionKey = selection as DataKey;

  // console.log(country);
  console.log("Frm card");
  console.log(country);

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
