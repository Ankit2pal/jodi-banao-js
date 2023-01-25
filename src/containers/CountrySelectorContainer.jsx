import { useSelector } from 'react-redux';
import { InputAutoCompleteField } from '../commons';
import { REGION_HEADER_LABELS } from '../constants/regionConstants';
import { countrySelector } from '../redux/selectors/registerationDetailsSelector';

export const CountrySelectorContainer = (props) => {
  const country = useSelector(countrySelector);
  return (
    <InputAutoCompleteField
      label={REGION_HEADER_LABELS.COUNTRY}
      // defaultValue={1}
      options={country}
      {...props}
    />
  );
};
