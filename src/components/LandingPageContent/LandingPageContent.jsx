import PropTypes from 'prop-types';
import { Alert, Box, Snackbar, Typography } from '@mui/material';
import LandingPageStyles from './LandingPageContent.module.scss';
import { LANDING_PAGE } from '../../constants/landingPageConstants';
import Grid from '@mui/material/Grid';
import { forwardRef } from 'react';
import RegisterForm from '../RegisterForm/RegisterForm';
import TermsAndCondition from '../TermsAndCondition/TermsAndCondition';
import { Modal } from '../../commons';
import { termsAndConditionConstants } from '../../constants/termsAndConditionConstants';

const LandingPageAlert = forwardRef(function SbAlert(props, ref) {
  return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LandingPageContent = ({
  registerSubmit,
  openTermsAndConditionsModal,
  handleTermsAndConditionsModalClose,
  handleTermsAndConditionsModalOpen,
  creatingForOptionalData,
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
      <Box className={LandingPageStyles['box_container']}>
        <Snackbar onClose={handleClose} open={sBOpen} autoHideDuration={2000}>
          <LandingPageAlert
            onClose={handleClose}
            severity={isRegisterSuccess ? 'success' : 'error'}
            sx={{ width: '100%' }}>
            {statusMessage}
          </LandingPageAlert>
        </Snackbar>
        <Grid container className={LandingPageStyles['register-box']}>
          <Grid className={LandingPageStyles['description_box']}>
            <Box
              as="div"
              className={LandingPageStyles['description']}
              style={{ width: '100%', height: '100%' }}>
              <Typography variant={'h4'} className={LandingPageStyles['title']}>
                {LANDING_PAGE.freeRegistrationTitle}
              </Typography>
              <Typography variant={'h6'} className={LandingPageStyles['sub-title']}>
                {LANDING_PAGE.freeRegistrationSubTitle}
              </Typography>
            </Box>
          </Grid>
          <Grid className={LandingPageStyles['form_container']}>
            <RegisterForm
              registerSubmit={registerSubmit}
              handleTermsAndConditionsModalOpen={handleTermsAndConditionsModalOpen}
              creatingForOptionalData={creatingForOptionalData}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

LandingPageContent.propTypes = {
  registerSubmit: PropTypes.func,
  openTermsAndConditionsModal: PropTypes.bool,
  handleTermsAndConditionsModalClose: PropTypes.func,
  handleTermsAndConditionsModalOpen: PropTypes.func,
  creatingForOptionalData: PropTypes.array,
  isRegisterSuccess: PropTypes.bool,
  sBOpen: PropTypes.bool,
  statusMessage: PropTypes.string,
  handleClose: () => {}
};

LandingPageContent.defaultProps = {
  registerSubmit: () => {},
  isRegisterSuccess: false,
  sBOpen: false,
  statusMessage: '',
  handleClose: () => {}
};

export default LandingPageContent;
