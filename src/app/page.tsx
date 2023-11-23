import React from "react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="row-auto flex-grow flex flex-col items-center">
      <div className="bg-white bg-opacity-5 w-full max-w-8xl h-full text-white vizParent">
        <div className="header part">Header</div>
        <div className="colorScale part">Color Scale</div>
        <div className="legend part">Legend</div>
        <div className="timeline part">Timeline</div>
        <div className="mainViz part">Main Visualization</div>
      </div>
    </main>
  );
}
