import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import TermsAndConditionStyles from './TermsAndCondition.module.scss';
import PropTypes from 'prop-types';

const TermsAndConditionField = ({
  input: { name, value, onChange, ...restInput },
  label,
  meta,
  openModal,
  ...rest
}) => {
  return (
    <>
      <FormControlLabel
        control={
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
        }
        id="terms_and_conditions"
        name="terms_and_conditions"
        label={
          <Typography
            onClick={() => openModal}
            className={
              meta && meta.error && meta.touched
                ? TermsAndConditionStyles['terms_and_conditions_error']
                : TermsAndConditionStyles['terms_conditions']
            }>
            {label}
          </Typography>
        }
      />
    </>
  );
};

TermsAndConditionField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  label: PropTypes.string,
  openModal: PropTypes.func
};

export default TermsAndConditionField;
