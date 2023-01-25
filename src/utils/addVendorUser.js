import moment from 'moment';
export const getFormattedValuesForAddVendorUser = (userData, values, isExecutive, isModified) => {
  let FullName = ' ';
  if (values?.lastName) {
    FullName = values?.firstName + ' ' + values?.lastName;
    1; // hard code temporary
  } else {
    FullName = values?.FullName;
  }
  let data = {
    RoleId: parseInt(userData?.RoleId),
    UserId: userData?.vendorId,
    ProfileForId: values?.creatingFor?.Id,
    GenderId: values.gender === 'Male' ? 1 : 2,
    MaritalStatusid: values?.maritalStatus?.Id,
    FullName: FullName,
    Languageid: values?.Language?.Id,
    ReligionId: values?.Religion?.Id,
    CastId: values?.Caste?.Id,
    CountryId: values?.Country?.id,
    StateId: values?.State?.id,
    DistrictId: values?.District?.Id,
    CityId: values?.City?.id,
    Village: values?.village,
    PostalCode: values?.Postcode?.postalcode,
    MobileNumber: values?.phoneNumber,
    EmailId: values?.email,
    PasswordHash: FullName.replaceAll(' ', '') + '@123',
    EmailConfirmed: values?.isEmailVerified,
    MobileNumberConfirmed: values?.isMobileVerified,
    PAN: values?.pan,
    Aadhar: values?.aadhar,
    StarId: values?.StarId,
    isModifiedBy: isModified
  };
  if (!isExecutive) {
    data.DateOfBirth = moment(values.dateOfBirth).format('DD/MM/YYYY');
  }
  if (
    values?.accountNumber ||
    values?.accountHolder ||
    values.IfscCode ||
    values?.accountType?.label
  ) {
    data.BankDetails = {};
    data.BankDetails.AccountNumber = values?.accountNumber;
    data.BankDetails.AccountName = values?.accountHolder;
    data.BankDetails.IfscCode = values?.IfscCode;
    data.BankDetails.AccountType = values?.accountType?.label;
  }
  if (
    values?.BodyType?.Id ||
    values?.Complexion?.Id ||
    values?.physicalStatus?.Id ||
    values?.Height?.Id ||
    values?.Weight ||
    values?.Education?.Id ||
    values?.employmentType?.Id ||
    values?.Occupation?.Id ||
    values?.annualIncome?.Id
  ) {
    data.physicalprofileinfo = {};
    data.physicalprofileinfo.BodyTypeId = values?.BodyType?.Id;
    data.physicalprofileinfo.ComplexionId = values?.Complexion?.Id;
    data.physicalprofileinfo.PhysicalStatusId = values?.physicalStatus?.Id;
    data.physicalprofileinfo.HeightId = values?.Height?.Id;
    data.physicalprofileinfo.Weight = values?.Weight;
    data.physicalprofileinfo.EducationId = values?.Education?.Id;
    data.physicalprofileinfo.EmploymentTypeId = values?.employmentType?.Id;
    data.physicalprofileinfo.OccupationId = values?.Occupation?.Id;
    data.physicalprofileinfo.AnnualIncomeId = values?.annualIncome?.Id;
  }
  if (
    values?.FamilyType?.Id ||
    values?.FamilyStatus?.Id ||
    values?.MotherOccupation?.Id ||
    values?.brotherNum ||
    values?.sisterNum ||
    values?.MotherName ||
    values?.FatherSurname ||
    values?.FatherName ||
    values?.FatherOccupation?.Id ||
    values?.MotherSurname
  ) {
    data.familydetail = {};
    data.familydetail.FamilytypeId = values?.FamilyType?.Id;
    data.familydetail.FamilystatusId = values?.FamilyStatus?.Id;
    data.familydetail.FathersSurname = values?.FatherSurname;
    data.familydetail.FathersName = values?.FatherName;
    data.familydetail.FathersOccupation = values?.FatherOccupation?.Id;
    data.familydetail.MothersSurname = values?.MotherSurname;
    data.familydetail.MothersName = values?.MotherName;
    data.familydetail.MothersOccupation = values?.MotherOccupation?.Id;
    data.familydetail.NoOfSisters = values?.sisterNum;
    data.familydetail.NoOfBrothers = values?.brotherNum;
  }
  if (
    values?.partnerEducation?.Id ||
    values?.partnerDistrict?.Id ||
    values?.partnerCity?.Id ||
    values?.partnerEmployeeType?.Id ||
    values?.partnerOccupation?.Id ||
    values?.partnerAnnualIncome?.Id ||
    values?.partnerCountry?.ID ||
    values?.partnerState?.ID ||
    values?.partnerStar?.ID
  ) {
    data.partnerpreferance = {};
    data.partnerpreferance.EducationId = values?.partnerEducation?.Id;
    data.partnerpreferancepartnerStar.EmployeetypeId = values?.partnerEmployeeType?.Id;
    data.partnerpreferance.OccupationId = values?.partnerOccupation?.Id;
    data.partnerpreferance.AnnualIncomeId = values?.partnerAnnualIncome?.Id;
    data.partnerpreferance.CountryId = values?.partnerCountry?.id;
    data.partnerpreferance.StateId = values?.partnerState?.id;
    data.partnerpreferance.DistrictId = values?.partnerDistrict?.id;
    data.partnerpreferance.CityId = values?.partnerCity?.id;
    data.partnerpreferance.StarId = values?.partnerStar?.id;
  }
  if (
    values?.Address1Permanent ||
    values?.districtPermanent?.Id ||
    values?.countryPermanent?.id ||
    values?.statePermanent?.id ||
    values?.cityPermanent?.id ||
    values?.countryPermanent?.ID ||
    values?.statePermanent?.Id ||
    values?.cityPermanent?.ID ||
    values?.permanentTypeAddress?.label
  ) {
    data.PermanantAddress = {};
    data.PermanantAddress.Address1 = values?.Address1Permanent;
    data.PermanantAddress.CountryId = values?.countryPermanent?.id || values?.countryPermanent?.ID;
    data.PermanantAddress.StateId = values?.statePermanent?.id || values?.statePermanent?.Id;
    data.PermanantAddress.CityId = values?.cityPermanent?.id || values?.cityPermanent?.ID;
    data.PermanantAddress.DistrictId = values?.districtPermanent?.id;
    data.PermanantAddress.AddressType = values?.permanentTypeAddress?.label;
  }
  if (
    values?.Address1Work ||
    values?.districtWork?.Id ||
    values?.countryWork?.id ||
    values?.stateWork?.id ||
    values?.cityWork?.id ||
    values?.countryWork?.ID ||
    values?.cityWork?.ID ||
    values?.stateWork?.Id ||
    values?.workTypeAddress?.label
  ) {
    data.workasddress = {};
    data.workasddress.Address1 = values?.Address1Work;
    data.workasddress.CountryId = values?.countryWork?.id || values?.countryWork?.ID;
    data.workasddress.StateId = values?.stateWork?.id || values?.stateWork?.Id;
    data.workasddress.CityId = values?.cityWork?.id || values?.cityWork?.ID;
    data.workasddress.DistrictId = values?.districtWork?.id;
    data.workasddress.AddressType = values?.workTypeAddress?.label;
  }
  if (values?.lastName) {
    data.MaritalStatusId = 1; // hard code temporary
    // data.RoleId = 5;
  }

  return data;
};
