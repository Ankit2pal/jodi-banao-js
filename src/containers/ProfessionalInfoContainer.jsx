import { useDispatch, useSelector } from 'react-redux';
import ProfessionalInfo from '../components/ProfessionalInfo/ProfessionalInfo';
import { onSubmitDetails } from '../redux/modules/completeRegisterationSlice';
import { getOptionsForProfessionalInformation } from '../redux/selectors/registerationDetailsSelector';
import { getPhysicalProfileInfo, getUId } from '../redux/selectors/userRegisterationDetails';
import { getPhysicalProfileInfoInitialValues } from '../utils/formIntialValuesHelper';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const ProfessionalInfoContainer = ({ onNext }) => {
  const dispatch = useDispatch();
  const dropDownOptions = useSelector(getOptionsForProfessionalInformation);
  const response = useSelector(getPhysicalProfileInfo);
  const intialValues = getPhysicalProfileInfoInitialValues(response, dropDownOptions);
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
    <ProfessionalInfo
      dropDownOptions={dropDownOptions}
      intialValues={intialValues}
      formSubmit={formSubmit}
    />
  );
};

export default ProfessionalInfoContainer;

ProfessionalInfoContainer.propTypes = {
  onNext: PropTypes.func
};

ProfessionalInfoContainer.defaultProps = {
  onNext: () => {}
};
