import React, { useState, useEffect } from 'react';
import { Field, Form } from 'react-final-form';
import PropTypes from 'prop-types';
import { Container, Box, Button, Grid } from '@mui/material';
import PermanentWorkingLocationStyles from './PermanentWorkingLocation.module.scss';
import Physicalreg from '../PhysicalRegister/PhysicalRegister.module.scss';
import { InputAutoCompleteField, InputTextField } from '../../commons';
import { STEPS_LABELS } from '../../constants/stepsConsntants';
import { CountrySelectorContainer } from '../../containers/CountrySelectorContainer';
import { StateSelectorContainer } from '../../containers/StateSelectorContainer';
import { CitySelectorContainer } from '../../containers/CitySelectorContainer';
import { isRequired } from '../../validators';
import { OnChange } from 'react-final-form-listeners';

const PermanentWorkingLocation = ({ initialValues, formSubmit, goToPrevTab }) => {
  const [pcid, setPCID] = useState();
  const [psid, setPSID] = useState();
  const [pdid, setPDID] = useState();
  const [wcid, setWCID] = useState();
  const [wsid, setWSID] = useState();
  const [wdid, setWDID] = useState();
  console.log(pdid, wdid);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);
  return (
    <>
      <Form
        onSubmit={formSubmit}
        initialValues={initialValues}
        render={({ handleSubmit, values }) => {
          return (
            <Container className={Physicalreg['box_form']}>
              <Box as="form" onSubmit={handleSubmit}>
                <p className={Physicalreg['text-hed']}>Permanent Location</p>
                <Grid container spacing={2} className={PermanentWorkingLocationStyles['proInf-sz']}>
                  <Grid item xs={12} md={6}>
                    <Box className={Physicalreg['proInf-bg']}>
                      <Field
                        name="permanentCountry"
                        component={CountrySelectorContainer}
                        validate={isRequired}
                      />
                      <OnChange name="permanentCountry">
                        {(a) => {
                          (values.permanentState = null),
                            (values.permanentCity = null),
                            (values.permanentDistrict = null);
                          setPCID();
                          setPSID();
                          setPDID();
                          setPCID(a?.key);
                        }}
                      </OnChange>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box className={Physicalreg['proInf-bg']}>
                      <Field
                        name="permanentState"
                        component={StateSelectorContainer}
                        countryId={pcid}
                        InputValue={values?.permanentState}
                        validate={isRequired}
                      />
                      <OnChange name="permanentState">
                        {(a) => {
                          (values.permanentDistrict = null), (values.permanentCity = null);
                          setPSID(a?.key);
                          setPDID(null);
                        }}
                      </OnChange>
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={2} className={PermanentWorkingLocationStyles['proInf-sz']}>
                  <Grid item xs={12} md={6}>
                    <Box className={Physicalreg['proInf-bg']}>
                      <Field
                        name="permanentCity"
                        component={CitySelectorContainer}
                        districtId={psid}
                        countryId={pcid}
                        InputValue={values?.permanentCity}
                        validate={isRequired}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box className={Physicalreg['proInf-bg']}>
                      <Field
                        name="permanentAddress"
                        type="text"
                        component={InputTextField}
                        label={STEPS_LABELS.address}
                        validate={isRequired}
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={2} className={PermanentWorkingLocationStyles['proInf-sz']}>
                  <Grid item xs={12} md={12}>
                    <Box className={Physicalreg['proInf-bg']}>
                      <Field
                        label={STEPS_LABELS.typeOfAddress}
                        name="permanentTypeAddress"
                        options={[{ label: 'Permanent' }, { label: 'Rented' }]}
                        component={InputAutoCompleteField}
                        validate={isRequired}
                      />
                    </Box>
                  </Grid>
                </Grid>
                <p className={Physicalreg['text-hed']}>Working Location</p>
                <Grid container spacing={2} className={PermanentWorkingLocationStyles['proInf-sz']}>
                  <Grid item xs={12} md={6}>
                    <Box className={Physicalreg['proInf-bg']}>
                      <Field
                        name="workCountry"
                        component={CountrySelectorContainer}
                        validate={isRequired}
                      />
                      <OnChange name="workCountry">
                        {(a) => {
                          (values.workState = ''),
                            (values.workCity = ''),
                            (values.workDistrict = '');
                          setWCID(a?.key);
                          setWSID();
                          setWDID();
                        }}
                      </OnChange>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box className={Physicalreg['proInf-bg']}>
                      <Field
                        name="workState"
                        component={StateSelectorContainer}
                        countryId={wcid}
                        validate={isRequired}
                      />
                      <OnChange name="workState">
                        {(a) => {
                          (values.workDistrict = ''), (values.workCity = '');
                          setWSID(a?.key);
                          setWDID(null);
                        }}
                      </OnChange>
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={2} className={PermanentWorkingLocationStyles['proInf-sz']}>
                  <Grid item xs={12} md={6}>
                    <Box className={Physicalreg['proInf-bg']}>
                      <Field
                        name="workCity"
                        component={CitySelectorContainer}
                        districtId={wsid}
                        countryId={wcid}
                        validate={isRequired}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box className={Physicalreg['proInf-bg']}>
                      <Field
                        label={STEPS_LABELS.address}
                        name="workAddress"
                        type="text"
                        component={InputTextField}
                        validate={isRequired}
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={2} className={PermanentWorkingLocationStyles['proInf-sz']}>
                  <Grid item xs={12} md={12}>
                    <Box className={Physicalreg['proInf-bg']}>
                      <Field
                        name="workTypeAddress"
                        options={[{ label: 'Permanent' }, { label: 'Rented' }]}
                        component={InputAutoCompleteField}
                        label={STEPS_LABELS.typeOfAddress}
                        validate={isRequired}
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={2}
                  className={PermanentWorkingLocationStyles['proInf-sz']}></Grid>
                <Grid container direction="row" className={Physicalreg['btn-hldr']}>
                  <Box as="div" className={Physicalreg['dot-prv-btn']}>
                    <Button
                      size="large"
                      type="button"
                      variant="contained"
                      onClick={goToPrevTab}
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

export default PermanentWorkingLocation;

PermanentWorkingLocation.propTypes = {
  initialValues: PropTypes.object,
  formSubmit: PropTypes.func,
  goToPrevTab: PropTypes.func
};
PermanentWorkingLocation.defaultProps = {
  initialValues: {},
  formSubmit: () => {},
  goToPrevTab: () => {}
};
