import { FooterSmall } from '../components/FooterSmall';
import HelpUs from '../components/HelpUs/HelpUs';
import TopBanner from '../commons/TopBanner/TopBanner';
import { helpUsConstants } from '../constants/helpUsConstants';
import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import Container from '@mui/material/Container';
import '../styles/_globals.scss';

export const HelpUsContainer = () => {
  return (
    <>
      <DashboardHeader />
      <Container className="main">
        <TopBanner label={helpUsConstants.title} />
        <HelpUs />
      </Container>
      <FooterSmall />
    </>
  );
};
