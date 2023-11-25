//@ts-nocheck
import React from "react";
import DropDownSelector from "@/app/components/molecules/comboBox/DropDownSelector";
import { useSelection } from "@/app/context/store";
import { countries, selections } from "@/app/data/data";

const Vizheader = () => {
  const { setSelectedCountry, setSelectedSelection, setSelectedYear } =
    useSelection();

  const years = [
    { id: 1, name: "1990" },
    { id: 2, name: "2000" },
    { id: 3, name: "2020" },
  ];

  return (
    <div className="header  flex flex-row justify-center items-center gap-2 text-lg md:text-3xl lg:text-3xl">
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
      {/* the year
      <DropDownSelector
        items={years}
        displayKey="name"
        onSelectionChange={(selectedItem) => setSelectedYear(selectedItem.name)}
      /> */}
    </div>
  );
};

export default Vizheader;
