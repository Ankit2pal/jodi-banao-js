import TopBanner from '../commons/TopBanner/TopBanner';
import { FooterSmall } from '../components/FooterSmall';
import { paymentHistoryConstant } from '../constants/paymentHistoryConstant';
import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import Container from '@mui/material/Container';
import '../styles/_globals.scss';
import { PaymentHistory } from '../components/PaymentHistory';

export const PaymentHistoryContainer = () => {
  return (
    <>
      <DashboardHeader />
      <Container className="main">
        <TopBanner label={paymentHistoryConstant.title} />
        <PaymentHistory />
      </Container>
      <FooterSmall />
    </>
  );
};
