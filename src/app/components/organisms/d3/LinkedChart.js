// Created using following tutorials and code.
//https://livebook.manning.com/book/d3js-in-action-second-edition/chapter-9/v-6/141
// https://kamibrumi.medium.com/getting-started-with-react-d3-js-d86ccea05f08
//https://imneo.medium.com/building-a-d3js-dashboard-with-react-in-2023-93a0324c7469

import React, { Component } from "react";
import * as d3 from "d3";

const width = 500;
const height = 300;
const margin = { top: 20, right: 20, bottom: 30, left: 50 };

class LinkedChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: {},
      xScale: null,
      yScale: null,
    };

    this.xAxisRef = React.createRef();
    this.yAxisRef = React.createRef();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { data, range } = nextProps;
    console.log(range);
    if (!data) return {};

    // Convert range to numbers if they are strings
    const numericRange = range.map((year) => +year);

    // Filter data based on numeric range
    const filteredData = Object.entries(data.World)
      .filter(([year, _]) => !range.length || numericRange.includes(+year))
      .map(([year, values]) => ({
        year: +year,
        sentiment: values.sentiment,
        denial: values.denial,
        aggressive: values.aggressive,
      }));

    // Create scales
    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(filteredData, (d) => d.year))
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([
        d3.min(filteredData, (d) =>
          Math.min(d.sentiment, d.denial, d.aggressive)
        ),
        d3.max(filteredData, (d) =>
          Math.max(d.sentiment, d.denial, d.aggressive)
        ),
      ])
      .range([height - margin.bottom, margin.top]);

    // Line generators for each data type
    // Line generators for each data type
    const lineGenerator = d3
      .line()
      .x((d) => xScale(d.year))
      .y((d) => yScale(d.sentiment)) // Use the actual value fields
      .curve(d3.curveMonotoneX);

    // Create lines for each type
    const lines = {
      sentiment: lineGenerator(filteredData),
      denial: lineGenerator(
        filteredData.map((d) => ({ year: d.year, sentiment: d.denial }))
      ),
      aggressive: lineGenerator(
        filteredData.map((d) => ({ year: d.year, sentiment: d.aggressive }))
      ),
    };

    return { lines, xScale, yScale };
  }

  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis = () => {
    const xAxis = d3.axisBottom(this.state.xScale).tickFormat(d3.format("d"));
    const yAxis = d3.axisLeft(this.state.yScale);

    d3.select(this.xAxisRef.current).call(xAxis);
    d3.select(this.yAxisRef.current).call(yAxis);
  };

  xAxisRef = React.createRef();
  yAxisRef = React.createRef();

  render() {
    const { lines } = this.state;

    return (
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <path
            d={lines.sentiment}
            stroke="#1f77b4"
            strokeWidth={2}
            fill="none"
          />
          <path d={lines.denial} stroke="#ff7f0e" strokeWidth={2} fill="none" />
          <path
            d={lines.aggressive}
            stroke="#2ca02c"
            strokeWidth={2}
            fill="none"
          />

          <g
            ref={this.xAxisRef}
            transform={`translate(0,${height - margin.top - margin.bottom})`}
          />
          <g ref={this.yAxisRef} />
        </g>
      </svg>
    );
  }
}

export default LinkedChart;
