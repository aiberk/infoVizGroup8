import React, { useEffect, useState } from "react";
import { ICountry } from "@/app/types/types";
import CountryShape from "./countryShape";
import { useSelection } from "@/app/context/store";

type Props = {
  country: ICountry;
  selection: string;
};

function Card({ country, selection }: Props) {
  // const [selectedDataValue, setSelectedDataValue] = useState(0);

  const sentiment = country.data ? country.data[0].sentiment * 100 : 0;
  const aggressiveness = country.data ? country.data[0].aggressive * 100 : 0;
  const denial = country.data ? country.data[0].denial * 100 : 0;

  // Debugging: Log the values to see if they change as expected

  return (
    <div className="bg-cardColor w-full h-full p-10 rounded-lg">
      <div className="h-12 border-b mb-2 text-2xl">{country.name}</div>
      <div>
        <p className="prose mb-6 leading-relaxed">
          The average climate
          <span className="font-bold text-sky-400">
            {" "}
            {selection.toLowerCase()}
          </span>{" "}
          in <span className="font-bold">{country.name}</span> is
          <span className="font-bold text-sky-400">
            {" "}
            {selection == "Sentiment" && sentiment}
            {selection == "Denial Rate" && denial}
            {selection == "Agressiveness" && aggressiveness}%
          </span>
          <br /> This is X% higher than the average of the other countries.
          <br /> This means, A, B, and C.
        </p>
        <div className="flex flex-row gap-5">
          {" "}
          <div className="flex flex-col">
            <span className="text-3xl">
              {selection == "Sentiment" && sentiment}
              {selection == "Denial Rate" && denial}
              {selection == "Agressiveness" && aggressiveness}%
            </span>
            <span className="text-xs uppercase text-gray-300">
              Country Average
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl">
              {selection == "Sentiment" && sentiment * 1.2}
              {selection == "Denial Rate" && denial * 1.2}
              {selection == "Agressiveness" && aggressiveness * 0.8}%
            </span>
            <span className="text-xs uppercase text-gray-300">
              World Average
            </span>
          </div>
        </div>
        {/* Additional elements and mappings, if necessary */}
      </div>
      <div className="w-full mt-5 max-h-10 pb-5">
        <CountryShape countryName={country.name} />
      </div>
    </div>
  );
}

export default Card;
