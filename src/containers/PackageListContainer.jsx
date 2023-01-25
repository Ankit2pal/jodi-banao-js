import { FooterSmall } from '../components/FooterSmall';
import Packages from '../components/PackageList/Packages';
import TopBanner from '../commons/TopBanner/TopBanner';
import { packageListConstants } from '../constants/packageListConstants';
import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import Container from '@mui/material/Container';
import '../styles/_globals.scss';

export const PackageListContainer = () => {
  return (
    <>
      <DashboardHeader />
      <Container className="main">
        <TopBanner label={packageListConstants.title} />
        <Packages />
      </Container>
      <FooterSmall />
    </>
  );
};
