import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onForgotPasswordSubmit } from '../redux/modules/forgotPasswordSlice';
import { onLoginSubmit } from '../redux/modules/loginHeaderSlice';
import {
  checkIfForgotPasswordWasSuccess,
  getForgotPasswordMessage
} from '../redux/selectors/forgotPasswordSelector';
import { checkIfLoginWasSuccess, getMessage, getUID } from '../redux/selectors/loginSelector';
import { callEmailValidation } from '../services/registerApi';
import {
  fetchUserRegisterationDetails,
  resetUserRegisterationDetail
} from '../redux/modules/userRegisterationDetails';
import { getStepFlag, isUserActive, roleId } from '../redux/selectors/userRegisterationDetails';
import { useNavigate } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { LoginHeader } from '../components/LoginHeader_v2';

const LoginHeaderContainer = () => {
  const [sBOpen, setSBOpen] = useState(false);
  const [isLoginClicked, setLoginClicked] = useState(false);
  const [isForgotPasswordClicked, setForgotPasswordClicked] = useState(false);
  const [openForgotPasswordModal, setOpenForgotPasswordModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [loginSuccessMessage, setLoginSuccessMessage] = useState('');
  const [forgotPasswordSuccessMessage, setForgotPasswordSuccessMessage] = useState('');
  const [login, setLogin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector(getUID);
  const stepFlag = useSelector(getStepFlag);
  const isActive = useSelector(isUserActive);
  const roleIds = useSelector(roleId);
  const loginSubmit = (values) => {
    dispatch(resetUserRegisterationDetail());
    setForgotPasswordSuccessMessage('');
    dispatch(onLoginSubmit(values));
    setLogin(true);
    setLoginClicked(true);
  };

  const loginMessage = useSelector(getMessage);
  const isLoginSuccess = useSelector(checkIfLoginWasSuccess);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setLoginClicked(false);
    setSBOpen(false);
  };

  useEffect(() => {
    dispatch(fetchUserRegisterationDetails({ userId: userId }));
  }, [userId]);

  useEffect(() => {
    setLogin(false);
    if (roleIds === 2 && isActive && loginSuccessMessage) {
      navigate('/vendor-dashboard');
    }
    if (roleIds === 3 && isActive && loginSuccessMessage) {
      navigate('/admin-dashboard');
    }
    if (roleIds === 4 && isActive && loginSuccessMessage) {
      navigate('/super-admin');
    }
    if (roleIds === 5 && isActive && loginSuccessMessage) {
      navigate('/executive-dashboard');
    } else if (!isActive && stepFlag) {
      if (stepFlag === 4) {
        navigate('/verify-otp');
      } else if (stepFlag < 4 && roleIds !== 5) {
        navigate('/steps-registration');
      }
    } else if (isActive && stepFlag) {
      if (stepFlag === 4 && loginSuccessMessage) {
        navigate('/dashboard');
      }
    } else if ((roleIds === 5 || roleIds === 2) && stepFlag === 0 && !isActive) {
      navigate('/verify-otp');
    }
  }, [stepFlag, isActive, roleIds, loginSuccessMessage]);

  useEffect(() => {
    if (!isEmpty(loginMessage) && isLoginClicked) {
      setLoginSuccessMessage(loginMessage);
      setSBOpen(true);
      setLogin(false);
    }
  }, [loginMessage, isLoginClicked]);

  const handleOpenModalHandler = ({ label }) => {
    if (label === 'login') {
      setOpenLoginModal(true);
    } else if (label === 'forgot-password') {
      setOpenForgotPasswordModal(true);
    }
  };

  const handleCloseModalHandler = ({ label }) => {
    if (label === 'login') {
      setOpenLoginModal(false);
    } else if (label === 'forgot-password') {
      setOpenForgotPasswordModal(false);
    }
  };

  const forgotPasswordHandler = (values) => {
    setLoginSuccessMessage('');
    dispatch(onForgotPasswordSubmit(values));
    setForgotPasswordClicked(true);
  };

  const forgotPasswordMessage = useSelector(getForgotPasswordMessage);
  const isForgotPasswordSuccess = useSelector(checkIfForgotPasswordWasSuccess);

  useEffect(() => {
    if (!isEmpty(forgotPasswordMessage) && isForgotPasswordClicked) {
      setSBOpen(true);
      setLogin(false);
      setForgotPasswordSuccessMessage(forgotPasswordMessage);
      setOpenForgotPasswordModal(false);
    }
  }, [forgotPasswordMessage, isForgotPasswordClicked]);

  const checkEmailExist = async (email) => {
    try {
      return await callEmailValidation({ email });
    } catch (error) {
      return false;
    }
  };

  const getStatusMessage = () => {
    if (!isActive && (roleIds === 5 || roleIds === 2) && stepFlag === 1) {
      return 'Account is Deactivated, Please check with Admin';
    } else if (loginSuccessMessage) {
      return loginSuccessMessage;
    } else if (forgotPasswordSuccessMessage) {
      return forgotPasswordSuccessMessage;
    }

    setSBOpen(false);
    return '';
  };

  const getSeverity = () => {
    if (!isActive && roleIds === 5 && stepFlag === 1) {
      return false;
    } else if (isForgotPasswordSuccess && isForgotPasswordClicked) {
      return true;
    } else if (isLoginSuccess && isLoginClicked) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <LoginHeader
      loginSubmit={loginSubmit}
      isSuccess={getSeverity()}
      sBOpen={sBOpen}
      statusMessage={getStatusMessage}
      handleClose={handleClose}
      forgotPasswordHandler={forgotPasswordHandler}
      handleOpenModalHandler={handleOpenModalHandler}
      handleCloseModalHandler={handleCloseModalHandler}
      openForgotPasswordModal={openForgotPasswordModal}
      checkEmailExist={checkEmailExist}
      openLoginModal={openLoginModal}
      login={login}
    />
  );
};
export default LoginHeaderContainer;
