import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

interface Props {
  onInputChange: (checked: boolean) => void,
}

export const Checkboxes: React.FC<Props> = ({ onInputChange }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(event.target.checked);
  }

  return (
    <div>
      <Checkbox
        {...label}
        onChange={handleInputChange}
      />
    </div>
  );
}
