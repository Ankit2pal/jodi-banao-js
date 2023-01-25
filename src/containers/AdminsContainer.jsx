import { FooterSmall } from '../components/FooterSmall';
import Admins from '../components/Admins/Admins';
import TopBanner from '../commons/TopBanner/TopBanner';
import { adminConstants } from '../constants/adminConstants';
import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import Container from '@mui/material/Container';
import '../styles/_globals.scss';

export const AdminsContainer = () => {
  return (
    <>
      <DashboardHeader />
      <Container className="main">
        <TopBanner label={adminConstants.title} />
        <Admins />
      </Container>
      <FooterSmall />
    </>
  );
};
