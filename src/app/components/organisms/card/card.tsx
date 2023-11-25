import Image from "next/image";
import React from "react";
import { ICountry } from "@/app/types/types"; // Assuming this is the path to your types
import CountryShape from "./countryShape";

type Props = {
  country: ICountry;
};

function Card({ country }: Props) {
  return (
    <div className="bg-cardColor w-full h-full p-10 rounded-lg">
      <div className="h-12 border-b mb-2 text-2xl">{country.name}</div>
      <div>
        {country.data?.map((data, index) => (
          <div key={index} className="flex flex-col ">
            <p className="prose mb-6 leading-relaxed">
              The average{" "}
              <span className="font-bold text-sky-400"> climate sentiment</span>{" "}
              of <span className="font-bold">{country.name}</span> has a value
              of{" "}
              <span className="font-bold text-sky-400">
                {data.sentiment * 100}%
              </span>
              <br /> This is X% higher than the average of the other countries.
              <br /> This means, A,B, and C.
            </p>
            <div className="flex flex-row gap-5">
              {" "}
              <div className="flex flex-col">
                <span className="text-3xl">{data.sentiment * 100}%</span>
                <span className="text-xs uppercase text-gray-300">
                  Country Average
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl">{data.denial * 100}%</span>
                <span className="text-xs uppercase text-gray-300">
                  World Average
                </span>
              </div>
            </div>
            {/* <div className="flex flex-col mt-6">
              <span className="text-lg">{data.aggressive * 100}%</span>
              <span className="text-xs uppercase text-gray-300">
                Aggressiveness
              </span>
            </div> */}
          </div>
        ))}
      </div>
      {/* <div className="w-full mt-5 max-h-10">
        <Image
          className=""
          src={`/${country.svg}`}
          width={420}
          height={10}
          alt={country.name}
        />
      </div> */}
      <div className="w-full mt-5 max-h-10 pb-5">
        <CountryShape countryName={country.name} />
      </div>
    </div>
  );
}

export default Card;
