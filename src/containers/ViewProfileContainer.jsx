import TopBanner from '../commons/TopBanner/TopBanner';
import { ViewProfile } from '../components/ViewProfile';
import FooterSmall from '../components/FooterSmall/FooterSmall';
import { VIEW_PROILE_CONSTANTS } from '../constants/viewProfileConstants';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getViewProfileDetailsApi } from '../services/viewProfileApi';
import { getViewProfileDetails } from '../utils/viewProfileHelpers';
import { getRegisterationDetailsApi } from '../services/registerationDetailsApi';
import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import { useSelector } from 'react-redux';
import { getUID } from '../redux/selectors/loginSelector';
import Container from '@mui/material/Container';
import '../styles/_globals.scss';
import Loader from '../commons/Loader/Loader';
import { getCitiesAPI } from '../services/CountryStateApi';

export const ViewProfileContainer = () => {
  const [profileDetails, setProfileDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const userIdFromLoginDetails = useSelector(getUID);
  const countries = useSelector((state) => state?.registerationDetails?.country);
  const state = useSelector((state) => state?.registerationDetails?.state);
  const UID = {
    UserId: userIdFromLoginDetails,
    uid: userId
  };

  useEffect(() => {
    if (loading) {
      getSubAdminDetails();
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
  const getSubAdminDetails = async () => {
    try {
      const profileDetailsResponse = await getViewProfileDetailsApi(UID);
      const options = await getRegisterationDetailsApi();
      const formattedResponse = getViewProfileDetails(profileDetailsResponse?.Data, options);
      for (let index = 0; index < formattedResponse.generalInfo.length; index++) {
        if (formattedResponse.generalInfo[index]?.key === 'District') {
          delete formattedResponse.generalInfo[index];
        }
        if (formattedResponse.generalInfo[index]?.key === 'Country') {
          let cname = findCountry(profileDetailsResponse?.Data?.CountryId);
          formattedResponse.generalInfo[index].value = cname;
        }
        if (formattedResponse.generalInfo[index]?.key === 'State') {
          let cname = findState(profileDetailsResponse?.Data?.StateId);
          formattedResponse.generalInfo[index].value = cname;
        }
        if (formattedResponse.generalInfo[index]?.key === 'City') {
          let cname = await findCity(
            profileDetailsResponse?.Data?.CityId,
            profileDetailsResponse?.Data?.StateId,
            profileDetailsResponse?.Data?.CountryId
          );
          formattedResponse.generalInfo[index].value = cname;
        }
        if (
          formattedResponse?.generalInfo[index]?.key === 'Pan Number' &&
          formattedResponse?.generalInfo[index]?.value === undefined
        ) {
          delete formattedResponse?.generalInfo[index];
        }
        if (
          formattedResponse?.generalInfo[index]?.key === 'Aadhar Number' &&
          formattedResponse?.generalInfo[index]?.value === undefined
        ) {
          delete formattedResponse?.generalInfo[index];
        }
      }
      if (formattedResponse.userDetails?.location) {
        let cname = findCountry(formattedResponse.userDetails?.location);
        formattedResponse.userDetails.location =
          cname + ',' + formattedResponse.userDetails?.village;
      }
      for (let index = 0; index < formattedResponse?.partnerpreferance?.length; index++) {
        if (formattedResponse?.partnerpreferance[index]?.key === 'District') {
          delete formattedResponse?.partnerpreferance[index];
        }
        if (formattedResponse?.partnerpreferance[index]?.key === 'Country') {
          let cname = findCountry(profileDetailsResponse?.Data?.partnerpreferance?.CountryId);
          formattedResponse.partnerpreferance[index].value = cname;
        }
        if (formattedResponse?.partnerpreferance[index]?.key === 'State') {
          let cname = findState(profileDetailsResponse?.Data?.partnerpreferance?.StateId);
          formattedResponse.partnerpreferance[index].value = cname;
        }
        if (formattedResponse?.partnerpreferance[index]?.key === 'City') {
          let cname = await findCity(
            profileDetailsResponse?.Data?.partnerpreferance?.CityId,
            profileDetailsResponse?.Data?.partnerpreferance?.StateId,
            profileDetailsResponse?.Data?.partnerpreferance?.CountryId
          );
          formattedResponse.partnerpreferance[index].value = cname;
        }
      }
      for (let index = 0; index < formattedResponse?.location?.length; index++) {
        if (formattedResponse?.location[index]?.key === 'District') {
          delete formattedResponse?.location[index];
        }
        if (formattedResponse?.location[index]?.key === 'Country') {
          let cname = findCountry(profileDetailsResponse?.Data?.permanantaddress?.CountryId);
          formattedResponse.location[index].permenantAddress = cname;
          let cname1 = findCountry(profileDetailsResponse?.Data?.workasddress?.CountryId);
          formattedResponse.location[index].workAddress = cname1;
        }
        if (formattedResponse?.location[index]?.key === 'State') {
          let cname = findState(profileDetailsResponse?.Data?.permanantaddress?.StateId);
          formattedResponse.location[index].permenantAddress = cname;
          let cname1 = findState(profileDetailsResponse?.Data?.workasddress?.StateId);
          formattedResponse.location[index].workAddress = cname1;
        }
        if (formattedResponse?.location[index]?.key === 'City') {
          let cname = await findCity(
            profileDetailsResponse?.Data?.permanantaddress?.CityId,
            profileDetailsResponse?.Data?.permanantaddress?.StateId,
            profileDetailsResponse?.Data?.permanantaddress?.CountryId
          );
          formattedResponse.location[index].permenantAddress = cname;
          let cname1 = await findCity(
            profileDetailsResponse?.Data?.workasddress?.CityId,
            profileDetailsResponse?.Data?.workasddress?.StateId,
            profileDetailsResponse?.Data?.workasddress?.CountryId
          );
          formattedResponse.location[index].workAddress = cname1;
        }
      }

      setProfileDetails(formattedResponse);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return;
    }
  };
  return (
    <>
      <DashboardHeader />
      <Container className="main">
        <TopBanner label={VIEW_PROILE_CONSTANTS.title} />
        {loading ? <Loader /> : <ViewProfile profileDetails={profileDetails} />}
      </Container>
      <FooterSmall />
    </>
  );
};
