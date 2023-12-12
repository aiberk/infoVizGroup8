# infoVizGroup8

## Live Demo Link

https://info-viz-group8.vercel.app/

## Video Presentation Link

https://www.loom.com/share/ca86888146ef47c3b6fd6c1897c71111

### GeoJson Map

- https://geojson-maps.ash.ms/
- https://github.com/xihai01/d3-mapping-with-react/tree/main
- https://www.d3indepth.com/geographic/

### D3 and React Tutorials

- https://livebook.manning.com/book/d3js-in-action-second-edition/chapter-9/v-6/141
- https://kamibrumi.medium.com/getting-started-with-react-d3-js-d86ccea05f08
- https://imneo.medium.com/building-a-d3js-dashboard-with-react-in-2023-93a0324c7469

## D3.js paths for submission

Small map - `src/app/components/organisms/card/countryShape.tsx`

Big map - `src/app/components/organisms/vizMap/vizMain.tsx`

Bar chart - `src/app/components/organisms/d3/BarChart.tsx`

Linked Bar chart - `src/app/components/organisms/d3/LinkedChart.tsx`

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
