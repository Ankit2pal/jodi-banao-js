import TopBanner from '../commons/TopBanner/TopBanner';
// import { FooterDetails } from '../components/FooterDetails';
import FooterDetails from '../components/FooterDetails_v2/FooterDetails_v2';
import LoginHeaderContainer from './LoginHeaderContainer';
import { contactUsConstants } from '../constants/contactUsConstants';
import { ContactUs } from '../components/ContactUs';
import Container from '@mui/material/Container';
import '../styles/_globals.scss';
import { useEffect } from 'react';
import Contact from '../components/ContactUs/ContactUsInfo';
export const ContactUsContainer = () => {
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
        <TopBanner label={contactUsConstants.title} />
        <Contact />
        <ContactUs contactData={contactUsConstants.data} />
      </Container>
      <FooterDetails />
    </>
  );
};
