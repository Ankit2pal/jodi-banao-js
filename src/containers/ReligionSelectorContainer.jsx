import { useSelector } from 'react-redux';
import { InputAutoCompleteField } from '../commons';
import { REGISTER_LABELS } from '../constants/registerConstants';
import { getReligion } from '../redux/selectors/registerSelector';

export const ReligionSelectorContainer = (props) => {
  const religions = useSelector(getReligion);
  return <InputAutoCompleteField label={REGISTER_LABELS.religion} options={religions} {...props} />;
};
