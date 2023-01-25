import { FooterSmall } from '../components/FooterSmall';
import TopBanner from '../commons/TopBanner/TopBanner';
import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import { Edit } from '../components/Edit';
import { editConstants } from '../constants/editConstants ';
import Container from '@mui/material/Container';
import { useSelector } from 'react-redux';
import '../styles/_globals.scss';
import { getMaritalStatus } from '../redux/selectors/registerSelector';

export const EditContainer = () => {
  const creatingForMaritalStatusOptionalData = useSelector(getMaritalStatus);

  return (
    <>
      <DashboardHeader />
      <Container className="main">
        <TopBanner label={editConstants.title} />
        <Edit creatingForMaritalStatusOptionalData={creatingForMaritalStatusOptionalData} />
      </Container>
      <FooterSmall />
    </>
  );
};
