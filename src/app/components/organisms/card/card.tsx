import Image from "next/image";
import React from "react";
import { ICountry } from "@/app/types/types"; // Assuming this is the path to your types

type Props = {
  country: ICountry;
};

function Card({ country }: Props) {
  return (
    <div className="bg-cardColor w-2/3 h-1/2 p-10 rounded-lg">
      <div className="h-1/6 border-b mb-4 text-xl">{country.name}</div>
      <div>
        {country.data?.map((data, index) => (
          <div key={index} className="flex flex-col ">
            <div className="flex flex-row gap-5">
              {" "}
              <div className="flex flex-col">
                <span className="text-lg">{data.sentiment * 100}%</span>
                <span className="text-xs uppercase text-gray-300">
                  Sentiment
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg">{data.denial * 100}%</span>
                <span className="text-xs uppercase text-gray-300">
                  Denial Rate
                </span>
              </div>
            </div>
            <div className="flex flex-col mt-6">
              <span className="text-lg">{data.aggressive * 100}%</span>
              <span className="text-xs uppercase text-gray-300">
                Aggressiveness
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full flex justify-end">
        <Image
          className="translate-x-40 -translate-y-10"
          src={`/${country.svg}`}
          width={420}
          height={10}
          alt={country.name}
        />
      </div>
    </div>
  );
}

export default Card;
