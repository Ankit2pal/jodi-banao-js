import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { InputAutoCompleteField } from '../commons';
import { REGION_HEADER_LABELS } from '../constants/regionConstants';
import { getCitiesAPI } from '../services/CountryStateApi';
import { useSelector } from 'react-redux';

export const CitySelectorContainer = ({
  countryId,
  districtId,
  InputValue,
  onCountryEmpty,
  preOption,
  isChange,
  dataUser,
  disabledForExecutive,
  ...restProps
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  useEffect(() => {
    if (open) setLoading(true);
  }, [open]);
  const countries = useSelector((state) => state?.registerationDetails?.country);

  const findCountry = (id, name) => {
    let findCountrys = countries.filter(function (item) {
      return item.id == id;
    });
    if (name) {
      return findCountrys[0]?.iso2;
    } else {
      return findCountrys[0]?.name;
    }
  };

  useEffect(() => {
    let active = true;
    if (!loading && open) {
      return undefined;
    }
    const fetchCities = async () => {
      let cID = countryId;
      if (isChange && countryId === undefined) {
        cID = findCountry(dataUser?.CountryId, 'name');
      }
      if (active && districtId && cID) {
        const citiesResponse = await getCitiesAPI(cID, districtId);
        setCities(citiesResponse);
        setLoading(false);
      }
    };
    fetchCities();
    return () => {
      active = false;
    };
  }, [districtId, countryId, loading]);

  useEffect(() => {
    if (!open) {
      setCities([]);
    }
  }, [open]);

  return (
    <InputAutoCompleteField
      label={REGION_HEADER_LABELS.CITY}
      {...restProps}
      options={preOption?.length > 0 && !isChange ? preOption : cities}
      onCountryEmpty={onCountryEmpty}
      loading={loading}
      value=""
      countryId={countryId}
      disabled={disabledForExecutive && districtId ? true : districtId ? false : true}
      InputValue={districtId ? InputValue : ''}
      onOpenField={() => {
        setOpen(true);
      }}
      onCloseField={() => {
        setOpen(false);
      }}
    />
  );
};

CitySelectorContainer.propTypes = {
  districtId: PropTypes.number,
  countryId: PropTypes.any,
  onCountryEmpty: PropTypes.any,
  InputValue: PropTypes.any,
  preOption: PropTypes.any,
  isChange: PropTypes.any,
  dataUser: PropTypes.any,
  disabledForExecutive: PropTypes.any
};

CitySelectorContainer.defaultProps = {
  districtId: 0,
  InputValue: ''
};
