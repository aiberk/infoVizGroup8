import React from "react";

export type CountryData = {
  [year: number]: YearData;
};

export interface ICountry {
  [year: number]: YearData;
}

export type Country = ICountry & {};

export interface YearData {
  total_count: number;
  sentiment_std: number | null;
  beliver_v_denier: number | null;
  aggressive_rate_believer: number | null;
  aggressive_rate_denier: number | null;
  sentiment: number;
  believer: number;
  neutral: number;
  denial: number;
  aggressive: number;
}

export interface DataStructure {
  [country: string]: CountryData;
}
