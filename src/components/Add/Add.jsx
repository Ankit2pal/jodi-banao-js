import React, { forwardRef } from 'react';
import { useEffect } from 'react';
import { OnChange } from 'react-final-form-listeners';
import { isRequired, isWeight } from '../../validators';
import {
  Button,
  Box,
  Container,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  Snackbar,
  Alert
} from '@mui/material';
import AddExecutive from '../AddExecutive/AddExecutive';
import CustomAccordian from '../../commons/accordion';
import HelpStyles from './add.module.scss';
import { REGISTER_LABELS } from '../../constants/registerConstants';
import { PhoneNumberField } from '../../commons/PhoneNumberField';
import { checkEmailExist, checkPhoneExist } from '../../utils/validationHelpers';
import { addConstants } from '../../constants/addConstants';
import { Field, Form } from 'react-final-form';
import { getCreatingFor, getMaritalStatus } from '../../redux/selectors/registerSelector';
import { DatePickerField, GenderSelectField } from '../../commons';
import { CasteSelectorContainer } from '../../containers/CasteSelectorContainer';
import { CitySelectorContainer } from '../../containers/CitySelectorContainer';
import { CountrySelectorContainer } from '../../containers/CountrySelectorContainer';
import { LanguageSelectorContainer } from '../../containers/LanguageSelectorContainer';
import { ReligionSelectorContainer } from '../../containers/ReligionSelectorContainer';
import { StateSelectorContainer } from '../../containers/StateSelectorContainer';
import { useSelector, useDispatch } from 'react-redux';
import { InputAutoCompleteField, InputTextField } from '../../commons';
import { fetchRegisterationDetails } from '../../redux/modules/registerationDetailsSlice';
import { useState } from 'react';
import { addVendorUser } from '../../redux/modules/vendorByUserAdd';
import { getFormattedValuesForAddVendorUser } from '../../utils/addVendorUser';
import {
  getDropDownOptionsForFamilyRegister,
  getOptionsForProfessionalInformation
} from '../../redux/selectors/registerationDetailsSelector';
import { getFormattedValuesForEditProfile } from '../../utils/edditProfile';
import { fetchEditProfile } from '../../redux/modules/editProfileSlice';
import { getUID } from '../../redux/selectors/loginSelector';
import InputAutoCompleteFieldCategory from '../../commons/InputAutoCompleteField/InputAutoCompleteFieldCategory';
import { STEPS_LABELS } from '../../constants/stepsConsntants';
import { PostalCodeContainer } from '../../containers/PostalCodeContainer';
import Loader from '../../commons/Loader/Loader';
const MAX_AGE = new Date();
MAX_AGE.setFullYear(MAX_AGE.getFullYear() - 18);

const Add = () => {
  const dispatch = useDispatch();

  function newData(ID, name, label, key) {
    this.ID = ID;
    this.name = name;
    this.label = label;
    this.key = key;
  }
  const formDatas = useSelector((state) => state.userRegisterationDetails.data);
  const newUserID = useSelector((state) => state.addVendorUser.data);
  const dropDownOptions = useSelector(getOptionsForProfessionalInformation);
  const dropDownFamilyOptions = useSelector(getDropDownOptionsForFamilyRegister);
  const { stars } = dropDownFamilyOptions;
  const [ci, setCI] = useState();
  const [si, setSI] = useState();
  const [partnerci, setpartnerCI] = useState();
  const [partnersi, setpartnerSI] = useState();
  const [perAddci, setperAddCI] = useState();
  const [perAddsi, setperAddSI] = useState();
  const [workAddci, setworkAddCI] = useState();
  const [workAddsi, setworkAddSI] = useState();
  const [isEmailExist, setIsEmailExist] = useState(0);
  const { familyTypes, familyStatus } = dropDownFamilyOptions;
  const {
    bodyTypes,
    complexions,
    physicalStatus,
    highestEducation,
    occupations,
    employeeTypes,
    annualIncomes,
    heights
  } = dropDownOptions;

  const Weight = new newData(1, formDatas?.Weight, formDatas?.Weight, formDatas?.Weight);

  useEffect(() => {
    dispatch(fetchRegisterationDetails());
  }, []);

  const [userType, setUserType] = useState('1');
  let onSubmitSuccess = useSelector((state) => state.editProfile.data.Status);
  const onCreateSuccess = useSelector((state) => state.addVendorUser.data.Status);
  const [isMobExist, setIsMobExist] = useState(false);
  const [isAPICall, setAPICall] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setShowLoader(false);
    setOpen(false);
  };
  const [castes, setCastes] = useState();

  const [newUser, setNewUSer] = useState(false);
  const [email, setEmail] = useState(false);
  const [postalCode, setPostalCode] = useState(0);
  const getGeneralInformation = (values) => {
    const creatingForOptionalData = useSelector(getCreatingFor);
    const creatingForMaritalStatusOptionalData = useSelector(getMaritalStatus);
    const checkEmailExst = async (value) => {
      let isEmlExist = await checkEmailExist(value);
      setIsEmailExist(isEmlExist ? 1 : 0);
      setShowLoader(false);
      setEmail(true);
    };
    const checkMobExst = async (value) => {
      let isMobExist = await checkPhoneExist(value);
      setShowLoader(false);
      setAPICall(true);
      setIsMobExist(isMobExist ? true : false);
    };

    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label={REGISTER_LABELS.creatingFor}
              name="creatingFor"
              options={creatingForOptionalData}
              component={InputAutoCompleteField}
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
              label={REGISTER_LABELS.maritalStatusLabel}
              name="maritalStatus"
              options={creatingForMaritalStatusOptionalData}
              component={InputAutoCompleteField}
              validate={isRequired}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label={REGISTER_LABELS.groomName}
              name={'FullName'}
              component={InputTextField}
              type="text"
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
              label={REGISTER_LABELS.motherTongue}
              name="Language"
              component={LanguageSelectorContainer}
              validate={isRequired}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Box>
              <Field
                label={REGISTER_LABELS.religion}
                name="Religion"
                component={ReligionSelectorContainer}
                validate={isRequired}
              />
              <OnChange name="Religion">
                {(a) => {
                  values.Caste = null;
                  setCastes(a?.id);
                }}
              </OnChange>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Box>
              <Field
                label={REGISTER_LABELS.caste}
                name="Caste"
                component={CasteSelectorContainer}
                religionId={castes}
                InputValue={values?.Caste}
                validate={isRequired}
              />
              <OnChange name="caste">{() => {}}</OnChange>
            </Box>
          </Grid>
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
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label={REGISTER_LABELS.villageLabel}
              name="village"
              component={InputTextField}
              type="text"
              validate={isRequired}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label={REGISTER_LABELS.postalCodeLabel}
              name="Postcode"
              component={PostalCodeContainer}
              type="text"
              InputValue={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              validate={isRequired}
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
              validate={isRequired}
            />
            {!isEmailExist && values?.email?.length > 0 && email ? (
              <span className={HelpStyles['danger']}>Email Already in Use.</span>
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      </>
    );
  };
  const getFamily = () => {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Family Type"
              name="FamilyType"
              component={InputAutoCompleteField}
              options={familyTypes}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label={STEPS_LABELS.familyStatus}
              name="familyStatus"
              options={familyStatus}
              component={InputAutoCompleteField}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field label="Father's Surname" name="FatherSurname" component={InputTextField} />
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field label="Father Name" name="FatherName" component={InputTextField} />
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Father Occupation"
              name="FatherOccupation"
              optionLabel={'OccupationName'}
              component={InputAutoCompleteFieldCategory}
              type="text"
              options={occupations}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field label="Mother's Surname" name="MotherSurname" component={InputTextField} />
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field label="Mother Name" name="MotherName" component={InputTextField} />
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Mother's Occupation"
              name="MotherOccupation"
              optionLabel={'OccupationName'}
              component={InputAutoCompleteFieldCategory}
              type="text"
              options={occupations}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="No. Of Brothers"
              name="brotherNum"
              InputProps={{ inputProps: { min: 0, max: 10, type: 'number' } }}
              component={InputTextField}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="No. Of Sisters"
              name="sisterNum"
              InputProps={{ inputProps: { min: 0, max: 10, type: 'number' } }}
              component={InputTextField}
            />
          </Grid>
        </Grid>
      </>
    );
  };
  const getPhysical = () => {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Body Type"
              name="BodyType"
              component={InputAutoCompleteField}
              options={bodyTypes}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Complexion"
              name="Complexion"
              component={InputAutoCompleteField}
              options={complexions}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Physical Status"
              name="physicalStatus"
              component={InputAutoCompleteField}
              options={physicalStatus}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Height"
              name="Height"
              component={InputAutoCompleteField}
              options={heights}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Weight"
              name="Weight"
              component={InputTextField}
              options={[Weight]}
              validate={isWeight}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Education"
              name="Education"
              optionLabel={'EducationName'}
              component={InputAutoCompleteFieldCategory}
              options={highestEducation}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Employment Type"
              name="employmentType"
              component={InputAutoCompleteField}
              options={employeeTypes}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Occupation"
              name="Occupation"
              optionLabel={'OccupationName'}
              component={InputAutoCompleteFieldCategory}
              options={occupations}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Annual Income"
              name="annualIncome"
              component={InputAutoCompleteField}
              options={annualIncomes}
            />
          </Grid>
        </Grid>
      </>
    );
  };
  const getPrtnerPreferences = (values) => {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Star"
              name="partnerStar"
              optionLabel={'StarsName'}
              component={InputAutoCompleteFieldCategory}
              options={stars}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Education"
              name="partnerEducation"
              optionLabel={'EducationName'}
              component={InputAutoCompleteFieldCategory}
              options={highestEducation}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Employee Type"
              name="partnerEmployeeType"
              component={InputAutoCompleteField}
              options={employeeTypes}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Occupation"
              optionLabel={'OccupationName'}
              name="partnerOccupation"
              component={InputAutoCompleteFieldCategory}
              options={occupations}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Annual Income"
              name="partnerAnnualIncome"
              component={InputAutoCompleteField}
              options={annualIncomes}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field label="Country" name="partnerCountry" component={CountrySelectorContainer} />
            <OnChange name="partnerCountry">
              {(a) => {
                (values.partnerState = null), (values.partnerCity = null);
                setpartnerCI(a?.key);
                setpartnerSI(null);
              }}
            </OnChange>
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="State"
              name="partnerState"
              component={StateSelectorContainer}
              InputValue={values?.partnerState}
              countryId={partnerci}
            />
            <OnChange name="partnerState">
              {(a) => {
                values.City = null;
                setpartnerSI(a?.key);
              }}
            </OnChange>
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="City"
              name="partnerCity"
              className={HelpStyles['input']}
              component={CitySelectorContainer}
              countryId={partnerci}
              InputValue={values?.partnerCity}
              districtId={partnersi}
            />
          </Grid>
        </Grid>
      </>
    );
  };
  const getLocation = (values) => {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field label="Address" name="Address1Permanent" component={InputTextField} />
          </Grid>
          <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
            <Field
              label="Address Type"
              name="permanentTypeAddress"
              options={[{ label: 'Permanent' }, { label: 'Rented' }]}
              component={InputAutoCompleteField}
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
            <Field
              label="City"
              name="cityPermanent"
              className={HelpStyles['input']}
              component={CitySelectorContainer}
              countryId={perAddci}
              InputValue={values?.cityPermanent}
              districtId={perAddsi}
            />
          </Grid>
        </Grid>
      </>
    );
  };
  const getWork = (values) => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
          <Field label="Address" name="Address1Work" component={InputTextField} />
        </Grid>
        <Grid item xs={12} sm={6} className={HelpStyles['input_field']}>
          <Field
            label="Address Type"
            name="workTypeAddress"
            options={[{ label: 'Permanent' }, { label: 'Rented' }]}
            component={InputAutoCompleteField}
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

  const [submit, setSubmit] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  useEffect(() => {
    if ((onCreateSuccess === 'success' || onSubmitSuccess === 'success') && submit) {
      if (onCreateSuccess === 'success') {
        handleAccordionChange(2);
      }
      setNewUSer(true);
      setOpen(true);
      onSubmitSuccess = 'success';
    }
  }, [onCreateSuccess, onSubmitSuccess]);
  const userIdFromLoginDetails = useSelector(getUID);
  const registerSubmit = (e) => {
    setShowLoader(true);
    e.isComplete = true;
    e.isMobileVerified = isMobExist;
    e.isEmailVerified = isEmailExist;
    let data = {
      RoleId: userType,
      vendorId: formDatas.GUID
    };
    setSubmit(true);
    if (isMobExist && isEmailExist) {
      !newUser
        ? dispatch(addVendorUser(getFormattedValuesForAddVendorUser(data, e)))
        : dispatch(
            fetchEditProfile(
              getFormattedValuesForEditProfile(e, newUserID?.Data?.id, userIdFromLoginDetails)
            )
          );
    }
  };

  const [expandAccordion, setExpandAccordion] = useState(0);
  const handleAccordionChange = (id) => {
    expandAccordion === id ? setExpandAccordion(0) : setExpandAccordion(id);
  };

  return (
    <Container className={HelpStyles['container']}>
      <RadioGroup
        aria-labelledby="demo-radio-buttons"
        value={userType}
        name="radio-buttons"
        className={HelpStyles['radio_group']}>
        <Box style={{ justifyContent: 'center' }}>
          <RadioGroup
            sx={{
              span: {
                '&.Mui-checked': {
                  color: '#fe3f46'
                }
              }
            }}
            className={HelpStyles['radio_container']}
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="1"
            row
            onChange={(e) => setUserType(e.target.value)}
            name="radio-buttons-group">
            {formDatas?.RoleId !== 5 && (
              <FormControlLabel value="1" control={<Radio />} label="User" />
            )}
            {formDatas?.RoleId == 2 && (
              <>
                <FormControlLabel value="5" control={<Radio />} label="Executive" />
              </>
            )}
            {(formDatas?.RoleId == 3 || formDatas?.RoleId == 4) && (
              <>
                <FormControlLabel value="2" control={<Radio />} label="Vendor" />
              </>
            )}
            {formDatas?.RoleId == 4 && (
              <>
                <FormControlLabel value="3" control={<Radio />} label="Admin" />
              </>
            )}
          </RadioGroup>
        </Box>
        {userType === '1' ? (
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
                    <CustomAccordian
                      className={HelpStyles['element_container']}
                      handleAccordionChange={handleAccordionChange}
                      expandAccordion={expandAccordion}
                      title={addConstants.generalInformation}
                      description={<>{getGeneralInformation(values)}</>}
                      id={1}
                      key={1}
                      disabled={newUser ? true : false}
                    />
                    {userType == '1' && (
                      <>
                        <CustomAccordian
                          className={HelpStyles['element_container']}
                          handleAccordionChange={handleAccordionChange}
                          expandAccordion={expandAccordion}
                          title={addConstants.physicalProffesioanInfo}
                          description={<ul>{getPhysical(values)}</ul>}
                          id={2}
                          key={2}
                          disabled={newUser ? false : true}
                        />
                        <CustomAccordian
                          className={HelpStyles['element_container']}
                          handleAccordionChange={handleAccordionChange}
                          expandAccordion={expandAccordion}
                          title={addConstants.familyDetails}
                          description={<ul>{getFamily(values)}</ul>}
                          id={3}
                          key={3}
                          disabled={newUser ? false : true}
                        />
                        <CustomAccordian
                          className={HelpStyles['element_container']}
                          title={addConstants.partnerPref}
                          description={<ul>{getPrtnerPreferences(values)}</ul>}
                          handleAccordionChange={handleAccordionChange}
                          expandAccordion={expandAccordion}
                          id={4}
                          key={4}
                          disabled={newUser ? false : true}
                        />
                        <CustomAccordian
                          className={HelpStyles['element_container']}
                          handleAccordionChange={handleAccordionChange}
                          expandAccordion={expandAccordion}
                          title={addConstants.location}
                          description={<ul>{getLocation(values)}</ul>}
                          id={5}
                          key={5}
                          disabled={newUser ? false : true}
                        />
                        <CustomAccordian
                          className={HelpStyles['element_container']}
                          title={addConstants.workAddress}
                          description={<ul>{getWork(values)}</ul>}
                          handleAccordionChange={handleAccordionChange}
                          expandAccordion={expandAccordion}
                          id={6}
                          key={6}
                          disabled={newUser ? false : true}
                        />
                      </>
                    )}
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
                  {open && (
                    <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
                      <AlertBox
                        autoHideDuration={1000}
                        severity={
                          onSubmitSuccess === 'success' || onCreateSuccess === 'success'
                            ? 'success'
                            : 'error'
                        }
                        onClose={handleClose}
                        sx={{ width: '100%' }}>
                        {onCreateSuccess === 'success' || onSubmitSuccess == 'success'
                          ? 'User Created Sucessfully'
                          : 'failed'}
                      </AlertBox>
                    </Snackbar>
                  )}
                  {showLoader && <Loader />}
                </Grid>
              </>
            )}></Form>
        ) : (
          <AddExecutive userType={userType} />
        )}
      </RadioGroup>
    </Container>
  );
};

export default Add;

const AlertBox = forwardRef(function SbAlert(props, ref) {
  return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});
