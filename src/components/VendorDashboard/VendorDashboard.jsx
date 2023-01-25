import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/_infoCommons.scss';
import { Container, Typography, Box, Grid, Button } from '@mui/material';
import { VENDOR_DASHBOARD_CONSTANTS } from '../../constants/vendorDashboardConstants';
import VendorDashboardStyles from './vendorDashboard.module.scss';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import 'chart.piecelabel.js';
import ProfileItem from '../ProfileItem';
import { get, isArray } from 'lodash';
import { any } from 'prop-types';
import { useSelector } from 'react-redux';
ChartJS.register(ArcElement, Tooltip, Legend);

const VendorDashboard = ({ profiles, vendorPackageDetail, dataForProfiles }) => {
  const data = {
    labels: ['View Profile', 'Balance Profile'],
    datasets: [
      {
        label: '# of Votes',
        data: [
          get(vendorPackageDetail, 'ViewedProfile', dataForProfiles?.[0]?.ViewedProfile),
          get(vendorPackageDetail, 'BalanceProfile', dataForProfiles?.[0]?.BalanceProfile)
        ],
        backgroundColor: ['#FC9B20', ' #FD4A41'],
        borderColor: ['#FC9B20', ' #FD4A41'],
        borderWidth: 1
      }
    ]
  };
  const formDatas = useSelector((state) => state.userRegisterationDetails.data);

  return (
    <Container className="info-container">
      <Typography
        variant="subtitle1"
        align="center"
        className={VendorDashboardStyles.subtitle}
        gutterBottom
        component="div">
        {VENDOR_DASHBOARD_CONSTANTS.subtitle}{' '}
        <span className={VendorDashboardStyles.name}>{formDatas?.FullName} </span>
        {VENDOR_DASHBOARD_CONSTANTS.info}
      </Typography>
      <Grid container gap={2.5} className={VendorDashboardStyles.figContainer}>
        <Grid container item gap={2} className={[VendorDashboardStyles.boxContainer]}>
          <Grid
            item
            xs={5}
            md={2.5}
            className={[VendorDashboardStyles.box, VendorDashboardStyles.box2]}>
            <Typography variant="h3" className={VendorDashboardStyles.count} component="span">
              {dataForProfiles?.[0]?.ViewedProfile}
            </Typography>
            <Typography
              variant="subtitle1"
              className={VendorDashboardStyles.title}
              component="span">
              View Profile
            </Typography>
          </Grid>
          <Grid
            item
            xs={5}
            md={2.5}
            className={[VendorDashboardStyles.box, VendorDashboardStyles.box2]}>
            <Typography variant="h3" className={VendorDashboardStyles.count} component="span">
              {dataForProfiles?.[0]?.BalanceProfile}
            </Typography>
            <Typography
              variant="subtitle1"
              className={VendorDashboardStyles.title}
              component="span">
              Balance Profile
            </Typography>
          </Grid>
          <Grid
            item
            xs={5}
            md={2.5}
            className={[VendorDashboardStyles.box, VendorDashboardStyles.box2]}>
            <Typography variant="h3" className={VendorDashboardStyles.count} component="span">
              {dataForProfiles?.[0]?.Freffer}
            </Typography>
            <Typography
              variant="subtitle1"
              className={VendorDashboardStyles.title}
              component="span">
              Freffer
            </Typography>
          </Grid>
          <Grid
            item
            xs={5}
            md={2.5}
            className={[VendorDashboardStyles.box, VendorDashboardStyles.box2]}>
            <Typography variant="h3" className={VendorDashboardStyles.count} component="span">
              {dataForProfiles?.[0]?.Funreffer}
            </Typography>
            <Typography
              variant="subtitle1"
              className={VendorDashboardStyles.title}
              component="span">
              Funreffer
            </Typography>
          </Grid>
          <Grid
            item
            xs={5}
            md={2.5}
            className={[VendorDashboardStyles.box, VendorDashboardStyles.box2]}>
            <Typography variant="h3" className={VendorDashboardStyles.count} component="span">
              {dataForProfiles?.[0]?.MReffer}
            </Typography>
            <Typography
              variant="subtitle1"
              className={VendorDashboardStyles.title}
              component="span">
              Mreffer
            </Typography>
          </Grid>
          <Grid
            item
            xs={5}
            md={2.5}
            className={[VendorDashboardStyles.box, VendorDashboardStyles.box2]}>
            <Typography variant="h3" className={VendorDashboardStyles.count} component="span">
              {dataForProfiles?.[0]?.Munreffer}
            </Typography>
            <Typography
              variant="subtitle1"
              className={VendorDashboardStyles.title}
              component="span">
              Munreffer
            </Typography>
          </Grid>
          <Grid
            item
            xs={5}
            md={2.5}
            className={[VendorDashboardStyles.box, VendorDashboardStyles.box2]}>
            <Typography variant="h3" className={VendorDashboardStyles.count} component="span">
              {dataForProfiles?.[0]?.femalecount}
            </Typography>
            <Typography
              variant="subtitle1"
              className={VendorDashboardStyles.title}
              component="span">
              Female Count
            </Typography>
          </Grid>
          <Grid
            item
            xs={5}
            md={2.5}
            className={[VendorDashboardStyles.box, VendorDashboardStyles.box2]}>
            <Typography variant="h3" className={VendorDashboardStyles.count} component="span">
              {dataForProfiles?.[0]?.maleCount}
            </Typography>
            <Typography
              variant="subtitle1"
              className={VendorDashboardStyles.title}
              component="span">
              Male Count
            </Typography>
          </Grid>
        </Grid>
        <Grid className={VendorDashboardStyles.chartContainer}>
          <Box className={VendorDashboardStyles.chart}>
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
        </Grid>
      </Grid>

      <Container className={[VendorDashboardStyles.profileContainer]}>
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
          <Button className={VendorDashboardStyles.button} href="#text-buttons">
            {VENDOR_DASHBOARD_CONSTANTS['viewedProfiles']}
          </Button>
          <Button className={VendorDashboardStyles.button} href="#text-buttons">
            {VENDOR_DASHBOARD_CONSTANTS['moreProfiles']}
          </Button>
        </Grid>
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

VendorDashboard.propTypes = {
  profiles: PropTypes.array,
  vendorPackageDetail: PropTypes.object,
  dataForProfiles: any
};

VendorDashboard.defaultProps = {
  profiles: [],
  vendorPackageDetail: {}
};

export default VendorDashboard;
