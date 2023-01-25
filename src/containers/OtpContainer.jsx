import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Otp } from '../components/Otp';
import { getUId } from '../redux/selectors/userRegisterationDetails';
import { callverifyOtpApi, callSendOtpApi } from '../services/otpService';
import { useNavigate } from 'react-router-dom';

const OtpContainer = () => {
  const navigate = useNavigate();
  const [sBOpen, setSBOpen] = useState(false);
  const [otpReq, setOtpReq] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isReqSuccess, setIsReqSuccess] = useState(false);

  const UID = useSelector(getUId);
  const otpSubmitHandler = async (values) => {
    clearAlertMessage();
    try {
      const OtpSubmitResponse = await callverifyOtpApi(UID, values.otp);
      setAlertResponse(OtpSubmitResponse);
      const { Status } = OtpSubmitResponse;
      if (Status === 'success') {
        navigate('/dashboard');
      }
    } catch (error) {
      const message = error.response.data.Message || 'Something went wrong';
      setIsReqSuccess(false);
      setAlertMessage(message);
    } finally {
      setSBOpen(true);
    }
  };

  useEffect(() => {
    if (!otpReq) {
      sendOtp();
      setOtpReq(true);
    }
  }, [otpReq]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const sendOtp = async () => {
    try {
      const sendOtpResponse = await callSendOtpApi(UID);
      setAlertResponse(sendOtpResponse);
    } catch (error) {
      const message = error.response.data.Message || 'Something went wrong';
      setIsReqSuccess(false);
      setAlertMessage(message);
    } finally {
      setSBOpen(true);
    }
  };

  const setAlertResponse = (response) => {
    const { Message, Data } = response;
    setIsReqSuccess(Data?.id ? true : false);
    setAlertMessage(Message);
  };

  const clearAlertMessage = () => {
    setAlertMessage('');
    setIsReqSuccess('');
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    // setOtpClicked(false);
    setSBOpen(false);
  };

  return (
    <Otp
      otpSubmitHandler={otpSubmitHandler}
      statusMessage={alertMessage}
      isSuccess={isReqSuccess}
      sBOpen={sBOpen}
      handleClose={handleClose}
    />
  );
};

export default OtpContainer;
