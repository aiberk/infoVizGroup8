// Created using following tutorials and code.
//https://livebook.manning.com/book/d3js-in-action-second-edition/chapter-9/v-6/141
// https://kamibrumi.medium.com/getting-started-with-react-d3-js-d86ccea05f08
//https://imneo.medium.com/building-a-d3js-dashboard-with-react-in-2023-93a0324c7469
import React, { Component } from "react";
import * as d3 from "d3";

const width = 500;
const height = 230;
const margin = { top: 20, right: 20, bottom: 30, left: 50 };

class LinkedChart extends Component {
  state = {
    bars: [],
    xScale: null,
    yScale: null,
    selectedColorScale: d3.scaleSequential(d3.interpolateRdYlBu),
    nonSelectedColorScale: d3.scaleSequential(d3.interpolateGreys),
    idleColorScale: d3.scaleSequential(d3.interpolateRdYlBu), // New color scale for idle state
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { data, range } = nextProps;
    if (!data) return {};

    // Create X and Y Scales
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.date))
      .range([0, width - margin.left - margin.right])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.high)])
      .range([height - margin.top - margin.bottom, 0]);

    // Define the domain for all color scales
    const highExtent = d3.extent(data, (d) => d.high);
    prevState.selectedColorScale.domain(highExtent);
    prevState.nonSelectedColorScale.domain(highExtent);
    prevState.idleColorScale.domain(highExtent);

    // Determine whether the data is in range, out of range, or idle
    const isInRange = (date) => {
      if (!range || range.length === 0) {
        return "idle"; // Default to 'idle' if no range
      }
      return range[0] <= date && date <= range[1] ? "selected" : "non-selected";
    };

    // Map data to bars
    const bars = data.map((d) => {
      const rangeStatus = isInRange(d.date);
      let fill;
      switch (rangeStatus) {
        case "selected":
          fill = prevState.selectedColorScale(d.high);
          break;
        case "non-selected":
          fill = prevState.nonSelectedColorScale(d.high);
          break;
        case "idle":
          fill = prevState.idleColorScale(d.high);
          break;
        default:
          fill = "#ccc";
      }
      return {
        x: xScale(d.date),
        y: yScale(d.high),
        height: yScale(0) - yScale(d.high),
        width: xScale.bandwidth(),
        fill,
      };
    });

    return { bars, xScale, yScale };
  }

  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis = () => {
    const { xScale, yScale } = this.state;

    // Create axes
    const xAxis = d3.axisBottom(xScale).tickFormat("");
    const yAxis = d3.axisLeft(yScale);

    // Render X Axis
    d3.select(this.xAxisRef.current).call(xAxis);
    // Render Y Axis
    d3.select(this.yAxisRef.current).call(yAxis);
  };

  xAxisRef = React.createRef();
  yAxisRef = React.createRef();

  render() {
    return (
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          {this.state.bars.map((d, i) => (
            <rect
              key={i}
              x={d.x}
              y={d.y}
              width={d.width}
              height={d.height}
              fill={d.fill}
            />
          ))}
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
