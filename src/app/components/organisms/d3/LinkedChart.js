import React, { Component } from "react";
import * as d3 from "d3";

const width = 380;
const height = 200;

class LinkedChart extends Component {
  state = {
    bars: [],
    tempAnnotations: [],
  };

  // This is part of the Brush and Link pattern. 
  //this updates the chart when the other chart is brushed.
  static getDerivedStateFromProps(nextProps) {
    const { data, range } = nextProps;
    if (!data) return {};

    //Creat X and Y Scales
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.date))
      .rangeRound([0, width * 1.05])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.high)])
      .range([height, 0]);

    //This function checks if the data is within the
    //brushed range. If it is, it colors the bar blue.
    const isInRange = (date) => {
      if (!range || range.length === 0) {
        return true;
      }
      return range[0] <= date && date <= range[1];
    };

    //Initialize bars with x, y, height, width, and fill
    const bars = data.map(d => ({
      x: xScale(d.date),
      y: yScale(d.high),
      height: height - yScale(d.high),
      width: xScale.bandwidth(),
      fill: isInRange(d.date) ? "steelblue" : "#ccc"
    }));

    return { bars };
  }

  // Render Bars
  render() {
    return (
      <svg width={width} height={height}>
        {this.state.bars.map((d, i) => (
          <rect key={i} x={d.x} y={d.y} width={d.width} height={d.height} fill={d.fill} />
        ))}
      </svg>
    );
  }
}

export default LinkedChart;
