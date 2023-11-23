import React, { Component } from "react";
import * as d3 from "d3";

const width = 350;
const height = 200;
const margin = { top: 20, right: 5, bottom: 20, left: 35 };

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bars: [], // array of rects
    };
    this.xAxisRef = React.createRef();
    this.yAxisRef = React.createRef();
    this.brushRef = React.createRef();

    this.xAxis = d3.axisBottom().tickFormat(d3.timeFormat("%b"));
    this.yAxis = d3.axisLeft().tickFormat((d) => `${d}℉`);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { data, range } = nextProps;
    if (!data) return {};

    const extent = d3.extent(data, (d) => d.date);
    const xScale = d3
      .scaleTime()
      .domain(extent)
      .range([margin.left, width - margin.right]);

    const [min, max] = d3.extent(data, (d) => d.high);
    const yScale = d3
      .scaleLinear()
      .domain([Math.min(min, 0), max])
      .range([height - margin.bottom, margin.top]);

    const colorExtent = d3.extent(data, (d) => d.avg).reverse();
    const colorScale = d3
      .scaleSequential()
      .domain(colorExtent)
      .interpolator(d3.interpolateRdYlBu);

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

  componentDidMount() {
    this.brush = d3
      .brushX()
      .extent([
        [margin.left, margin.top],
        [width - margin.right, height - margin.bottom],
      ])
      .on("end", this.brushEnd);
    d3.select(this.brushRef.current).call(this.brush);
  }

  componentDidUpdate() {
    this.xAxis.scale(this.state.xScale);
    d3.select(this.xAxisRef.current).call(this.xAxis);
    this.yAxis.scale(this.state.yScale);
    d3.select(this.yAxisRef.current).call(this.yAxis);
  }

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
