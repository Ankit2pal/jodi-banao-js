import React, { useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import PropTypes from 'prop-types';
import { Container, Box, Button, Grid } from '@mui/material';
import ProfesInfo from './familyinfo.module.scss';
import { OnChange } from 'react-final-form-listeners';
import { InputAutoCompleteField, InputTextField } from '../../commons';
import Physicalreg from '../PhysicalRegister/PhysicalRegister.module.scss';
import { STEPS_LABELS } from '../../constants/stepsConsntants';
import { CountrySelectorContainer } from '../../containers/CountrySelectorContainer';
import { StateSelectorContainer } from '../../containers/StateSelectorContainer';
import { CitySelectorContainer } from '../../containers/CitySelectorContainer';
import { isRequired } from '../../validators';
import { useSelector } from 'react-redux';
import InputAutoCompleteFieldCategory from '../../commons/InputAutoCompleteField/InputAutoCompleteFieldCategory';
import { getUserRegisterationDetails } from '../../redux/selectors/userRegisterationDetails';
import { getCitiesAPI } from '../../services/CountryStateApi';

const FamilyRegisterInfo = ({ dropDownOptions, intialValues, formSubmit, goToPrevTab }) => {
  const [ci, setCI] = useState();
  const [si, setSI] = useState();
  const [di, setDI] = useState();
  const userInfo = useSelector(getUserRegisterationDetails);
  console.log(di);
  const newData = (ID, name) => {
    return {
      ID,
      name,
      key: name,
      label: name
    };
  };

  const {
    familyTypes,
    familyStatus,
    stars,
    employeeTypes,
    highestEducation,
    annualIncomes,
    occupations
  } = dropDownOptions;

  const countries = useSelector((state) => state?.registerationDetails?.country);
  const findCountry = (id, name) => {
    let findCountrys = countries?.filter(function (item) {
      return item.id == id;
    });
    if (name) {
      return findCountrys[0]?.iso2;
    } else {
      return findCountrys[0]?.name;
    }
  };
  const state = useSelector((state) => state?.registerationDetails?.state);
  const findState = (id, name) => {
    let states = state.filter(function (item) {
      return item.id == id;
    });
    if (name) {
      return states[0]?.iso2;
    } else {
      return states[0]?.name;
    }
  };

  const selectedState = (CountId, stateId) => {
    let sname = findState(stateId);
    return {
      CountryId: CountId,
      Id: stateId,
      StateorCounty: sname,
      key: sname,
      label: sname
    };
  };

  const [preCity, setPreCity] = useState({});
  const [change, setChange] = useState(false);

  useEffect(() => {
    selectedCity(
      userInfo?.partnerpreferance?.CountryId,
      userInfo?.partnerpreferance?.StateId,
      userInfo?.partnerpreferance?.CityId
    ).then((res) => {
      setPreCity(res);
    });
  }, [
    userInfo?.partnerpreferance?.CountryId,
    userInfo?.partnerpreferance?.StateId,
    userInfo?.partnerpreferance?.CityId
  ]);

  const selectedCity = async (CountryId, StateId, city) => {
    let countryIso = findCountry(CountryId, 'name');
    let stateIso = findState(StateId, 'name');
    let cityInfo = await getCitiesAPI(countryIso, stateIso);
    let cityDetail = [];
    if (cityInfo) {
      cityDetail = cityInfo.filter(function (item) {
        return item.id == city;
      });
    }
    return {
      name: cityDetail[0]?.name,
      id: cityDetail[0]?.id,
      key: cityDetail[0]?.name,
      label: cityDetail[0]?.name,
      option: cityInfo
    };
  };
  const CountrySelected = newData(
    userInfo?.partnerpreferance?.CountryId,
    findCountry(userInfo?.partnerpreferance?.CountryId)
  );

  return (
    <>
      <Form
        onSubmit={formSubmit}
        initialValues={intialValues}
        validate={(values) => {
          const errors = {};
          if (values.noOfBrothers < 0) {
            errors.noOfBrothers = 'Required';
          }
          if (values.noOfSisters < 0) {
            errors.noOfSisters = 'Required';
          }
          if (values.noOfBrothers > 10) {
            errors.noOfBrothers = 'Max 10 allowed';
          }
          if (values.noOfSisters > 10) {
            errors.noOfSisters = 'Max 10 allowed';
          }
          return errors;
        }}
        render={({ handleSubmit, values }) => {
          return (
            <Container className={Physicalreg['box_form']}>
              <Box as="form" onSubmit={handleSubmit}>
                <p className={Physicalreg['text-hed']}>Family Details</p>
                <Grid container spacing={2} className={ProfesInfo['proInf-sz']}>
                  <Grid item xs={12} md={6}>
                    <Box className={Physicalreg['proInf-bg']}>
                      <Field
                        label={STEPS_LABELS.familyType}
                        name="familyType"
                        options={familyTypes}
                        component={InputAutoCompleteField}
                        validate={isRequired}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box className={Physicalreg['proInf-bg']}>
                      <Field
                        label={STEPS_LABELS.familyStatus}
                        name="familyStatus"
                        options={familyStatus}
                        component={InputAutoCompleteField}
                        validate={isRequired}
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={2} className={ProfesInfo['proInf-sz']}>
                  <Grid item xs={12} md={6}>
                    <Box className={Physicalreg['proInf-bg']}>
                      <Field
                        label={STEPS_LABELS.fatherSurname}
                        name="fatherSurname"
                        type="text"
                        component={InputTextField}
                        validate={isRequired}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box className={Physicalreg['proInf-bg']}>
                      <Field
                        label={STEPS_LABELS.fatherName}
                        name="fatherName"
                        type="text"
                        component={InputTextField}
                        validate={isRequired}
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={2} className={ProfesInfo['proInf-sz']}>
                  <Grid item xs={12} md={6}>
                    <Box className={Physicalreg['proInf-bg']}>
                      <Field
                        label={STEPS_LABELS.fatherOccupation}
                        name="fatherOccupation"
                        type="text"
                        component={InputAutoCompleteFieldCategory}
                        options={occupations}
                        optionLabel={'OccupationName'}
                        validate={isRequired}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box className={Physicalreg['proInf-bg']}>
                      <Field
                        label={STEPS_LABELS.motherSurname}
                        name="motherSurname"
                        type="text"
                        component={InputTextField}
                        validate={isRequired}
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={2} className={ProfesInfo['proInf-sz']}>
                  <Grid item xs={12} md={6}>
                    <Box className={Physicalreg['proInf-bg']}>
                      <Field
                        label={STEPS_LABELS.motherName}
                        name="motherName"
                        type="text"
                        component={InputTextField}
                        validate={isRequired}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box className={Physicalreg['proInf-bg']}>
                      <Field
                        label={STEPS_LABELS.motherOccupation}
                        name="motherOccupation"
                        type="text"
                        component={InputAutoCompleteFieldCategory}
                        options={occupations}
                        optionLabel={'OccupationName'}
                        validate={isRequired}
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={2} className={ProfesInfo['proInf-sz']}>
                  <Grid item xs={12} md={6}>
                    <Box className={Physicalreg['proInf-bg']}>
                      <Field
                        label={STEPS_LABELS.noOfBrothers}
                        name="noOfBrothers"
                        InputProps={{ inputProps: { min: 0, max: 10, type: 'number' } }}
                        component={InputTextField}
                        validate={isRequired}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box className={Physicalreg['proInf-bg']}>
                      <Field
                        label={STEPS_LABELS.noOfSisters}
                        name="noOfSisters"
                        InputProps={{ inputProps: { min: 0, max: 10, type: 'number' } }}
                        component={InputTextField}
                        validate={isRequired}
                      />
                    </Box>
                  </Grid>
                </Grid>
                <p className={Physicalreg['text-hed']}>Partner Preferences</p>
                <Grid container spacing={2} className={ProfesInfo['proInf-sz']}>
                  <Grid item xs={12} md={6}>
                    <Box className={Physicalreg['proInf-bg']}>
                      <Field
                        label={STEPS_LABELS.star}
                        name="star"
                        options={stars}
                        component={InputAutoCompleteField}
                        validate={isRequired}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box className={Physicalreg['proInf-bg']}>
                      <Field
                        label={STEPS_LABELS.highestEducation}
                        name="highestEducationPartner"
                        options={highestEducation}
                        optionLabel={'EducationName'}
                        component={InputAutoCompleteFieldCategory}
                        validate={isRequired}
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={2} className={ProfesInfo['proInf-sz']}>
                  <Grid item xs={12} md={6}>
                    <Box className={Physicalreg['proInf-bg']}>
                      <Field
                        label={STEPS_LABELS.employmentType}
                        name="employmentTypePartner"
                        options={employeeTypes}
                        component={InputAutoCompleteField}
                        validate={isRequired}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box className={Physicalreg['proInf-bg']}>
                      <Field
                        label={STEPS_LABELS.occupation}
                        name="occupationPartner"
                        options={occupations}
                        component={InputAutoCompleteFieldCategory}
                        optionLabel={'OccupationName'}
                        validate={isRequired}
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={2} className={ProfesInfo['proInf-sz']}>
                  <Grid item xs={12} md={6}>
                    <Box className={Physicalreg['proInf-bg']}>
                      <Field
                        label={STEPS_LABELS.annualIncome}
                        name="annualIncomPartner"
                        options={annualIncomes}
                        component={InputAutoCompleteField}
                        validate={isRequired}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box className={Physicalreg['proInf-bg']}>
                      <Field
                        label="Country"
                        name="Country"
                        component={CountrySelectorContainer}
                        initialValue={
                          userInfo?.partnerpreferance?.CountryId &&
                          ci == null &&
                          (values.Country == null || values.Country == '')
                            ? CountrySelected
                            : values.Country || ''
                        }
                        InputValue={values?.Country}
                        validate={isRequired}
                      />
                      <OnChange name="Country">
                        {(a) => {
                          (values.State = ''),
                            (values.City = ''),
                            (values.District = ''),
                            setCI(a?.key);
                          setChange(true);
                          setSI(null);
                          setDI(null);
                        }}
                      </OnChange>
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={2} className={ProfesInfo['proInf-sz']}>
                  <Grid item xs={12} md={6}>
                    <Box className={Physicalreg['proInf-bg']}>
                      <Field
                        label="State"
                        name="State"
                        validate={isRequired}
                        component={StateSelectorContainer}
                        countryId={
                          ci == null &&
                          values.State !== '' &&
                          userInfo?.partnerpreferance?.CountryId
                            ? userInfo?.partnerpreferance?.CountryId
                            : ci
                        }
                        initialValue={
                          userInfo?.StateId &&
                          si == null &&
                          (values.State == null || values.State == '')
                            ? selectedState(
                                userInfo?.partnerpreferance?.CountryId,
                                userInfo?.partnerpreferance?.StateId
                              )
                            : values?.State || ''
                        }
                        InputValue={values.State}
                      />
                      <OnChange name="State">
                        {(a) => {
                          (values.City = ''), (values.District = ''), setSI(a?.key);
                          setChange(true);
                          setDI(null);
                        }}
                      </OnChange>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box className={Physicalreg['proInf-bg']}>
                      {(preCity.name || values.State !== null) && (
                        <Field
                          label="City"
                          name="City"
                          component={CitySelectorContainer}
                          countryId={ci}
                          districtId={
                            si == null && values.City !== '' && userInfo?.partnerpreferance?.StateId
                              ? userInfo?.partnerpreferance?.StateId
                              : si
                          }
                          isChange={change}
                          initialValue={
                            userInfo?.CityId &&
                            si == null &&
                            (values.City == null || values.City == '')
                              ? preCity
                              : values.City || ''
                          }
                          InputValue={preCity?.name}
                          dataUser={userInfo}
                          validate={isRequired}
                          preOption={preCity?.option}
                        />
                      )}
                    </Box>
                  </Grid>
                </Grid>
                <Grid container direction="row" className={Physicalreg['btn-hldr']}>
                  <Box as="div" className={Physicalreg['dot-prv-btn']}>
                    <Button
                      size="large"
                      type="button"
                      onClick={goToPrevTab}
                      variant="contained"
                      className={Physicalreg['prv-btn']}>
                      previous
                    </Button>
                  </Box>
                  <Box as="div" className={Physicalreg['dot-nxt-btn']}>
                    <Button
                      size="large"
                      type="submit"
                      variant="contained"
                      className={Physicalreg['nxt-btn']}>
                      next
                    </Button>
                  </Box>
                </Grid>
              </Box>
            </Container>
          );
        }}
      />
    </>
  );
};

export default FamilyRegisterInfo;

FamilyRegisterInfo.propTypes = {
  dropDownOptions: PropTypes.shape({
    familyTypes: PropTypes.array,
    familyStatus: PropTypes.array,
    stars: PropTypes.array,
    highestEducation: PropTypes.array,
    occupations: PropTypes.array,
    employeeTypes: PropTypes.array,
    annualIncomes: PropTypes.array
  }),
  intialValues: PropTypes.object,
  formSubmit: PropTypes.func,
  goToPrevTab: PropTypes.func
};

FamilyRegisterInfo.defaultProps = {
  dropDownOptions: {
    familyTypes: [],
    familyStatus: [],
    stars: [],
    highestEducation: [],
    occupations: [],
    employeeTypes: [],
    annualIncomes: []
  },
  intialValues: {},
  formSubmit: () => {},
  goToPrevTab: () => {}
};
