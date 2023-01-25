import moment from 'moment';

export const getFormattedValuesForRegisteration = (values) => {
  return {
    ProfileForId: values.creatingFor.Id,
    GenderId: values.gender,
    FullName: values.groomName,
    DateOfBirth: moment(values.dateOfBirth).format('DD/MM/YYYY'),
    Languageid: values.motherTongue.Id,
    ReligionId: values.religion.Id,
    CastId: values.caste.Id,
    MaritalStatusId: values.maritalStatus.id,
    CountryId: values.country.id,
    StateId: values.state.id,
    CityId: values.city.id,
    Village: values.village,
    PostalCode: values?.Postcode?.postalcode,
    MobileNumber: values.phoneNumber,
    EmailId: values.email,
    PasswordHash: values.password,
    EmailConfirmed: 1,
    MobileNumberConfirmed: 1,
    VendorId: values.VendorId,
    AdminId: 0,
    RoleId: 1,
    TermsAndConditions: values.terms_and_condition
  };
};
