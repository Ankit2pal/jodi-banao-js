import { omitBy, isNil, isEmpty, find, result, isObject } from 'lodash';
import { compose } from './compose';
import { VIEW_PROILE_CONSTANTS } from '../constants/viewProfileConstants';
import moment from 'moment';

const getConstructedResponse = ({ labels, values, options }) => {
  let formattedResponse = [];
  if (!isEmpty(values)) {
    labels.map((item) => {
      let obj = {
        key: item.label,
        value: ''
      };

      obj.value = isObject(values[item.dataLabel])
        ? values[item.dataLabel].Name
        : (obj.value = item.idLabel
            ? result(find(options[item.dataLabel], { Id: values[item.idLabel] }), item.valueLabel)
            : item.dataLabel == 'DateOfBirth'
            ? moment(values[item.dataLabel]).format('DD MMM YYYY')
            : values[item.dataLabel]);
      if (obj.key === 'Permanent Address') {
        obj.value = `${values.Address1}`;
      }
      formattedResponse.push(obj);
    });
  }

  return formattedResponse;
};

const getConstructedPhysicalInfo = ({ values, options }) => {
  const { physicalprofileinfo = {} } = values;
  const { physicalInfo } = VIEW_PROILE_CONSTANTS;
  let formattedPhysicalInfo = getConstructedResponse({
    labels: physicalInfo,
    values: physicalprofileinfo,
    options
  });
  return { physicalprofileinfo: formattedPhysicalInfo };
};

const getConstructedFamilyDetails = ({ values, options }) => {
  const { familydetail = {} } = values;
  const { familyDetails } = VIEW_PROILE_CONSTANTS;
  let formattedFamilyDetail = getConstructedResponse({
    labels: familyDetails,
    values: familydetail,
    options
  });
  return { familydetail: formattedFamilyDetail };
};

const getConstructedPartnerPerference = ({ values, options }) => {
  const { partnerpreferance = {} } = values;
  const { partnerPreferences } = VIEW_PROILE_CONSTANTS;
  let formattedPartnerPreference = getConstructedResponse({
    labels: partnerPreferences,
    values: partnerpreferance,
    options
  });
  return { partnerpreferance: formattedPartnerPreference };
};

const getConstructedProfessionalInfo = ({ values, options }) => {
  const { physicalprofileinfo = {} } = values;
  const { professionalInfo } = VIEW_PROILE_CONSTANTS;
  let formattedProfessionalInfo = getConstructedResponse({
    labels: professionalInfo,
    values: physicalprofileinfo,
    options
  });
  return { professionalInfo: formattedProfessionalInfo };
};

const getConstructedGeneralInfo = ({ values, options }) => {
  const { generalInfo } = VIEW_PROILE_CONSTANTS;
  let formattedGeneralInfo = getConstructedResponse({ labels: generalInfo, values, options });
  return { generalInfo: formattedGeneralInfo };
};

const getConstructedWorkAddress = ({ values, options }) => {
  const { workasddress = {} } = values;
  const { location } = VIEW_PROILE_CONSTANTS;
  let formattedLocation = getConstructedResponse({
    labels: location,
    values: workasddress,
    options
  });
  return { workAddress: formattedLocation };
};

const getConstructedPermanantAddress = ({ values, options }) => {
  const { permanantaddress = {} } = values;
  const { location } = VIEW_PROILE_CONSTANTS;
  let formattedLocation = getConstructedResponse({
    labels: location,
    values: permanantaddress,
    options
  });
  return { permenantAddress: formattedLocation };
};

const getConstructedLocation = ({ values, options }) => {
  const { location } = VIEW_PROILE_CONSTANTS;
  let formattedLocation = [];
  const { workAddress } = getConstructedWorkAddress({ values, options });
  const { permenantAddress } = getConstructedPermanantAddress({ values, options });
  const iterations = location?.length;
  if (workAddress?.length && permenantAddress?.length) {
    [...Array(iterations)].map((e, i) => {
      formattedLocation.push({
        key: workAddress[i].key,
        permenantAddress: permenantAddress[i].value,
        workAddress: workAddress[i].value
      });
    });
  }
  return { location: formattedLocation };
};

const getConstructedUserDetails = ({ values, options }) => {
  const { language } = options;
  let formattedGeneralInfo = {
    fullName: values.FullName,
    language: result(find(language, { Id: values.Languageid }), 'LanguageName'),
    location: values.CountryId,
    village: values.Village,
    age: moment().diff(values.DateOfBirth, 'years', false) + ' Years'
  };
  return { userDetails: formattedGeneralInfo };
};

const getConstructedBankDetails = ({ values, options }) => {
  const { BankDetails = {} } = values;
  const { bankDetails } = VIEW_PROILE_CONSTANTS;
  let formattedLocation = getConstructedResponse({
    labels: bankDetails,
    values: BankDetails,
    options
  });
  return { bankDetails: formattedLocation };
};

export const getViewProfileDetails = (values = {}, options = {}) => {
  const formattedResponse = compose(
    getConstructedGeneralInfo,
    getConstructedPhysicalInfo,
    getConstructedProfessionalInfo,
    getConstructedLocation,
    getConstructedFamilyDetails,
    getConstructedPartnerPerference,
    getConstructedUserDetails,
    getConstructedBankDetails
  )({ values, options });
  return omitBy(omitBy({ ...formattedResponse }, isNil), isEmpty);
};
