import Image from "next/image";
import React from "react";

type Props = {};

function Card({}: Props) {
  return (
    <div className="bg-cardColor w-2/3 h-1/2 p-5 rounded-lg">
      <div className="h-1/6 border-b mb-4 text-xl">Bolivia</div>
      <div className="">
        <div className="flex flex-row gap-8">
          {" "}
          <div className="flex flex-col">
            <span className="text-lg">70%</span>{" "}
            <span className="text-xs uppercase text-gray-300">Sentiment</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg">70%</span>{" "}
            <span className="text-xs uppercase text-gray-300">Denial Rate</span>
          </div>
        </div>
        <div className="flex flex-col mt-6">
          <span className="text-lg">70%</span>{" "}
          <span className="text-xs uppercase text-gray-300">Aggresiveness</span>
        </div>
      </div>
      <div className="w-full flex justify-end">
        <Image
          className="translate-x-40 -translate-y-10"
          src="/bo.svg"
          width={520}
          height={10}
          alt={""}
        />
      </div>
    </div>
  );
}

export default Card;
