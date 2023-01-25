import { FooterSmall } from '../components/FooterSmall';
import Packages from '../components/Packages/Packages';
import TopBanner from '../commons/TopBanner/TopBanner';
import packagesConstants from '../constants/packagesContants';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPackagesDetail } from '../redux/modules/packagesSlice';
import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import Container from '@mui/material/Container';
import '../styles/_globals.scss';

export const PackagesContainer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPackagesDetail(true));
  }, []);

  return (
    <>
      <DashboardHeader />
      <Container className="main">
        <TopBanner label={packagesConstants.title} />
        <Packages />
      </Container>
      <FooterSmall />
    </>
  );
};
