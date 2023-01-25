import { omitBy, isNil, isEmpty } from 'lodash';
import { compose } from './compose';

const getConstructedPhysicalInfo = (values) => {
  const {
    bodyType = {},
    complexion = {},
    physicalStatus = {},
    weight,
    highestEducation = {},
    occupation = {},
    employeeType = {},
    annualIncome = {},
    height = {}
  } = values;

  const physicalInfo = {
    BodyTypeId: bodyType.id,
    ComplexionId: complexion.id,
    PhysicalStatusId: physicalStatus.id,
    HeightId: height.id,
    Weight: weight,
    EducationId: highestEducation.id,
    EmploymentTypeId: employeeType.id,
    OccupationId: occupation.id,
    AnnualIncomeId: annualIncome.id
  };
  const santizedPhysicalInfo = omitBy(physicalInfo, isNil);

  return { physicalprofileinfo: santizedPhysicalInfo };
};

const getConstructedFamilyDetails = (values) => {
  const {
    familyStatus = {},
    familyType = {},
    fatherName,
    fatherSurname,
    fatherOccupation,
    motherName,
    motherSurname,
    motherOccupation,
    noOfBrothers,
    noOfSisters
  } = values;

  const familyDetails = {
    FamilytypeId: familyType.Id,
    FamilystatusId: familyStatus.Id,
    FathersSurname: fatherSurname,
    FathersName: fatherName,
    FathersOccupation: fatherOccupation?.Id,
    MothersSurname: motherSurname,
    MothersName: motherName,
    MothersOccupation: motherOccupation?.Id,
    NoOfSisters: noOfSisters,
    NoOfBrothers: noOfBrothers
  };

  return { familydetail: omitBy(familyDetails, isNil) };
};

const getConstructedPartnerPerference = (values) => {
  const {
    star = {},
    employmentTypePartner = {},
    annualIncomPartner = {},
    occupationPartner = {},
    highestEducationPartner = {}
  } = values;
  const partnerPerference = {
    StarId: star.Id,
    EducationId: highestEducationPartner.Id,
    EmployeetypeId: employmentTypePartner.Id,
    OccupationId: occupationPartner.Id,
    AnnualIncomeId: annualIncomPartner.Id,
    CountryId: values?.Country?.id,
    StateId: values?.State?.id,
    CityId: values?.City?.id
  };
  return { partnerpreferance: omitBy(partnerPerference, isNil) };
};

const getConstructedPermanentAddress = (values) => {
  const {
    permanentAddress,
    permanentCountry = {},
    permanentState = {},
    permanentDistrict = {},
    permanentCity = {},
    permanentTypeAddress
  } = values;

  const permanentAddressRequest = {
    Address1: permanentAddress,
    CountryId: permanentCountry.id,
    StateId: permanentState.id,
    CityId: permanentCity.id,
    AddressType: permanentTypeAddress?.label,
    DistrictId: permanentDistrict?.Id
  };

  return { PermanantAddress: omitBy(permanentAddressRequest, isNil) };
};

const getConstructedWorkAddress = (values) => {
  const {
    workCountry = {},
    workState = {},
    workDistrict = {},
    workCity = {},
    workAddress,
    workTypeAddress
  } = values;
  const workLocation = {
    Address1: workAddress,
    CountryId: workCountry.id,
    StateId: workState.id,
    DistrictId: workDistrict?.id,
    CityId: workCity.id,
    AddressType: workTypeAddress?.label
  };

  return { workasddress: omitBy(workLocation, isNil) };
};

export const getFormattedValuesForCompleteRegisteration = (values = {}) => {
  const formattedResponse = compose(
    getConstructedPhysicalInfo,
    getConstructedFamilyDetails,
    getConstructedPartnerPerference,
    getConstructedPermanentAddress,
    getConstructedWorkAddress
  )(values);
  return omitBy(omitBy({ ...formattedResponse, UserId: values.userId }, isNil), isEmpty);
};
