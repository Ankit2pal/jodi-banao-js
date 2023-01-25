import ManagePhotos from '../components/ManagePhotos/ManagePhotos';
import TopBanner from '../commons/TopBanner/TopBanner';
import { managePhotosConstants } from '../constants/managePhotosConstants';
import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import Container from '@mui/material/Container';
import '../styles/_globals.scss';
import { FooterSmall } from '../components/FooterSmall';

export const ManagePhotosContainer = () => {
  return (
    <>
      <DashboardHeader />
      <Container className="main">
        <TopBanner label={managePhotosConstants.title} />
        <ManagePhotos />
      </Container>
      {/* <FooterDetails /> */}
      <FooterSmall />
    </>
  );
};
