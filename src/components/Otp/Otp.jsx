import PropTypes from 'prop-types';
import { Alert, Box, Button, Snackbar } from '@mui/material';
import { Form, Field } from 'react-final-form';
import OtpStyles from './Otp.module.scss';
import { composeValidators, isRequired } from '../../validators';
import { OTP_LABELS } from '../../constants/otpConstants';
import { InputTextField } from '../../commons';
import LoginHeaderContainer from '../../containers/LoginHeaderContainer';
import { FooterDetails } from '../FooterDetails_v2';
import { forwardRef, useEffect } from 'react';

const AlertBox = forwardRef(function SbAlert(props, ref) {
  return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Otp = ({ otpSubmitHandler, handleClose, sBOpen, isSuccess, statusMessage }) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);
  return (
    <>
      <LoginHeaderContainer />
      <Snackbar onClose={handleClose} open={sBOpen} autoHideDuration={2000}>
        <AlertBox
          onClose={handleClose}
          severity={isSuccess ? 'success' : 'error'}
          sx={{ width: '100%' }}>
          {statusMessage}
        </AlertBox>
      </Snackbar>
      <Box>
        <Box className={OtpStyles['box-container']}>
          <h1>{OTP_LABELS.title}</h1>
          <Form
            onSubmit={otpSubmitHandler}
            render={({ handleSubmit }) => (
              <Box as="form" onSubmit={handleSubmit} className={OtpStyles['box-form-container']}>
                <Box as="div">
                  <Field
                    label={`${OTP_LABELS.otp}`}
                    name="otp"
                    component={InputTextField}
                    type="number"
                    className={OtpStyles['otp']}
                    validate={composeValidators(isRequired)}
                  />
                </Box>
                <Box as="div" className={OtpStyles['new-pwd']}>
                  <Button
                    size="large"
                    type="submit"
                    variant="contained"
                    className={OtpStyles['button_forgotpwd']}>
                    {OTP_LABELS.submit}
                  </Button>
                </Box>
              </Box>
            )}></Form>
        </Box>
      </Box>
      <FooterDetails />
    </>
  );
};

Otp.propTypes = {
  otpSubmitHandler: PropTypes.func.isRequired,
  isSuccess: PropTypes.bool,
  sBOpen: PropTypes.bool,
  statusMessage: PropTypes.string,
  handleClose: PropTypes.func
};

Otp.defaultProps = {
  isSuccess: false,
  sBOpen: false,
  statusMessage: '',
  handleClose: () => {}
};

export default Otp;
