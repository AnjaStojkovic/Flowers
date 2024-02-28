import { Slider, Typography } from "@mui/material";
import { useState } from "react";

const MySlider = () => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };


  return (
    <div>
      <Slider
        value={value}
        onChange={handleChange}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={5}
        marks
        min={0}
        max={10}
        style={{ color: "black" }}
        classes={{ thumb: "custom-thumb" }}
      />
    </div>
  );
};

export default MySlider;
