import { React, useEffect } from 'react';
import { Field, Form } from 'react-final-form';
import { Container, Box, Button, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import ProfesInfo from './ProfessionalInfo.module.scss';
import { InputAutoCompleteField, InputTextField } from '../../commons';
import { isRequired, isWeight } from '../../validators';
import Physicalreg from '../PhysicalRegister/PhysicalRegister.module.scss';
import InputAutoCompleteFieldCategory from '../../commons/InputAutoCompleteField/InputAutoCompleteFieldCategory';
// import { isWeight } from '../../validators/validationHelpers';

function ProfessionalInfo({ dropDownOptions, intialValues, formSubmit }) {
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
        initialValues={intialValues}
        render={({ handleSubmit }) => (
          <Container className={Physicalreg['box_form']}>
            <Box as="form" onSubmit={handleSubmit}>
              <p className={Physicalreg['text-hed']}>Physical Information</p>
              <Grid container spacing={2} className={ProfesInfo['proInf-sz']}>
                <Grid item xs={12} md={6}>
                  <Box className={Physicalreg['proInf-bg']}>
                    <Field
                      label="Body Type"
                      name="bodyType"
                      options={bodyTypes}
                      component={InputAutoCompleteField}
                      validate={isRequired}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box className={Physicalreg['proInf-bg']}>
                    <Field
                      label="Complexion"
                      name="complexion"
                      options={complexions}
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
                      label="Physical Status"
                      name="physicalStatus"
                      options={physicalStatus}
                      validate={isRequired}
                      component={InputAutoCompleteField}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box className={Physicalreg['proInf-bg']}>
                    <Field
                      label="Weight"
                      name="weight"
                      type="number"
                      validate={isWeight}
                      component={InputTextField}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Box className={Physicalreg['proInf-bg']}>
                    <Field
                      label="Height"
                      name="height"
                      type="text"
                      component={InputAutoCompleteField}
                      options={heights}
                      validate={isRequired}
                    />
                  </Box>
                </Grid>
              </Grid>
              <p className={Physicalreg['text-hed']}>Professional Information</p>
              <Grid container spacing={2} className={ProfesInfo['proInf-sz']}>
                <Grid item xs={12} md={6}>
                  <Box className={Physicalreg['proInf-bg']}>
                    <Field
                      label="Select Highest Education"
                      name="highestEducation"
                      options={highestEducation}
                      optionLabel={'EducationName'}
                      component={InputAutoCompleteFieldCategory}
                      validate={isRequired}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box className={Physicalreg['proInf-bg']}>
                    <Field
                      label="Select Occupation"
                      name="occupation"
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
                      label="Select Employee Type"
                      name="employeeType"
                      options={employeeTypes}
                      component={InputAutoCompleteField}
                      validate={isRequired}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box className={Physicalreg['proInf-bg']}>
                    <Field
                      label="Annual Income"
                      name="annualIncome"
                      type="text"
                      options={annualIncomes}
                      component={InputAutoCompleteField}
                      validate={isRequired}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Grid container direction="row" className={Physicalreg['btn-hldr']}>
                <Box as="div" className={Physicalreg['dot-nxt-btn']}>
                  <Button
                    sx={{ marginLeft: { xs: '0%', sm: '50%', md: '70%' }, width: '100%' }}
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
        )}
      />
    </>
  );
}

export default ProfessionalInfo;

ProfessionalInfo.propTypes = {
  dropDownOptions: PropTypes.shape({
    bodyTypes: PropTypes.array,
    complexions: PropTypes.array,
    physicalStatus: PropTypes.array,
    highestEducation: PropTypes.array,
    occupations: PropTypes.array,
    employeeTypes: PropTypes.array,
    annualIncomes: PropTypes.array,
    heights: PropTypes.array
  }),
  intialValues: PropTypes.object,
  formSubmit: PropTypes.func
};

ProfessionalInfo.defaultProps = {
  dropDownOptions: {
    bodyTypes: [],
    complexions: [],
    physicalStatus: [],
    highestEducation: [],
    occupations: [],
    employeeTypes: [],
    annualIncomes: [],
    heights: []
  },
  intialValues: {},
  formSubmit: () => {}
};
