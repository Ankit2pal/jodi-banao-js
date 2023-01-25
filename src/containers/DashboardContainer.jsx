import { DASHBOARD_CONSTANTS } from '../constants/dashboardConstants';
import { useEffect, useState } from 'react';
import { getViewedProfilesApi } from '../services/dashboardApi';
// import { getUId } from '../redux/selectors/userRegisterationDetails';
// import { useSelector } from 'react-redux';
import FooterSmall from '../components/FooterSmall/FooterSmall';
import { Dashboard } from '../components/Dashboard';
import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import TopBanner from '../commons/TopBanner/TopBanner';
import { useDispatch, useSelector } from 'react-redux';
import { getUId } from '../redux/selectors/userRegisterationDetails';
import { getBalanceProfileApi } from '../services/dashboardApi';

import Container from '@mui/material/Container';
import '../styles/_globals.scss';
import { checkBalanceProfile } from '../redux/modules/userRegisterationDetails';

export const DashboardContainer = () => {
  const [loaded, setLoaded] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const dispatch = useDispatch();
  const UID = useSelector(getUId);
  useEffect(() => {
    if (!loaded) {
      getProfiles();
      setLoaded(false);
    }
  }, [loaded]);
  const [viewProfiles, setViewProfiles] = useState([]);

  const [balProfile, setBalProfiles] = useState({ viewProfile: 0, balProfile: 0 });
  const getBalanceProfile = async () => {
    try {
      const response = await getBalanceProfileApi(UID);
      let data = {
        viewProfile: response.ViewedProfile ? response.ViewedProfile : 0,
        balProfile: response.BalanceProfile ? response.BalanceProfile : 0
      };
      setBalProfiles(data);
      dispatch(checkBalanceProfile(response.BalanceProfile));
    } catch (error) {
      const message = error.response.data.Message || 'Something went wrong';
      throw message;
    }
  };
  const getViewProfiles = async () => {
    try {
      const response = await getViewedProfilesApi(UID);
      setViewProfiles(response);
    } catch (error) {
      const message = error.response.data.Message || 'Something went wrong';
      throw message;
    }
  };

  useEffect(() => {
    getBalanceProfile();
    getViewProfiles();
  }, []);

  const getProfiles = async () => {
    try {
      const response = await getViewedProfilesApi(UID);
      setProfiles(response);
    } catch (error) {
      const message = error.response.data.Message || 'Something went wrong';
      throw message;
    }
  };

  return (
    <>
      <DashboardHeader />
      <Container className="main">
        <TopBanner label={DASHBOARD_CONSTANTS.title} />
        <Dashboard profiles={profiles} viewProfiles={viewProfiles} balance={balProfile} />
      </Container>
      <FooterSmall />
    </>
  );
};
