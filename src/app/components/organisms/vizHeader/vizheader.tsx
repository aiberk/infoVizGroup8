//@ts-nocheck
import React from "react";
import DropDownSelector from "@/app/components/molecules/comboBox/DropDownSelector";
import { useSelection } from "@/app/context/store";
import { countries, selections, years } from "@/app/data/data";

const Vizheader = () => {
  const {
    setSelectedCountry,
    setSelectedSelection,
    setSelectedYear,
    selectedSelection,
  } = useSelection();

  return (
    <div className="header  flex flex-col justify-center items-center gap-2 text-lg md:text-3xl lg:text-3xl">
      <div className="flex flex-row justify-center items-center gap-2">
        {" "}
        Climate{" "}
        <DropDownSelector
          items={selections}
          displayKey="name"
          onSelectionChange={(selectedItem) =>
            setSelectedSelection(selectedItem.name)
          }
        />
        tweets in{" "}
        <DropDownSelector
          items={countries}
          displayKey="name"
          onSelectionChange={(selectedItem) =>
            setSelectedCountry(selectedItem.name)
          }
        />
      </div>
      <p className="text-sm text-white">
        Try out the dropdowns to see the different visualizations.{" "}
        <span className="bg-black p-2 rounded-md text-sky-400">
          {selectedSelection}
        </span>{" "}
        was calculated from twitter tweets
      </p>
    </div>
  );
};

export default Vizheader;
