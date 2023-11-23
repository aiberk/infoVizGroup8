import React, { useState, useEffect } from "react";

import Card from "@/app/components/organisms/card/card";

type Props = {};

const VisMain = (props: Props) => {
  return (
    <div className="mainViz flex justify-center items-center cardandmap">
      <div className="cardanmapCard h-full">
        <Card />
      </div>
      <div className="cardanmapMap part h-full">Map</div>
      <div className="cardanmapViz part h-full">Chart</div>
    </div>
  );
};

export default VisMain;
