import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import PropTypes from 'prop-types';

const DropdownField = ({ input: { name, onChange, value }, options, ...rest }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="select-label">{name}</InputLabel>
      <Select
        {...rest}
        labelId="select-label"
        id="select"
        value={value}
        label={name}
        onChange={onChange}>
        {options.map((option, index) => (
          <MenuItem value={option.value} key={index}>
            {option.key}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

DropdownField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  options: PropTypes.array
};

export default DropdownField;
