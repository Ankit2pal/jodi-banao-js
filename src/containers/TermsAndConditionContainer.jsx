import TopBanner from '../commons/TopBanner/TopBanner';
import { FooterDetails } from '../components/FooterDetails_v2';
import LoginHeaderContainer from './LoginHeaderContainer';
import { TermsAndCondition } from '../components/TermsAndCondition';
import { termsAndConditionConstants } from '../constants/termsAndConditionConstants';
import Container from '@mui/material/Container';
import '../styles/_globals.scss';
import { useEffect } from 'react';

export const TermsAndConditionContainer = () => {
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
        <TopBanner label={termsAndConditionConstants.title} />
        <TermsAndCondition conditionData={termsAndConditionConstants.data} />
      </Container>
      <FooterDetails />
    </>
  );
};
