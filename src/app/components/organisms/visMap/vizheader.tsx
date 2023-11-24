import React from "react";
import DropDownSelector from "@/app/components/molecules/comboBox/DropDownSelector";
import { useSelection } from "@/app/context/store";

const VizheaderMap = () => {
  const { setSelectedCountry, setSelectedSelection, setSelectedYear } =
    useSelection();

  const countries = [
    { id: 1, name: "Bolivia" },
    { id: 2, name: "United States" },
    { id: 3, name: "China" },
  ];

  const selections = [
    { id: 1, name: "Sentiment" },
    { id: 2, name: "Denial Rate" },
    { id: 3, name: "Aggressiveness" },
  ];

  const years = [
    { id: 1, name: "1990" },
    { id: 2, name: "2000" },
    { id: 3, name: "2020" },
  ];

  return (
    <div className="header font-serif flex flex-row justify-center items-center gap-2 text-lg md:text-3xl lg:text-3xl">
      Climate{" "}
      <DropDownSelector
        items={selections}
        displayKey="name"
        onSelectionChange={(selectedItem) =>
          setSelectedSelection(selectedItem.name)
        }
      />
      tweets around the world the year
      <DropDownSelector
        items={years}
        displayKey="name"
        onSelectionChange={(selectedItem) => setSelectedYear(selectedItem.name)}
      />
    </div>
  );
};

export default VizheaderMap;
