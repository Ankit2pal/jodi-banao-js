import { useEffect, React } from 'react';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import '../../styles/_infoCommons.scss';
import { Container, Stack, Typography, Box, Grid, Button } from '@mui/material';
import { DASHBOARD_CONSTANTS } from '../../constants/dashboardConstants';
import DashboardStyles from './dashboard.module.scss';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import 'chart.piecelabel.js';
import ProfileItem from '../ProfileItem';
import Carousel from 'react-elastic-carousel';

ChartJS.register(ArcElement, Tooltip, Legend);
export const data = {
  labels: ['View Profile', 'Balance Profile'],
  datasets: [
    {
      label: '# of Votes',
      data: [3, 7],
      backgroundColor: ['#FC9B20', ' #FD4A41'],
      borderColor: ['#FC9B20', ' #FD4A41'],
      borderWidth: 1
    }
  ]
};

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 }
];

const Dashboard = ({ profiles, balance }) => {
  const formDatas = useSelector((state) => state.userRegisterationDetails.data);
  console.log(formDatas?.FullName);

  const data = {
    labels: ['View Profile', 'Balance Profile'],
    datasets: [
      {
        label: '# of Votes',
        data: [balance.viewProfile, balance.balProfile],
        backgroundColor: ['#FC9B20', ' #FD4A41'],
        borderColor: ['#FC9B20', ' #FD4A41'],
        borderWidth: 1
      }
    ]
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);
  return (
    <Container className={['info-container', DashboardStyles.container]}>
      <Typography
        variant="subtitle1"
        align="center"
        className={DashboardStyles.subtitle}
        gutterBottom
        component="div">
        {DASHBOARD_CONSTANTS.subtitle}{' '}
        <span className={DashboardStyles.name}>{formDatas?.FullName} </span>
        {DASHBOARD_CONSTANTS.info}
      </Typography>
      <Stack container gap={2.5} className={[DashboardStyles.figContainer]}>
        <Stack gap={2.5} className={[DashboardStyles.boxContainer]}>
          <Box className={[DashboardStyles.box, DashboardStyles.box1]}>
            <Typography variant="h3" className={DashboardStyles.count} component="div">
              {balance?.viewProfile}
            </Typography>
            <Typography variant="subtitle1" className={DashboardStyles.title} component="div">
              View Profile
            </Typography>
          </Box>
          <Box className={[DashboardStyles.box, DashboardStyles.box2]}>
            <Typography variant="h3" className={DashboardStyles.count} component="div">
              {balance?.balProfile}
            </Typography>
            <Typography variant="subtitle1" className={DashboardStyles.title} component="div">
              Balance Profile
            </Typography>
          </Box>
        </Stack>
        <Box className={DashboardStyles.chartContainer}>
          <Box className={DashboardStyles.chart}>
            <Pie
              data={data}
              options={{
                pieceLabel: {
                  render: 'value',
                  fontColor: '#fff',
                  fontStyle: 'bold'
                }
              }}
            />
          </Box>
        </Box>
      </Stack>

      <Container className={[DashboardStyles.profileContainer]}>
        <Stack container className={[DashboardStyles.buttonContainer]}>
          <Button className={DashboardStyles.button} href="#text-buttons">
            {DASHBOARD_CONSTANTS['viewedProfiles']}
          </Button>
          <Button className={DashboardStyles.button} href="#text-buttons">
            {DASHBOARD_CONSTANTS['moreProfiles']}
          </Button>
        </Stack>
        <Box className={DashboardStyles.carousel_wrapper}>
          {/* <Grid container spacing={3}> */}

          <Carousel breakPoints={breakPoints} className={DashboardStyles.carousel_breakPoints}>
            {profiles &&
              profiles.map((profile) => (
                <Grid item key={profile.userId} xs={12} md={3} className={DashboardStyles.profiles}>
                  <ProfileItem
                    name={profile.FullName}
                    education={profile.EducationName}
                    country={profile.CountryName}
                    state={profile.Statename}
                    age={profile.AGE}
                    height={profile.HeightName}
                    imageUrl={profile.ImageUrl}
                    userid={profile.userid}
                    viewProfile={profiles}
                  />
                </Grid>
              ))}
          </Carousel>
          {/* </Grid> */}
        </Box>
      </Container>
    </Container>
  );
};

Dashboard.propTypes = {
  profiles: PropTypes.array,
  viewProfiles: PropTypes.array,
  balance: PropTypes.object
};

Dashboard.defaultProps = {
  profiles: [],
  viewProfiles: [],
  balance: { viewProfile: 0, balProfile: 0 }
};

export default Dashboard;
