import { createSelector } from 'reselect';

export const getUserRegisterationDetails = createSelector(
  [(state) => state.userRegisterationDetails],
  (userRegisterationDetails = {}) => userRegisterationDetails.data
);

const getFamilyRegisterInfo = createSelector(
  [getUserRegisterationDetails],
  (userRegisterationDetails = {}) => {
    const { familydetail = {} } = userRegisterationDetails;
    return familydetail;
  }
);

const getPartnerPreferanceInfo = createSelector(
  [getUserRegisterationDetails],
  (userRegisterationDetails = {}) => {
    const { partnerpreferance = {} } = userRegisterationDetails;
    return partnerpreferance;
  }
);

const getPermanantaddressInfo = createSelector(
  [getUserRegisterationDetails],
  (userRegisterationDetails = {}) => {
    const { permanantaddress = {} } = userRegisterationDetails;
    return permanantaddress;
  }
);

const getWorkLocationInfo = createSelector(
  [getUserRegisterationDetails],
  (userRegisterationDetails = {}) => {
    const { workasddress = {} } = userRegisterationDetails;
    return workasddress;
  }
);

export const getPhysicalProfileInfo = createSelector(
  [getUserRegisterationDetails],
  (userRegisterationDetails = {}) => {
    const { physicalprofileinfo = {} } = userRegisterationDetails;
    return physicalprofileinfo;
  }
);

export const getPermanantAndWorkLocationInfo = createSelector(
  [getPermanantaddressInfo, getWorkLocationInfo],
  (permanantaddress = {}, workasddress = {}) => {
    return { permanantaddress, workasddress };
  }
);

export const getFamilyAndPartnerPreferanceInfo = createSelector(
  [getFamilyRegisterInfo, getPartnerPreferanceInfo],
  (familydetail = {}, partnerpreferance = {}) => {
    return { ...familydetail, ...partnerpreferance };
  }
);

export const getStepFlag = createSelector(
  [getUserRegisterationDetails],
  (userRegisterationDetails = {}) => {
    const { StepFlag = 0 } = userRegisterationDetails;
    return StepFlag;
  }
);

export const getUId = createSelector(
  [getUserRegisterationDetails],
  (userRegisterationDetails = {}) => {
    const { GUID = '' } = userRegisterationDetails;
    return GUID;
  }
);

export const isUserActive = createSelector(
  [getUserRegisterationDetails],
  (userRegisterationDetails = {}) => {
    const { IsActive = false } = userRegisterationDetails;
    return IsActive;
  }
);

export const roleId = createSelector(
  [getUserRegisterationDetails],
  (userRegisterationDetails = {}) => {
    const { RoleId } = userRegisterationDetails;
    return RoleId;
  }
);

export const getStepNumber = createSelector(
  [getUserRegisterationDetails],
  (userRegisterationDetails = {}) => {
    const { StepFlag = 1 } = userRegisterationDetails;
    if (StepFlag > 3) {
      return 2;
    }
    if (StepFlag < 1) {
      return 0;
    }
    return StepFlag - 1;
  }
);
