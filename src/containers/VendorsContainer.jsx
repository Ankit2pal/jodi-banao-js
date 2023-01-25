import { FooterSmall } from '../components/FooterSmall';
import Vendors from '../components/Vendors/Vendors';
import TopBanner from '../commons/TopBanner/TopBanner';
import { vendorConstants } from '../constants/vendorConstants';
import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import Container from '@mui/material/Container';
import '../styles/_globals.scss';

export const VendorsContainer = () => {
  return (
    <>
      <DashboardHeader />
      <Container className="main">
        <TopBanner label={vendorConstants.title} />
        <Vendors />
      </Container>
      <FooterSmall />
    </>
  );
};
