import isEmpty from 'lodash/isEmpty';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FooterSmall from '../components/FooterSmall/FooterSmall';
import TopBanner from '../commons/TopBanner/TopBanner';
import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import { getUID } from '../redux/selectors/loginSelector';
import ChangePassword from '../components/ChangePassword/ChangePassword';
import { onChangePasswordSubmit } from '../redux/modules/changePasswordSlice';
import { checkPassChange, getChangeMessage } from '../redux/selectors/changePasswordSelector';
import Container from '@mui/material/Container';
import '../styles/_globals.scss';

const ChangePasswordContainer = () => {
  const [sBOpen, setSBOpen] = useState(false);
  const [isResetPasswordClicked, setResetPasswordClicked] = useState(false);
  const loggedInuserId = useSelector(getUID);
  const dispatch = useDispatch();

  const resetPasswordSubmitHandler = (values) => {
    const newValues = {
      UserId: loggedInuserId,
      OldPassword: values?.oldPassword,
      NewPassword: values?.newPassword
    };
    dispatch(onChangePasswordSubmit(newValues));
    setResetPasswordClicked(true);
  };

  const resetPasswordMessage = useSelector(getChangeMessage);
  const isResetPasswordMessage = useSelector(checkPassChange);

  useEffect(() => {
    if (!isEmpty(resetPasswordMessage) && isResetPasswordClicked) {
      setSBOpen(true);
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
      <DashboardHeader />
      <Container className="main">
        <TopBanner label="Change Password" />
        <ChangePassword
          resetPasswordSubmitHandler={resetPasswordSubmitHandler}
          statusMessage={resetPasswordMessage}
          isSuccess={isResetPasswordMessage}
          sBOpen={sBOpen}
          handleClose={handleClose}
        />
        <FooterSmall />
      </Container>
    </>
  );
};

ChangePasswordContainer.propTypes = {};

export default ChangePasswordContainer;
