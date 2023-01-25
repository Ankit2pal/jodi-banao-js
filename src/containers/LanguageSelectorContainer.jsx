import { useSelector } from 'react-redux';
import { InputAutoCompleteField } from '../commons';
import { REGISTER_LABELS } from '../constants/registerConstants';
import { getLanguage } from '../redux/selectors/registerSelector';

export const LanguageSelectorContainer = (props) => {
  const languages = useSelector(getLanguage);
  return (
    <InputAutoCompleteField label={REGISTER_LABELS.motherTongue} options={languages} {...props} />
  );
};
