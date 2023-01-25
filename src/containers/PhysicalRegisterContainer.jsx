import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FooterDetails } from '../components/FooterDetails_v2';
import PhysicalRegister from '../components/PhysicalRegister/PhysicalRegister';
import { fetchRegisterationDetails } from '../redux/modules/registerationDetailsSlice';
import { fetchUserRegisterationDetails } from '../redux/modules/userRegisterationDetails';
import { getStepNumber, getUId } from '../redux/selectors/userRegisterationDetails';
import LoginHeaderContainer from './LoginHeaderContainer';
import Container from '@mui/material/Container';
import '../styles/_globals.scss';

function PhysicalRegisterContainer() {
  const dispatch = useDispatch();

  const stepNo = useSelector(getStepNumber);
  const userId = useSelector(getUId);

  useEffect(() => {
    dispatch(fetchRegisterationDetails());
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    // need to get user details from redux slice
    dispatch(fetchUserRegisterationDetails({ userId }));
  }, []);

  return (
    <>
      <LoginHeaderContainer />
      <Container className="main">
        <PhysicalRegister stepNumber={stepNo} />
      </Container>
      <FooterDetails />
    </>
  );
}

export default PhysicalRegisterContainer;
