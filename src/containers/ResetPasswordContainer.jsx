import isEmpty from 'lodash/isEmpty';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ResetPassword } from '../components/ResetPassword';
import {
  checkIfResetPasswordWasSuccess,
  getMessage
} from '../redux/selectors/resetPasswordSelector';
import { onResetPasswordSubmit } from '../redux/modules/resetPasswordSlice';
import FooterSmall from '../components/FooterSmall/FooterSmall';
import TopBanner from '../commons/TopBanner/TopBanner';
import Container from '@mui/material/Container';
import '../styles/_globals.scss';
import { useNavigate } from 'react-router-dom';

const ResetPasswordContainer = () => {
  const navigate = useNavigate();

  const [sBOpen, setSBOpen] = useState(false);
  const [isResetPasswordClicked, setResetPasswordClicked] = useState(false);
  const dispatch = useDispatch();
  const url_string = window.location.href;
  const url = new URL(url_string);
  const userid = url.searchParams.get('userid');
  const UID = url.searchParams.get('UID');
  const resetPasswordSubmitHandler = (values) => {
    const newValues = {
      userid: userid,
      UID: UID,
      password: values.newPassword
    };
    dispatch(onResetPasswordSubmit(newValues));
    setResetPasswordClicked(true);
  };
  const resetPasswordMessage = useSelector(getMessage);
  const isResetPasswordSuccess = useSelector(checkIfResetPasswordWasSuccess);

  useEffect(() => {
    if (!isEmpty(resetPasswordMessage) && isResetPasswordClicked) {
      setSBOpen(true);
      navigate('/');
    }
  }, [resetPasswordMessage, isResetPasswordClicked]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setResetPasswordClicked(false);
    setSBOpen(false);
  };

  return (
    <>
      <Container className="main">
        <TopBanner label="Reset Password" />
        <ResetPassword
          resetPasswordSubmitHandler={resetPasswordSubmitHandler}
          statusMessage={resetPasswordMessage}
          isSuccess={isResetPasswordSuccess}
          sBOpen={sBOpen}
          handleClose={handleClose}
        />
      </Container>
      <FooterSmall />
    </>
  );
};

ResetPasswordContainer.propTypes = {};
export default ResetPasswordContainer;
