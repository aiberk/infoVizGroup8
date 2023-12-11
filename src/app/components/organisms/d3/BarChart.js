// Created using following tutorials and code.
// https://livebook.manning.com/book/d3js-in-action-second-edition/chapter-9/v-6/141
// https://kamibrumi.medium.com/getting-started-with-react-d3-js-d86ccea05f08
// https://imneo.medium.com/building-a-d3js-dashboard-with-react-in-2023-93a0324c7469
import React, { Component } from "react";
import * as d3 from "d3";

const width = 480;
const height = 230;
const margin = { top: 20, right: 5, bottom: 20, left: 35 };

class BarChart extends Component {
  //Constructor for the BarChart component
  constructor(props) {
    super(props);
    this.state = {
      bars: [],
    };

    //Create refs for the x and y axis
    this.xAxisRef = React.createRef();
    this.yAxisRef = React.createRef();
    this.brushRef = React.createRef();

    // Draw the x and y axis
    this.xAxis = d3.axisBottom().tickFormat(d3.timeFormat("%b"));
    this.yAxis = d3.axisLeft().tickFormat((d) => `${d}℉`);
  }

  //This function updates the chart when the country and subject selector change
  static getDerivedStateFromProps(nextProps, prevState) {
    const { data, range } = nextProps;
    if (!data) return {};

    const extent = d3.extent(data, (d) => d.date);

    // Create X and Y Scales
    const xScale = d3
      .scaleTime()
      .domain(extent)
      .range([margin.left, width - margin.right]);

    const [min, max] = d3.extent(data, (d) => d.high);
    const yScale = d3
      .scaleLinear()
      .domain([Math.min(min, 0), max])
      .range([height - margin.bottom, margin.top]);

    // Create color scale
    const colorExtent = d3.extent(data, (d) => d.avg).reverse();
    const colorScale = d3
      .scaleSequential()
      .domain(colorExtent)
      .interpolator(d3.interpolateRdYlBu);

    // Create bars
    const bars = data.map((d) => {
      const isColored =
        !range.length || (range[0] <= d.date && d.date <= range[1]);
      return {
        x: xScale(d.date),
        y: yScale(d.high),
        height: yScale(d.low) - yScale(d.high),
        fill: isColored ? colorScale(d.avg) : "#ccc",
      };
    });

    return { bars, xScale, yScale };
  }

  // Keep track of brushing and send data to the parent component
  componentDidMount() {
    this.brush = d3
      .brushX()
      .extent([
        [margin.left, margin.top],
        [width - margin.right, height - margin.bottom],
      ])
      .on("end", this.brushEnd);
    d3.select(this.brushRef.current).call(this.brush);

    // Render the axes after the component mounts.
    this.xAxis.scale(this.state.xScale);
    d3.select(this.xAxisRef.current).call(this.xAxis);
    this.yAxis.scale(this.state.yScale);
    d3.select(this.yAxisRef.current).call(this.yAxis);
  }

  // Update graph when brushed
  componentDidUpdate() {
    this.xAxis.scale(this.state.xScale);
    d3.select(this.xAxisRef.current).call(this.xAxis);
    this.yAxis.scale(this.state.yScale);
    d3.select(this.yAxisRef.current).call(this.yAxis);
  }

  // This function updates the range when the brush is used
  brushEnd = (event) => {
    const selection = event.selection;
    if (!selection) {
      this.props.updateRange([]);
      return;
    }
    const [x1, x2] = selection;
    const range = [this.state.xScale.invert(x1), this.state.xScale.invert(x2)];
    this.props.updateRange(range);
  };

  // Render Everything
  render() {
    return (
      <svg width={width} height={height}>
        {this.state.bars.map((d, i) => (
          <rect
            key={i}
            x={d.x}
            y={d.y}
            width="2"
            height={d.height}
            fill={d.fill}
          />
        ))}
        <g>
          <g
            ref={this.xAxisRef}
            transform={`translate(0, ${height - margin.bottom})`}
          />
          <g ref={this.yAxisRef} transform={`translate(${margin.left}, 0)`} />
          <g ref={this.brushRef} />
        </g>
      </svg>
    );
  }
}

export default BarChart;
