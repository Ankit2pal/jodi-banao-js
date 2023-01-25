import PropTypes from 'prop-types';
import Checkbox from '@mui/material/Checkbox';

const CheckboxField = ({ input: { name, value, onChange, ...restInput }, ...rest }) => (
  <>
    <Checkbox
      {...rest}
      name={name}
      onChange={(event) => {
        return onChange(event.target.checked);
      }}
      inputProps={restInput}
      value={value}
      sx={{
        '& .MuiSvgIcon-root': { fontSize: 28 },
        '&.Mui-checked': {
          color: '#54CB6B'
        }
      }}
    />
  </>
);

CheckboxField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object
};

export default CheckboxField;
