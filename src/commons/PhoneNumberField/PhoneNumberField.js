import PropTypes from 'prop-types';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const PhoneNumberField = ({ input: { name, onChange, value }, meta, ...rest }) => (
  <PhoneInput
    specialLabel={''}
    country={'in'}
    inputStyle={{
      borderColor: meta.touched && meta.error && 'red'
    }}
    {...rest}
    inputProps={{
      name: 'phone',
      required: true,
      autoFocus: false
    }}
    name={name}
    helperText={meta.touched ? meta.error : undefined}
    error={meta.error && meta.touched}
    onChange={onChange}
    value={value}
  />
);

PhoneNumberField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object
};

export default PhoneNumberField;
