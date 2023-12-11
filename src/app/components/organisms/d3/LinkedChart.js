// Created using following tutorials and code.
//https://livebook.manning.com/book/d3js-in-action-second-edition/chapter-9/v-6/141
// https://kamibrumi.medium.com/getting-started-with-react-d3-js-d86ccea05f08
//https://imneo.medium.com/building-a-d3js-dashboard-with-react-in-2023-93a0324c7469
// import React, { Component } from "react";
// import * as d3 from "d3";

// const width = 500;
// const height = 230;
// const margin = { top: 20, right: 20, bottom: 30, left: 50 };

// class LinkedChart extends Component {
//   state = {
//     bars: [],
//     xScale: null,
//     yScale: null,
//     selectedColorScale: d3.scaleSequential(d3.interpolateRdYlBu),
//     nonSelectedColorScale: d3.scaleSequential(d3.interpolateGreys),
//     idleColorScale: d3.scaleSequential(d3.interpolateRdYlBu), // New color scale for idle state
//   };

//   static getDerivedStateFromProps(nextProps, prevState) {
//     const { data, range } = nextProps;
//     if (!data) return {};

//     // Create X and Y Scales
//     const xScale = d3
//       .scaleBand()
//       .domain(data.map((d) => d.date))
//       .range([0, width - margin.left - margin.right])
//       .padding(0.1);

//     const yScale = d3
//       .scaleLinear()
//       .domain([0, d3.max(data, (d) => d.high)])
//       .range([height - margin.top - margin.bottom, 0]);

//     // Define the domain for all color scales
//     const highExtent = d3.extent(data, (d) => d.high);
//     prevState.selectedColorScale.domain(highExtent);
//     prevState.nonSelectedColorScale.domain(highExtent);
//     prevState.idleColorScale.domain(highExtent);

//     // Determine whether the data is in range, out of range, or idle
//     const isInRange = (date) => {
//       if (!range || range.length === 0) {
//         return "idle"; // Default to 'idle' if no range
//       }
//       return range[0] <= date && date <= range[1] ? "selected" : "non-selected";
//     };

//     // Map data to bars
//     const bars = data.map((d) => {
//       const rangeStatus = isInRange(d.date);
//       let fill;
//       switch (rangeStatus) {
//         case "selected":
//           fill = prevState.selectedColorScale(d.high);
//           break;
//         case "non-selected":
//           fill = prevState.nonSelectedColorScale(d.high);
//           break;
//         case "idle":
//           fill = prevState.idleColorScale(d.high);
//           break;
//         default:
//           fill = "#ccc";
//       }
//       return {
//         x: xScale(d.date),
//         y: yScale(d.high),
//         height: yScale(0) - yScale(d.high),
//         width: xScale.bandwidth(),
//         fill,
//       };
//     });

//     return { bars, xScale, yScale };
//   }

//   componentDidMount() {
//     this.renderAxis();
//   }

//   componentDidUpdate() {
//     this.renderAxis();
//   }

//   renderAxis = () => {
//     const { xScale, yScale } = this.state;

//     // Create axes
//     const xAxis = d3.axisBottom(xScale).tickFormat("");
//     const yAxis = d3.axisLeft(yScale);

//     // Render X Axis
//     d3.select(this.xAxisRef.current).call(xAxis);
//     // Render Y Axis
//     d3.select(this.yAxisRef.current).call(yAxis);
//   };

//   xAxisRef = React.createRef();
//   yAxisRef = React.createRef();

//   render() {
//     return (
//       <svg width={width} height={height}>
//         <g transform={`translate(${margin.left},${margin.top})`}>
//           {this.state.bars.map((d, i) => (
//             <rect
//               key={i}
//               x={d.x}
//               y={d.y}
//               width={d.width}
//               height={d.height}
//               fill={d.fill}
//             />
//           ))}
//           <g
//             ref={this.xAxisRef}
//             transform={`translate(0,${height - margin.top - margin.bottom})`}
//           />
//           <g ref={this.yAxisRef} />
//         </g>
//       </svg>
//     );
//   }
// }

// export default LinkedChart;

// import React, { Component } from "react";
// import * as d3 from "d3";

// const width = 500;
// const height = 300;
// const margin = { top: 20, right: 20, bottom: 30, left: 50 };

// class LinkedChart extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       lines: {},
//     };

//     this.xAxisRef = React.createRef();
//     this.yAxisRef = React.createRef();
//   }

//   static getDerivedStateFromProps(nextProps, prevState) {
//     const { data } = nextProps;
//     if (!data) return {};

//     // Prepare data
//     const dataArray = Object.entries(data.World).map(([year, values]) => ({
//       year: +year,
//       sentiment: values.sentiment,
//       denial: values.denial,
//       aggressive: values.aggressive,
//     }));

//     // Create scales
//     const xScale = d3
//       .scaleLinear()
//       .domain(d3.extent(dataArray, (d) => d.year))
//       .range([margin.left, width - margin.right]);

//     const yScale = d3
//       .scaleLinear()
//       .domain([
//         d3.min(dataArray, (d) => Math.min(d.sentiment, d.denial, d.aggressive)),
//         d3.max(dataArray, (d) => Math.max(d.sentiment, d.denial, d.aggressive)),
//       ])
//       .range([height - margin.bottom, margin.top]);

//     // Line generators for each data type
//     const lineGenerator = (type) => {
//       return d3
//         .line()
//         .x((d) => xScale(d.year))
//         .y((d) => yScale(d[type]))
//         .curve(d3.curveBasis); // Curve for smoother line
//     };

//     // Create lines
//     const lines = {
//       sentiment: lineGenerator("sentiment")(dataArray),
//       denial: lineGenerator("denial")(dataArray),
//       aggressive: lineGenerator("aggressive")(dataArray),
//     };

//     return { lines, xScale, yScale };
//   }

//   componentDidMount() {
//     this.renderAxis();
//   }

//   componentDidUpdate() {
//     this.renderAxis();
//   }

//   renderAxis = () => {
//     const { xScale, yScale } = this.state;

//     const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
//     const yAxis = d3.axisLeft(yScale);

//     d3.select(this.xAxisRef.current).call(xAxis);
//     d3.select(this.yAxisRef.current).call(yAxis);
//   };

//   xAxisRef = React.createRef();
//   yAxisRef = React.createRef();

//   render() {
//     const { lines } = this.state;

//     return (
//       <svg width={width} height={height}>
//         <g transform={`translate(${margin.left},${margin.top})`}>
//           <path
//             d={lines.sentiment}
//             stroke="#1f77b4"
//             strokeWidth={2}
//             fill="none"
//           />
//           <path d={lines.denial} stroke="#ff7f0e" strokeWidth={2} fill="none" />
//           <path
//             d={lines.aggressive}
//             stroke="#2ca02c"
//             strokeWidth={2}
//             fill="none"
//           />
//           <g
//             ref={this.xAxisRef}
//             transform={`translate(0,${height - margin.top - margin.bottom})`}
//           />
//           <g ref={this.yAxisRef} />
//         </g>
//       </svg>
//     );
//   }
// }

// export default LinkedChart;
import React, { Component } from "react";
import * as d3 from "d3";

const width = 500;
const height = 230;
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
    const { data } = nextProps;
    if (!data) return {};

    // Prepare data
    const processedData = Object.entries(data.World).map(([year, values]) => ({
      year: +year,
      sentiment: values.sentiment,
      denial: values.denial,
      aggressive: values.aggressive,
    }));

    // Create scales
    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(processedData, (d) => d.year))
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([
        d3.min(processedData, (d) =>
          Math.min(d.sentiment, d.denial, d.aggressive)
        ),
        d3.max(processedData, (d) =>
          Math.max(d.sentiment, d.denial, d.aggressive)
        ),
      ])
      .range([height - margin.bottom, margin.top]);

    // Line generators for each data type
    const lineGenerator = d3
      .line()
      .x((d) => xScale(d.year))
      .y((d) => yScale(d.type))
      .curve(d3.curveMonotoneX);

    // Create lines
    const lines = {
      sentiment: lineGenerator(
        processedData.map((d) => ({ year: d.year, type: d.sentiment }))
      ),
      denial: lineGenerator(
        processedData.map((d) => ({ year: d.year, type: d.denial }))
      ),
      aggressive: lineGenerator(
        processedData.map((d) => ({ year: d.year, type: d.aggressive }))
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
