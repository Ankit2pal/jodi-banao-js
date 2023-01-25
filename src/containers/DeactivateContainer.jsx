import TopBanner from '../commons/TopBanner/TopBanner';
import { Deactivate } from '../components/Deactivate';
import deactivateConstant from '../constants/deactivateConstants';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDeactivateDetail } from '../redux/modules/deactivateDetailsSlice';
import { getDeactivateTypes } from '../redux/selectors/deactivateDetailsSelector';
import { onDeactivateSubmit } from '../redux/modules/deactivateSlice';
import { getUserRegisterationDetails } from '../redux/selectors/userRegisterationDetails';
import {
  checkIfDeactivateSuccess,
  getDeactivateMessage
} from '../redux/selectors/deactivateSelector';
import { isEmpty } from 'lodash';
import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import Container from '@mui/material/Container';
import '../styles/_globals.scss';
import { resetUserRegisterationDetail } from './../redux/modules/userRegisterationDetails';
import SessionStorageHandler from './../utils/SessionStorageHandler';
import { useNavigate } from 'react-router-dom';
import { onLoginReset } from '../redux/modules/loginHeaderSlice';
import { FooterSmall } from '../components/FooterSmall';

export const DeactivateContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sBOpen, setSBOpen] = useState(false);
  const [isDeactivateClicked, setDeactivateClicked] = useState(false);

  const deactivateMessage = useSelector(getDeactivateMessage);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setDeactivateClicked(false);
    setSBOpen(false);
  };

  const isDeactivateSuccess = useSelector(checkIfDeactivateSuccess);
  const userInfo = useSelector(getUserRegisterationDetails);
  console.log(userInfo?.GUID, 'ankit');

  const deactivateSubmit = (values) => {
    const data = {
      UserId: userInfo?.GUID,
      DeactiveTypeId: values?.deactivateFor?.id,
      DeactiveReason: values.DeactiveReason
    };
    setDeactivateClicked(true);
    dispatch(onDeactivateSubmit(data));
    dispatch(resetUserRegisterationDetail());
    dispatch(onLoginReset());
    SessionStorageHandler.removeItemFromStorage('userId');
    navigate('/');
  };
  useEffect(() => {
    dispatch(fetchDeactivateDetail());
  }, []);

  useEffect(() => {
    if (!isEmpty(deactivateMessage) && isDeactivateClicked) {
      setSBOpen(true);
    }
  }, [deactivateMessage, isDeactivateClicked]);

  const creatingForOptionalData = useSelector(getDeactivateTypes);

  return (
    <>
      <DashboardHeader />
      <Container className="main">
        <TopBanner label={deactivateConstant.title} />
        <Deactivate
          isSuccess={isDeactivateSuccess}
          sBOpen={sBOpen}
          statusMessage={deactivateMessage}
          handleClose={handleClose}
          creatingForOptionalData={creatingForOptionalData}
          deactivateSubmit={deactivateSubmit}
        />
      </Container>
      {/* <FooterDetails /> */}
      <FooterSmall />
    </>
  );
};
