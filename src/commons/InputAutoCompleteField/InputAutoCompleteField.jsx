import { Autocomplete, TextField } from '@mui/material';
import PropTypes from 'prop-types';

const InputAutoCompleteField = ({
  input: { onChange, value, ...restInput },
  meta,
  loading,
  onOpenField,
  onCloseField,
  onCountryEmpty,
  onStateEmpty,
  InputValue,
  ...rest
}) => {
  return (
    <Autocomplete
      {...restInput}
      {...rest}
      loading={loading}
      onChange={(event, option) => onChange(option)}
      onOpen={() => {
        onOpenField();
      }}
      onClose={() => {
        onCloseField();
      }}
      getOptionLabel={(option) => option.label || ''}
      isOptionEqualToValue={(option, value) => option?.id === value?.id || value === ''}
      value={value === '' ? InputValue : onCountryEmpty ? null : onStateEmpty ? null : value}
      renderInput={(params) => (
        <TextField
          {...rest}
          {...params}
          inputProps={{ ...params.inputProps }}
          helperText={meta.touched ? meta.error : undefined}
          error={meta.error && meta.touched}
        />
      )}
    />
  );
};

InputAutoCompleteField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  onOpenField: PropTypes.func,
  onCloseField: PropTypes.func,
  InputValue: PropTypes.object.isRequired,
  onCountryEmpty: PropTypes.any,
  onStateEmpty: PropTypes.any
};
InputAutoCompleteField.defaultProps = {
  loading: false,
  onOpenField: () => {},
  onCloseField: () => {}
};

export default InputAutoCompleteField;
