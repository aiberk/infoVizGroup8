import React, { useState, useEffect } from "react";

type Props = {};

const VisMain = (props: Props) => {
  return (
    <div className="mainViz flex justify-center items-center cardandmap">
      <div className="cardanmapCard part h-full">Card</div>
      <div className="cardanmapMap part h-full">Map</div>
      <div className="cardanmapViz part h-full">Chart</div>
    </div>
  );
};

export default VisMain;
