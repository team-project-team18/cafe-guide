// DiscreteSlider.tsx

import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

interface Props {
  onChange: (value: number) => void;
  onChangeParams: (newValue: string) => void;
}

export const DiscreteSlider: React.FC<Props> = ({
  onChange,
  onChangeParams,
}) => {
  const [sliderValue, setSliderValue] = React.useState<number>(0);

  const handleSliderChange = (event: Event, newValue: number | number[] | string) => {
    const value = Array.isArray(newValue) ? newValue[0] : parseFloat(newValue as string);
    setSliderValue(value);
    onChange(value);
    onChangeParams(`${value}`);
  };


  return (
    <div>
      <span>
        Distance from center: {sliderValue} km
      </span>
      <Box sx={{ width: 233 }}>
        <Slider
          aria-label="Temperature"
          value={sliderValue}
          getAriaValueText={(value: number) => `${value}km`}
          valueLabelDisplay="auto"
          step={0.2}
          marks
          min={0}
          max={5}
          onChange={handleSliderChange}
        />
      </Box>
    </div>
  );
};
