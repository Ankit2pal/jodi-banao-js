export const getFormattedValuesForEditProfile = (values, id, modifiedId) => {
  let data = {};
  (data.isModifiedBy = modifiedId),
    (data.isComplete = values?.isComplete),
    (data.UserId = id),
    (data.FullName = values?.FullName),
    (data.Languageid = values?.Language?.Id),
    (data.ReligionId = values?.Religion?.Id),
    (data.CastId = values?.Caste?.Id),
    (data.CountryId = values?.Country?.id),
    (data.StateId = values?.State?.id),
    (data.DistrictId = values?.District?.Id),
    (data.CityId = values?.City?.id),
    (data.MaritalStatusId = values?.maritalStatus?.id),
    (data.Village = values?.Village),
    (data.PostalCode = values?.Postcode?.postalcode);
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
    data.familydetail.MothersOccupation = values?.MothersOccupation?.Id;
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
    data.partnerpreferance.EmployeetypeId = values?.partnerEmployeeType?.Id;
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
    values?.permanentTypeAddress?.label
  ) {
    data.PermanantAddress = {};
    data.PermanantAddress.Address1 = values?.Address1Permanent;
    data.PermanantAddress.CountryId = values?.countryPermanent?.id;
    data.PermanantAddress.StateId = values?.statePermanent?.id;
    data.PermanantAddress.CityId = values?.cityPermanent?.id;
    data.PermanantAddress.DistrictId = values?.districtPermanent?.id;
    data.PermanantAddress.AddressType = values?.permanentTypeAddress?.label;
  }
  if (
    values?.Address1Work ||
    values?.districtWork?.Id ||
    values?.countryWork?.id ||
    values?.stateWork?.id ||
    values?.cityWork?.id ||
    values?.workTypeAddress?.label
  ) {
    data.workasddress = {};
    data.workasddress.Address1 = values?.Address1Work;
    data.workasddress.CountryId = values?.countryWork?.id;
    data.workasddress.StateId = values?.stateWork?.id;
    data.workasddress.CityId = values?.cityWork?.id;
    data.workasddress.DistrictId = values?.districtWork?.id;
    data.workasddress.AddressType = values?.workTypeAddress?.label;
  }
  return data;
};
