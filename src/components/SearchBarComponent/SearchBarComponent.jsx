import { Box, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Field, Form } from 'react-final-form';
import PropTypes from 'prop-types';
import SearchBarStyles from './SearchBarComponent.module.scss';
import { REGISTER_LABELS } from '../../constants/registerConstants';
import { CitySelectorContainer } from '../../containers/CitySelectorContainer';
import { CountrySelectorContainer } from '../../containers/CountrySelectorContainer';
import { StateSelectorContainer } from '../../containers/StateSelectorContainer';
import { useState } from 'react';
import { OnChange } from 'react-final-form-listeners';
import { CheckboxField, InputAutoCompleteField } from '../../commons';
import { useSelector } from 'react-redux';
import { find, result } from 'lodash';
import { getCountrySelector } from '../../redux/selectors/countrySelector';
import { useEffect } from 'react';

const SearchBarComponent = ({ searchSubmit, creatingForMaritalStatusOptionalData }) => {
  const [cid, setCID] = useState();
  const [sid, setSID] = useState();
  const [did, setDID] = useState();
  const [extra, setExtra] = useState();
  const [onCountryEmpty, setOnCountryEmpty] = useState(false);
  const [onStateEmpty, setStateEmpty] = useState(false);
  console.log(onStateEmpty);
  console.log(did);
  const formDatas = useSelector((state) => state.userRegisterationDetails.data);
  let optionData = [
    { name: 'user', label: 'User', Id: 1 },
    { name: 'vendor', label: 'Vendor', Id: 2 }
  ];
  const newData = (ID, name) => {
    return {
      ID,
      name,
      key: name,
      label: name
    };
  };
  formDatas.RoleId > 3 && optionData.push({ name: 'admin', label: 'Admin', Id: 3 });
  const selectedCountry = newData(
    formDatas?.CountryId,
    result(find(useSelector(getCountrySelector), { Id: formDatas?.CountryId }), 'CountryName', 'Id')
  );
  const selectedState = (CountId, stateId, stateName) => {
    return {
      CountryId: CountId,
      Id: stateId,
      StateorCounty: stateName,
      key: stateName,
      label: stateName
    };
  };

  const selectedCity = (cityName, distId, cityId) => {
    return {
      CityName: cityName,
      DistrictId: distId,
      Id: cityId,
      key: cityName,
      label: cityName
    };
  };

  useEffect(() => {
    setExtra(!extra);
  }, [cid]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <Box as="div" className={SearchBarStyles['box_container']}>
      <Form
        onSubmit={(values) => searchSubmit(values)}
        render={({ handleSubmit, values }) => {
          return (
            <Box as="form" className={SearchBarStyles['box_form_container']}>
              {formDatas?.RoleId == 1 && (
                <Box as="div" className={SearchBarStyles['box_abroad']}>
                  {REGISTER_LABELS.isAbroadLabel}
                  <Field
                    name="isAbroad"
                    size="large"
                    label={REGISTER_LABELS.isAbroadLabel}
                    component={CheckboxField}
                    type="checkbox"
                  />
                </Box>
              )}
              {formDatas?.RoleId > 2 && (
                <Box as="div" className={SearchBarStyles['box_abroad2']}>
                  {REGISTER_LABELS.isAbroadLabel}
                  <Field
                    name="isAbroad"
                    size="large"
                    label={REGISTER_LABELS.isAbroadLabel}
                    component={CheckboxField}
                    type="checkbox"
                  />
                </Box>
              )}
              <Box as="div" className={SearchBarStyles['box_field_container']}>
                <Field
                  name="country"
                  size="small"
                  label={REGISTER_LABELS.countryLabel}
                  component={CountrySelectorContainer}
                  InputValue={formDatas.RoleId === 2 && selectedCountry}
                  disabled={formDatas.RoleId === 2 || values?.isAbroad}
                />
                <OnChange name="country">
                  {(a) => {
                    (values.state = null), (values.city = null), (values.district = null);
                    setCID(a === null ? null : a?.key);
                    a === null ? setOnCountryEmpty(true) : setOnCountryEmpty(false);
                    setSID(null);
                    setDID(null);
                  }}
                </OnChange>
              </Box>
              <Box as="div" className={SearchBarStyles['box_field_container']}>
                <Field
                  size="small"
                  label={REGISTER_LABELS.stateLabel}
                  name="state"
                  component={StateSelectorContainer}
                  onCountryEmpty={onCountryEmpty}
                  countryId={cid}
                  // onStateEmpty={onStateEmpty}
                  InputValue={
                    formDatas.RoleId === 2 &&
                    selectedState(
                      formDatas?.CountryId,
                      formDatas?.state?.Id,
                      formDatas?.state?.Name
                    )
                  }
                />
                <OnChange name="state">
                  {(a) => {
                    (values.city = null), (values.district = null);
                    a === null ? setStateEmpty(true) : setStateEmpty(false);
                    setSID(a?.key);
                    setDID(null);
                  }}
                </OnChange>
              </Box>
              <Box as="div" className={SearchBarStyles['box_field_container']}>
                <Field
                  size="small"
                  label="City"
                  name="city"
                  component={CitySelectorContainer}
                  onCountryEmpty={onCountryEmpty}
                  districtId={sid}
                  countryId={cid}
                  InputValue={
                    formDatas.RoleId === 2 &&
                    selectedCity(
                      formDatas?.city?.Name,
                      formDatas?.district?.Id,
                      formDatas?.city?.Id
                    )
                  }
                />
                <OnChange name="city">{() => {}}</OnChange>
              </Box>
              <Box as="div" className={SearchBarStyles['box_field_container']}>
                <Field
                  size="small"
                  label={REGISTER_LABELS.maritalStatusLabel}
                  name="maritalStatus"
                  options={creatingForMaritalStatusOptionalData}
                  component={InputAutoCompleteField}
                />
              </Box>
              {formDatas?.RoleId > 1 && (
                <Box as="div" className={SearchBarStyles['box_field_container']}>
                  <Field
                    size="small"
                    label="Gender"
                    name="gender"
                    component={InputAutoCompleteField}
                    options={[
                      { name: 'Male', label: 'Male', Id: 1 },
                      { name: 'Female', label: 'Female', Id: 2 }
                    ]}
                  />
                </Box>
              )}
              {formDatas?.RoleId > 2 && (
                <Box as="div" className={SearchBarStyles['box_field_container']}>
                  <Field
                    size="small"
                    label="User Type"
                    name="userType"
                    component={InputAutoCompleteField}
                    options={optionData}
                  />
                </Box>
              )}
              <Box as="div" className={SearchBarStyles['box_button_container']}>
                <Button
                  onClick={handleSubmit}
                  size="small"
                  type="submit"
                  variant="contained"
                  startIcon={<SearchIcon />}
                  className={SearchBarStyles['box_button']}>
                  Search Profiles
                </Button>
              </Box>
            </Box>
          );
        }}
      />
    </Box>
  );
};

SearchBarComponent.propTypes = {
  searchSubmit: PropTypes.func,
  creatingForMaritalStatusOptionalData: PropTypes.func
};

SearchBarComponent.defaultProps = {
  searchSubmit: () => {}
};

export default SearchBarComponent;
