import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

const InputTextField = ({
  input: { name, onChange, value, ...restInput },
  InputValue,
  meta,
  ...rest
}) => {
  return (
    <TextField
      {...rest}
      name={name}
      helperText={meta.touched ? meta.error : undefined}
      error={meta.error && meta.touched}
      inputProps={restInput}
      onChange={onChange}
      value={InputValue && !value ? InputValue : value}
    />
  );
};

InputTextField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  InputValue: PropTypes.object
};

export default InputTextField;
