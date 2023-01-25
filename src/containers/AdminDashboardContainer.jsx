import { DASHBOARD_CONSTANTS } from '../constants/dashboardConstants';
import { useEffect, useState } from 'react';
import FooterSmall from '../components/FooterSmall/FooterSmall';
import AdminDashboard from '../components/AdminDashboard/AdminDashboard';
import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import TopBanner from '../commons/TopBanner/TopBanner';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminPackageRequest } from '../redux/modules/adminDashboardSlice';
import {
  getViewedProfiles,
  getAdminPackageDetail
} from '../redux/selectors/adminDashboardSelector';
import { getUId } from '../redux/selectors/userRegisterationDetails';
import Container from '@mui/material/Container';
import '../styles/_globals.scss';
import { getTopVendorAPI } from '../services/getTopVendorApi';

export const AdminDashboardContainer = () => {
  const viewedProfiles = useSelector(getViewedProfiles);
  const adminPackageDetail = useSelector(getAdminPackageDetail);
  const [profiles, setProfiles] = useState([]);
  const [topVendor, setTopVendor] = useState([]);
  const dispatch = useDispatch();
  const UID = useSelector(getUId);

  useEffect(() => {
    dispatch(getAdminPackageRequest(UID));
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
        <AdminDashboard
          adminPackageDetail={adminPackageDetail}
          profiles={profiles}
          topVendor={topVendor}
        />
      </Container>
      <FooterSmall />
    </>
  );
};
