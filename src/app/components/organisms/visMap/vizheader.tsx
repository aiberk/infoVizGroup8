import React from "react";
import DropDownSelector from "@/app/components/molecules/comboBox/DropDownSelector";
import { useSelection } from "@/app/context/store";
import { countries, selections, years } from "@/app/data/data";

const VizheaderMap = () => {
  const { setSelectedCountry, setSelectedSelection, setSelectedYear } =
    useSelection();

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
