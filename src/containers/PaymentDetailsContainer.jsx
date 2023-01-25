import React, { useState } from 'react';
import { FooterSmall } from '../components/FooterSmall';
import { getRelatedUsersAPi } from '../services/PaymentUserAPi';
import TopBanner from '../commons/TopBanner/TopBanner';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPackagesDetail } from '../redux/modules/packagesSlice';
import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import { addConstants } from '../constants/addConstants';
import Container from '@mui/material/Container';
import { PaymentDetails } from '../components/PaymentDetails';
import '../styles/_globals.scss';
import { getPackage, getPlan } from '../redux/selectors/packageSelector';
import { transformResponseForDropDownUser } from '../utils/responseTranformHelpers';
import { getUId } from '../redux/selectors/userRegisterationDetails';
export const PaymentDetailsContainer = () => {
  const dispatch = useDispatch();
  const UID = useSelector(getUId);
  const [profiles, setProfiles] = useState([]);
  const [api, setApi] = useState(false);

  useEffect(() => {
    getProfiles();
  }, []);

  const creatingPackagesData = useSelector(getPackage);
  const creatingPlanData = useSelector(getPlan);

  useEffect(() => {
    dispatch(fetchPackagesDetail(true));
  }, []);

  const getProfiles = async () => {
    try {
      const response = await getRelatedUsersAPi({ UserId: UID });
      setProfiles(transformResponseForDropDownUser(response?.Result, 'FullName'));
      setApi(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <DashboardHeader />
      <Container className="main">
        <TopBanner label={addConstants.paymentInfo} />
        <PaymentDetails
          creatingPackagesData={creatingPackagesData}
          creatingPlanData={creatingPlanData}
          profiles={profiles}
          api={api}
        />
      </Container>
      <FooterSmall />
    </>
  );
};
