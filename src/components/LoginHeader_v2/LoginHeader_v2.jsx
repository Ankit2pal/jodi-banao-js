import { Alert, Box, Button, Snackbar } from '@mui/material';
import LoginHeaderStyles from './LoginHeader_v2.module.scss';
import Logo from '../../images/logo_v2.png';
import PropTypes from 'prop-types';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import { Modal } from '../../commons';
import LoginForm from '../LoginForm/LoginForm';
import { forwardRef } from 'react';
import Loader from '../../commons/Loader/Loader';
import LockIcon from '@mui/icons-material/Lock';
import HelpIcon from '@mui/icons-material/Help';

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
  login
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
      <Box as="span" className={LoginHeaderStyles['logo_container']}>
        <Box as="a" href="/" className={LoginHeaderStyles['box_logo']}>
          <Box as="img" src={Logo} className={LoginHeaderStyles['logo']} />
        </Box>
      </Box>
      <Snackbar onClose={handleClose} open={sBOpen} autoHideDuration={2000}>
        <AlertBox
          onClose={handleClose}
          severity={isSuccess ? 'success' : 'error'}
          sx={{ width: '100%' }}>
          {statusMessage()}
        </AlertBox>
      </Snackbar>
      {login && <Loader />}
      <Box className={LoginHeaderStyles['login_container']}>
        <Button
          className={LoginHeaderStyles['login_button']}
          onClick={() => handleOpenModalHandler({ label: 'login' })}>
          Login
        </Button>
        <LockIcon onClick={() => handleOpenModalHandler({ label: 'login' })} />
        <Box className={LoginHeaderStyles['help_container']}>
          <Box
            as="span"
            className={LoginHeaderStyles['help_link']}
            onClick={() => handleOpenModalHandler({ label: 'forgot-password' })}>
            Need Assistance?
          </Box>
          <HelpIcon onClick={() => handleOpenModalHandler({ label: 'forgot-password' })} />
        </Box>
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
  login: PropTypes.bool
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
