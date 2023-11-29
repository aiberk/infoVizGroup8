import React, { useState, useEffect, useRef } from "react";

const RangeSlider: React.FC = () => {
  const [value, setValue] = useState<number>(250);
  const rangeRef = useRef<HTMLInputElement>(null);
  const thumbRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (rangeRef.current && thumbRef.current) {
      const min = parseInt(rangeRef.current.min);
      const max = parseInt(rangeRef.current.max);
      const percent = ((value - min) / (max - min)) * 100;
      const thumbWidth = 20;
      const offset = (thumbWidth * percent) / 100 - thumbWidth / 2;

      thumbRef.current.style.left = `calc(${percent}% - ${offset}px)`;
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };

  return (
    <div className=" w-full relative flex items-center">
      <input
        ref={rangeRef}
        type="range"
        className="range-slider__range w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        value={value}
        min="0"
        max="500"
        step="50"
        onChange={handleChange}
      />
      <span
        ref={thumbRef}
        className="absolute text-md text-white bg-gray-800 py-1 px-2 rounded shadow"
        style={{
          transform: "translateY(-150%) translateX(-50%)",
          top: "100%",
        }}>
        {value}
      </span>
    </div>
  );
};

export default RangeSlider;
