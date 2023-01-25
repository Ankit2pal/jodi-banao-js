import PropTypes from 'prop-types';
import { Alert, Box, Snackbar } from '@mui/material';
import RegisterStyles from './Register.module.scss';
import { REGISTER_LABELS } from '../../constants/registerConstants';
import { Modal } from '../../commons';
import Grid from '@mui/material/Grid';
import { forwardRef } from 'react';
import TermsAndCondition from '../TermsAndCondition/TermsAndCondition';
import RegisterForm from '../RegisterForm/RegisterForm';
import { termsAndConditionConstants } from '../../constants/termsAndConditionConstants';
const RegisterAlert = forwardRef(function SbAlert(props, ref) {
  return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Register = ({
  registerSubmit,
  openTermsAndConditionsModal,
  handleTermsAndConditionsModalClose,
  handleTermsAndConditionsModalOpen,
  creatingForOptionalData,
  creatingForGenderOptionalData,
  isRegisterSuccess,
  sBOpen,
  statusMessage,
  handleClose
}) => {
  return (
    <>
      <Modal
        id="terms-and-condition"
        title="Terms And Conditions"
        handleClose={handleTermsAndConditionsModalClose}
        open={openTermsAndConditionsModal}
        fullWidth={true}
        maxWidth={'sm'}
        buttons={[
          {
            id: 'terms-and-condition-id',
            label: 'Agree',
            handler: handleTermsAndConditionsModalClose,
            isDisabled: false,
            className: ''
          }
        ]}>
        <TermsAndCondition conditionData={termsAndConditionConstants.data} />
      </Modal>
      <Box className={RegisterStyles['box_container']}>
        <Snackbar onClose={handleClose} open={sBOpen} autoHideDuration={2000}>
          <RegisterAlert
            onClose={handleClose}
            severity={isRegisterSuccess ? 'success' : 'error'}
            sx={{ width: '100%' }}>
            {statusMessage}
          </RegisterAlert>
        </Snackbar>
        <Grid className={RegisterStyles['box_background_image']}>
          <Box as="div" className={RegisterStyles['basic_register_box']}>
            <Box as="span" className={RegisterStyles['register_description']}>
              {REGISTER_LABELS.registerDescription}
            </Box>
            {/*<Box as="p" className={RegisterStyles['reg_btn_box']}>
               <Button
                size="large"
                type="submit"
                variant="contained"
                className={RegisterStyles['reg_now_btn']}>
                <label>Register Now</label>
              </Button> 
            </Box>*/}
            <Grid item xs={10} className={RegisterStyles['register_form']}>
              <RegisterForm
                registerSubmit={registerSubmit}
                handleTermsAndConditionsModalOpen={handleTermsAndConditionsModalOpen}
                creatingForOptionalData={creatingForOptionalData}
                creatingForGenderOptionalData={creatingForGenderOptionalData}
              />
            </Grid>
          </Box>
        </Grid>
      </Box>
    </>
  );
};

Register.propTypes = {
  registerSubmit: PropTypes.func,
  openTermsAndConditionsModal: PropTypes.bool,
  handleTermsAndConditionsModalClose: PropTypes.func,
  handleTermsAndConditionsModalOpen: PropTypes.func,
  creatingForOptionalData: PropTypes.array,
  isRegisterSuccess: PropTypes.bool,
  sBOpen: PropTypes.bool,
  statusMessage: PropTypes.string,
  creatingForGenderOptionalData: PropTypes.any,
  handleClose: () => {}
};

Register.defaultProps = {
  registerSubmit: () => {},
  isRegisterSuccess: false,
  sBOpen: false,
  statusMessage: '',
  handleClose: () => {}
};

export default Register;
