import { createSelector } from 'reselect';
import { transformResponseForDropDown } from '../../utils/responseTranformHelpers';

const getCreatingFor = createSelector(
  [(state) => state.registerationDetails.data],
  (registerationDetails) => {
    const { profilefor = [] } = registerationDetails;
    return transformResponseForDropDown(profilefor, 'ProfileForName');
  }
);

const getGender = createSelector(
  [(state) => state.registerationDetails.data],
  (registerationDetails) => {
    const { gender = [] } = registerationDetails;

    return transformResponseForDropDown(gender, 'GenderName');
  }
);
const getMaritalStatus = createSelector(
  [(state) => state.registerationDetails.data],
  (registerationDetails) => {
    const { maritalStatus = [] } = registerationDetails;

    return transformResponseForDropDown(maritalStatus, 'MaritalStatusName');
  }
);

const getLanguage = createSelector(
  [(state) => state.registerationDetails.data],
  (registerationDetails) => {
    const { language = [] } = registerationDetails;

    return transformResponseForDropDown(language, 'LanguageName');
  }
);

const getReligion = createSelector(
  [(state) => state.registerationDetails.data],
  (registerationDetails) => {
    const { religion = [] } = registerationDetails;

    return transformResponseForDropDown(religion, 'ReligionName');
  }
);

const getFormRegisterationMessage = createSelector(
  [(state) => state.formRegisterationDetails.message],
  (message = '') => {
    return message;
  }
);

const checkIfRegistrationWasSuccess = createSelector(
  [(state) => state.formRegisterationDetails.isError],
  (isError) => !isError
);

export {
  getCreatingFor,
  getGender,
  getMaritalStatus,
  getLanguage,
  getReligion,
  getFormRegisterationMessage,
  checkIfRegistrationWasSuccess
};
