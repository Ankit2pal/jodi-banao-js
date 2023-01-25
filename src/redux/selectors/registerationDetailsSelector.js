import { createSelector } from 'reselect';
import {
  addCategory,
  addOccupationCategory,
  transformResponseForDropDown
} from '../../utils/responseTranformHelpers';

export const getRegisterationDetails = createSelector(
  [(state) => state.registerationDetails.data],
  (registerationDetails = {}) => registerationDetails
);

export const countrySelector = createSelector(
  [(state) => state.registerationDetails.country],
  (registerationDetails = {}) => registerationDetails
);

export const stateSelector = createSelector(
  [(state) => state.registerationDetails.state],
  (registerationDetails = {}) => registerationDetails
);

const bodyTypeOptions = createSelector([getRegisterationDetails], (registerationDetails) => {
  const { bodytype = [] } = registerationDetails;
  return transformResponseForDropDown(bodytype, 'BodyTypeName');
});

const LanguageTypeOptions = createSelector([getRegisterationDetails], (registerationDetails) => {
  const { language = [] } = registerationDetails;
  return transformResponseForDropDown(language, 'LanguageName');
});

const ReligionTypeOptions = createSelector([getRegisterationDetails], (registerationDetails) => {
  const { religion = [] } = registerationDetails;
  return transformResponseForDropDown(religion, 'ReligionName');
});

const complexionOptions = createSelector([getRegisterationDetails], (registerationDetails) => {
  const { complexion = [] } = registerationDetails;
  return transformResponseForDropDown(complexion, 'ComplexionName');
});

const physicalStatusOptions = createSelector([getRegisterationDetails], (registerationDetails) => {
  const { physics_status = [] } = registerationDetails;
  return transformResponseForDropDown(physics_status, 'PhysicalStatusName');
});

const highestEducationOptions = createSelector(
  [getRegisterationDetails],
  (registerationDetails) => {
    const { highest_education = [] } = registerationDetails;
    return addCategory(transformResponseForDropDown(highest_education, 'EducationName'));
  }
);

const occupationOptions = createSelector([getRegisterationDetails], (registerationDetails) => {
  const { occupation = [] } = registerationDetails;
  return addOccupationCategory(transformResponseForDropDown(occupation, 'OccupationName'));
});

const employeeTypeOptions = createSelector([getRegisterationDetails], (registerationDetails) => {
  const { employee_type = [] } = registerationDetails;
  return transformResponseForDropDown(employee_type, 'EmploymentTypeName');
});

const annualIncomeOptions = createSelector([getRegisterationDetails], (registerationDetails) => {
  const { annualincome = [] } = registerationDetails;
  return transformResponseForDropDown(annualincome, 'AnnualIncomeName');
});

const heightOptions = createSelector([getRegisterationDetails], (registerationDetails) => {
  const { height = [] } = registerationDetails;
  return transformResponseForDropDown(height, 'HeightName');
});

const familyTypeOptions = createSelector([getRegisterationDetails], (registerationDetails) => {
  const { familytype = [] } = registerationDetails;
  return transformResponseForDropDown(familytype, 'FamilyTypeName');
});

const familyStatusOptions = createSelector([getRegisterationDetails], (registerationDetails) => {
  const { familystatus = [] } = registerationDetails;
  return transformResponseForDropDown(familystatus, 'FamilyStatusName');
});

const starOptions = createSelector([getRegisterationDetails], (registerationDetails) => {
  const { star = [] } = registerationDetails;
  return transformResponseForDropDown(star, 'StarsName');
});

const anyTypeOptions = createSelector([getRegisterationDetails], (registerationDetails) => {
  const { anytype = [] } = registerationDetails;
  return transformResponseForDropDown(anytype, 'anyTypeName');
});
export const getOptionsForProfessionalInformation = createSelector(
  [
    ReligionTypeOptions,
    LanguageTypeOptions,
    bodyTypeOptions,
    complexionOptions,
    physicalStatusOptions,
    highestEducationOptions,
    occupationOptions,
    employeeTypeOptions,
    annualIncomeOptions,
    heightOptions
  ],
  (
    religion,
    language,
    bodyTypes,
    complexions,
    physicalStatus,
    highestEducation,
    occupations,
    employeeTypes,
    annualIncomes,
    heights
  ) => ({
    religion,
    language,
    bodyTypes,
    complexions,
    physicalStatus,
    highestEducation,
    occupations,
    employeeTypes,
    annualIncomes,
    heights
  })
);
export const getOptionsForProf = createSelector([anyTypeOptions], (any) => ({
  any
}));

export const getDropDownOptionsForFamilyRegister = createSelector(
  [
    familyTypeOptions,
    familyStatusOptions,
    starOptions,
    employeeTypeOptions,
    highestEducationOptions,
    annualIncomeOptions,
    occupationOptions
  ],
  (
    familyTypes,
    familyStatus,
    stars,
    employeeTypes,
    highestEducation,
    annualIncomes,
    occupations
  ) => ({
    familyTypes,
    familyStatus,
    stars,
    employeeTypes,
    highestEducation,
    annualIncomes,
    occupations
  })
);

export const getAllRegistrationDetails = createSelector(
  [(state) => state.registerationDetails.data],
  (registerationDetails = {}) => registerationDetails
);
