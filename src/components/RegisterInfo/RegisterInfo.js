import { Box, Button, InputLabel, Link, Snackbar, Alert, Container } from '@mui/material';
import { Form, Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import {
  CheckboxField,
  DatePickerField,
  GenderSelectField,
  InputAutoCompleteField,
  InputTextField,
  Modal
} from '../../commons';
import { useSelector } from 'react-redux';
import { CasteSelectorContainer } from '../../containers/CasteSelectorContainer';
import { CitySelectorContainer } from '../../containers/CitySelectorContainer';
import { CountrySelectorContainer } from '../../containers/CountrySelectorContainer';
import { LanguageSelectorContainer } from '../../containers/LanguageSelectorContainer';
import { ReligionSelectorContainer } from '../../containers/ReligionSelectorContainer';
import { StateSelectorContainer } from '../../containers/StateSelectorContainer';
import { composeValidators, isEmailValid, isRequired, ValidatePwd } from '../../validators';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import RegisterInfoStyles from './RegisterInfo.module.scss';
import { REGISTER_LABELS } from '../../constants/registerConstants';
import { PhoneNumberField } from '../../commons/PhoneNumberField';
import { checkEmailExist, checkPhoneExist } from '../../utils/validationHelpers';
import React, { useState, forwardRef, useEffect } from 'react';
import LoginHeaderContainer from '../../containers/LoginHeaderContainer';
import { FooterDetails } from '../FooterDetails_v2';
import { termsAndConditionConstants } from '../../constants/termsAndConditionConstants';
import TermsAndCondition from '../TermsAndCondition/TermsAndCondition';
import { PostalCodeContainer } from '../../containers/PostalCodeContainer';
import Loader from '../../commons/Loader/Loader';

const MAX_AGE = new Date();
MAX_AGE.setFullYear(MAX_AGE.getFullYear() - 18);
const RegisterInfo = ({
  registerSubmit,
  handleTermsAndConditionsModalOpen,
  handleTermsAndConditionsModalClose,
  openTermsAndConditionsModal,
  creatingForOptionalData,
  creatingForMaritalStatusOptionalData
}) => {
  const [cid, setCID] = useState();
  const [sid, setSID] = useState();
  const [did, setDID] = useState();
  const [cas, setCas] = useState();
  const shortRegDetail = useSelector((state) => state?.formRegisterationDetails);
  const [postalCode, setPostalCode] = useState(0);
  console.log(did);
  const [loader, setLoader] = useState(false);
  const [emailCheckd, setEmailCheck] = useState(false);
  const [termsSnackBar, setTermsSnackBar] = useState(false);
  const [isMobExist, setIsMobExist] = useState(0);
  const [emailUsed, setEmailUsed] = useState(false);

  const emailCheck = async (value) => {
    const res = await checkEmailExist(value);
    setEmailCheck(res);
    setEmailUsed(true);
  };

  const checkMobExst = async (value) => {
    if (value.length == 13 || value.length == 15) {
      let isMobExist = await checkPhoneExist(value);
      setIsMobExist(isMobExist ? 1 : 0);
    }
  };

  useEffect(() => {
    checkMobExst(`+${shortRegDetail?.phoneNumber}`);
  }, []);

  const preSubmit = (values) => {
    if (!values.terms_and_condition) {
      setTermsSnackBar(true);
    } else {
      if (isMobExist) {
        setTermsSnackBar(false);
        setLoader(true);
        registerSubmit(values);
      }
    }
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);
  return (
    <>
      <LoginHeaderContainer />
      {loader && <Loader />}
      <Modal
        id="terms-and-condition"
        title="Terms And Conditions"
        handleClose={handleTermsAndConditionsModalClose}
        open={openTermsAndConditionsModal}
        fullWidth={true}
        maxWidth={'sm'}
        buttons={[
          {
            id: 'terms-and-condition-id',
            label: 'Agree',
            handler: handleTermsAndConditionsModalClose,
            isDisabled: false,
            className: ''
          }
        ]}>
        <TermsAndCondition conditionData={termsAndConditionConstants.data} />
      </Modal>
      <Container maxWidth="auto" className={RegisterInfoStyles['box_container']}>
        <Form
          onSubmit={(values) => preSubmit(values)}
          validate={(values) => {
            const errors = {};
            // if (!values.gender) {
            //   errors.gender = 'Required';
            // }
            // checkMobExst(`+${values.phoneNumber}`);
            if (isMobExist === 0) {
              errors.phoneNumber = 'Phone already in used';
            }
            if (!values.reenter_password) {
              errors.reenter_password = 'Required';
            } else if (values.reenter_password !== values.password) {
              errors.reenter_password = 'Must match password field';
            }
            let MAX_AGE = new Date();
            MAX_AGE.setFullYear(MAX_AGE.getFullYear() - 18);
            let dateString = new Date(values.dateOfBirth);
            if (dateString > MAX_AGE) {
              errors.dateOfBirth = 'Age should be min 18 years.';
            } else {
              dateString = dateString.toLocaleDateString();
              if (dateString == 'Invalid Date') {
                errors.dateOfBirth = 'Invalid date format.';
              }
            }
            if (!emailCheckd && emailUsed) {
              errors.email = 'Already Email In Use';
            }
            // if (!phoneCheck) {
            //   errors.phoneNumber = 'Already Number In Use';
            // }
            if (
              values?.phoneNumber?.substring(0, 2) === '91' &&
              values?.phoneNumber?.length !== 12
            ) {
              errors.phoneNumber = 'Please enter correct number';
            }
            return errors;
          }}
          render={({ handleSubmit, values }) => (
            <>
              <Container className={RegisterInfoStyles['form_container']}>
                <Grid as="form" onSubmit={handleSubmit} className={RegisterInfoStyles['box_form']}>
                  <Grid container spacing={2}>
                    <Grid item xs className={RegisterInfoStyles['box_top_wrapper']}>
                      <Grid item xs={12} className={RegisterInfoStyles['box_creating_wrapper']}>
                        <Box className={RegisterInfoStyles['box_creating_fosr']}>
                          <Field
                            label={REGISTER_LABELS.creatingFor}
                            name="creatingFor"
                            options={creatingForOptionalData}
                            component={InputAutoCompleteField}
                            validate={isRequired}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} className={RegisterInfoStyles['box_gender_wrapper']}>
                        <InputLabel className={RegisterInfoStyles['input_gender_label']}>
                          {REGISTER_LABELS.genderLabel}
                        </InputLabel>
                        <Box as="div">
                          <Field
                            label={REGISTER_LABELS.genderLabel}
                            name="gender"
                            component={GenderSelectField}
                            inputvalue={shortRegDetail?.gender?.GenderName}
                            type="select"
                            // validate={isRequired}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Box className={RegisterInfoStyles['box_groom_name']}>
                        <Field
                          label={REGISTER_LABELS.groomName}
                          name={'groomName'}
                          component={InputTextField}
                          initialValue={shortRegDetail?.groomName}
                          type="text"
                          validate={isRequired}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} className={RegisterInfoStyles['box_date_of_birth_wrapper']}>
                      <InputLabel className={RegisterInfoStyles['date_of_birth_label']}>
                        {REGISTER_LABELS.dateOfBirth}
                      </InputLabel>
                      <Box as="div" className={RegisterInfoStyles['date_picker']}>
                        <Field
                          label={REGISTER_LABELS.dateFormat}
                          name="dateOfBirth"
                          component={DatePickerField}
                          validate={isRequired}
                          maxage={MAX_AGE}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box className={RegisterInfoStyles['box_mother_tongue']}>
                        <Field
                          label={REGISTER_LABELS.motherTongue}
                          name="motherTongue"
                          component={LanguageSelectorContainer}
                          validate={isRequired}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box className={RegisterInfoStyles['box_religion']}>
                        <Field
                          label={REGISTER_LABELS.religion}
                          name="religion"
                          component={ReligionSelectorContainer}
                          validate={isRequired}
                        />
                        <OnChange name="religion">
                          {(a) => {
                            values.caste = null;
                            setCas(a?.id);
                          }}
                        </OnChange>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box className={RegisterInfoStyles['box_caste']}>
                        <Field
                          label={REGISTER_LABELS.caste}
                          name="caste"
                          component={CasteSelectorContainer}
                          religionId={cas}
                          InputValue={values.caste}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box className={RegisterInfoStyles['box_country']}>
                        <Field
                          label={REGISTER_LABELS.countryLabel}
                          name="country"
                          component={CountrySelectorContainer}
                          validate={isRequired}
                        />
                        <OnChange name="country">
                          {(a) => {
                            (values.state = ''), (values.city = ''), (values.district = '');
                            setCID(a === null ? null : a?.key);
                            setSID(null);
                            setDID(null);
                          }}
                        </OnChange>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box className={RegisterInfoStyles['box_state']}>
                        <Field
                          label={REGISTER_LABELS.stateLabel}
                          name="state"
                          component={StateSelectorContainer}
                          countryId={cid}
                          validate={isRequired}
                          InputValue={values?.state}
                        />
                        <OnChange name="state">
                          {(a) => {
                            (values.city = ''), (values.district = '');
                            setSID(a?.key);
                            setDID(null);
                          }}
                        </OnChange>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box className={RegisterInfoStyles['box_city']}>
                        <Field
                          label={REGISTER_LABELS.cityLabel}
                          name="city"
                          component={CitySelectorContainer}
                          districtId={sid}
                          countryId={cid}
                          InputValue={values?.city}
                          validate={isRequired}
                        />
                        <OnChange name="city">{() => {}}</OnChange>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box className={RegisterInfoStyles['box_village']}>
                        <Field
                          label={REGISTER_LABELS.villageLabel}
                          name="village"
                          component={InputTextField}
                          type="text"
                          validate={isRequired}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box className={RegisterInfoStyles['box_postal_code']}>
                        <Field
                          label={REGISTER_LABELS.postalCodeLabel}
                          name="Postcode"
                          component={PostalCodeContainer}
                          type="number"
                          validate={isRequired}
                          InputValue={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box className={RegisterInfoStyles['box_phone_number']}>
                        <Field
                          label={REGISTER_LABELS.phoneNumberLabel}
                          name="phoneNumber"
                          component={PhoneNumberField}
                          type="text"
                          initialValue={shortRegDetail?.phoneNumber}
                          onBlur={(e) => checkMobExst(e.target.value)}
                          className={RegisterInfoStyles['phn_box']}
                          // validate={isRequired}
                        />
                      </Box>
                      {!isMobExist &&
                        values?.phoneNumber?.length > 0 &&
                        values?.phoneNumber !== shortRegDetail?.phoneNumber && (
                          <span className={RegisterInfoStyles['danger']}>
                            Phone Already in Use.
                          </span>
                        )}
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box className={RegisterInfoStyles['box_marital_status']}>
                        <Field
                          label={REGISTER_LABELS.maritalStatusLabel}
                          name="maritalStatus"
                          type="select"
                          options={creatingForMaritalStatusOptionalData}
                          component={InputAutoCompleteField}
                          className={RegisterInfoStyles['marital_input']}
                          validate={isRequired}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Box className={RegisterInfoStyles['box_email']}>
                        <Field
                          label={REGISTER_LABELS.emailLabel}
                          name="email"
                          component={InputTextField}
                          type="text"
                          validate={composeValidators(isRequired, isEmailValid)}
                          onBlur={(e) => emailCheck(e.target.value)}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box className={RegisterInfoStyles['box_password']}>
                        <Field
                          label={REGISTER_LABELS.passwordLabel}
                          name="password"
                          component={InputTextField}
                          type="password"
                          validate={composeValidators(isRequired, ValidatePwd)}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box className={RegisterInfoStyles['box_reenter_password']}>
                        <Field
                          label={REGISTER_LABELS.reEnterPasswordLabel}
                          name={'reenter_password'}
                          component={InputTextField}
                          type="password"
                          validate={isRequired}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box className={RegisterInfoStyles['vendor-id']}>
                        <Field
                          label={REGISTER_LABELS.vendorId}
                          name="VendorId"
                          component={InputTextField}
                          type="text"
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}></Grid>
                    <Grid
                      item
                      xs={12}
                      md={6}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignItems: 'center'
                      }}>
                      <Field name="terms_and_condition" component={CheckboxField} type="checkbox" />
                      <Link
                        underline="none"
                        name="terms_and_condition"
                        className={RegisterInfoStyles['terms_and_condition_note']}
                        onClick={handleTermsAndConditionsModalOpen}>
                        {REGISTER_LABELS.termsAndConditionsNote}
                      </Link>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box as="div">
                        <Button
                          size="large"
                          type="submit"
                          variant="contained"
                          className={RegisterInfoStyles['button_register']}>
                          {REGISTER_LABELS.submit}
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Container>
              <Snackbar open={termsSnackBar} autoHideDuration={1000}>
                <AlertBox
                  autoHideDuration={1000}
                  severity={termsSnackBar ? 'error' : 'success'}
                  sx={{ width: '100%' }}>
                  {termsSnackBar
                    ? 'Please accept Terms and Conditions'
                    : 'Terms and Conditions Accepted'}
                </AlertBox>
              </Snackbar>
            </>
          )}></Form>
      </Container>
      <FooterDetails />
    </>
  );
};

RegisterInfo.propTypes = {
  registerSubmit: PropTypes.func,
  handleTermsAndConditionsModalOpen: PropTypes.func,
  handleTermsAndConditionsModalClose: PropTypes.func,
  openTermsAndConditionsModal: PropTypes.func,
  creatingForOptionalData: PropTypes.array,
  creatingForMaritalStatusOptionalData: PropTypes.array
};

RegisterInfo.defaultProps = {
  registerSubmit: () => {}
};

export default RegisterInfo;

const AlertBox = forwardRef(function SbAlert(props, ref) {
  return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});
