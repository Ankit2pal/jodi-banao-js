import { FooterSmall } from '../components/FooterSmall';
import Users from '../components/Users/Users';
import TopBanner from '../commons/TopBanner/TopBanner';
import { userConstants } from '../constants/userConstants';
import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import Container from '@mui/material/Container';
import '../styles/_globals.scss';

export const UsersContainer = () => {
  return (
    <>
      <DashboardHeader />
      <Container className="main">
        <TopBanner label={userConstants.title} />
        <Users />
      </Container>
      <FooterSmall />
    </>
  );
};
