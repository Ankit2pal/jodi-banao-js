import TopBanner from '../commons/TopBanner/TopBanner';
import { AboutUs } from '../components/AboutUs';
// import { FooterDetails } from '../components/FooterDetails';
import LoginHeaderContainer from './LoginHeaderContainer';
import { aboutUsConstants } from '../constants/aboutUsConstants';
import Container from '@mui/material/Container';
import '../styles/_globals.scss';
import { useEffect } from 'react';
import FooterDetails from '../components/FooterDetails_v2/FooterDetails_v2';

export const AboutUsContainer = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);
  return (
    <>
      <LoginHeaderContainer />
      <Container className="main">
        <TopBanner label={aboutUsConstants.title} />
        <AboutUs description={aboutUsConstants.data} />
      </Container>
      <FooterDetails />
    </>
  );
};
