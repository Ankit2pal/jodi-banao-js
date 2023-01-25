// import LoginHeaderContainer from '../../containers/LoginHeaderContainer';
// import RegisterContainer from '../../containers/RegisterContainer';
// import { WhyJodiBanao } from '../WhyJodiBanao';
// import { FindJodi } from '../FindMatch';
// import { FooterDetails } from '../FooterDetails';
import Container from '@mui/material/Container';
import LoginHeaderContainer from '../../containers/LoginHeaderContainer_v2';
import RegisterContainer from '../../containers/RegisterContainer_v2';
import AboutJodi from '../AboutJodi/AboutJodi';
import HowItWorks from '../HowItWorks/HowItWorks';
import { Testimonials } from '../Testimonials';
import FooterDetails from '../FooterDetails_v2/FooterDetails_v2';
import '../../styles/_globals.scss';

const HomePage = () => {
  return (
    <>
      <LoginHeaderContainer />
      <Container className="main">
        <RegisterContainer />
        <AboutJodi />
        <HowItWorks />
        <Testimonials />
        <FooterDetails />
        {/* <WhyJodiBanao /> */}
        {/* <FindJodi /> */}
      </Container>
      {/* <FooterDetails /> */}
    </>
  );
};

HomePage.propTypes = {};

HomePage.defaultProps = {};

export default HomePage;
