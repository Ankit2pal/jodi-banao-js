import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { InputAutoCompleteField } from '../commons';
import { REGION_HEADER_LABELS } from '../constants/regionConstants';
import { useSelector } from 'react-redux';
import { stateSelector } from '../redux/selectors/registerationDetailsSelector';

export const StateSelectorContainer = ({
  countryId,
  InputValue,
  onStateEmpty,
  onCountryEmpty,
  disabledForExecutive,
  ...restProps
}) => {
  const [open, setOpen] = useState(false);
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(false);
  const stateData = useSelector(stateSelector);
  useEffect(() => {
    if (open) setLoading(true);
  }, [open]);
  useEffect(() => {
    let active = true;
    if (!loading && open) {
      return undefined;
    }
    const fetchStates = async () => {
      if (active && countryId) {
        if (parseInt(countryId) > 0) {
          const filterState = stateData.filter((item) => {
            return item.country_id === countryId;
          });
          setStates(filterState);
        } else if (countryId.length === 2) {
          const filterState = stateData.filter((item) => {
            return item.country_code === countryId;
          });
          setStates(filterState);
        }
        setLoading(false);
      }
    };
    fetchStates();
    return () => {
      active = false;
    };
  }, [countryId, loading]);

  useEffect(() => {
    if (!open) {
      setStates([]);
    }
  }, [open]);

  return (
    <InputAutoCompleteField
      label={REGION_HEADER_LABELS.STATE}
      {...restProps}
      options={states}
      onCountryEmpty={onCountryEmpty}
      onStateEmpty={onStateEmpty}
      loading={loading}
      value=""
      countryId={countryId}
      disabled={disabledForExecutive && countryId ? true : countryId ? false : true}
      InputValue={countryId ? InputValue : ''}
      onOpenField={() => {
        setOpen(true);
      }}
      onCloseField={() => {
        setOpen(false);
      }}
    />
  );
};

StateSelectorContainer.propTypes = {
  countryId: PropTypes.number,
  onCountryEmpty: PropTypes.any,
  onStateEmpty: PropTypes.any,
  InputValue: PropTypes.any,
  disabledForExecutive: PropTypes.any
};

StateSelectorContainer.defaultProps = {
  countryId: 0,
  InputValue: ''
};
