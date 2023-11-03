import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(km: number) {
  return `${km}km`;
}

interface Props {
  onChange: (value: number) => void;
  onChangeParams: (newValue: string) => void,
}

export const DiscreteSlider: React.FC<Props> = ({ onChange, onChangeParams }) => {
  const [sliderValue, setSliderValue] = React.useState<number>(0);

  const handleSliderChange = (event: Event, newValue: number | number[] | string) => {
    const value = Array.isArray(newValue) ? newValue[0] : newValue;
    setSliderValue(value as number);
    onChange(value as number);
    onChangeParams(`${value}`);
  };

  return (
    <Box sx={{ width: 233 }}>
      <Slider
        aria-label="Temperature"
        defaultValue={71}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={0.5}
        marks
        min={0}
        max={71}
        onChange={handleSliderChange}
        value={sliderValue}
      />
    </Box>
  );
}