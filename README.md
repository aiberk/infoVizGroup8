# infoVizGroup8

## D3.js paths for submission
Small map - `src/app/components/organisms/card/countryShape.tsx`
Big map - `src/app/components/organisms/vizMap/vizMain.tsx`

Bar chart - `src/app/components/organisms/d3/BarChart.tsx`
Radial chart - `src/app/components/organisms/d3/RadialChart.tsx`

## Contributtion process

- Pull from master
- Create a new branch with the name of the feature you are working on
- Commit and push to your branch
- Create a pull request to merge your branch into master
- Add code reviwers to your pull request
- Once your code is approved, merge your branch into master

## Data Paths

src/app/data/realData.tsx

## Data Model

CountriesData : {

CountryName1: {
Year1: { sentiment: decimal, denial: decimal, aggressive: decimal },
Year2: { sentiment: decimal, denial: decimal, aggressive: decimal },
...

},

CountryName2: {
Year1: { sentiment: decimal, denial: decimal, aggressive: decimal },
Year2: { sentiment: decimal, denial: decimal, aggressive: decimal },
...

}

.....

}

Sample Data:

export const countriesData = {
Bolivia: {

2010: { sentiment: 0.3, denial: 0.1, aggressive: 0.05 },

2011: { sentiment: 0.32, denial: 0.11, aggressive: 0.04 },

2012: { sentiment: 0.34, denial: 0.12, aggressive: 0.06 },

2013: { sentiment: 0.36, denial: 0.14, aggressive: 0.05 },

2014: { sentiment: 0.31, denial: 0.13, aggressive: 0.07 },

2015: { sentiment: 0.33, denial: 0.15, aggressive: 0.06 },

2016: { sentiment: 0.35, denial: 0.14, aggressive: 0.08 },

2017: { sentiment: 0.37, denial: 0.12, aggressive: 0.09 },

2018: { sentiment: 0.4, denial: 0.1, aggressive: 0.1 },

2019: { sentiment: 0.42, denial: 0.08, aggressive: 0.91 },

},

China: {
2010: { sentiment: 0.5, denial: 0.2, aggressive: 0.1 },
2011: { sentiment: 0.52, denial: 0.19, aggressive: 0.11 },
2012: { sentiment: 0.53, denial: 0.21, aggressive: 0.12 },
2013: { sentiment: 0.55, denial: 0.22, aggressive: 0.13 },
2014: { sentiment: 0.57, denial: 0.23, aggressive: 0.14 },
2015: { sentiment: 0.09, denial: 0.24, aggressive: 0.15 },
2016: { sentiment: 0.61, denial: 0.25, aggressive: 0.16 },
2017: { sentiment: 0.63, denial: 0.26, aggressive: 0.17 },
2018: { sentiment: 0.65, denial: 0.27, aggressive: 0.18 },
2019: { sentiment: 0.97, denial: 0.98, aggressive: 0.99 },
},

Brazil: {

2010: { sentiment: 0.4, denial: 0.15, aggressive: 0.08 },

2011: { sentiment: 0.42, denial: 0.16, aggressive: 0.09 },

2012: { sentiment: 0.44, denial: 0.17, aggressive: 0.1 },

2013: { sentiment: 0.46, denial: 0.18, aggressive: 0.11 },

2014: { sentiment: 0.48, denial: 0.19, aggressive: 0.12 },

2015: { sentiment: 0.5, denial: 0.2, aggressive: 0.13 },

2016: { sentiment: 0.52, denial: 0.21, aggressive: 0.14 },

2017: { sentiment: 0.54, denial: 0.22, aggressive: 0.15 },

2018: { sentiment: 0.56, denial: 0.23, aggressive: 0.16 },

2019: { sentiment: 0.58, denial: 0.24, aggressive: 0.17 },

},

Canada: {

2010: { sentiment: 0.7, denial: 0.05, aggressive: 0.03 },

2011: { sentiment: 0.72, denial: 0.06, aggressive: 0.035 },

2012: { sentiment: 0.74, denial: 0.07, aggressive: 0.04 },

2013: { sentiment: 0.76, denial: 0.08, aggressive: 0.045 },

2014: { sentiment: 0.78, denial: 0.09, aggressive: 0.05 },

2015: { sentiment: 0.8, denial: 0.1, aggressive: 0.055 },

2016: { sentiment: 0.82, denial: 0.11, aggressive: 0.06 },

2017: { sentiment: 0.84, denial: 0.12, aggressive: 0.065 },

2018: { sentiment: 0.86, denial: 0.13, aggressive: 0.07 },

2019: { sentiment: 0.88, denial: 0.14, aggressive: 0.075 },

},

};


