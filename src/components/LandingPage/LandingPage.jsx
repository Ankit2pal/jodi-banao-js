import LandingPageContentContainer from '../../containers/LandingPageContentContainer';
import LoginHeaderContainer from '../../containers/LoginHeaderContainer';
import JoinUsFooterPage from '../JoinUsFooter/JoinUsFooterPage';
import Container from '@mui/material/Container';
import '../../styles/_globals.scss';

const LandingPage = () => {
  return (
    <>
      <LoginHeaderContainer />
      <Container className="main">
        <LandingPageContentContainer />
      </Container>
      <JoinUsFooterPage />
    </>
  );
};

LandingPage.propTypes = {};

LandingPage.defaultProps = {};

export default LandingPage;
