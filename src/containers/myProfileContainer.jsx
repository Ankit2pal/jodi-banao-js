/* eslint-disable no-debugger */
import TopBanner from '../commons/TopBanner/TopBanner';
import FooterSmall from '../components/FooterSmall/FooterSmall';
import { ViewProfile } from '../components/ViewProfile';
import { VIEW_PROILE_CONSTANTS } from '../constants/viewProfileConstants';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUId } from '../redux/selectors/userRegisterationDetails';
import { getViewProfileDetails } from '../utils/viewProfileHelpers';
import { getRegisterationDetailsApi } from '../services/registerationDetailsApi';
import { getUserRegisterationDetailsApi } from '../services/userRegisterationDetailsApi';
import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import Container from '@mui/material/Container';
import '../styles/_globals.scss';
import Loader from '../commons/Loader/Loader';
import { getCitiesAPI } from '../services/CountryStateApi';

export const MyProfileContainer = () => {
  const [profileDetails, setProfileDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const loggedInUId = useSelector(getUId);
  const countries = useSelector((state) => state?.registerationDetails?.country);
  // const userReg = useSelector((state) => state?.userRegisterationDetails?.data);
  const state = useSelector((state) => state?.registerationDetails?.state);
  useEffect(() => {
    if (loading) {
      getMyProfileDetails();
    }
  }, [loading]);

  const findCountry = (id, name) => {
    let findCountrys = countries.filter(function (item) {
      return item.id == id;
    });
    if (name) {
      return findCountrys[0]?.iso2;
    } else {
      return findCountrys[0]?.name;
    }
  };

  const findState = (id, name) => {
    let states = state.filter(function (item) {
      return item.id == id;
    });
    if (name) {
      return states[0]?.iso2;
    } else {
      return states[0]?.name;
    }
  };

  const findCity = async (city, state, country) => {
    let countryIso = findCountry(country, 'name');
    let stateIso = findState(state, 'name');
    let cityInfo;
    if (countryIso && stateIso) cityInfo = await getCitiesAPI(countryIso, stateIso);

    let cityDetail = cityInfo?.filter(function (item) {
      return item.id == city;
    });
    return cityDetail?.[0]?.name;
  };

  const getMyProfileDetails = async () => {
    try {
      const profileDetailsResponse = await getUserRegisterationDetailsApi(loggedInUId);
      const options = await getRegisterationDetailsApi();
      const formattedResponse = getViewProfileDetails(profileDetailsResponse, options);
      for (let index = 0; index < formattedResponse.generalInfo.length; index++) {
        if (formattedResponse.generalInfo[index]?.key === 'District') {
          delete formattedResponse.generalInfo[index];
        }
        if (formattedResponse.generalInfo[index]?.key === 'Country') {
          let cname = findCountry(profileDetailsResponse?.CountryId);
          formattedResponse.generalInfo[index].value = cname;
        }
        if (formattedResponse.generalInfo[index]?.key === 'State') {
          let cname = findState(profileDetailsResponse?.StateId);
          formattedResponse.generalInfo[index].value = cname;
        }
        if (formattedResponse.generalInfo[index]?.key === 'City') {
          let cname = await findCity(
            profileDetailsResponse?.CityId,
            profileDetailsResponse?.StateId,
            profileDetailsResponse?.CountryId
          );
          formattedResponse.generalInfo[index].value = cname;
        }
        if (
          formattedResponse.generalInfo[index]?.key === 'Village' ||
          formattedResponse.generalInfo[index]?.key === 'Postal Code' ||
          formattedResponse.generalInfo[index]?.key === 'Caste' ||
          formattedResponse.generalInfo[index]?.key === 'Religion' ||
          formattedResponse.generalInfo[index]?.key === 'Mother Tongue' ||
          formattedResponse.generalInfo[index]?.key === 'Pan Number' ||
          formattedResponse.generalInfo[index]?.key === 'Aadhar Number' ||
          formattedResponse.generalInfo[index]?.key === 'Marital Status'
        ) {
          if (profileDetailsResponse?.RoleId === 5 || profileDetailsResponse?.RoleId === 2) {
            delete formattedResponse.generalInfo[index];
          } else if (
            (profileDetailsResponse?.RoleId !== 5 || profileDetailsResponse?.RoleId !== 2) &&
            (formattedResponse.generalInfo[index]?.key === 'Aadhar Number' ||
              formattedResponse.generalInfo[index]?.key === 'Pan Number')
          ) {
            delete formattedResponse.generalInfo[index];
          }
        }
      }
      if (formattedResponse.userDetails?.location) {
        let cname = findCountry(formattedResponse.userDetails?.location);
        formattedResponse.userDetails.location =
          cname + ',' + formattedResponse.userDetails?.village;
      }
      if (
        profileDetailsResponse.RoleId === 1 ||
        profileDetailsResponse.RoleId === 5 ||
        profileDetailsResponse.RoleId === 2
      ) {
        if (profileDetailsResponse.RoleId === 1) {
          for (let index = 0; index < formattedResponse?.partnerpreferance.length; index++) {
            if (formattedResponse?.partnerpreferance[index]?.key === 'District') {
              delete formattedResponse?.partnerpreferance[index];
            }
            if (
              formattedResponse?.partnerpreferance[index]?.key === 'Country' &&
              profileDetailsResponse?.partnerpreferance?.CountryId
            ) {
              let cname = findCountry(profileDetailsResponse?.partnerpreferance?.CountryId);
              formattedResponse.partnerpreferance[index].value = cname;
            }
            if (
              formattedResponse.partnerpreferance[index]?.key === 'State' &&
              profileDetailsResponse?.partnerpreferance?.StateId
            ) {
              let cname = findState(profileDetailsResponse?.partnerpreferance?.StateId);
              formattedResponse.partnerpreferance[index].value = cname;
            }
            if (
              formattedResponse.partnerpreferance[index]?.key === 'City' &&
              profileDetailsResponse?.partnerpreferance?.CityId
            ) {
              let cname = await findCity(
                profileDetailsResponse?.partnerpreferance?.CityId,
                profileDetailsResponse?.partnerpreferance?.StateId,
                profileDetailsResponse?.partnerpreferance?.CountryId
              );
              formattedResponse.partnerpreferance[index].value = cname;
            }
          }
        }

        for (let index = 0; index < formattedResponse?.location.length; index++) {
          if (formattedResponse?.location[index]?.key === 'District') {
            delete formattedResponse.location[index];
          }
          if (formattedResponse?.location[index]?.key === 'Country') {
            let cname = findCountry(profileDetailsResponse?.permanantaddress?.CountryId);
            formattedResponse.location[index].permenantAddress = cname;
            let cname1 = findCountry(profileDetailsResponse?.workasddress?.CountryId);
            formattedResponse.location[index].workAddress = cname1;
          }
          if (formattedResponse?.location[index]?.key === 'State') {
            let cname = findState(profileDetailsResponse?.permanantaddress?.StateId);
            formattedResponse.location[index].permenantAddress = cname;
            let cname1 = findState(profileDetailsResponse?.workasddress?.StateId);
            formattedResponse.location[index].workAddress = cname1;
          }
          if (formattedResponse?.location[index]?.key === 'City') {
            let cname = await findCity(
              profileDetailsResponse?.permanantaddress?.CityId,
              profileDetailsResponse?.permanantaddress?.StateId,
              profileDetailsResponse?.permanantaddress?.CountryId
            );
            formattedResponse.location[index].permenantAddress = cname;
            let cname1 = await findCity(
              profileDetailsResponse?.workasddress?.CityId,
              profileDetailsResponse?.workasddress?.StateId,
              profileDetailsResponse?.workasddress?.CountryId
            );
            formattedResponse.location[index].workAddress = cname1;
          }
        }
      }
      setProfileDetails(formattedResponse);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      return;
    }
  };
  return (
    <>
      <DashboardHeader />
      <Container className="main">
        <TopBanner label={VIEW_PROILE_CONSTANTS.title} />
        {loading ? <Loader /> : <ViewProfile profileDetails={profileDetails} selfProfile />}
      </Container>
      <FooterSmall />
    </>
  );
};
