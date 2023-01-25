import Notification from '../components/Notification/Notification';
import TopBanner from '../commons/TopBanner/TopBanner';
import { notificationConstants } from '../constants/notificationConstants';
import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import Container from '@mui/material/Container';
import '../styles/_globals.scss';
import { FooterSmall } from '../components/FooterSmall';

export const NotificationContainer = () => {
  return (
    <>
      <DashboardHeader />
      <Container className="main">
        <TopBanner label={notificationConstants.title} />
        <Notification />
      </Container>
      <FooterSmall />
    </>
  );
};
