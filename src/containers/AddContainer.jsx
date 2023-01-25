import React from 'react';
import { FooterSmall } from '../components/FooterSmall';
import TopBanner from '../commons/TopBanner/TopBanner';
import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import { addConstants } from '../constants/addConstants';
import Add from '../components/Add/Add';
import Container from '@mui/material/Container';
import '../styles/_globals.scss';
export const AddContainer = () => {
  return (
    <>
      <DashboardHeader />
      <Container className="main">
        <TopBanner label={addConstants.title} />
        <Add />
      </Container>
      <FooterSmall />
    </>
  );
};
