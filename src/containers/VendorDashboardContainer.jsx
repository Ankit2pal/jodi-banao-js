import { DASHBOARD_CONSTANTS } from '../constants/dashboardConstants';
import { useEffect, useState } from 'react';
import FooterSmall from '../components/FooterSmall/FooterSmall';
import { VendorDashboard } from '../components/VendorDashboard';
import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import TopBanner from '../commons/TopBanner/TopBanner';
import { useDispatch, useSelector } from 'react-redux';
import { getVendorPackageRequest } from '../redux/modules/vendorDashboardSlice';
import {
  getViewedProfiles,
  getVendorPackageDetail
} from '../redux/selectors/vendorDashboardSelector';
import { getUId } from '../redux/selectors/userRegisterationDetails';
import Container from '@mui/material/Container';
import '../styles/_globals.scss';

export const VendorDashboardContainer = () => {
  const viewedProfiles = useSelector(getViewedProfiles);
  const vendorPackageDetail = useSelector(getVendorPackageDetail);
  const [profiles, setProfiles] = useState([]);
  const dispatch = useDispatch();
  const UID = useSelector(getUId);

  useEffect(() => {
    dispatch(getVendorPackageRequest(UID));
  }, []);

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
        <VendorDashboard
          vendorPackageDetail={vendorPackageDetail}
          profiles={profiles}
          dataForProfiles={vendorPackageDetail}
        />
      </Container>
      <FooterSmall />
    </>
  );
};
