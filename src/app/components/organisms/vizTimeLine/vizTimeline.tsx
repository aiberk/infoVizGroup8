import React from "react";

import RangeSlider from "../../molecules/slider/rangeSlide";

type Props = {};

const VizTimeline = (props: Props) => {
  return (
    <div className="timeline flex items-center justify-center">
      <RangeSlider />
    </div>
  );
};

export default VizTimeline;
