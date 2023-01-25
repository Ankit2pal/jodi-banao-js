import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/_infoCommons.scss';
import { Container, Stack, Typography, Grid, Button } from '@mui/material';
import { ADMIN_DASHBOARD_CONSTANTS } from '../../constants/adminDashboardConstants';
import AdminDashboardStyles from './adminDashboard.module.scss';
import { useSelector } from 'react-redux';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js';
import 'chart.piecelabel.js';
import ProfileItem from '../ProfileItem';
import { isArray } from 'lodash';
import { Bar } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const AdminDashboard = ({ profiles }) => {
  const labels = [
    'Top User Created',
    'Top Executive Created',
    'Top User Pack Purchased',
    'Top Executive Pack Purchased'
  ];

  const data = {
    labels,
    datasets: [
      {
        label: 'Top User Created',
        data: [5, 7, 3],
        animals: ['cat', 'dog', 'bear'],
        backgroundColor: 'blue'
      },
      {
        label: 'Top Executive Created',
        data: [4, 6, 2],
        animals: ['cat', 'dog', 'bear'],
        backgroundColor: 'green'
      },
      {
        label: 'Top User Pack Purchased',
        data: [3, 8, 11],
        animals: ['cat', 'dog', 'bear'],
        backgroundColor: 'yellow'
      },
      {
        label: 'Top Executive Pack Purchased',
        data: [1, 4, 8],
        backgroundColor: 'pink',
        animals: ['cat', 'dog', 'bear']
      }
    ]
  };
  const formDatas = useSelector((state) => state.userRegisterationDetails.data);

  return (
    <>
      <Container className="info-container">
        <Typography
          variant="subtitle1"
          align="center"
          className={AdminDashboardStyles.subtitle}
          gutterBottom
          component="div">
          {ADMIN_DASHBOARD_CONSTANTS.subtitle}{' '}
          <span className={AdminDashboardStyles.name}>{formDatas?.FullName} </span>
          {ADMIN_DASHBOARD_CONSTANTS.info}
        </Typography>
        <Bar data={data} />
        <Container className={[AdminDashboardStyles.profileContainer]}>
          <Stack container direction="row" justifyContent="space-between" alignItems="center">
            <Button className={AdminDashboardStyles.button} href="#text-buttons">
              {ADMIN_DASHBOARD_CONSTANTS['viewedProfiles']}
            </Button>
            <Button className={AdminDashboardStyles.button} href="#text-buttons">
              {ADMIN_DASHBOARD_CONSTANTS['moreProfiles']}
            </Button>
          </Stack>
          <Grid container spacing={3}>
            {profiles &&
              isArray(profiles) &&
              profiles.map((profile) => (
                <Grid item key={profile.userId} xs={12} md={3}>
                  <ProfileItem
                    name={profile.FullName}
                    education={profile.EducationName}
                    country={profile.CountryName}
                    state={profile.Statename}
                    age={profile.AGE}
                    height={profile.HeightName}
                    imageUrl={profile.ImageUrl}
                    userid={profile.userid}
                  />
                </Grid>
              ))}
          </Grid>
        </Container>
      </Container>
    </>
  );
};

AdminDashboard.propTypes = {
  profiles: PropTypes.array,
  adminPackageDetail: PropTypes.object,
  topVendor: PropTypes.object
};

AdminDashboard.defaultProps = {
  profiles: [],
  adminPackageDetail: {},
  topVendor: {}
};

export default AdminDashboard;
