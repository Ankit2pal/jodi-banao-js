import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Alert, Box, Button, Link, Snackbar } from '@mui/material';
import { Field, Form } from 'react-final-form';
import LoginHeaderStyles from './LoginHeader.module.scss';
import {
  composeValidators,
  isRequired,
  isEmailValidLogin,
  MobileValidLogin
} from '../../validators';
import { LOGIN_HEADER_LABELS } from '../../constants/loginConstants';
import { InputTextField, Modal } from '../../commons';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import LockIcon from '@mui/icons-material/Lock';
import LoginForm from '../LoginForm/LoginForm';
import Loader from '../../commons/Loader/Loader';
import Logo from '../../images/logo_v2.png';

const AlertBox = forwardRef(function SbAlert(props, ref) {
  return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LoginHeader = ({
  loginSubmit,
  isSuccess,
  sBOpen,
  statusMessage,
  handleClose,
  forgotPasswordHandler,
  handleOpenModalHandler,
  handleCloseModalHandler,
  openForgotPasswordModal,
  checkEmailExist,
  openLoginModal,
  loginLoader
}) => {
  return (
    <Box className={LoginHeaderStyles['box_container']}>
      {openForgotPasswordModal && (
        <Modal
          id="forgot-password"
          title="Forgot password"
          handleClose={() => handleCloseModalHandler({ label: 'forgot-password' })}
          open={openForgotPasswordModal}
          fullWidth={true}
          maxWidth={'sm'}
          buttons={[]}>
          <ForgotPassword
            forgotPasswordHandler={forgotPasswordHandler}
            showSubmitButton={true}
            checkEmailExist={checkEmailExist}
          />
        </Modal>
      )}
      {loginLoader && <Loader />}

      {openLoginModal && (
        <Modal
          id="login"
          title="Login"
          handleClose={() => handleCloseModalHandler({ label: 'login' })}
          open={true}
          fullWidth={true}
          maxWidth={'sm'}
          buttons={[]}>
          <LoginForm
            loginSubmit={loginSubmit}
            showSubmitButton={true}
            handleCloseModalHandler={() => handleCloseModalHandler({ label: 'login' })}
            handleOpenModalHandler={handleOpenModalHandler}
          />
        </Modal>
      )}

      <Snackbar onClose={handleClose} open={sBOpen} autoHideDuration={2000}>
        <AlertBox
          onClose={handleClose}
          severity={isSuccess ? 'success' : 'error'}
          sx={{ width: '100%' }}>
          {statusMessage()}
        </AlertBox>
      </Snackbar>
      <Box sx={{ display: 'grid' }}>
        <Form
          onSubmit={loginSubmit}
          render={({ handleSubmit }) => (
            <Box as="form" onSubmit={handleSubmit} className={LoginHeaderStyles['box_form']}>
              <Box as="span" className={LoginHeaderStyles['logo_container']}>
                <Box as="a" href="/" className={LoginHeaderStyles['box_logo']}>
                  <Box as="img" src={Logo} className={LoginHeaderStyles['logo']} />
                </Box>
              </Box>
              <Box as="div" className={LoginHeaderStyles['box_info']}>
                <Box className={LoginHeaderStyles['box_username']}>
                  <Field
                    label={LOGIN_HEADER_LABELS.userName}
                    name="EmailId"
                    component={InputTextField}
                    type="text"
                    validate={composeValidators(isRequired, isEmailValidLogin, MobileValidLogin)}
                    size="small"
                  />
                </Box>
                <Box className={LoginHeaderStyles['box_password']}>
                  <Field
                    label={LOGIN_HEADER_LABELS.password}
                    name="PasswordHash"
                    component={InputTextField}
                    type="password"
                    validate={isRequired}
                    size="small"
                  />
                  <Link
                    underline="none"
                    onClick={() => handleOpenModalHandler({ label: 'forgot-password' })}>
                    {LOGIN_HEADER_LABELS.forgotPassword}
                  </Link>
                </Box>
                <Box as="div" className={LoginHeaderStyles['box_button_wrapper']}>
                  <Button
                    size="large"
                    type="submit"
                    variant="contained"
                    className={LoginHeaderStyles['button_login']}>
                    {LOGIN_HEADER_LABELS.login}
                  </Button>
                </Box>
              </Box>
              <Box as="div" className={LoginHeaderStyles['menu_wrapper']}>
                <LockIcon onClick={() => handleOpenModalHandler({ label: 'login' })}></LockIcon>
              </Box>
            </Box>
          )}></Form>
      </Box>
    </Box>
  );
};

LoginHeader.propTypes = {
  loginSubmit: PropTypes.func,
  isSuccess: PropTypes.bool,
  sBOpen: PropTypes.bool,
  statusMessage: PropTypes.func,
  handleClose: PropTypes.func,
  forgotPasswordHandler: PropTypes.func,
  handleOpenModalHandler: PropTypes.func,
  handleCloseModalHandler: PropTypes.func,
  openForgotPasswordModal: PropTypes.bool,
  checkEmailExist: PropTypes.func,
  openLoginModal: PropTypes.bool,
  loginLoader: PropTypes.bool
};

LoginHeader.defaultProps = {
  loginSubmit: () => {},
  isLoginSuccess: false,
  sBOpen: false,
  statusMessage: () => {},
  handleClose: () => {},
  forgotPasswordHandler: () => {},
  openLoginModal: false
};

export default LoginHeader;
