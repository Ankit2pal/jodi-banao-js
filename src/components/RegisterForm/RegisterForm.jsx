import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import RegisterFormStyles from './RegisterForm.module.scss';
import { BasicRegister } from '../BasicRegistration';

const MAX_AGE = new Date();
MAX_AGE.setFullYear(MAX_AGE.getFullYear() - 18);
const RegisterForm = ({ registerSubmit, creatingForGenderOptionalData }) => {
  return (
    <Grid className={RegisterFormStyles['box_form']}>
      <BasicRegister
        creatingForGenderOptionalData={creatingForGenderOptionalData}
        registerSubmit={registerSubmit}
      />
    </Grid>
  );
};

RegisterForm.propTypes = {
  registerSubmit: PropTypes.func,
  handleTermsAndConditionsModalOpen: PropTypes.func,
  creatingForOptionalData: PropTypes.array,
  creatingForGenderOptionalData: PropTypes.any
};

RegisterForm.defaultProps = {
  registerSubmit: () => {}
};

export default RegisterForm;
