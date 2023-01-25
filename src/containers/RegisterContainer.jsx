import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Register from '../components/Register/Register';
import { fetchRegisterationDetails } from '../redux/modules/registerationDetailsSlice';
import { callRegisterApi } from '../services/registerApi';
import { getFormattedValuesForRegisteration } from '../utils/registerationHelpers';
import {
  checkIfRegistrationWasSuccess,
  getCreatingFor,
  getGender,
  getFormRegisterationMessage
} from '../redux/selectors/registerSelector';
import { fetchUserRegisterationDetails } from '../redux/modules/userRegisterationDetails';
import { getStepFlag, isUserActive } from '../redux/selectors/userRegisterationDetails';
import { useNavigate } from 'react-router-dom';
import { getRegisterationDetails } from '../redux/selectors/registerationDetailsSelector';
import SessionStorageHandler from '../utils/SessionStorageHandler';

const RegisterContainer = () => {
  const [openTermsAndConditionsModal, setOpenTermsAndConditionsModal] = useState(false);
  const [sBOpen, setSBOpen] = useState(false);
  const [isRegisterActionClicked, setRegisterActionClicked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sortReg = useSelector((state) => state?.formRegisterationDetails?.groomName);
  const creatingForOptionalData = useSelector(getCreatingFor);
  const creatingForGenderOptionalData = useSelector(getGender);
  const stepFlag = useSelector(getStepFlag);
  const isActive = useSelector(isUserActive);
  const userRegisteration = useSelector(getRegisterationDetails);
  const formDatas = useSelector((state) => state.userRegisterationDetails.data);
  const registerSubmit = async (values) => {
    const { dateOfBirth, ...restValues } = values;
    let dateString = new Date(dateOfBirth);
    setRegisterActionClicked(true);
    try {
      const formattedValues = getFormattedValuesForRegisteration({
        dateOfBirth: dateString,
        ...restValues
      });
      const filterRes = userRegisteration.gender.filter((item) => {
        return item.GenderName === values.gender;
      });
      let GenderId = filterRes[0].Id;
      formattedValues.GenderId = GenderId;
      let registerResponse = await callRegisterApi(formattedValues);
      const { Data = {} } = registerResponse;
      if (Data?.id) {
        SessionStorageHandler.setKeyInStorage('regID', Data?.id);
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
    if (sortReg) {
      navigate('/basic-registration');
    }
  }, [sortReg]);

  useEffect(() => {
    if (stepFlag === 1 && !isActive && formDatas?.RoleId !== 5) {
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
    <Register
      isRegisterSuccess={isRegisterSuccess}
      sBOpen={sBOpen}
      statusMessage={registerMessage}
      handleClose={handleClose}
      registerSubmit={registerSubmit}
      handleTermsAndConditionsModalOpen={handleTermsAndConditionsModalOpen}
      handleTermsAndConditionsModalClose={handleTermsAndConditionsModalClose}
      openTermsAndConditionsModal={openTermsAndConditionsModal}
      creatingForOptionalData={creatingForOptionalData}
      creatingForGenderOptionalData={creatingForGenderOptionalData}
    />
  );
};

export default RegisterContainer;
