import autoFillValueForDropdown from './autoFillDropdownHelper';
import { getCountrySelector } from '../redux/selectors/countrySelector';
import { useSelector } from 'react-redux';
import { transformResponseForIntialValue } from './responseTranformHelpers';

export const getPhysicalProfileInfoInitialValues = (response, options) => {
  if (response) {
    const {
      bodyTypes = [],
      complexions = [],
      physicalStatus = [],
      highestEducation = [],
      occupations = [],
      employeeTypes = [],
      annualIncomes = [],
      heights = []
    } = options;
    const {
      AnnualIncomeId = '',
      BodyTypeId = '',
      ComplexionId = '',
      EducationId = '',
      EmploymentTypeId = '',
      HeightId = '',
      OccupationId = '',
      PhysicalStatusId = '',
      Weight = ''
    } = response;
    const initialValues = {
      annualIncome: autoFillValueForDropdown(annualIncomes, AnnualIncomeId),
      bodyType: autoFillValueForDropdown(bodyTypes, BodyTypeId),
      complexion: autoFillValueForDropdown(complexions, ComplexionId),
      highestEducation: autoFillValueForDropdown(highestEducation, EducationId),
      employeeType: autoFillValueForDropdown(employeeTypes, EmploymentTypeId),
      height: autoFillValueForDropdown(heights, HeightId),
      occupation: autoFillValueForDropdown(occupations, OccupationId),
      physicalStatus: autoFillValueForDropdown(physicalStatus, PhysicalStatusId),
      weight: Weight
    };
    return initialValues;
  } else {
    return {};
  }
};

export const getFamilyRegistrationInfoInitialValues = (response, options) => {
  if (response) {
    const countries = useSelector(getCountrySelector);
    const {
      familyTypes = [],
      familyStatus = [],
      stars = [],
      employeeTypes = [],
      highestEducation = [],
      annualIncomes = [],
      occupations = []
    } = options;
    const {
      FamilytypeId = 0,
      FamilystatusId = 0,
      FathersSurname = '',
      FathersName = '',
      MothersSurname = '',
      MothersName = '',
      NoOfSisters = '',
      NoOfBrothers = '',
      StarId = 0,
      EducationId = 0,
      EmployeetypeId = 0,
      OccupationId = 0,
      FathersOccupation = 0,
      MothersOccupation = 0,
      AnnualIncomeId = 0,
      CountryId = 0,
      state = {},
      district = {},
      city = {}
    } = response;
    const initialValues = {
      familyType: autoFillValueForDropdown(familyTypes, FamilytypeId),
      familyStatus: autoFillValueForDropdown(familyStatus, FamilystatusId),
      fatherSurname: FathersSurname,
      fatherName: FathersName,
      fatherOccupation: autoFillValueForDropdown(occupations, parseInt(FathersOccupation)),
      motherSurname: MothersSurname,
      motherName: MothersName,
      motherOccupation: autoFillValueForDropdown(occupations, parseInt(MothersOccupation)),
      noOfBrothers: NoOfBrothers,
      noOfSisters: NoOfSisters,
      star: autoFillValueForDropdown(stars, StarId),
      highestEducationPartner: autoFillValueForDropdown(highestEducation, EducationId),
      employmentTypePartner: autoFillValueForDropdown(employeeTypes, EmployeetypeId),
      occupationPartner: autoFillValueForDropdown(occupations, OccupationId),
      annualIncomPartner: autoFillValueForDropdown(annualIncomes, AnnualIncomeId),
      countryPartner: autoFillValueForDropdown(countries, CountryId),
      statePartner: transformResponseForIntialValue(state, 'Name'),
      districtPartner: transformResponseForIntialValue(district, 'Name'),
      cityPartner: transformResponseForIntialValue(city, 'Name')
    };
    return initialValues;
  } else {
    return {};
  }
};

export const getPermanentWorkingLocationInfoInitialValues = (response, countries) => {
  const { permanantaddress, workasddress } = response;
  if (permanantaddress && workasddress) {
    const initialValues = {
      permanentAddress: permanantaddress.Address1,
      permanentCountry: autoFillValueForDropdown(countries, permanantaddress.CountryId),
      permanentState: transformResponseForIntialValue(permanantaddress.state, 'Name'),
      permanentDistrict: transformResponseForIntialValue(permanantaddress.district, 'Name'),
      permanentCity: transformResponseForIntialValue(permanantaddress.city, 'Name'),
      permanentTypeAddress: permanantaddress.AddressType,
      workCountry: autoFillValueForDropdown(countries, workasddress.CountryId),
      workState: transformResponseForIntialValue(workasddress.state, 'Name'),
      workDistrict: transformResponseForIntialValue(workasddress.district, 'Name'),
      workCity: transformResponseForIntialValue(workasddress.city, 'Name'),
      workAddress: workasddress.Address1,
      workTypeAddress: workasddress.AddressType
    };
    return initialValues;
  } else {
    return {};
  }
};
