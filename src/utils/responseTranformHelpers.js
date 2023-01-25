import { isEmpty } from 'lodash';
const BachEngineering = [
  'BE/B.Tech',
  'Aeronautical Engineering',
  'B.Arch',
  'BCA',
  'B.Plan',
  'B.Sc IT/Computer Science',
  'B.S (Engineering)',
  'Other Bachelors Degree in Engineering/Computers'
];
const MasterEngineering = [
  'MCA/PGDCA',
  'ME/M.Tech',
  'ME',
  'M.Sc.IT/Computer Science',
  'MS (Engg)',
  'Other Masters Degree in Engineering/Computers'
];
const BachCommerce = [
  'B.A',
  'B.Com',
  'BFA',
  ' B.Ed',
  'BFT',
  'BLIS',
  'B.M.M',
  'B.Sc',
  'B.S.W',
  'B.Phil',
  'Other Bachelors Degree in Arts/Science/Commerce'
];
const MasterCommerce = [
  'M.A',
  'M.Com',
  ' M.Ed',
  'MFA',
  'MLIS',
  'M.Sc',
  'MSW',
  'M.Phil',
  'Other Master Degree in Arts/Science/Commerce'
];
const BachManagement = [
  'BBA',
  'BFM (Financial Management)',
  'BHM (Hotel Management)',
  'BHA/BHM (Hospital Administartion)',
  'Other Bachelors Degree in Management'
];
const MasterManagement = [
  'MBA',
  'MFM (Financial Management)',
  'MHM (Hotel Management)',
  'MHRM (Human Resource Management)',
  'PGDM',
  'MHA/MHM (Hospital Administartion)',
  'Other Master Degree in Management'
];
const BachMedicine = [
  'BAMS',
  'BDS',
  'BHMS',
  'BSMS',
  'B.Pharm',
  'BPT',
  'BUMS',
  'BVSc',
  'MBBS',
  'B.Sc Nursing',
  'BPT (Bachelor of Physiotherapy)',
  'Other Bachelors Degree in Medicine'
];
const MasterMedicine = [
  'MDS',
  'MD/MS (Medical)',
  'M.Pharm',
  'MPT',
  'MVSc',
  'MPT (Master of Physiotherapy)',
  'Others Master Degree in Medicine'
];
const BachLegal = ['BGL', 'B.L', 'LLB', 'BGL/B.L/LLB', 'Other Bachelors Degree in Legal'];
const MasterLegal = ['LLM', 'M.L', 'Other Masters Degree in Legal'];
const Finance = [
  'CFA (Chartered Financial Analyst)',
  'CA  (Chartered accountant (CA)',
  'Certified public accountant (CPA)',
  'CS (Company Secretary)',
  ' BCom (Hons)',
  'PGDM (Postgraduate Diploma in Finance) ',
  'ICWA',
  'PGDM (Postgraduate Diploma in Management)',
  'Other Degree in Finance'
];
const PublicService = ['IAS', 'IES', 'IFS', 'IRS', 'IPS', 'Other Public Services'];
const Phd = ['Ph.D', 'M.Phil (phD)'];
const Diploma = ['Diploma', 'Polytechnic', ' Trade School', 'Others - Diploma'];
const HigherSec = ['Higher Secondary School/High School', 'Others'];

// Occupation
const AccountingBankingAndFinance = [
  'Student',
  'Teacher',
  'Farmer',
  'Judge',
  'Investment Professional',
  'Accounting Professional (Others)'
];
const AdministartionAndHr = ['Admin Professional', 'Human Resources Professional'];
const AdvertisingMediaAndEntertainment = [
  'Actor',
  'Advertising Professional',
  'Event Manager',
  'Journalist',
  'Media Professional',
  'Public Relations Professional'
];
const Agriculture = ['Farming', 'Horticulture', 'Agriculture Professional (Others)'];
const AirlineAndAviation = [
  'Air Hostess/Flight Attendant',
  'Pilot / Co-Pilot',
  'Other Airline Professional'
];
const ArtistsAnimatorsAndWebDesigners = [
  'Beautician',
  'Fashion Designer',
  'Hairstylist',
  'Jewellery Designer',
  'Designer (Others)'
];
const BPOKPOAndCustomerSupport = ['Customer Support /BPO/KPO Professional'];
const CivilServicesAndLawEnforcement = [
  'IAS/IRS/IES/IFS',
  'Indian Police Services (IPS)',
  'Law Enforcement Employee (Others)'
];
const Defence = ['Airforce', 'Army', 'Navy', 'Defense Services (Others)'];
const EducationAndTraining = [
  'Lecturer',
  'Professor',
  'Research Assistant',
  'Research Scholar',
  'Teacher',
  'Training Professional (Others)'
];
const Engineering = [
  'Civil Engineer',
  'Electronics / Telecom Engineer',
  'Mechanical/Production Engineer',
  'Non IT Engineer (Others)'
];
const HotelAndHospitality = [
  'Chef/Sommelier/Food Critic',
  ' Catering Professional',
  'Hotel & Hospitality Professional (Others)'
];
const ITAndSoftwareEngineering = [
  ' Software Developer / Programmer',
  'Software Consultant',
  'Hardware & Networking Professional',
  'Software Professional (Others)'
];
const Legal = ['Lawyer', ' Legal Assistant', 'Legal Professional (Others)'];
const MedicalAndHealthcare = [
  'Dentist',
  'Doctor',
  'Medical Transcriptionist',
  ' Nurse',
  'Pharmacist',
  'Physician Assistan,t',
  'Physiotherapist / Occupationl Therapist',
  ' Phychologist',
  'Surgeon',
  'Veterinary Doctor',
  'Therapist (Others)',
  'Medical/Healthcare Professional (Others)'
];
const MerchantNavy = [' Merchant Naval Officer', 'Mariner'];
const SalesAndMarketing = ['Marketing Professional', 'Sales Professional'];
const Science = ['Biologist / Botanist', 'Physicist', 'Science Professional (Others)'];
const CorporateProfessionals = [
  'CEO/Chairman/Director/President',
  'VP/AVP/GM/DGM',
  'Sr.Manager/Manager',
  'Consultant/Supervisor/team Leads',
  'Team Member/Staff'
];
const Others = [
  'Agent/Broker/Trader/Contractor',
  'Business Owner/Entrepreneur',
  'Politician',
  'Social Worker/Volunteer/NGO',
  'Sportsman',
  ' Travel & Transport Professional',
  'Writer'
];
const NonWorking = ['Student', 'Retired', 'Not Working'];

export const transformResponseForDropDown = (response, labelKey) => {
  return response
    .map((responseItem) => ({
      ...responseItem,
      id: responseItem.Id,
      label: `${responseItem[labelKey]}`,
      key: responseItem[labelKey]
    }))
    .filter((item) => item.label);
};
export const transformResponseForDropDownUser = (response, labelKey) => {
  return response
    .map((responseItem) => ({
      ...responseItem,
      id: responseItem.GUID,
      label: `${responseItem[labelKey]}`,
      key: responseItem[labelKey]
    }))
    .filter((item) => item.label);
};

export const transformResponseForCountry = (response) => {
  return response
    .map((responseItem) => ({
      ...responseItem,
      id: responseItem.id,
      label: `${responseItem.name}`,
      key: responseItem.iso2
    }))
    .filter((item) => item.label);
};

export const transformResponseForPostal = (response) => {
  return response
    .map((responseItem) => ({
      ...responseItem,
      id: responseItem.adminCode2,
      label: `${responseItem.placeName}, ${responseItem.adminName2}, ${responseItem.postalcode}`,
      key: responseItem.postalcode
    }))
    .filter((item) => item.label);
};

export const addOccupationCategory = (response) => {
  let tempArr = [];
  for (let index = 0; index < response.length; index++) {
    if (AccountingBankingAndFinance.includes(response[index].OccupationName)) {
      tempArr.push({ ...response[index], Category: 'Accounting,Banking & Finance' });
    }
    if (AdministartionAndHr.includes(response[index].OccupationName)) {
      tempArr.push({ ...response[index], Category: 'Administartion & HR' });
    }
    if (AdvertisingMediaAndEntertainment.includes(response[index].OccupationName)) {
      tempArr.push({ ...response[index], Category: 'Advertising,Media & Entertainment' });
    }
    if (Agriculture.includes(response[index].OccupationName)) {
      tempArr.push({ ...response[index], Category: 'Agriculture' });
    }
    if (AirlineAndAviation.includes(response[index].OccupationName)) {
      tempArr.push({ ...response[index], Category: 'Airline & Aviation' });
    }
    if (ArtistsAnimatorsAndWebDesigners.includes(response[index].OccupationName)) {
      tempArr.push({ ...response[index], Category: 'Artists,Animators & Web Designers' });
    }
    if (BPOKPOAndCustomerSupport.includes(response[index].OccupationName)) {
      tempArr.push({ ...response[index], Category: 'BPO,KPO & Customer Support' });
    }
    if (CivilServicesAndLawEnforcement.includes(response[index].OccupationName)) {
      tempArr.push({ ...response[index], Category: 'Civil Services / Law Enforcement' });
    }
    if (Defence.includes(response[index].OccupationName)) {
      tempArr.push({ ...response[index], Category: 'Defence' });
    }
    if (EducationAndTraining.includes(response[index].OccupationName)) {
      tempArr.push({ ...response[index], Category: 'Education & Training' });
    }
    if (Engineering.includes(response[index].OccupationName)) {
      tempArr.push({ ...response[index], Category: 'Engineering' });
    }
    if (HotelAndHospitality.includes(response[index].OccupationName)) {
      tempArr.push({ ...response[index], Category: 'Hotel & Hospitality' });
    }
    if (ITAndSoftwareEngineering.includes(response[index].OccupationName)) {
      tempArr.push({ ...response[index], Category: 'IT & Software Engineering' });
    }
    if (Legal.includes(response[index].OccupationName)) {
      tempArr.push({ ...response[index], Category: 'Legal' });
    }
    if (MedicalAndHealthcare.includes(response[index].OccupationName)) {
      tempArr.push({ ...response[index], Category: 'Medical & Healthcare' });
    }
    if (MerchantNavy.includes(response[index].OccupationName)) {
      tempArr.push({ ...response[index], Category: 'Merchant Navy' });
    }
    if (SalesAndMarketing.includes(response[index].OccupationName)) {
      tempArr.push({ ...response[index], Category: 'Sales & Marketing' });
    }
    if (Science.includes(response[index].OccupationName)) {
      tempArr.push({ ...response[index], Category: 'Science' });
    }
    if (CorporateProfessionals.includes(response[index].OccupationName)) {
      tempArr.push({ ...response[index], Category: 'Corporate Professionals' });
    }
    if (Others.includes(response[index].OccupationName)) {
      tempArr.push({ ...response[index], Category: 'Others' });
    }
    if (NonWorking.includes(response[index].OccupationName)) {
      tempArr.push({ ...response[index], Category: 'Non Working' });
    }
  }
  return tempArr;
};
export const addCategory = (response) => {
  let tempArr = [];
  for (let index = 0; index < response.length; index++) {
    if (BachEngineering.includes(response[index].EducationName)) {
      tempArr.push({ ...response[index], Category: 'Bachelors - Engineering/Computers/Others' });
    }
    if (MasterEngineering.includes(response[index].EducationName)) {
      tempArr.push({ ...response[index], Category: 'Masters - Engineering/Computers/Others' });
    }
    if (BachCommerce.includes(response[index].EducationName)) {
      tempArr.push({ ...response[index], Category: 'Bachelors - Arts/Science/Commerce/Others' });
    }
    if (MasterCommerce.includes(response[index].EducationName)) {
      tempArr.push({ ...response[index], Category: 'Masters - Arts/Science/Commerce/Others' });
    }
    if (BachManagement.includes(response[index].EducationName)) {
      tempArr.push({ ...response[index], Category: 'Bachelors - Management/Others' });
    }
    if (MasterManagement.includes(response[index].EducationName)) {
      tempArr.push({ ...response[index], Category: 'Masters - Management/Others' });
    }
    if (BachMedicine.includes(response[index].EducationName)) {
      tempArr.push({
        ...response[index],
        Category: 'Bachelors - Medicine - General/Dental/Surgeon/Others'
      });
    }
    if (MasterMedicine.includes(response[index].EducationName)) {
      tempArr.push({
        ...response[index],
        Category: 'Masters - Medicine - General/Dental/Surgeon/Others'
      });
    }
    if (BachLegal.includes(response[index].EducationName)) {
      tempArr.push({ ...response[index], Category: 'Bachelors - Legal/Others' });
    }
    if (MasterLegal.includes(response[index].EducationName)) {
      tempArr.push({ ...response[index], Category: 'Masters - Legal/Others' });
    }
    if (Finance.includes(response[index].EducationName)) {
      tempArr.push({ ...response[index], Category: 'Finance - ICWAI/CA/CS/CFA/Others' });
    }
    if (PublicService.includes(response[index].EducationName)) {
      tempArr.push({ ...response[index], Category: 'Public Services - IAS/IPS/IRS/IFS/Others' });
    }
    if (Phd.includes(response[index].EducationName)) {
      tempArr.push({ ...response[index], Category: 'PhD' });
    }
    if (Diploma.includes(response[index].EducationName)) {
      tempArr.push({ ...response[index], Category: 'Diploma/Others' });
    }
    if (HigherSec.includes(response[index].EducationName)) {
      tempArr.push({ ...response[index], Category: 'Higher Secondary / Secondary' });
    }
  }
  return tempArr;
};

export const transformResponseForCountryDropDown = (response) => {
  return response
    .map((responseItem) => ({
      ...responseItem,
      id: responseItem.id,
      label: `${responseItem.name}`,
      key: responseItem.iso2
    }))
    .filter((item) => item.label);
};

export const transformResponseForIntialValue = (response, labelKey) => {
  return !isEmpty(response)
    ? (response = {
        ...response,
        id: response?.Id,
        label: response ? response[labelKey] : '',
        key: response ? response[labelKey] : ''
      })
    : '';
};
