import TopBanner from '../commons/TopBanner/TopBanner';
import { FooterDetails } from '../components/FooterDetails_v2';
import LoginHeaderContainer from './LoginHeaderContainer';
import { privacyPolicyConstants } from '../constants/privacyPolicyConstants';
import { PrivacyPolicy } from '../components/PrivacyPolicy';
import Container from '@mui/material/Container';
import '../styles/_globals.scss';
import { useEffect } from 'react';

export const PrivacyPolicyContainer = () => {
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
        <TopBanner label={privacyPolicyConstants.title} />
        <PrivacyPolicy policyData={privacyPolicyConstants.data} />
      </Container>
      <FooterDetails />
    </>
  );
};
