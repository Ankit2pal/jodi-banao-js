import PropTypes from 'prop-types';
import React, { forwardRef, useEffect } from 'react';
import { Button, Container, Grid, Snackbar, Alert } from '@mui/material';
import CustomAccordian from '../../commons/accordion';
import HelpStyles from './edit.module.scss';
import { editConstants } from '../../constants/editConstants ';
import { Field, Form } from 'react-final-form';
import { InputAutoCompleteField, InputTextField } from '../../commons';
import { OnChange } from 'react-final-form-listeners';
import { useSelector, useDispatch } from 'react-redux';
import {
  getOptionsForProfessionalInformation,
  getDropDownOptionsForFamilyRegister
} from '../../redux/selectors/registerationDetailsSelector';
import { fetchEditProfile } from '../../redux/modules/editProfileSlice';
import { PostalCodeContainer } from '../../containers/PostalCodeContainer';
import { getFormattedValuesForEditProfile } from '../../utils/edditProfile';
import { CountrySelectorContainer } from '../../containers/CountrySelectorContainer';
import { StateSelectorContainer } from '../../containers/StateSelectorContainer';
import { CitySelectorContainer } from '../../containers/CitySelectorContainer';
import { CasteSelectorContainer } from '../../containers/CasteSelectorContainer';
import { ReligionSelectorContainer } from '../../containers/ReligionSelectorContainer';
import { LanguageSelectorContainer } from '../../containers/LanguageSelectorContainer';
import { find, result } from 'lodash';
import { getMaritalStatus, getReligion } from '../../redux/selectors/registerSelector';
import { useState } from 'react';
import { isRequired, isWeight } from '../../validators';
import { useLocation } from 'react-router-dom';
import { getUserRegisterationDetailsApi } from '../../services/userRegisterationDetailsApi';
import { getUID } from '../../redux/selectors/loginSelector';
import Loader from '../../commons/Loader/Loader';
import { getCitiesAPI } from '../../services/CountryStateApi';
import EditExecutive from '../EditExecutive/EditExecutive';
import InputAutoCompleteFieldCategory from '../../commons/InputAutoCompleteField/InputAutoCompleteFieldCategory';
import autoFillValueForDropdown from '../../utils/autoFillDropdownHelper';

if (process.env.NODE_ENV == 'development') {
  const noop = () => {};
  [
    'assert',
    'clear',
    'count',
    'debug',
    'dir',
    'dirxml',
    'error',
    'exception',
    'group',
    'groupCollapsed',
    'groupEnd',
    'info',
    'markTimeline',
    'profile',
    'profileEnd',
    'table',
    'time',
    'timeEnd',
    'timeline',
    'timelineEnd',
    'timeStamp',
    'trace',
    'warn'
  ].forEach((method) => {
    window.console[method] = noop;
  });
}

const Edit = ({ creatingForMaritalStatusOptionalData }) => {
  const dispatch = useDispatch();
  const onSubmitSuccess = useSelector((state) => state.editProfile.data.Status);
  const [formDatas, setFormDatas] = useState(null);
  const [fieldEmpty, setFieldEmpty] = useState('');
  const [postalCode, setPostalCode] = useState();
  const [postalIntial, setPostalIntial] = useState({});
  console.log(postalIntial);
  console.log(postalIntial);

  const resetfieldEmpty = () => {
    setFieldEmpty('');
  };

  useEffect(() => {
    resetfieldEmpty();
  }, [fieldEmpty]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  let location = useLocation();
  const editedUserId = location.pathname.split('/')[2];
  useEffect(() => {
    getuserInfo();
  }, []);

  const getuserInfo = async () => {
    const profileDetailsResponse = await getUserRegisterationDetailsApi(editedUserId);
    setFormDatas(profileDetailsResponse);
    setPostalCode(profileDetailsResponse?.PostalCode);
  };
  const [open, setOpen] = React.useState(false);
  const [validationOpen, setValidationOpen] = React.useState(false);
  console.log(validationOpen);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [hidePostal, setHidePotsal] = useState(true);

  const dropDownOptions = useSelector(getOptionsForProfessionalInformation);
  const dropDownFamilyOptions = useSelector(getDropDownOptionsForFamilyRegister);
  const { familyTypes, familyStatus } = dropDownFamilyOptions;
  const { stars } = dropDownFamilyOptions;
  const {
    language,
    bodyTypes,
    complexions,
    physicalStatus,
    highestEducation,
    occupations,
    employeeTypes,
    annualIncomes,
    heights
  } = dropDownOptions;

  const newData = (ID, name) => {
    return {
      ID,
      name,
      key: name,
      label: name
    };
  };
  const name = formDatas?.FullName;
  const postal = useSelector((state) => state?.userRegisterationDetails?.data?.PostalCode);
  console.log(postal);

  const countries = useSelector((state) => state?.registerationDetails?.country);
  const state = useSelector((state) => state?.registerationDetails?.state);
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

  const CountrySelected = newData(formDatas?.CountryId, findCountry(formDatas?.CountryId));

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

  const religionName = newData(
    formDatas?.ReligionId,
    result(find(useSelector(getReligion), { Id: formDatas?.ReligionId }), 'ReligionName', 'Id')
  );

  const setMaritalStatus = newData(
    formDatas?.MaritalStatusId,
    result(
      find(useSelector(getMaritalStatus), { Id: formDatas?.MaritalStatusId }),
      'MaritalStatusName',
      'Id'
    )
  );
  // const religionId = formDatas?.ReligionId;
  const selecTedLang = newData(
    formDatas?.Languageid,
    result(find(language, { Id: formDatas?.Languageid }), 'LanguageName', 'Id')
  );
  const selectedCaste = {
    CastName: formDatas?.caste?.Name,
    Id: formDatas?.caste?.Id,
    ReligionId: formDatas?.ReligionId,
    key: formDatas?.caste?.Name,
    label: formDatas?.caste?.Name
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

  const selectedbodyType = newData(
    formDatas?.physicalprofileinfo?.BodyTypeId,
    result(find(bodyTypes, { Id: formDatas?.physicalprofileinfo?.BodyTypeId }), 'BodyTypeName')
  );

  const selectedPhysicalStatus = newData(
    formDatas?.physicalprofileinfo?.PhysicalStatusId,
    result(
      find(physicalStatus, { Id: formDatas?.physicalprofileinfo?.PhysicalStatusId }),
      'PhysicalStatusName'
    )
  );
  const selectedEmpType = newData(
    formDatas?.physicalprofileinfo?.EmploymentTypeId,
    result(
      find(employeeTypes, { Id: formDatas?.physicalprofileinfo?.EmploymentTypeId }),
      'EmploymentTypeName'
    )
  );
  const selectedAnnualIncome = newData(
    formDatas?.physicalprofileinfo?.AnnualIncomeId,
    result(
      find(annualIncomes, { Id: formDatas?.physicalprofileinfo?.AnnualIncomeId }),
      'AnnualIncomeName'
    )
  );

  const selectedComplexion = newData(
    formDatas?.physicalprofileinfo?.ComplexionId,
    result(
      find(complexions, { Id: formDatas?.physicalprofileinfo?.ComplexionId }),
      'ComplexionName'
    )
  );
  const selectedStar = newData(
    formDatas?.partnerpreferance?.StarId,
    result(find(stars, { Id: formDatas?.partnerpreferance?.StarId }), 'StarsName')
  );

  const worksAddressCountry = newData(
    formDatas?.workasddress?.CountryId,
    findCountry(formDatas?.workasddress?.CountryId)
  );
  const partnerPreferenceCountry = newData(
    formDatas?.partnerpreferance?.CountryId,
    findCountry(formDatas?.partnerpreferance?.CountryId)
  );
  const permanentCountry = newData(
    formDatas?.permanantaddress?.CountryId,
    findCountry(formDatas?.permanantaddress?.CountryId)
  );

  const getGeneralInformation = (values) => {
    const [ci, setCI] = useState();
    const [si, setSI] = useState();
    const [di, setDI] = useState();
    const [religionId, setReligionId] = useState();
    const [preCity, setPreCity] = useState({});
    const [change, setChange] = useState(false);
    let emptyCheck = false;
    for (let [value] of Object.entries(values)) {
      console.log(di);
      if (value === null) {
        setFieldEmpty(true);
        emptyCheck = true;
      }
      if (values?.brotherNum < 0 || values?.sisterNum < 0) {
        setFieldEmpty(true);
        emptyCheck = true;
      }
    }
    if (!emptyCheck) {
      setFieldEmpty('');
    }

    useEffect(() => {
      selectedCity(formDatas?.CountryId, formDatas?.StateId, formDatas?.CityId).then((res) => {
        setPreCity(res);
      });
    }, [formDatas?.CountryId, formDatas?.StateId, formDatas?.CityId]);
    return (
      <>
        {/* <PostalCodeContainer postalIntial={postalIntial} /> */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label=" FullName"
              name="FullName"
              component={InputTextField}
              type="text"
              initialValue={name}
              InputValue={values?.FullName}
              className={HelpStyles['input_field']}
              validate={isRequired}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Language"
              name="Language"
              className={HelpStyles['input']}
              component={LanguageSelectorContainer}
              InputValue={values.Language !== null ? selecTedLang : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Religion"
              name="Religion"
              className={HelpStyles['input']}
              component={ReligionSelectorContainer}
              initialValue={
                formDatas?.ReligionId &&
                religionId == null &&
                (values.Religion == null || values.Religion == '')
                  ? religionName
                  : values.Religion || ''
              }
              InputValue={values?.Religion}
              validate={isRequired}
            />
            <OnChange name="Religion">
              {(a) => {
                (values.Caste = ''), setReligionId(a?.id);
              }}
            </OnChange>
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Caste"
              name="Caste"
              component={CasteSelectorContainer}
              religionId={
                religionId == null && values.Caste !== '' && formDatas?.ReligionId
                  ? formDatas?.ReligionId
                  : religionId
              }
              className={HelpStyles['input']}
              validate={isRequired}
              initialValue={
                formDatas?.caste?.Id &&
                religionId == null &&
                (values.Caste == null || values.Caste == '')
                  ? selectedCaste
                  : values?.Caste || ''
              }
              InputValue={values.Caste}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Country"
              name="Country"
              className={HelpStyles['input']}
              component={CountrySelectorContainer}
              initialValue={
                formDatas?.CountryId &&
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
                (values.State = ''), (values.City = ''), (values.District = ''), setCI(a?.key);
                setChange(true);
                setSI(null);
                setDI(null);
              }}
            </OnChange>
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="State"
              name="State"
              validate={isRequired}
              component={StateSelectorContainer}
              className={HelpStyles['input']}
              countryId={
                ci == null && values.State !== '' && formDatas?.CountryId
                  ? formDatas?.CountryId
                  : ci
              }
              initialValue={
                formDatas?.StateId && si == null && (values.State == null || values.State == '')
                  ? selectedState(formDatas?.CountryId, formDatas?.StateId)
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
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            {preCity.name && (
              <Field
                label="City"
                name="City"
                className={HelpStyles['input']}
                component={CitySelectorContainer}
                countryId={ci}
                districtId={
                  si == null && values.City !== '' && formDatas?.StateId ? formDatas?.StateId : si
                }
                isChange={change}
                initialValue={
                  formDatas?.CityId && si == null && (values.City == null || values.City == '')
                    ? preCity
                    : values.City || ''
                }
                InputValue={preCity?.name}
                dataUser={formDatas}
                validate={isRequired}
                preOption={preCity?.option}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Village"
              name="Village"
              component={InputTextField}
              className={HelpStyles['input_field']}
              type="text"
              initialValue={formDatas?.Village ? formDatas?.Village : ''}
              InputValue={values.Village}
              validate={isRequired}
            />{' '}
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Marital Status"
              name="maritalStatus"
              component={InputAutoCompleteField}
              options={creatingForMaritalStatusOptionalData}
              className={HelpStyles['input_field']}
              type="select"
              initialValue={
                formDatas?.MaritalStatusId &&
                (values.maritalStatus == null || values.maritalStatus == '')
                  ? setMaritalStatus
                  : values.maritalStatus || ''
              }
              validate={isRequired}
            />{' '}
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            {hidePostal ? (
              <>
                <Field
                  label="Postalcode"
                  name="Postcode"
                  component={InputTextField}
                  className={HelpStyles['input_field']}
                  type="number"
                  postalcallback={setPostalIntial}
                  initialValue={postal}
                  InputValue={values?.postalCode}
                  validate={isRequired}
                />
                <OnChange name="Postcode">
                  {(a) => {
                    (values.Postcode = ''), (values.Postcode = ''), setHidePotsal(a?.key);
                    setHidePotsal(false);
                  }}
                </OnChange>
              </>
            ) : (
              <Field
                label="Postalcode"
                name="Postcode"
                component={PostalCodeContainer}
                className={HelpStyles['input_field']}
                type="number"
                postalcallback={setPostalIntial}
                initialValue={postal}
                InputValue={postalCode}
                validate={isRequired}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            )}{' '}
          </Grid>
        </Grid>
      </>
    );
  };
  const getFamily = (values) => {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Family Status"
              name="FamilyStatus"
              component={InputAutoCompleteField}
              className={HelpStyles['input']}
              options={familyStatus}
              initialValue={
                formDatas?.familydetail?.FamilystatusId &&
                (values?.FamilyStatus == null ||
                  values?.FamilyStatus == '' ||
                  values?.FamilyStatus == undefined)
                  ? newData(
                      formDatas?.familydetail?.FamilystatusId,
                      result(
                        find(familyStatus, { Id: formDatas?.familydetail?.FamilystatusId }),
                        'FamilyStatusName'
                      )
                    )
                  : values.FamilyStatus || ''
              }
              InputValue={values.FamilyStatus}
              validate={isRequired}
            />{' '}
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Family Type"
              name="FamilyType"
              className={HelpStyles['input']}
              component={InputAutoCompleteField}
              options={familyTypes}
              initialValue={
                formDatas?.familydetail?.FamilytypeId &&
                (values?.FamilyType == null || values?.FamilyType == '')
                  ? newData(
                      formDatas?.familydetail?.FamilytypeId,
                      result(
                        find(familyTypes, { Id: formDatas?.familydetail?.FamilytypeId }),
                        'FamilyTypeName'
                      )
                    )
                  : values.FamilyType || ''
              }
              InputValue={values?.FamilyType}
              validate={isRequired}
            />{' '}
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Father Name"
              name="FatherName"
              className={HelpStyles['input_field']}
              component={InputTextField}
              initialValue={
                formDatas?.familydetail?.FathersName ? formDatas?.familydetail?.FathersName : ''
              }
              InputValue={values.FatherName}
              validate={isRequired}
            />{' '}
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Father's Surname"
              name="FatherSurname"
              className={HelpStyles['input_field']}
              component={InputTextField}
              initialValue={
                formDatas?.familydetail?.FathersSurname
                  ? formDatas?.familydetail?.FathersSurname
                  : ''
              }
              InputValue={values.FatherSurname}
              validate={isRequired}
            />{' '}
          </Grid>

          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Mother Name"
              name="MotherName"
              component={InputTextField}
              className={HelpStyles['input_field']}
              initialValue={
                formDatas?.familydetail?.MothersName ? formDatas?.familydetail?.MothersName : ''
              }
              InputValue={values.MotherName}
              validate={isRequired}
            />{' '}
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Mother's Surname"
              name="MotherSurname"
              className={HelpStyles['input_field']}
              component={InputTextField}
              initialValue={
                formDatas?.familydetail?.MothersSurname
                  ? formDatas?.familydetail?.MothersSurname
                  : ''
              }
              InputValue={values.MotherSurname}
              validate={isRequired}
            />{' '}
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="FatherOccupation"
              name="FatherOccupation"
              component={InputAutoCompleteFieldCategory}
              optionLabel={'OccupationName'}
              className={HelpStyles['input']}
              type="text"
              options={occupations}
              initialValue={
                formDatas?.familydetail?.FathersOccupation &&
                (values?.FatherOccupation == null || values?.FatherOccupation == '')
                  ? autoFillValueForDropdown(
                      occupations,
                      parseInt(formDatas?.familydetail?.FathersOccupation)
                    )
                  : values.FatherOccupation || ''
              }
              InputValue={values?.FatherOccupation}
              validate={isRequired}
            />{' '}
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Mother'sOccupation"
              name="MothersOccupation"
              component={InputAutoCompleteFieldCategory}
              className={HelpStyles['input']}
              type="text"
              options={occupations}
              optionLabel={'OccupationName'}
              initialValue={
                formDatas?.familydetail?.MothersOccupation &&
                (values?.MothersOccupation == null || values?.MothersOccupation == '')
                  ? autoFillValueForDropdown(
                      occupations,
                      parseInt(formDatas?.familydetail?.MothersOccupation)
                    )
                  : values.MothersOccupation || ''
              }
              InputValue={values?.MothersOccupation}
              validate={isRequired}
            />{' '}
          </Grid>

          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="No. Of Brothers"
              name="brotherNum"
              component={InputTextField}
              className={HelpStyles['input_field']}
              type="number"
              InputProps={{ inputProps: { min: 0, max: 10, type: 'number' } }}
              initialValue={
                formDatas?.familydetail?.NoOfBrothers > -1
                  ? formDatas?.familydetail?.NoOfBrothers
                  : ''
              }
              InputValue={values.brotherNum}
              validate={isRequired}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="No. Of Sisters"
              name="sisterNum"
              component={InputTextField}
              InputProps={{ inputProps: { min: 0, max: 10, type: 'number' } }}
              type="number"
              initialValue={
                formDatas?.familydetail?.NoOfSisters > -1
                  ? formDatas?.familydetail?.NoOfSisters
                  : ''
              }
              InputValue={values.sisterNum}
              validate={isRequired}
            />{' '}
          </Grid>
        </Grid>
      </>
    );
  };
  const getPhysical = (values) => {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Body Type"
              name="BodyType"
              component={InputAutoCompleteField}
              className={HelpStyles['input']}
              options={bodyTypes}
              initialValue={
                formDatas?.physicalprofileinfo?.BodyTypeId &&
                (values?.BodyType == null || values?.BodyType == '')
                  ? selectedbodyType
                  : values.BodyType || ''
              }
              InputValue={values?.BodyType}
              validate={isRequired}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Complexion"
              name="Complexion"
              className={HelpStyles['input']}
              component={InputAutoCompleteField}
              options={complexions}
              initialValue={
                formDatas?.physicalprofileinfo?.ComplexionId &&
                (values?.Complexion == null || values?.Complexion == '')
                  ? selectedComplexion
                  : values.Complexion || ''
              }
              InputValue={values?.Complexion}
              validate={isRequired}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Physical Status"
              name="physicalStatus"
              className={HelpStyles['input']}
              component={InputAutoCompleteField}
              options={physicalStatus}
              initialValue={
                formDatas?.physicalprofileinfo?.PhysicalStatusId &&
                (values?.physicalStatus == null || values?.physicalStatus == '')
                  ? selectedPhysicalStatus
                  : values.physicalStatus || ''
              }
              InputValue={values?.physicalStatus}
              validate={isRequired}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Weight"
              name="Weight"
              className={HelpStyles['input_field']}
              component={InputTextField}
              InputProps={{ inputProps: { type: 'number' } }}
              // options={[Weight]}
              initialValue={
                formDatas?.physicalprofileinfo?.Weight ? formDatas?.physicalprofileinfo?.Weight : ''
              }
              InputValue={values.Weight}
              validate={isWeight}
            />
          </Grid>{' '}
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Height"
              name="Height"
              component={InputAutoCompleteField}
              className={HelpStyles['input']}
              options={heights}
              initialValue={
                formDatas?.physicalprofileinfo?.HeightId &&
                (values?.Height == null || values?.Height == '')
                  ? newData(
                      formDatas?.physicalprofileinfo?.HeightId,
                      result(
                        find(heights, { Id: formDatas?.physicalprofileinfo?.HeightId }),
                        'HeightName'
                      )
                    )
                  : values.Height || ''
              }
              InputValue={values?.Height}
              validate={isRequired}
            />{' '}
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Education"
              name="Education"
              className={HelpStyles['input']}
              component={InputAutoCompleteFieldCategory}
              optionLabel={'EducationName'}
              options={highestEducation}
              initialValue={
                formDatas?.physicalprofileinfo?.EducationId &&
                (values?.Education == null || values?.Education == '')
                  ? autoFillValueForDropdown(
                      highestEducation,
                      formDatas?.physicalprofileinfo?.EducationId
                    )
                  : values.Education || ''
              }
              InputValue={values?.Education}
              validate={isRequired}
            />{' '}
          </Grid>{' '}
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Occupation"
              name="Occupation"
              className={HelpStyles['input']}
              component={InputAutoCompleteFieldCategory}
              options={occupations}
              optionLabel={'OccupationName'}
              initialValue={
                formDatas?.physicalprofileinfo?.OccupationId &&
                (values?.Occupation == null || values?.Occupation == '')
                  ? autoFillValueForDropdown(
                      occupations,
                      formDatas?.physicalprofileinfo?.OccupationId
                    )
                  : values.Occupation || ''
              }
              InputValue={values?.Occupation}
              validate={isRequired}
            />
          </Grid>{' '}
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Employment Type"
              name="employmentType"
              component={InputAutoCompleteField}
              className={HelpStyles['input']}
              options={employeeTypes}
              initialValue={
                formDatas?.physicalprofileinfo?.EmploymentTypeId &&
                (values?.employmentType == null || values?.employmentType == '')
                  ? selectedEmpType
                  : values.employmentType || ''
              }
              InputValue={values?.employmentType}
              validate={isRequired}
            />{' '}
          </Grid>{' '}
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Annual Income"
              name="annualIncome"
              component={InputAutoCompleteField}
              className={HelpStyles['input']}
              options={annualIncomes}
              initialValue={
                formDatas?.physicalprofileinfo?.AnnualIncomeId &&
                (values?.annualIncome == null || values?.annualIncome == '')
                  ? selectedAnnualIncome
                  : values.annualIncome || ''
              }
              InputValue={values?.annualIncome}
              validate={isRequired}
            />
          </Grid>
        </Grid>
      </>
    );
  };
  const getPrtnerPreferences = (values) => {
    const [ci, setCI] = useState();
    const [si, setSI] = useState();
    const [di, setDI] = useState();
    const [preCity, setPreCity] = useState({});
    const [change, setChange] = useState(false);

    useEffect(() => {
      selectedCity(
        formDatas?.partnerpreferance?.CountryId,
        formDatas?.partnerpreferance?.StateId,
        formDatas?.partnerpreferance?.CityId
      ).then((res) => {
        setPreCity(res);
      });
    }, [
      formDatas?.partnerpreferance?.CountryId,
      formDatas?.partnerpreferance?.StateId,
      formDatas?.partnerpreferance?.CityId
    ]);
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Employee Type"
              name="partnerEmployeeType"
              className={HelpStyles['input']}
              component={InputAutoCompleteField}
              options={employeeTypes}
              initialValue={
                formDatas?.partnerpreferance?.EmployeetypeId &&
                (values?.partnerEmployeeType == null || values?.partnerEmployeeType == '')
                  ? newData(
                      formDatas?.partnerpreferance?.EmployeetypeId,
                      result(
                        find(employeeTypes, { Id: formDatas?.partnerpreferance?.EmployeetypeId }),
                        'EmploymentTypeName'
                      )
                    )
                  : values.partnerEmployeeType || ''
              }
              InputValue={values?.partnerEmployeeType}
              validate={isRequired}
            />{' '}
          </Grid>{' '}
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Occupation"
              name="partnerOccupation"
              className={HelpStyles['input']}
              component={InputAutoCompleteFieldCategory}
              optionLabel={'OccupationName'}
              options={occupations}
              initialValue={
                formDatas?.partnerpreferance?.OccupationId &&
                (values?.partnerOccupation == null || values?.partnerOccupation == '')
                  ? autoFillValueForDropdown(
                      occupations,
                      formDatas?.partnerpreferance?.OccupationId
                    )
                  : values.partnerOccupation || ''
              }
              InputValue={values?.partnerOccupation}
              validate={isRequired}
            />{' '}
          </Grid>{' '}
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Annual Income"
              name="partnerAnnualIncome"
              component={InputAutoCompleteField}
              className={HelpStyles['input']}
              options={annualIncomes}
              initialValue={
                formDatas?.partnerpreferance?.AnnualIncomeId &&
                (values?.partnerAnnualIncome == null || values?.partnerAnnualIncome == '')
                  ? newData(
                      formDatas?.partnerpreferance?.AnnualIncomeId,
                      result(
                        find(annualIncomes, { Id: formDatas?.partnerpreferance?.AnnualIncomeId }),
                        'AnnualIncomeName'
                      )
                    )
                  : values.partnerAnnualIncome || ''
              }
              InputValue={values?.partnerAnnualIncome}
              validate={isRequired}
            />{' '}
          </Grid>{' '}
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Education"
              name="partnerEducation"
              component={InputAutoCompleteFieldCategory}
              className={HelpStyles['input']}
              options={highestEducation}
              optionLabel={'EducationName'}
              initialValue={
                formDatas?.partnerpreferance?.EducationId &&
                (values?.partnerEducation == null || values?.partnerEducation == '')
                  ? autoFillValueForDropdown(
                      highestEducation,
                      formDatas?.partnerpreferance?.EducationId
                    )
                  : values.partnerEducation || ''
              }
              InputValue={values?.partnerEducation}
              validate={isRequired}
            />{' '}
          </Grid>{' '}
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Star"
              name="partnerStar"
              className={HelpStyles['input']}
              component={InputAutoCompleteField}
              options={stars}
              initialValue={
                formDatas?.partnerpreferance?.StarId &&
                (values?.partnerStar == null || values?.partnerStar == '')
                  ? selectedStar
                  : values.partnerStar || ''
              }
              InputValue={values?.partnerStar}
              validate={isRequired}
            />{' '}
          </Grid>{' '}
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Country"
              name="partnerCountry"
              component={CountrySelectorContainer}
              className={HelpStyles['input']}
              initialValue={
                formDatas?.partnerpreferance?.CountryId &&
                ci == null &&
                (values.partnerCountry == null || values.partnerCountry == '')
                  ? partnerPreferenceCountry
                  : values.partnerCountry || ''
              }
              InputValue={values?.partnerCountry}
              validate={isRequired}
            />
            <OnChange name="partnerCountry">
              {(a) => {
                (values.partnerState = ''),
                  (values.partnerCity = ''),
                  (values.partnerDistrict = ''),
                  setCI(a?.key);
                setSI(null);
                setDI(null);
                setChange(true);
              }}
            </OnChange>
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="State"
              name="partnerState"
              component={StateSelectorContainer}
              className={HelpStyles['input']}
              countryId={
                ci == null && values.partnerState !== '' && formDatas?.partnerpreferance?.CountryId
                  ? formDatas?.partnerpreferance?.CountryId
                  : ci
              }
              initialValue={
                formDatas?.partnerpreferance?.StateId &&
                ci == null &&
                (values.partnerState == null || values.partnerState == '')
                  ? selectedState(
                      formDatas?.partnerpreferance?.CountryId,
                      formDatas?.partnerpreferance?.StateId,
                      formDatas?.partnerpreferance?.state?.Name
                    )
                  : values?.partnerState || ''
              }
              InputValue={values.partnerState}
              validate={isRequired}
            />
            <OnChange name="partnerState">
              {(a) => {
                (values.partnerCity = ''), (values.partnerDistrict = ''), setSI(a?.key);
                setDI(null);
                setChange(true);
              }}
            </OnChange>
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            {preCity?.name && (
              <Field
                label="City"
                name="partnerCity"
                className={HelpStyles['input']}
                component={CitySelectorContainer}
                isChange={change}
                dataUser={formDatas}
                countryId={ci}
                districtId={
                  si == null && values.partnerCity !== '' && formDatas?.partnerpreferance?.StateId
                    ? formDatas?.partnerpreferance?.StateId
                    : si
                }
                initialValue={
                  formDatas?.partnerpreferance?.CityId &&
                  di == null &&
                  (values.partnerCity == null || values.partnerCity == '')
                    ? preCity
                    : values.partnerCity || ''
                }
                InputValue={preCity?.name}
                validate={isRequired}
                preOption={preCity?.option}
              />
            )}
          </Grid>
        </Grid>
      </>
    );
  };
  const getLocation = (values) => {
    const [ci, setCI] = useState();
    const [si, setSI] = useState();
    const [di, setDI] = useState();
    const [preCity, setPreCity] = useState({});
    const [change, setChange] = useState(false);
    const addTypeOption = [
      { label: 'Permanent', ID: 'Permanent', key: 'Permanent', name: 'Permanent' },
      { label: 'Rented', ID: 'Rented', key: 'Rented', name: 'Rented' }
    ];
    const getLocationTypeAdd = newData(
      formDatas?.permanantaddress?.AddressType,
      addTypeOption.find(({ ID }) => ID === formDatas?.permanantaddress?.AddressType)?.name
    );
    useEffect(() => {
      setCI(formDatas?.permanantaddress?.CountryId);
      selectedCity(
        formDatas?.permanantaddress?.CountryId,
        formDatas?.permanantaddress?.StateId,
        formDatas?.permanantaddress?.CityId
      ).then((res) => {
        setPreCity(res);
      });
    }, [
      formDatas?.permanantaddress?.CountryId,
      formDatas?.permanantaddress?.StateId,
      formDatas?.permanantaddress?.CityId
    ]);
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Address"
              name="Address1Permanent"
              component={InputTextField}
              className={HelpStyles['input_field']}
              initialValue={
                formDatas?.permanantaddress?.Address1 ? formDatas?.permanantaddress?.Address1 : ''
              }
              InputValue={values.Address1Permanent}
              validate={isRequired}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Address Type"
              name="permanentTypeAddress"
              options={addTypeOption}
              component={InputAutoCompleteField}
              className={HelpStyles['input_field']}
              initialValue={
                formDatas?.permanantaddress?.AddressType &&
                (values.permanentTypeAddress == null || values.permanentTypeAddress == '')
                  ? getLocationTypeAdd
                  : values.permanentTypeAddress || ''
              }
              InputValue={values.permanantaddress}
              validate={isRequired}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Country"
              name="countryPermanent"
              className={HelpStyles['input']}
              component={CountrySelectorContainer}
              initialValue={
                formDatas?.permanantaddress?.CountryId &&
                ci == null &&
                (values.countryPermanent == null || values.countryPermanent == '')
                  ? permanentCountry
                  : values.countryPermanent || ''
              }
              InputValue={values?.countryPermanent}
              validate={isRequired}
            />
            <OnChange name="countryPermanent">
              {(a) => {
                (values.statePermanent = ''),
                  (values.cityPermanent = ''),
                  (values.districtPermanent = ''),
                  setCI(a?.key);
                setSI(null);
                setDI(null);
                setChange(true);
              }}
            </OnChange>
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="State"
              name="statePermanent"
              component={StateSelectorContainer}
              className={HelpStyles['input']}
              countryId={
                ci == null && values.statePermanent !== '' && formDatas?.permanantaddress?.CountryId
                  ? formDatas?.permanantaddress?.CountryId
                  : ci
              }
              initialValue={
                formDatas?.permanantaddress?.StateId &&
                ci == null &&
                (values.statePermanent == null || values.statePermanent == '')
                  ? selectedState(
                      formDatas?.permanantaddress?.CountryId,
                      formDatas?.permanantaddress?.StateId,
                      formDatas?.permanantaddress?.state?.Name
                    )
                  : values?.statePermanent || ''
              }
              InputValue={values.statePermanent}
              validate={isRequired}
            />
            <OnChange name="statePermanent">
              {(a) => {
                (values.cityPermanent = ''), (values.districtPermanent = ''), setSI(a?.key);
                setDI(null);
                setChange(true);
              }}
            </OnChange>{' '}
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            {preCity?.name && (
              <Field
                label="City"
                name="cityPermanent"
                className={HelpStyles['input']}
                component={CitySelectorContainer}
                countryId={ci}
                dataUser={formDatas}
                isChange={change}
                districtId={
                  si == null && values.cityPermanent !== '' && formDatas?.permanantaddress?.StateId
                    ? formDatas?.permanantaddress?.StateId
                    : si
                }
                initialValue={
                  formDatas?.permanantaddress?.CityId &&
                  di == null &&
                  (values.cityPermanent == null || values.cityPermanent == '')
                    ? preCity
                    : values.cityPermanent || ''
                }
                InputValue={values.cityPermanent}
                validate={isRequired}
                preOption={preCity?.option}
              />
            )}
          </Grid>
        </Grid>
      </>
    );
  };
  const getWork = (values) => {
    const [ci, setCI] = useState();
    const [si, setSI] = useState();
    const [di, setDI] = useState();
    console.log(di);
    const [preCity, setPreCity] = useState({});
    const [change, setChange] = useState(false);
    const addTypeOption = [
      { label: 'Permanent', ID: 'Permanent', key: 'Permanent', name: 'Permanent' },
      { label: 'Rented', ID: 'Rented', key: 'Rented', name: 'Rented' }
    ];
    const getWorkTypeAdd = newData(
      formDatas?.workasddress?.AddressType,
      addTypeOption.find(({ ID }) => ID === formDatas?.workasddress?.AddressType)?.name
    );
    useEffect(() => {
      setCI(formDatas?.workasddress?.CountryId);
      selectedCity(
        formDatas?.workasddress?.CountryId,
        formDatas?.workasddress?.StateId,
        formDatas?.workasddress?.CityId
      ).then((res) => {
        setPreCity(res);
      });
    }, [
      formDatas?.workasddress?.CountryId,
      formDatas?.workasddress?.StateId,
      formDatas?.workasddress?.CityId
    ]);
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
          <Field
            label="Address"
            name="Address1Work"
            component={InputTextField}
            className={HelpStyles['input_field']}
            initialValue={
              formDatas?.workasddress?.Address1 ? formDatas?.workasddress?.Address1 : ''
            }
            InputValue={values.Address1Work}
            validate={isRequired}
          />
        </Grid>
        <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
          <Field
            label="Address Type"
            name="workTypeAddress"
            options={addTypeOption}
            component={InputAutoCompleteField}
            className={HelpStyles['input_field']}
            initialValue={
              formDatas?.workasddress?.AddressType &&
              (values.workTypeAddress == null || values.workTypeAddress == '')
                ? getWorkTypeAdd
                : values.workTypeAddress || ''
            }
            InputValue={values.workTypeAddress}
            validate={isRequired}
          />
        </Grid>
        <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
          <Field
            label="Country"
            name="countryWork"
            className={HelpStyles['input']}
            component={CountrySelectorContainer}
            initialValue={
              formDatas?.workasddress?.CountryId &&
              ci == null &&
              (values.countryWork == null || values.countryWork == '')
                ? worksAddressCountry
                : values.countryWork || ''
            }
            InputValue={values?.countryWork}
            validate={isRequired}
          />{' '}
          <OnChange name="countryWork">
            {(a) => {
              (values.cityWork = ''),
                (values.stateWork = ''),
                (values.districtWork = ''),
                setCI(a?.key);
              setSI(null);
              setDI(null);
              setChange(true);
            }}
          </OnChange>
        </Grid>
        <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
          <Field
            label="State"
            name="stateWork"
            component={StateSelectorContainer}
            className={HelpStyles['input']}
            countryId={
              ci == null && values.stateWork !== '' && formDatas?.workasddress?.CountryId
                ? formDatas?.workasddress?.CountryId
                : ci
            }
            initialValue={
              formDatas?.workasddress?.StateId &&
              ci == null &&
              (values.stateWork == null || values.stateWork == '')
                ? selectedState(
                    formDatas?.workasddress?.CountryId,
                    formDatas?.workasddress?.StateId,
                    formDatas?.workasddress?.state?.Name
                  )
                : values?.stateWork || ''
            }
            InputValue={values.stateWork}
            validate={isRequired}
          />
          <OnChange name="stateWork">
            {(a) => {
              (values.cityWork = ''), (values.districtWork = ''), setSI(a?.key);
              setDI(null);
              setChange(true);
            }}
          </OnChange>
        </Grid>

        <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
          {preCity?.name && (
            <Field
              label="City"
              name="cityWork"
              className={HelpStyles['input']}
              component={CitySelectorContainer}
              dataUser={formDatas}
              isChange={change}
              countryId={ci}
              districtId={
                si == null && values.cityWork !== '' && formDatas?.workasddress?.StateId
                  ? formDatas?.workasddress?.StateId
                  : si
              }
              initialValue={
                formDatas?.workasddress?.CityId &&
                si == null &&
                (values.cityWork == null || values.cityWork == '')
                  ? preCity
                  : values.cityWork || ''
              }
              InputValue={values.cityWork}
              validate={isRequired}
              preOption={preCity?.option}
            />
          )}
        </Grid>
      </Grid>
    );
  };
  const userIdFromLoginDetails = useSelector(getUID);

  const registerSubmit = (e) => {
    if (fieldEmpty === '') {
      dispatch(
        fetchEditProfile(
          getFormattedValuesForEditProfile(e, formDatas?.GUID, userIdFromLoginDetails, formDatas)
        )
      );
    }
  };

  const [expandAccordion, setExpandAccordion] = useState(0);
  const handleAccordionChange = (id) => {
    expandAccordion === id ? setExpandAccordion(0) : setExpandAccordion(id);
    setValidationOpen(true);
  };
  return (
    <>
      {!formDatas && (
        <Container className={HelpStyles['container']}>
          <Loader />
        </Container>
      )}
      {/* {((formDatas !== null && formDatas?.RoleId !== 5) ? ( */}
      {formDatas !== null && formDatas?.RoleId !== 2 && formDatas?.RoleId !== 5 ? (
        <Form
          onSubmit={(e) => registerSubmit(e)}
          validate={(values) => {
            const errors = {};
            if (values.brotherNum < 0) {
              errors.brotherNum = 'Required';
            }
            if (values.sisterNum < 0) {
              errors.sisterNum = 'Required';
            }
            if (values.brotherNum > 10) {
              errors.brotherNum = 'Max 10 allowed';
            }
            if (values.sisterNum > 10) {
              errors.sisterNum = 'Max 10 allowed';
            }
            return errors;
          }}
          render={({ handleSubmit, values }) => (
            <>
              <Grid as="form" onSubmit={handleSubmit}>
                <Container className={HelpStyles['container']} onSubmit={handleSubmit}>
                  {formDatas?.RoleId !== 2 && (
                    <CustomAccordian
                      className={HelpStyles['element_container']}
                      handleAccordionChange={handleAccordionChange}
                      expandAccordion={expandAccordion}
                      title={editConstants.generalInformation}
                      description={<>{getGeneralInformation(values)}</>}
                      id={1}
                      key={1}
                    />
                  )}
                  {formDatas?.RoleId < 2 && (
                    <>
                      <CustomAccordian
                        className={HelpStyles['element_container']}
                        handleAccordionChange={handleAccordionChange}
                        expandAccordion={expandAccordion}
                        title={editConstants.physicalProffesioanInfo}
                        description={<ul>{getPhysical(values)}</ul>}
                        id={2}
                        key={2}
                      />
                      <CustomAccordian
                        className={HelpStyles['element_container']}
                        handleAccordionChange={handleAccordionChange}
                        expandAccordion={expandAccordion}
                        title={editConstants.familyDetails}
                        description={<ul>{getFamily(values)}</ul>}
                        id={3}
                        key={3}
                      />
                      <CustomAccordian
                        className={HelpStyles['element_container']}
                        title={editConstants.partnerPref}
                        description={<ul>{getPrtnerPreferences(values)}</ul>}
                        handleAccordionChange={handleAccordionChange}
                        expandAccordion={expandAccordion}
                        id={4}
                        key={4}
                      />
                      <CustomAccordian
                        className={HelpStyles['element_container']}
                        handleAccordionChange={handleAccordionChange}
                        expandAccordion={expandAccordion}
                        title={editConstants.location}
                        description={<ul>{getLocation(values)}</ul>}
                        id={5}
                        key={5}
                      />
                      <CustomAccordian
                        className={HelpStyles['element_container']}
                        title={editConstants.workAddress}
                        description={<ul>{getWork(values)}</ul>}
                        handleAccordionChange={handleAccordionChange}
                        expandAccordion={expandAccordion}
                        id={6}
                        key={6}
                      />
                    </>
                  )}

                  <div className={HelpStyles['btn_container']}>
                    <Button
                      size="large"
                      type="submit"
                      variant="contained"
                      className={HelpStyles['submit_btn']}
                      onClick={handleClick}>
                      {editConstants.submit}
                    </Button>
                  </div>
                </Container>

                {open ? (
                  <Snackbar
                    open={onSubmitSuccess == 'success'}
                    autoHideDuration={1000}
                    onClose={handleClose}>
                    <AlertBox
                      autoHideDuration={1000}
                      severity={
                        onSubmitSuccess == 'success' && fieldEmpty === '' ? 'success' : 'error'
                      }
                      onClose={handleClose}
                      sx={{ width: '100%' }}>
                      {onSubmitSuccess == 'success' && fieldEmpty === ''
                        ? 'Submitted Successfully'
                        : 'Cannot Be Submmitted'}
                    </AlertBox>
                  </Snackbar>
                ) : (
                  ''
                )}
              </Grid>
            </>
          )}></Form>
      ) : (
        <EditExecutive />
      )}
    </>
  );
};

Edit.propTypes = {
  creatingForMaritalStatusOptionalData: PropTypes.func
};
export default Edit;

const AlertBox = forwardRef(function SbAlert(props, ref) {
  return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});
