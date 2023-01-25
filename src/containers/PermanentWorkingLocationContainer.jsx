import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { PermanentWorkingLocation } from '../components/PermanentWorkingLocation';
import { onSubmitDetails } from '../redux/modules/completeRegisterationSlice';
import { getPermanantAndWorkLocationInfo } from '../redux/selectors/userRegisterationDetails';
import { getPermanentWorkingLocationInfoInitialValues } from '../utils/formIntialValuesHelper';
import PropTypes from 'prop-types';
import { getStepFlag, isUserActive, getUId } from '../redux/selectors/userRegisterationDetails';
import { useNavigate } from 'react-router-dom';
import { getCountrySelector } from '../redux/selectors/countrySelector';

const PermanentWorkingLocationContainer = ({ onPrev }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector(getUId);
  const isActive = useSelector(isUserActive);
  const stepFlag = useSelector(getStepFlag);
  const response = useSelector(getPermanantAndWorkLocationInfo);
  const countries = useSelector(getCountrySelector);
  const intialValues = getPermanentWorkingLocationInfoInitialValues(response, countries);
  const formSubmit = (values) => {
    dispatch(onSubmitDetails({ ...values, userId }));
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  useEffect(() => {
    if (stepFlag === 4 && !isActive) {
      navigate('/verify-otp/');
    }
  }, [stepFlag, isActive]);

  return (
    <PermanentWorkingLocation
      initialValues={intialValues}
      goToPrevTab={onPrev}
      formSubmit={formSubmit}
    />
  );
};

export default PermanentWorkingLocationContainer;

PermanentWorkingLocationContainer.propTypes = {
  onPrev: PropTypes.func
};

PermanentWorkingLocationContainer.defaultProps = {
  onPrev: () => {}
};
