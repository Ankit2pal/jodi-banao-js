import { Autocomplete, TextField } from '@mui/material';
import PropTypes from 'prop-types';

const InputAutoCompleteFieldCategory = ({
  input: { onChange, value, ...restInput },
  meta,
  loading,
  onOpenField,
  onCloseField,
  InputValue,
  optionLabel,
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
      groupBy={(option) => option.Category}
      getOptionLabel={(option) => option[optionLabel] || ''}
      isOptionEqualToValue={(option, value) => option.ID === InputValue?.ID || value === ''}
      value={value === '' ? InputValue : value}
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

InputAutoCompleteFieldCategory.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  onOpenField: PropTypes.func,
  onCloseField: PropTypes.func,
  InputValue: PropTypes.object.isRequired,
  optionLabel: PropTypes.any
};
InputAutoCompleteFieldCategory.defaultProps = {
  loading: false,
  onOpenField: () => {},
  onCloseField: () => {}
};

export default InputAutoCompleteFieldCategory;
