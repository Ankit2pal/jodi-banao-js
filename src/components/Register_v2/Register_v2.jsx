import React, { useEffect, useState } from 'react';
import { Grid, Box, Button } from '@mui/material';
import RegisterStyles from './Register_v2.module.scss';
import { InputAutoCompleteField, InputTextField, PhoneNumberField } from '../../commons';
import { isRequired } from '../../validators';
import { Field, Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { shortRegistration } from '../../redux/modules/registerSlice';
import { checkPhoneExist } from '../../utils/validationHelpers';
import { OnChange } from 'react-final-form-listeners';
import { getGender } from '../../redux/selectors/registerSelector';
import { fetchRegisterationDetails } from '../../redux/modules/registerationDetailsSlice';
const Register = () => {
  const creatingForGenderOptionalData = useSelector(getGender);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobExist, setIsMobExist] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isAPICall, setAPICall] = useState(false);

  const preSubmit = (values) => {
    dispatch(shortRegistration(values));
    navigate('/basic-registration');
  };
  const checkMobExst = async (value) => {
    if (value.length == 13) {
      let isMobExist = await checkPhoneExist(value);
      setAPICall(true);
      setIsMobExist(isMobExist ? true : false);
    }
  };
  useEffect(() => {
    dispatch(fetchRegisterationDetails());
  }, []);
  return (
    <Form
      onSubmit={(values) => preSubmit(values)}
      validate={(values) => {
        const errors = {};
        if (!values.gender) {
          errors.gender = 'Required';
        }
        if (values?.phoneNumber?.substring(0, 2) === '91' && values?.phoneNumber?.length !== 12) {
          errors.phoneNumber = 'Please enter correct number';
        }
        if (isMobExist === false) {
          checkMobExst(`+${values.phoneNumber}`);
          errors.phoneNumber = 'Phone already in used';
        }
        return errors;
      }}
      render={({ handleSubmit, values }) => (
        <>
          <Box
            as="form"
            onSubmit={handleSubmit}
            sx={{ justifyContent: { xs: 'center', lg: 'flex-start' } }}
            className={RegisterStyles['banner_container']}
            id="banner-container">
            <Box className={RegisterStyles['register_container']}>
              <Box as="h1" className={RegisterStyles['join_text']}>
                Join us to find your perfect match
              </Box>
              <Box
                sx={{
                  padding: { xs: '10px', lg: '0 20px' },
                  marginBottom: { xs: '25px', lg: '0' }
                }}
                className={RegisterStyles['register_box']}>
                <Grid container className={RegisterStyles['register_form']}>
                  <Grid item xs={12} lg={2.9} className={RegisterStyles['label_container']}>
                    <Box as="span" className={RegisterStyles['label']}>
                      Your name
                    </Box>
                    <Field
                      hiddenLabel
                      size="small"
                      name="groomName"
                      component={InputTextField}
                      id="outlined-basic"
                      type="text"
                      variant="outlined"
                      placeholder="John Doe"
                      className={RegisterStyles['text_field']}
                      validate={isRequired}
                    />
                  </Grid>
                  <Grid item xs={12} lg={2.9} className={RegisterStyles['label_container']}>
                    <Box as="span" className={RegisterStyles['label']}>
                      Gender
                    </Box>
                    <Field
                      size="small"
                      name="gender"
                      type="select"
                      options={creatingForGenderOptionalData}
                      component={InputAutoCompleteField}
                      placeholder="Gender"
                      validate={isRequired}
                      className={RegisterStyles['text_field']}
                    />
                  </Grid>
                  <Grid item xs={12} lg={2.9} className={RegisterStyles['label_container']}>
                    <Box as="span" className={RegisterStyles['label']}>
                      Phone number
                    </Box>
                    <Field
                      hiddenLabel
                      name="phoneNumber"
                      component={PhoneNumberField}
                      id="outlined-basic"
                      onBlur={(e) => checkMobExst(e.target.value)}
                      variant="outlined"
                      validate={isRequired}
                      className={RegisterStyles['text_field_phone']}
                    />{' '}
                    <OnChange name="phoneNumber">
                      {() => {
                        setIsMobExist(false);
                        setAPICall(false);
                        setIsSubmit(false);
                      }}
                    </OnChange>
                    {values?.phoneNumber?.length == 12 && isAPICall && !isMobExist && (
                      <span className={RegisterStyles['danger']}>Phone is already used.</span>
                    )}
                    {values?.phoneNumber?.substring(0, 2) === '91' &&
                      isSubmit &&
                      values?.phoneNumber?.length !== 12 && (
                        <span className={RegisterStyles['danger']}>
                          Please enter correct number.
                        </span>
                      )}
                  </Grid>
                  <Grid item xs={12} lg={2.8} className={RegisterStyles['label_container']}>
                    <Button
                      type="submit"
                      onClick={() => {
                        setIsSubmit(true);
                      }}
                      className={RegisterStyles['submit']}>
                      Get Started
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </>
      )}></Form>
  );
};
export default Register;
