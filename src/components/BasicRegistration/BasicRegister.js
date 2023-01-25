import { Box, Button } from '@mui/material';
import { Form, Field } from 'react-final-form';
import { InputAutoCompleteField, InputTextField } from '../../commons';
import { useDispatch } from 'react-redux';
import { isRequired } from '../../validators';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import BasicRegisterStyles from './BasicRegister.module.scss';
import { REGISTER_LABELS } from '../../constants/registerConstants';
import { PhoneNumberField } from '../../commons/PhoneNumberField';
import { checkPhoneExist } from '../../utils/validationHelpers';
import React, { useState } from 'react';
import { shortRegistration } from '../../redux/modules/registerSlice';
import { OnChange } from 'react-final-form-listeners';

const BasicRegister = ({ creatingForGenderOptionalData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobExist, setIsMobExist] = useState(false);
  const [isAPICall, setAPICall] = useState(false);

  const preSubmit = (values) => {
    dispatch(shortRegistration(values));
    navigate('/basic-registration');
  };
  const checkMobExst = async (value) => {
    let isMobExist = await checkPhoneExist(value);
    setAPICall(true);
    setIsMobExist(isMobExist ? true : false);
  };
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
        if (isMobExist === 1) {
          errors.phoneNumber = 'Phone already in used';
        }
        return errors;
      }}
      render={({ handleSubmit, values }) => (
        <>
          <Grid as="form" onSubmit={handleSubmit} className={BasicRegisterStyles['box_form']}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Box className={BasicRegisterStyles['box_groom_name']}>
                  <Field
                    label={REGISTER_LABELS.groomName}
                    name={'groomName'}
                    component={InputTextField}
                    type="text"
                    validate={isRequired}
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box as="div">
                  <Field
                    label={REGISTER_LABELS.genderLabel}
                    name="gender"
                    options={creatingForGenderOptionalData}
                    component={InputAutoCompleteField}
                    type="select"
                    validate={isRequired}
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box
                  className={BasicRegisterStyles['box_phone_number']}
                  sx={{
                    '&:hover': {
                      'input, .flag-dropdown': {
                        border: '1px solid #000'
                      }
                    }
                  }}>
                  <Field
                    label={REGISTER_LABELS.phoneNumberLabel}
                    name="phoneNumber"
                    component={PhoneNumberField}
                    type="text"
                    onBlur={(e) => checkMobExst(e.target.value)}
                    className={BasicRegisterStyles['phn_box']}
                    validate={isRequired}
                  />
                  <OnChange name="phoneNumber">
                    {() => {
                      setIsMobExist(false);
                      setAPICall(false);
                    }}
                  </OnChange>
                </Box>
                {values?.phoneNumber?.length == 12 && isAPICall && !isMobExist && (
                  <span className={BasicRegisterStyles['danger']}>Phone Already in Use.</span>
                )}
              </Grid>
              <Grid item xs={12} md={3}>
                <Box as="div" className={BasicRegisterStyles['reg_btn_container']}>
                  <Button
                    size="normal"
                    type="submit"
                    variant="contained"
                    className={BasicRegisterStyles['button_register']}
                    sx={{ width: { md: '100%' } }}>
                    {REGISTER_LABELS.register}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}></Form>
  );
};
BasicRegister.propTypes = {
  creatingForGenderOptionalData: PropTypes.func
};

export default BasicRegister;
