// Created using following tutorials and code.
// https://livebook.manning.com/book/d3js-in-action-second-edition/chapter-9/v-6/141
// https://kamibrumi.medium.com/getting-started-with-react-d3-js-d86ccea05f08
// https://imneo.medium.com/building-a-d3js-dashboard-with-react-in-2023-93a0324c7469

import React, { Component } from "react";
import * as d3 from "d3";

const width = 480;
const height = 230;
const margin = { top: 20, right: 5, bottom: 20, left: 50 };

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bars: [],
    };

    this.xAxisRef = React.createRef();
    this.yAxisRef = React.createRef();
    this.brushRef = React.createRef();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { data } = nextProps;
    if (!data) return {};

    const dataArray = [];
    Object.entries(data.World).forEach(([year, values]) => {
      dataArray.push({
        year: +year,
        type: "Sentiment",
        value: values.sentiment,
      });
      dataArray.push({
        year: +year,
        type: "Denial",
        value: values.denial,
      });
      dataArray.push({
        year: +year,
        type: "Aggressive",
        value: values.aggressive,
      });
      // Add additional value here
    });

    const yearExtent = d3.extent(dataArray, (d) => d.year);
    const valueExtent = d3.extent(dataArray, (d) => d.value);

    const xScale = d3
      .scaleBand()
      .domain(dataArray.map((d) => d.year))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain(valueExtent)
      .range([height - margin.bottom, margin.top]);

    const colorScale = d3
      .scaleOrdinal()
      .domain(["Sentiment", "Denial", "Aggressive"])
      .range(["#F87171", "orange", "#38BDF8CC"]);

    const bars = dataArray.map((d, i) => ({
      year: d.year.toString(),
      x: xScale(d.year) + (xScale.bandwidth() / 4) * i,
      y: yScale(d.value),
      width: xScale.bandwidth() / 4,
      height: height - margin.bottom - yScale(d.value),
      fill: colorScale(d.type),
    }));

    return { bars, xScale, yScale };
  }

  componentDidMount() {
    this.brush = d3
      .brushX()
      .extent([
        [margin.left, margin.top],
        [width - margin.right, height - margin.bottom],
      ])
      .handleSize(30)
      .on("brush", (event) => {
        // New event handling for D3 v6+
        const selection = event.selection;
        if (!selection) return;

        const [x0, x1] = selection;
        const minBrushSize = 30;
        if (x1 - x0 < minBrushSize) {
          // Adjust the brush size
          if (x1 === width - margin.right) {
            d3.select(this.brushRef.current).call(this.brush.move, [
              x1 - minBrushSize,
              x1,
            ]);
          } else {
            d3.select(this.brushRef.current).call(this.brush.move, [
              x0,
              x0 + minBrushSize,
            ]);
          }
        }
      })
      .on("end", this.brushEnd);

    d3.select(this.brushRef.current).call(this.brush);

    this.xAxis = d3.axisBottom(this.state.xScale).tickFormat(d3.format("d"));
    d3.select(this.xAxisRef.current).call(this.xAxis);

    this.yAxis = d3.axisLeft(this.state.yScale);
    d3.select(this.yAxisRef.current).call(this.yAxis);
  }
  componentDidUpdate() {
    this.xAxis.scale(this.state.xScale);
    d3.select(this.xAxisRef.current).call(this.xAxis);

    this.yAxis.scale(this.state.yScale);
    d3.select(this.yAxisRef.current).call(this.yAxis);

    d3.select(this.brushRef.current).call(this.brush);
  }

  // brushEnd = (event) => {
  //   const selection = event.selection;
  //   if (!selection) {
  //     this.props.updateRange([]);
  //     return;
  //   }

  //   const [x0, x1] = selection;
  //   const selectedYears = this.state.bars
  //     .filter((d) => x0 <= d.x && d.x + d.width <= x1)
  //     .map((d) => d.year);

  //   this.props.updateRange(selectedYears);
  // };

  brushEnd = (event) => {
    const selection = event.selection;
    console.log("Brush Selection:", selection);
    if (!selection) {
      this.props.updateRange([]);
      return;
    }

    const [x0, x1] = selection;
    const selectedBars = this.state.bars.filter(
      (d) => x0 <= d.x && d.x + d.width <= x1
    );
    console.log("Selected Bars:", selectedBars);

    const selectedYears = selectedBars.map((d) => d.year);
    console.log("Selected Years:", selectedYears);

    this.props.updateRange(selectedYears);
  };

  render() {
    return (
      <svg width={width} height={height}>
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
          transform={`translate(0, ${height - margin.bottom})`}
        />
        <g ref={this.yAxisRef} transform={`translate(${margin.left}, 0)`} />
        <g ref={this.brushRef} />
      </svg>
    );
  }
}

export default BarChart;
