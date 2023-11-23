import React from "react";

type Props = {};
// work
const Vizheader = (props: Props) => {
  return (
    <div className="header font-serif flex flex-row justify-center items-center gap-2 text-lg md:text-3xl lg:text-5xl">
      Climate{" "}
      <span className="bg-black bg-opacity-90 p-3 text-sky-400 rounded-md">
        Sentiment
      </span>{" "}
      tweets in{" "}
      <span className="bg-black bg-opacity-90 p-3 text-sky-400 rounded-md">
        China
      </span>{" "}
      the year
      <span className="bg-black bg-opacity-90 p-3 text-sky-400 rounded-md">
        2019
      </span>{" "}
    </div>
  );
};

export default Vizheader;
