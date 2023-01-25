import { DASHBOARD_CONSTANTS } from '../constants/dashboardConstants';
import { useEffect, useState } from 'react';
import FooterSmall from '../components/FooterSmall/FooterSmall';
import { SuperAdmin } from '../components/SuperAdmin';
import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import TopBanner from '../commons/TopBanner/TopBanner';
import { useDispatch, useSelector } from 'react-redux';
import {
  getViewedProfilesRequest,
  getSuperAdminPackageRequest
} from '../redux/modules/superAdminSlice';
import {
  getViewedProfiles,
  getSuperAdminPackageDetail
} from '../redux/selectors/superAdminSelector';
import { getUId } from '../redux/selectors/userRegisterationDetails';
import Container from '@mui/material/Container';
import '../styles/_globals.scss';
import { getTopVendorAPI } from '../services/getTopVendorApi';

export const SuperAdminContainer = () => {
  const viewedProfiles = useSelector(getViewedProfiles);
  const adminPackageDetail = useSelector(getSuperAdminPackageDetail);
  const [profiles, setProfiles] = useState([]);
  const dispatch = useDispatch();
  const UID = useSelector(getUId);
  const [topVendor, setTopVendor] = useState([]);
  useEffect(() => {
    dispatch(getViewedProfilesRequest({ userid: UID }));
    dispatch(getSuperAdminPackageRequest(UID));
    getTopVendor();
  }, []);

  const getTopVendor = async () => {
    const profileDetailsResponse = await getTopVendorAPI();
    setTopVendor(profileDetailsResponse);
  };

  useEffect(() => {
    if (viewedProfiles) {
      setProfiles(viewedProfiles);
    }
  }, [viewedProfiles]);

  return (
    <>
      <DashboardHeader />
      <Container className="main">
        <TopBanner label={DASHBOARD_CONSTANTS.title} />
        <SuperAdmin
          adminPackageDetail={adminPackageDetail}
          profiles={profiles}
          topVendor={topVendor}
        />
      </Container>
      <FooterSmall />
    </>
  );
};
