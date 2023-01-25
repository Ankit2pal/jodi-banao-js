import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LandingPageContent } from '../components/LandingPageContent';
import { fetchRegisterationDetails } from '../redux/modules/registerationDetailsSlice';
import {
  getCreatingFor,
  checkIfRegistrationWasSuccess,
  getFormRegisterationMessage
} from '../redux/selectors/registerSelector';
import { callRegisterApi } from '../services/registerApi';
import { getFormattedValuesForRegisteration } from '../utils/registerationHelpers';
import { fetchUserRegisterationDetails } from '../redux/modules/userRegisterationDetails';
import { getStepFlag, isUserActive } from '../redux/selectors/userRegisterationDetails';
import { useNavigate } from 'react-router-dom';

const LandingPageContentContainer = () => {
  const [openTermsAndConditionsModal, setOpenTermsAndConditionsModal] = useState(false);
  const [sBOpen, setSBOpen] = useState(false);
  const [isRegisterActionClicked, setRegisterActionClicked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const creatingForOptionalData = useSelector(getCreatingFor);
  const stepFlag = useSelector(getStepFlag);
  const isActive = useSelector(isUserActive);

  const registerSubmit = async (values) => {
    setRegisterActionClicked(true);
    try {
      const formattedValues = getFormattedValuesForRegisteration({
        values
      });
      let registerResponse = await callRegisterApi(formattedValues);
      const { Data = {} } = registerResponse;
      if (Data?.id) {
        dispatch(fetchUserRegisterationDetails({ userId: Data?.id }));
      }
    } catch (error) {
      return false;
    }
  };

  const handleTermsAndConditionsModalOpen = () => {
    setOpenTermsAndConditionsModal(true);
  };

  const handleTermsAndConditionsModalClose = () => {
    setOpenTermsAndConditionsModal(false);
  };

  useEffect(() => {
    if (stepFlag === 1 && !isActive) {
      navigate('/steps-registration');
    }
  }, [stepFlag, isActive]);

  useEffect(() => {
    dispatch(fetchRegisterationDetails());
  }, []);

  const registerMessage = useSelector(getFormRegisterationMessage);
  const isRegisterSuccess = useSelector(checkIfRegistrationWasSuccess);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setRegisterActionClicked(false);
    setSBOpen(false);
  };

  useEffect(() => {
    if (!isEmpty(registerMessage) && isRegisterActionClicked) {
      setSBOpen(true);
    }
  }, [registerMessage, isRegisterActionClicked]);

  return (
    <LandingPageContent
      isRegisterSuccess={isRegisterSuccess}
      sBOpen={sBOpen}
      statusMessage={registerMessage}
      handleClose={handleClose}
      registerSubmit={registerSubmit}
      handleTermsAndConditionsModalOpen={handleTermsAndConditionsModalOpen}
      handleTermsAndConditionsModalClose={handleTermsAndConditionsModalClose}
      openTermsAndConditionsModal={openTermsAndConditionsModal}
      creatingForOptionalData={creatingForOptionalData}
    />
  );
};

export default LandingPageContentContainer;
