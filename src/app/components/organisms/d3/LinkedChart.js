// Created using following tutorials and code.
//https://livebook.manning.com/book/d3js-in-action-second-edition/chapter-9/v-6/141
// https://kamibrumi.medium.com/getting-started-with-react-d3-js-d86ccea05f08
//https://imneo.medium.com/building-a-d3js-dashboard-with-react-in-2023-93a0324c7469
import React, { Component } from "react";
import * as d3 from "d3";

const width = 400;
const height = 230;
const margin = { top: 20, right: 20, bottom: 30, left: 50 };

class LinkedChart extends Component {
  state = {
    bars: [],
    xScale: null,
    yScale: null,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { data, range } = nextProps;
    if (!data) return {};

    // Create X and Y Scales
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.date))
      .rangeRound([0, width - margin.left - margin.right])
      .padding(0.1); // Adjust padding if necessary

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.high)])
      .range([height - margin.top - margin.bottom, 0]);

    const isInRange = (date) => {
      if (!range || range.length === 0) {
        return true;
      }
      return range[0] <= date && date <= range[1];
    };

    const bars = data.map((d) => ({
      x: xScale(d.date),
      y: yScale(d.high),
      height: height - margin.top - margin.bottom - yScale(d.high),
      width: xScale.bandwidth(),
      fill: isInRange(d.date) ? "steelblue" : "#ccc",
    }));

    return { bars, xScale, yScale };
  }

  renderAxis = () => {
    const { xScale, yScale } = this.state;

    if (!xScale || !yScale) return null;

    return (
      <g>
        {/* X Axis with only ticks */}
        <g
          transform={`translate(0, ${height - margin.top - margin.bottom})`}
          ref={(node) =>
            d3.select(node).call(d3.axisBottom(xScale).tickFormat(""))
          }
        />
        {/* Y Axis */}
        <g ref={(node) => d3.select(node).call(d3.axisLeft(yScale))} />
      </g>
    );
  };

  render() {
    return (
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
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
          {this.renderAxis()}
        </g>
      </svg>
    );
  }
}

export default LinkedChart;
