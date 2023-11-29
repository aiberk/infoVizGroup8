import React from "react";

export type CountryData = {
  year: number;
  sentiment: number;
  denial: number;
  aggressive: number;
};

export interface ICountry {
  name: string;
  svg: string;
  data?: CountryData[];
}

export type Country = ICountry & {};
