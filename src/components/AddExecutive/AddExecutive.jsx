import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { OnChange } from 'react-final-form-listeners';
import { isRequired } from '../../validators';
import { useSelector, useDispatch } from 'react-redux';
import { StateSelectorContainer } from '../../containers/StateSelectorContainer';
import { Button, Box, Container, Grid, Snackbar, Alert } from '@mui/material';
import CustomAccordian from '../../commons/accordion';
import HelpStyles from './AddExecutive.module.scss';
import { REGISTER_LABELS } from '../../constants/registerConstants';
import { PhoneNumberField } from '../../commons/PhoneNumberField';
import { checkEmailExist, checkPhoneExist } from '../../utils/validationHelpers';
import { addConstants } from '../../constants/addConstants';
import { Field, Form } from 'react-final-form';
import { DatePickerField, GenderSelectField, InputAutoCompleteField } from '../../commons';
import { CitySelectorContainer } from '../../containers/CitySelectorContainer';
import { CountrySelectorContainer } from '../../containers/CountrySelectorContainer';
import { InputTextField } from '../../commons';
import { fetchRegisterationDetails } from '../../redux/modules/registerationDetailsSlice';
import { useState } from 'react';
import { addVendorUser } from '../../redux/modules/vendorByUserAdd';
import { getFormattedValuesForAddVendorUser } from '../../utils/addVendorUser';
// import { getCitiesAPI } from '../../services/CountryStateApi';
import { AdhaarValid, isEmailValid, isIfscRequired } from '../../validators/validationHelpers';
import Loader from '../../commons/Loader/Loader';

const MAX_AGE = new Date();
MAX_AGE.setFullYear(MAX_AGE.getFullYear() - 18);

const AddExecutive = ({ userType }) => {
  const dispatch = useDispatch();
  // const [preCity, setPreCity] = useState({});
  // const change = false;
  const formDatas = useSelector((state) => state.userRegisterationDetails.data);
  // const newData = (ID, name) => {
  //   return {
  //     ID,
  //     name,
  //     key: name,
  //     label: name
  //   };
  // };
  // const countries = useSelector((state) => state?.registerationDetails?.country);
  // const state = useSelector((state) => state?.registerationDetails?.state);
  // const findCountry = (id, name) => {
  //   let findCountrys = countries.filter(function (item) {
  //     return item.id == id;
  //   });
  //   if (name) {
  //     return findCountrys[0]?.iso2;
  //   } else {
  //     return findCountrys[0]?.name;
  //   }
  // };
  // const CountrySelected = newData(formDatas?.CountryId, findCountry(formDatas?.CountryId));

  // const findState = (id, name) => {
  //   let states = state.filter(function (item) {
  //     return item.id == id;
  //   });
  //   if (name) {
  //     return states[0]?.iso2;
  //   } else {
  //     return states[0]?.name;
  //   }
  // };
  // const selectedState = (CountId, stateId) => {
  //   let sname = findState(stateId);
  //   return {
  //     CountryId: CountId,
  //     Id: stateId,
  //     StateorCounty: sname,
  //     key: sname,
  //     label: sname
  //   };
  // };
  // const selectedCity = async (CountryId, StateId, city) => {
  //   let countryIso = findCountry(CountryId, 'name');
  //   let stateIso = findState(StateId, 'name');
  //   let cityInfo = await getCitiesAPI(countryIso, stateIso);
  //   let cityDetail = [];
  //   if (cityInfo) {
  //     cityDetail = cityInfo.filter(function (item) {
  //       return item.id == city;
  //     });
  //   }
  //   return {
  //     name: cityDetail[0]?.name,
  //     id: cityDetail[0]?.id,
  //     key: cityDetail[0]?.name,
  //     label: cityDetail[0]?.name,
  //     option: cityInfo
  //   };
  // };

  const [ci, setCI] = useState();
  const [si, setSI] = useState();
  const [perAddci, setperAddCI] = useState();
  const [perAddsi, setperAddSI] = useState();
  const [workAddci, setworkAddCI] = useState();
  const [workAddsi, setworkAddSI] = useState();

  const [isEmailExist, setIsEmailExist] = useState(0);

  useEffect(() => {
    dispatch(fetchRegisterationDetails());
    setVendorLoader(false);
  }, []);

  // useEffect(() => {
  //   selectedCity(formDatas?.CountryId, formDatas?.StateId, formDatas?.CityId).then((res) => {
  //     setPreCity(res);
  //   });
  // }, [formDatas?.CountryId, formDatas?.StateId, formDatas?.CityId]);

  // const [userType, setUserType] = useState(1);
  const onSubmitSuccess = useSelector((state) => state.addVendorUser.data.Status);
  const [isMobExist, setIsMobExist] = useState(false);
  const [isAPICall, setAPICall] = useState(false);
  const [vendorLoader, setVendorLoader] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState(false);
  const handleClose = () => {
    setVendorLoader(false);
    setOpen(false);
  };
  const getGeneralInformation = (values) => {
    const checkEmailExst = async (value) => {
      let isEmlExist = await checkEmailExist(value);
      setIsEmailExist(isEmlExist ? 1 : 0);
      setEmail(true);
      setVendorLoader(false);
    };
    const checkMobExst = async (value) => {
      let isMobExist = await checkPhoneExist(value);
      setAPICall(true);
      setVendorLoader(false);
      setIsMobExist(isMobExist ? true : false);
    };

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
            />
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label={REGISTER_LABELS.lastNameLabel}
              name="lastName"
              component={InputTextField}
              type="text"
              validate={isRequired}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles[('input_field', 'gender_field')]}>
            <Field
              label={REGISTER_LABELS.genderLabel}
              name="gender"
              component={GenderSelectField}
              type="select"
              validate={isRequired}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label={REGISTER_LABELS.dateFormat}
              name="dateOfBirth"
              component={DatePickerField}
              disabled={!values.gender}
              maxage={MAX_AGE}
              validate={isRequired}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label={REGISTER_LABELS.permanentAccNumber}
              name="pan"
              component={InputTextField}
              type="text"
              validate={isRequired}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label={REGISTER_LABELS.aadharNumber}
              name="aadhar"
              component={InputTextField}
              type="text"
              validate={AdhaarValid}
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
            />
            <OnChange name="phoneNumber">
              {() => {
                setIsMobExist(false);
                setAPICall(false);
              }}
            </OnChange>
            {values?.phoneNumber?.length == 12 && isAPICall && !isMobExist && (
              <span className={HelpStyles['danger']}>Phone Already in Use.</span>
            )}
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label={REGISTER_LABELS.emailLabel}
              name="email"
              component={InputTextField}
              type="text"
              onBlur={(e) => checkEmailExst(e.target.value)}
              validate={isEmailValid}
            />
          </Grid>
          {userType == 2 && (
            <>
              <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
                <Box>
                  <Field
                    label={REGISTER_LABELS.countryLabel}
                    name="Country"
                    component={CountrySelectorContainer}
                    validate={isRequired}
                  />
                  <OnChange name="Country">
                    {(a) => {
                      (values.State = null), (values.City = null);
                      setCI(a?.key);
                      setSI(null);
                    }}
                  </OnChange>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
                <Box>
                  <Field
                    label="State"
                    name="State"
                    component={StateSelectorContainer}
                    className={HelpStyles['input']}
                    InputValue={values?.State}
                    countryId={ci}
                    validate={isRequired}
                  />
                  <OnChange name="State">
                    {(a) => {
                      values.City = null;
                      setSI(a?.key);
                    }}
                  </OnChange>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
                <Box>
                  <Field
                    label={REGISTER_LABELS.cityLabel}
                    name="City"
                    component={CitySelectorContainer}
                    countryId={ci}
                    InputValue={values?.City}
                    districtId={si}
                  />
                </Box>
              </Grid>
            </>
          )}
        </Grid>
      </>
    );
  };
  const getLocation = (values) => {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Address"
              name="Address1Permanent"
              component={InputTextField}
              validate={isRequired}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Address Type"
              name="permanentTypeAddress"
              options={[{ label: 'Permanent' }, { label: 'Rented' }]}
              component={InputAutoCompleteField}
              validate={isRequired}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field label="Country" name="countryPermanent" component={CountrySelectorContainer} />
            <OnChange name="countryPermanent">
              {(a) => {
                (values.statePermanent = null), (values.cityPermanent = null);
                setperAddCI(a?.key);
                setperAddSI(null);
              }}
            </OnChange>
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="State"
              name="statePermanent"
              component={StateSelectorContainer}
              InputValue={values?.statePermanent}
              countryId={perAddci}
            />
            <OnChange name="statePermanent">
              {(a) => {
                values.cityPermanent = null;
                setperAddSI(a?.key);
              }}
            </OnChange>
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Box>
              <Field
                label="City"
                name="cityPermanent"
                className={HelpStyles['input']}
                component={CitySelectorContainer}
                countryId={perAddci}
                InputValue={values?.cityPermanent}
                districtId={perAddsi}
              />
            </Box>
          </Grid>
        </Grid>
      </>
    );
  };
  const getWork = (values) => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
          <Field
            label="Address"
            name="Address1Work"
            component={InputTextField}
            validate={isRequired}
          />
        </Grid>
        <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
          <Field
            label="Address Type"
            name="workTypeAddress"
            options={[{ label: 'Permanent' }, { label: 'Rented' }]}
            component={InputAutoCompleteField}
            validate={isRequired}
          />
        </Grid>
        <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
          <Field label="Country" name="countryWork" component={CountrySelectorContainer} />
          <OnChange name="countryWork">
            {(a) => {
              (values.stateWork = null), (values.cityWork = null);
              setworkAddCI(a?.key);
              setworkAddSI(null);
            }}
          </OnChange>
        </Grid>
        <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
          <Field
            label="State"
            name="stateWork"
            component={StateSelectorContainer}
            InputValue={values?.stateWork}
            countryId={workAddci}
          />
          <OnChange name="stateWork">
            {(a) => {
              values.cityWork = null;
              setworkAddSI(a?.key);
            }}
          </OnChange>
        </Grid>
        <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
          <Field
            label="City"
            name="cityWork"
            className={HelpStyles['input']}
            component={CitySelectorContainer}
            countryId={workAddci}
            InputValue={values?.cityWork}
            districtId={workAddsi}
          />
        </Grid>
      </Grid>
    );
  };
  const getAccountDetails = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} className={HelpStyles['input_field']}>
          <Field
            label="Bank Account Number"
            name="accountNumber"
            component={InputTextField}
            InputProps={{ inputProps: { min: 0, type: 'number' } }}
            validate={isRequired}
          />
        </Grid>
        <Grid item xs={12} sm={12} className={HelpStyles['input_field']}>
          <Field
            label="Confirm Bank Account Number"
            name="ConfirmAccNumber"
            component={InputTextField}
            InputProps={{ inputProps: { min: 0, type: 'number' } }}
            validate={isRequired}
          />
        </Grid>
        <Grid item xs={12} sm={12} className={HelpStyles['input_field']}>
          <Field
            label="Account Name"
            name="accountHolder"
            component={InputTextField}
            type="text"
            validate={isRequired}
          />
        </Grid>
        <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
          <Field
            label="IFSC Code"
            name="IfscCode"
            component={InputTextField}
            type="text"
            validate={isIfscRequired}
          />
        </Grid>
        <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
          <Field
            label="Account Type"
            name="accountType"
            options={[{ label: 'Saving' }, { label: 'Current' }]}
            component={InputAutoCompleteField}
            type="select"
            validate={isRequired}
          />
        </Grid>
      </Grid>
    );
  };
  const registerSubmit = (e) => {
    e.isComplete = true;
    e.isMobileVerified = isMobExist;
    e.isEmailVerified = isEmailExist;
    if (isMobExist && isEmailExist) {
      let data = {
        RoleId: userType,
        vendorId: formDatas.GUID
      };
      if (userType == 5) {
        e.Country = { id: formDatas?.CountryId };
        e.State = { id: formDatas?.StateId };
        e.City = { id: formDatas?.CityId };
      }
      setOpen(true);
      dispatch(addVendorUser(getFormattedValuesForAddVendorUser(data, e)));
      setVendorLoader(true);
    }
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
        if (isEmailExist === 0 && email) {
          errors.email = 'Email already in used';
        }
        if (isMobExist === 1) {
          errors.phoneNumber = 'Phone already in used';
        }
        return errors;
      }}
      render={({ handleSubmit, values }) => (
        <>
          <Grid as="form" onSubmit={handleSubmit}>
            <Container className={HelpStyles['container']} onSubmit={handleSubmit}>
              <>
                <CustomAccordian
                  className={HelpStyles['element_container']}
                  handleAccordionChange={handleAccordionChange}
                  expandAccordion={expandAccordion}
                  title={addConstants.generalInformation}
                  description={<>{getGeneralInformation(values)}</>}
                  id={1}
                  key={1}
                />
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
                  {onSubmitSuccess == 'success' ? 'User Created Sucessfully' : 'failed'}
                </AlertBox>
              </Snackbar>
            )}
            {vendorLoader && <Loader />}
          </Grid>
        </>
      )}></Form>
  );
};

AddExecutive.propTypes = {
  userType: PropTypes.any
};

export default AddExecutive;

const AlertBox = forwardRef(function SbAlert(props, ref) {
  return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});
