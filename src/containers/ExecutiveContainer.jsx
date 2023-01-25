import { FooterSmall } from '../components/FooterSmall';
// import Vendors from '../components/Vendors/Vendors';
import Executive from '../components/Executive/Executive';
import TopBanner from '../commons/TopBanner/TopBanner';
import { executiveConstant } from '../constants/executiveConstant';
import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import Container from '@mui/material/Container';
import '../styles/_globals.scss';

export const ExecutiveContainer = () => {
  return (
    <>
      <DashboardHeader />
      <Container className="main">
        <TopBanner label={executiveConstant.title} />
        <Executive />
      </Container>
      <FooterSmall />
    </>
  );
};
