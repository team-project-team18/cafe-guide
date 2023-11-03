import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type Option = {
  value: string,
  label: string,
}

type Props = {
  options: Option[],
  onChange: (newVaue: string) => void,
}

export const DropDown: React.FC<Props> = ({ options, onChange }) => {
  const [selectedValue, setSelectedValue] = React.useState<string>('');

  const handleChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value as string;
    setSelectedValue(newValue);
    onChange(newValue);
  };

  const filteredOptions = options.filter(
    (obj, i, self) => self.findIndex((o) => o.value === obj.value) === i,
  );

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedValue}
          label="Options"
          onChange={handleChange}
        >
          {filteredOptions.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
