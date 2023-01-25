import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { InputAutoCompleteField } from '../commons';
import { REGION_HEADER_LABELS } from '../constants/regionConstants';
import { getDistricts } from '../services/regionApi';

export const DistrictSelectorContainer = ({ stateId, onCountryEmpty, ...restProps }) => {
  const [districts, setDistricts] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) setLoading(true);
  }, [open]);

  useEffect(() => {
    let active = true;
    if (!loading && open) {
      return undefined;
    }
    const fetchDistricts = async () => {
      if (active && stateId) {
        const districtsResponse = await getDistricts(stateId);
        setDistricts(districtsResponse);
        setLoading(false);
      }
    };
    fetchDistricts();
    return () => {
      active = false;
    };
  }, [stateId, loading]);

  useEffect(() => {
    if (!open) {
      setDistricts([]);
    }
  }, [open]);

  return (
    <InputAutoCompleteField
      label={REGION_HEADER_LABELS.DISTRICT}
      {...restProps}
      options={districts}
      onCountryEmpty={onCountryEmpty}
      loading={loading}
      disabled={stateId ? false : true}
      onOpenField={() => {
        setOpen(true);
      }}
      onCloseField={() => {
        setOpen(false);
      }}
    />
  );
};

DistrictSelectorContainer.propTypes = {
  stateId: PropTypes.number,
  onCountryEmpty: PropTypes.any
};

DistrictSelectorContainer.defaultProps = {
  stateId: 0
};
