import React from "react";

export type CountryData = {
  year: number;
  sentiment: number;
  denial: number;
  aggressive: number;
};

/**
 * User Interface - Represents a user as an Interface.
 * @interface
 */
export interface ICountry {
  name: string;
  svg: string;
  data?: CountryData[];
}

export type Country = ICountry & {
  // Additional properties or methods specific to Post
};
