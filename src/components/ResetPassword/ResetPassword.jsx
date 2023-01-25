import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { Field, Form } from 'react-final-form';
import Button from '@mui/material/Button';
import ResetPasswordStyles from './ResetPassword.module.scss';
import { InputTextField } from '../../commons';
import { composeValidators, isRequired, ValidatePwd } from '../../validators';
import { RESET_PASSWORD_LABELS } from '../../constants/resetPasswordConstants';
import { Alert, Snackbar } from '@mui/material';
import { forwardRef } from 'react';

const AlertBox = forwardRef(function SbAlert(props, ref) {
  return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ResetPassword = ({
  resetPasswordSubmitHandler,
  handleClose,
  sBOpen,
  isSuccess,
  statusMessage
}) => {
  return (
    <>
      <Snackbar onClose={handleClose} open={sBOpen} autoHideDuration={2000}>
        <AlertBox
          onClose={handleClose}
          severity={isSuccess ? 'success' : 'error'}
          sx={{ width: '100%' }}>
          {statusMessage}
        </AlertBox>
      </Snackbar>
      <Box className={ResetPasswordStyles['box-container']}>
        <h1>{RESET_PASSWORD_LABELS.title}</h1>
        <Form
          onSubmit={resetPasswordSubmitHandler}
          render={({ handleSubmit }) => (
            <Box
              as="form"
              onSubmit={handleSubmit}
              className={ResetPasswordStyles['box-form-container']}>
              <Box as="div">
                <Field
                  label={`${RESET_PASSWORD_LABELS.newPassword}`}
                  name="newPassword"
                  component={InputTextField}
                  type="password"
                  className={ResetPasswordStyles['new-password']}
                  validate={composeValidators(isRequired, ValidatePwd)}
                />
              </Box>
              <Box as="div">
                <Field
                  label={`${RESET_PASSWORD_LABELS.confirmPassword}`}
                  name="confirmPassword"
                  component={InputTextField}
                  type="password"
                  className={ResetPasswordStyles['confirm-password']}
                  validate={composeValidators(isRequired, ValidatePwd)}
                />
              </Box>
              <Box as="div" className={ResetPasswordStyles['new-pwd']}>
                <Button
                  size="large"
                  type="submit"
                  variant="contained"
                  className={ResetPasswordStyles['button_forgotpwd']}>
                  {RESET_PASSWORD_LABELS.update}
                </Button>
              </Box>
            </Box>
          )}></Form>
      </Box>
    </>
  );
};

ResetPassword.propTypes = {
  resetPasswordSubmitHandler: PropTypes.func.isRequired,
  isSuccess: PropTypes.bool,
  sBOpen: PropTypes.bool,
  statusMessage: PropTypes.string,
  handleClose: PropTypes.func
};

ResetPassword.defaultProps = {
  isSuccess: false,
  sBOpen: false,
  statusMessage: '',
  handleClose: () => {}
};

export default ResetPassword;
