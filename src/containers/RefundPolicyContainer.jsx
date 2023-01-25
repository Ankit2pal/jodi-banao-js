import TopBanner from '../commons/TopBanner/TopBanner';
import { FooterDetails } from '../components/FooterDetails_v2';
import LoginHeaderContainer from './LoginHeaderContainer';
import { RefundPolicy } from '../components/RefundPolicy';
import Container from '@mui/material/Container';
import { refundPolicyConstants } from '../constants/refundPolicyConstants';
import '../styles/_globals.scss';
import { useEffect } from 'react';

export const RefundPolicyContainer = () => {
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
        <TopBanner label={refundPolicyConstants.title} />
        <RefundPolicy policyData={refundPolicyConstants.data} />
      </Container>
      <FooterDetails />
    </>
  );
};
