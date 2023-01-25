import { React } from 'react';
import PropTypes from 'prop-types';
import '../../styles/_infoCommons.scss';
import { Container, Stack, Typography, Grid, Button } from '@mui/material';
import { SUPER_ADMIN_CONSTANTS } from '../../constants/SuperAdminConstants';
import SuperAdminStyles from './superAdmin.module.scss';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import 'chart.piecelabel.js';
import ProfileItem from '../ProfileItem';
import { isArray } from 'lodash';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend);

const SuperAdmin = ({ profiles }) => {
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
    <Container className="info-container">
      <Typography
        variant="subtitle1"
        align="center"
        className={SuperAdminStyles.subtitle}
        gutterBottom
        component="div">
        {SUPER_ADMIN_CONSTANTS.subtitle},
        <span className={SuperAdminStyles.name}>{formDatas?.FullName} </span>
        {SUPER_ADMIN_CONSTANTS.info}
      </Typography>
      <Bar data={data} />
      <Container className={[SuperAdminStyles.profileContainer]}>
        <Stack container direction="row" justifyContent="space-between" alignItems="center">
          <Button className={SuperAdminStyles.button} href="#text-buttons">
            {SUPER_ADMIN_CONSTANTS['viewedProfiles']}
          </Button>
          <Button className={SuperAdminStyles.button} href="#text-buttons">
            {SUPER_ADMIN_CONSTANTS['moreProfiles']}
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
                  viewProfile={profiles}
                />
              </Grid>
            ))}
        </Grid>
      </Container>
    </Container>
  );
};

SuperAdmin.propTypes = {
  profiles: PropTypes.array,
  superAdminPackageDetail: PropTypes.object,
  topVendor: PropTypes.object
};

SuperAdmin.defaultProps = {
  profiles: [],
  superAdminPackageDetail: {},
  topVendor: {}
};

export default SuperAdmin;
