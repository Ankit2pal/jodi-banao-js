import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegisterationDetails } from '../../redux/modules/registerationDetailsSlice';
import { callRegisterApi } from '../../services/registerApi';
import { getFormattedValuesForRegisteration } from '../../utils/registerationHelpers';
import {
  getCreatingFor,
  getMaritalStatus,
  getFormRegisterationMessage
} from '../../redux/selectors/registerSelector';
import { fetchUserRegisterationDetails } from '../../redux/modules/userRegisterationDetails';
import { getStepFlag, isUserActive } from '../../redux/selectors/userRegisterationDetails';
import { useNavigate } from 'react-router-dom';
import { getRegisterationDetails } from '../../redux/selectors/registerationDetailsSelector';
import SessionStorageHandler from '../../utils/SessionStorageHandler';
import RegisterInfo from './RegisterInfo';

const RegisterinfoContainer = () => {
  const [openTermsAndConditionsModal, setOpenTermsAndConditionsModal] = useState(false);
  const [sBOpen, setSBOpen] = useState(false);
  const [isRegisterActionClicked, setRegisterActionClicked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shortRegDetail = useSelector((state) => state?.formRegisterationDetails);
  const creatingForOptionalData = useSelector(getCreatingFor);
  const creatingForMaritalStatusOptionalData = useSelector(getMaritalStatus);
  const stepFlag = useSelector(getStepFlag);
  const isActive = useSelector(isUserActive);
  const userRegisteration = useSelector(getRegisterationDetails);
  console.log(sBOpen);
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
        return item.GenderName === shortRegDetail?.gender?.GenderName;
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
    if (stepFlag === 1 && !isActive) {
      navigate('/steps-registration');
    }
  }, [stepFlag, isActive]);

  useEffect(() => {
    if (shortRegDetail?.groomName === undefined) {
      navigate('/');
    }
    dispatch(fetchRegisterationDetails());
  }, []);

  const registerMessage = useSelector(getFormRegisterationMessage);

  useEffect(() => {
    if (!isEmpty(registerMessage) && isRegisterActionClicked) {
      setSBOpen(true);
    }
  }, [registerMessage, isRegisterActionClicked]);

  return (
    <RegisterInfo
      creatingForOptionalData={creatingForOptionalData}
      creatingForMaritalStatusOptionalData={creatingForMaritalStatusOptionalData}
      registerSubmit={registerSubmit}
      handleTermsAndConditionsModalOpen={handleTermsAndConditionsModalOpen}
      handleTermsAndConditionsModalClose={handleTermsAndConditionsModalClose}
      openTermsAndConditionsModal={openTermsAndConditionsModal}
    />
  );
};

export default RegisterinfoContainer;
