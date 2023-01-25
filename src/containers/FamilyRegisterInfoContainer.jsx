import { useDispatch, useSelector } from 'react-redux';
import FamilyRegisterInfo from '../components/FamilyInfo/FamilyRegisterInfo';
import { onSubmitDetails } from '../redux/modules/completeRegisterationSlice';
import { getDropDownOptionsForFamilyRegister } from '../redux/selectors/registerationDetailsSelector';
import {
  getFamilyAndPartnerPreferanceInfo,
  getUId
} from '../redux/selectors/userRegisterationDetails';
import { getFamilyRegistrationInfoInitialValues } from '../utils/formIntialValuesHelper';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const FamilyRegisterInfoContainer = ({ onNext, onPrev }) => {
  const dropDownOptions = useSelector(getDropDownOptionsForFamilyRegister);
  const response = useSelector(getFamilyAndPartnerPreferanceInfo);
  const intialValues = getFamilyRegistrationInfoInitialValues(response, dropDownOptions);
  const dispatch = useDispatch();
  const userId = useSelector(getUId);
  const formSubmit = (values) => {
    dispatch(onSubmitDetails({ ...values, userId }));
    onNext();
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <FamilyRegisterInfo
      dropDownOptions={dropDownOptions}
      intialValues={intialValues}
      formSubmit={formSubmit}
      goToPrevTab={onPrev}
    />
  );
};

export default FamilyRegisterInfoContainer;

FamilyRegisterInfoContainer.propTypes = {
  onNext: PropTypes.func,
  onPrev: PropTypes.func
};

FamilyRegisterInfoContainer.defaultProps = {
  onNext: () => {},
  onPrev: () => {}
};
