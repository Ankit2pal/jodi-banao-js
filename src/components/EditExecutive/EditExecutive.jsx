import React, { forwardRef } from 'react';
import { useEffect } from 'react';
import { isRequired } from '../../validators';
import { useSelector, useDispatch } from 'react-redux';
import { StateSelectorContainer } from '../../containers/StateSelectorContainer';
import { Button, Container, Grid, Snackbar, Alert } from '@mui/material';
import CustomAccordian from '../../commons/accordion';
import HelpStyles from './EditExecutive.module.scss';
import { REGISTER_LABELS } from '../../constants/registerConstants';
import { PhoneNumberField } from '../../commons/PhoneNumberField';
import { checkEmailExist, checkPhoneExist } from '../../utils/validationHelpers';
import { addConstants } from '../../constants/addConstants';
import { Field, Form } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import { DatePickerField, GenderSelectField, InputAutoCompleteField } from '../../commons';
import { CitySelectorContainer } from '../../containers/CitySelectorContainer';
import { CountrySelectorContainer } from '../../containers/CountrySelectorContainer';
import { InputTextField } from '../../commons';
import { fetchRegisterationDetails } from '../../redux/modules/registerationDetailsSlice';
import { useState } from 'react';
import { getFormattedValuesForAddVendorUser } from '../../utils/addVendorUser';
import { getCitiesAPI } from '../../services/CountryStateApi';
import { getRegisterationDetails } from '../../redux/selectors/registerationDetailsSelector';
import { getUserRegisterationDetails } from '../../redux/selectors/userRegisterationDetails';
import { fetchEditProfile } from '../../redux/modules/editProfileSlice';
import { useLocation } from 'react-router-dom';
import { getUserRegisterationDetailsApi } from '../../services/userRegisterationDetailsApi';
import { AdhaarValid, isEmailValid, isIfscRequired } from '../../validators/validationHelpers';

const MAX_AGE = new Date();
MAX_AGE.setFullYear(MAX_AGE.getFullYear() - 18);

const EditExecutive = () => {
  const dispatch = useDispatch();
  const [formDatas, setFormDatas] = useState(
    useSelector((state) => state.userRegisterationDetails.data)
  );
  let location = useLocation();
  const editedUserId = location.pathname.split('/')[2];
  useEffect(() => {
    getuserInfo();
  }, []);

  const getuserInfo = async () => {
    const profileDetailsResponse = await getUserRegisterationDetailsApi(editedUserId);
    setFormDatas(profileDetailsResponse);
  };
  const [isEmailExist, setIsEmailExist] = useState(0);
  const userRegisteration = useSelector(getRegisterationDetails);
  const userData = useSelector(getUserRegisterationDetails);

  let GenderId;
  const filterRes = userRegisteration.gender.filter((item) => {
    return item.Id === userData.GenderId;
  });
  GenderId = filterRes[0].GenderName;

  const newData = (ID, name) => {
    return {
      ID,
      name,
      key: name,
      label: name
    };
  };

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

  useEffect(() => {
    dispatch(fetchRegisterationDetails());
  }, []);

  const onSubmitSuccess = useSelector((state) => state.editProfile.data.Status);
  const [isMobExist, setIsMobExist] = useState(0);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const permanentCountry = newData(
    formDatas?.permanantaddress?.CountryId,
    findCountry(formDatas?.permanantaddress?.CountryId)
  );
  const worksAddressCountry = newData(
    formDatas?.workasddress?.CountryId,
    findCountry(formDatas?.workasddress?.CountryId)
  );
  const getGeneralInformation = (values) => {
    const [ci, setCI] = useState();
    const [si, setSI] = useState();
    const [di, setDI] = useState();
    console.log(di);
    const [preCityg, setPreCityg] = useState({});
    const [change, setChange] = useState(false);
    const checkEmailExst = async (value) => {
      let isEmlExist = await checkEmailExist(value);
      setIsEmailExist(isEmlExist ? 1 : 0);
    };
    const checkMobExst = async (value) => {
      let isMobExist = await checkPhoneExist(value);
      setIsMobExist(isMobExist ? 1 : 0);
    };

    useEffect(() => {
      selectedCity(formDatas?.CountryId, formDatas?.StateId, formDatas?.CityId).then((res) => {
        setPreCityg(res);
      });
    }, [formDatas?.CountryId, formDatas?.StateId, formDatas?.CityId]);
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label={REGISTER_LABELS.firstNameLabel}
              name="firstName"
              component={InputTextField}
              type="text"
              validate={isRequired}
              initialValue={formDatas?.FullName.split(' ')[0]}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label={REGISTER_LABELS.lastNameLabel}
              name="lastName"
              component={InputTextField}
              type="text"
              validate={isRequired}
              initialValue={formDatas?.FullName.split(' ')[1]}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles[('input_field', 'gender_field')]}>
            <Field
              label={REGISTER_LABELS.genderLabel}
              name="gender"
              component={GenderSelectField}
              type="select"
              // validate={isRequired}
              inputvalue={GenderId}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label={REGISTER_LABELS.dateFormat}
              name="dateOfBirth"
              component={DatePickerField}
              // disabled={!values.gender}
              maxage={MAX_AGE}
              validate={isRequired}
              initialValue={formDatas?.DateOfBirth}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label={REGISTER_LABELS.permanentAccNumber}
              name="pan"
              component={InputTextField}
              type="text"
              validate={isRequired}
              initialValue={formDatas?.PAN}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label={REGISTER_LABELS.aadharNumber}
              name="aadhar"
              component={InputTextField}
              type="text"
              validate={AdhaarValid}
              initialValue={formDatas?.Aadhar}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label={REGISTER_LABELS.phoneNumberLabel}
              name="phoneNumber"
              component={PhoneNumberField}
              type="text"
              className={HelpStyles['phn_box']}
              onBlur={(e) => checkMobExst(e.target.value)}
              validate={isRequired}
              initialValue={formDatas?.MobileNumber}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label={REGISTER_LABELS.emailLabel}
              name="email"
              component={InputTextField}
              type="text"
              onBlur={(e) => checkEmailExst(e.target.value)}
              validate={(isRequired, isEmailValid)}
              initialValue={formDatas?.EmailId}
              disabled
            />
          </Grid>
          {formDatas?.RoleId == 2 && (
            <>
              <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
                <Field
                  disabled
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
                  disabledForExecutive
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
                {preCityg.name && (
                  <Field
                    disabledForExecutive
                    label="City"
                    name="City"
                    className={HelpStyles['input']}
                    component={CitySelectorContainer}
                    countryId={ci}
                    districtId={
                      si == null && values.City !== '' && formDatas?.StateId
                        ? formDatas?.StateId
                        : si
                    }
                    isChange={change}
                    initialValue={
                      formDatas?.CityId && si == null && (values.City == null || values.City == '')
                        ? preCityg
                        : values.City || ''
                    }
                    InputValue={preCityg?.name}
                    dataUser={formDatas}
                    validate={isRequired}
                    preOption={preCityg?.option}
                  />
                )}
              </Grid>
            </>
          )}
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
            </OnChange>
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
          />
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
  const getAccountDetails = (values) => {
    const accountTypeOption = [
      { label: 'Saving', ID: 'Saving', key: 'Savig', name: 'Saving' },
      { label: 'Current', ID: 'Current', key: 'Current', name: 'Current' }
    ];
    const getAccountTypeOption = newData(
      formDatas?.BankDetails?.AccountType,
      accountTypeOption.find(({ ID }) => ID === formDatas?.BankDetails?.AccountType)?.name
    );
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} className={HelpStyles['input_field']}>
          <Field
            label="Bank Account Number"
            name="accountNumber"
            component={InputTextField}
            InputProps={{ inputProps: { min: 0, type: 'number' } }}
            validate={isRequired}
            initialValue={formDatas?.BankDetails?.AccountNumber}
          />
        </Grid>
        <Grid item xs={12} sm={12} className={HelpStyles['input_field']}>
          <Field
            label="Confirm Bank Account Number"
            name="ConfirmAccNumber"
            component={InputTextField}
            InputProps={{ inputProps: { min: 0, type: 'number' } }}
            validate={isRequired}
            initialValue={formDatas?.BankDetails?.AccountNumber}
          />
        </Grid>
        <Grid item xs={12} sm={12} className={HelpStyles['input_field']}>
          <Field
            label="Account Name"
            name="accountHolder"
            component={InputTextField}
            type="text"
            validate={isRequired}
            initialValue={formDatas?.BankDetails?.AccountName}
          />
        </Grid>
        <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
          <Field
            label="IFSC Code"
            name="IfscCode"
            component={InputTextField}
            type="text"
            validate={isIfscRequired}
            initialValue={formDatas?.BankDetails?.IfscCode}
          />
        </Grid>
        <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
          <Field
            label="Account Type"
            name="accountType"
            options={[
              { id: 'Saving', label: 'Saving' },
              { id: 'Current', label: 'Current' }
            ]}
            component={InputAutoCompleteField}
            type="select"
            validate={isRequired}
            initialValue={
              formDatas?.BankDetails?.AccountType &&
              (values.accountType == null || values.accountType == '')
                ? getAccountTypeOption
                : values.accountType || ''
            }
          />
        </Grid>
      </Grid>
    );
  };

  const registerSubmit = (e) => {
    e.isComplete = true;
    e.isMobileVerified = isMobExist;
    e.isEmailVerified = isEmailExist;
    // if (isMobExist && isEmailExist) {
    let data = {
      vendorId: formDatas.GUID,
      RoleId: formDatas.RoleId
    };
    setOpen(true);
    dispatch(fetchEditProfile(getFormattedValuesForAddVendorUser(data, e, true, userData?.GUID)));
    // }
  };

  const [expandAccordion, setExpandAccordion] = useState(0);
  const handleAccordionChange = (id) => {
    expandAccordion === id ? setExpandAccordion(0) : setExpandAccordion(id);
  };

  return (
    <Form
      onSubmit={(e) => registerSubmit(e)}
      validate={(values) => {
        const errors = {};
        if (!values.ConfirmAccNumber) {
          errors.ConfirmAccNumber = 'Required';
        } else if (values.ConfirmAccNumber !== values.accountNumber) {
          errors.ConfirmAccNumber = 'Must match field';
        }
        // if (!/^[0-9]+$/.test(values?.aadhar)) {
        //   errors.aadhar = 'Please enter valid aadhar number';
        // }
        if (!/[A-Z]{5}[0-9]{4}[A-Z]{1}/.test(values?.pan)) {
          errors.pan = 'Please enter valid pan number';
        }
        if (!/^[0-9]+$/.test(values?.accountNumber)) {
          errors.accountNumber = 'Please enter valid account number';
        }
        // if (isMobExist === 0) {
        //   errors.phoneNumber = 'Phone Number Already Exits';
        // }
        return errors;
      }}
      render={({ handleSubmit, values }) => (
        <>
          <Grid as="form" onSubmit={handleSubmit}>
            <Container className={HelpStyles['container']} onSubmit={handleSubmit}>
              <CustomAccordian
                className={HelpStyles['element_container']}
                handleAccordionChange={handleAccordionChange}
                expandAccordion={expandAccordion}
                title={addConstants.generalInformation}
                description={<>{getGeneralInformation(values)}</>}
                id={1}
                key={1}
              />
              <>
                <CustomAccordian
                  className={HelpStyles['element_container']}
                  handleAccordionChange={handleAccordionChange}
                  expandAccordion={expandAccordion}
                  title={addConstants.location}
                  description={<ul>{getLocation(values)}</ul>}
                  id={2}
                  key={2}
                />
                <CustomAccordian
                  className={HelpStyles['element_container']}
                  handleAccordionChange={handleAccordionChange}
                  expandAccordion={expandAccordion}
                  title={addConstants.workAddress}
                  description={<ul>{getWork(values)}</ul>}
                  id={3}
                  key={3}
                />
                <CustomAccordian
                  className={HelpStyles['element_container']}
                  handleAccordionChange={handleAccordionChange}
                  expandAccordion={expandAccordion}
                  title={addConstants.accountDetails}
                  description={<ul>{getAccountDetails(values)}</ul>}
                  id={4}
                  key={4}
                />
              </>

              <div className={HelpStyles['btn_container']}>
                <Button
                  size="large"
                  type="submit"
                  variant="contained"
                  className={HelpStyles['submit_btn']}>
                  {addConstants.submit}
                </Button>
              </div>
            </Container>
            {open && onSubmitSuccess == 'success' && (
              <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
                <AlertBox
                  autoHideDuration={1000}
                  severity={onSubmitSuccess == 'success' ? 'success' : 'error'}
                  onClose={handleClose}
                  sx={{ width: '100%' }}>
                  {onSubmitSuccess == 'success' ? 'Updated Data Sucessfully' : 'failed'}
                </AlertBox>
              </Snackbar>
            )}
          </Grid>
        </>
      )}></Form>
  );
};

export default EditExecutive;

const AlertBox = forwardRef(function SbAlert(props, ref) {
  return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});
