import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

const InputTextField = ({ input: { name, onChange, value, ...restInput }, meta, ...rest }) => (
  <TextField
    {...rest}
    name={name}
    helperText={meta.touched ? meta.error : undefined}
    error={meta.error && meta.touched}
    inputProps={restInput}
    onChange={onChange}
    value={value}
  />
);

InputTextField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object
};

export default InputTextField;
