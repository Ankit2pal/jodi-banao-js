import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import PropTypes from 'prop-types';

const DatePickerField = ({
  input: { onChange, value, ...restInput },
  meta,
  maxage,
  disabled,
  ...rest
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        {...restInput}
        {...rest}
        disableFuture
        label={'DD/MM/YYYY'}
        inputFormat="dd/MM/yyyy"
        openTo="year"
        views={['year', 'month', 'day']}
        value={value}
        onChange={onChange}
        maxDate={maxage}
        disabled={disabled}
        minDate={1960}
        renderInput={(params) => (
          <TextField
            {...params}
            input={{ ...params }}
            helperText={meta.touched ? meta.error : undefined}
            error={meta.error && meta.touched}
          />
        )}
      />
    </LocalizationProvider>
  );
};

DatePickerField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  maxage: PropTypes.object,
  disabled: PropTypes.bool
};

export default DatePickerField;
