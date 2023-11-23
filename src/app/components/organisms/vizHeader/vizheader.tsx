import React from "react";

import DropDownSelector from "@/app/components/molecules/comboBox/DropDownSelector";

type Props = {};

const countries = [
  { id: 1, name: "Bolivia" },
  { id: 2, name: "United States" },
  { id: 3, name: "China" },
];

const selections = [
  { id: 1, name: "Sentiment" },
  { id: 2, name: "Denial Rate" },
  { id: 3, name: "Agressiveness" },
];

const years = [
  { id: 1, name: 19990 },
  { id: 2, name: 2000 },
  { id: 3, name: 2020 },
];
// work
const Vizheader = (props: Props) => {
  return (
    <div className="header font-serif flex flex-row justify-center items-center gap-2 text-lg md:text-3xl lg:text-3xl">
      Climate{" "}
      {/* <span className="bg-black bg-opacity-90 p-3 text-sky-400 rounded-md">
        Sentiment
      </span>{" "} */}
      <DropDownSelector items={selections} displayKey={"name"} />
      tweets in <DropDownSelector items={countries} displayKey={"name"} />
      the year
      <DropDownSelector items={years} displayKey={"name"} />
    </div>
  );
};

export default Vizheader;
