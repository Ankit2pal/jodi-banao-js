import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { InputAutoCompleteField } from '../commons';
import { REGISTER_LABELS } from '../constants/registerConstants';
import { getCastes } from '../services/casteApi';

export const CasteSelectorContainer = ({ religionId, InputValue, ...restProps }) => {
  const [castes, setCastes] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) setLoading(true);
  }, [open]);

  useEffect(() => {
    let active = true;
    if (!loading) {
      return undefined;
    }
    const fetCastes = async () => {
      if (active && religionId) {
        const castesResponse = await getCastes(religionId);
        setCastes(castesResponse);
        setLoading(false);
      }
    };
    fetCastes();
    return () => {
      active = false;
    };
  }, [religionId, loading]);

  useEffect(() => {
    if (!open) {
      setCastes([]);
    }
  }, [open]);

  return (
    <InputAutoCompleteField
      label={REGISTER_LABELS.caste}
      {...restProps}
      options={castes}
      loading={loading}
      disabled={religionId ? false : true}
      InputValue={religionId ? InputValue : ''}
      onOpenField={() => {
        setOpen(true);
      }}
      onCloseField={() => {
        setOpen(false);
      }}
    />
  );
};

CasteSelectorContainer.propTypes = {
  religionId: PropTypes.number,
  InputValue: PropTypes.any
};

CasteSelectorContainer.defaultProps = {
  religionId: 0,
  InputValue: ''
};
