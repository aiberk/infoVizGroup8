"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
interface SelectionContextType {
  selectedCountry: string;
  setSelectedCountry: (value: string) => void;
  selectedSelection: string;
  setSelectedSelection: (value: string) => void;
  selectedYear: string;
  setSelectedYear: (value: string) => void;
}
interface SelectionProviderProps {
  children: ReactNode; // Type for children prop
}

// Provide a default value for the context with the correct types
const defaultContextValue: SelectionContextType = {
  selectedCountry: "Bolivia",
  setSelectedCountry: () => {},
  selectedSelection: "Sentiment",
  setSelectedSelection: () => {},
  selectedYear: "2020",
  setSelectedYear: () => {},
};

const SelectionContext =
  createContext<SelectionContextType>(defaultContextValue);

export const useSelection = () => useContext(SelectionContext);

export const SelectionProvider: React.FC<SelectionProviderProps> = ({
  children,
}) => {
  const [selectedCountry, setSelectedCountry] = useState("Bolivia");
  const [selectedSelection, setSelectedSelection] = useState("Sentiment");
  const [selectedYear, setSelectedYear] = useState("2010");

  // ... Any logic to handle changes in these states

  return (
    <SelectionContext.Provider
      value={{
        selectedCountry,
        setSelectedCountry,
        selectedSelection,
        setSelectedSelection,
        selectedYear,
        setSelectedYear,
      }}>
      {children}
    </SelectionContext.Provider>
  );
};
