import React from 'react';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import SubAdminProfileStyle from './viewprofile.module.scss';
import '../../styles/_infoCommons.scss';
import { Grid, Typography, Stack, Box } from '@mui/material';
import { VIEW_PROILE_CONSTANTS } from '../../constants/viewProfileConstants';
import profilePlaceholder from '../../images/profile-placeholder.png';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import InfoTableTemplate from './InfoTableTemplate';
import { useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { getDropDownOptionsForFamilyRegister } from '../../redux/selectors/registerationDetailsSelector';

const ViewProfile = ({ profileDetails, selfProfile }) => {
  const {
    generalInfo,
    familydetail,
    partnerpreferance,
    physicalprofileinfo,
    professionalInfo,
    location,
    bankDetails,
    userDetails
  } = profileDetails;
  const formDatas = useSelector((state) => state.userRegisterationDetails.data);
  const navigate = useNavigate();
  const dropDownFamilyOptions = useSelector(getDropDownOptionsForFamilyRegister);
  const { occupations } = dropDownFamilyOptions;

  return (
    <Container className="info-container">
      <Grid container className={SubAdminProfileStyle['view-profile-container']} spacing={2}>
        <Grid
          item
          xs="12"
          md="4"
          sx={{
            alignItems: { xs: 'center', md: 'inherit' }
          }}>
          <Typography variant="h5" gutterBottom component="div">
            {userDetails?.fullName}
          </Typography>
          <Stack gap={1}>
            <Stack direction="row" gap={2} align="center">
              <Stack direction="row" align="center">
                <CakeOutlinedIcon className={SubAdminProfileStyle['icon']} />
                <Typography variant="p" gutterBottom component="div">
                  {userDetails?.age}
                </Typography>
              </Stack>
              <Stack direction="row" align="center">
                <ChatOutlinedIcon className={SubAdminProfileStyle['icon']} />
                <Typography variant="p" gutterBottom component="div">
                  {userDetails?.language}
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" align="center">
              <LocationOnOutlinedIcon className={SubAdminProfileStyle['icon']} />
              <Typography variant="p" gutterBottom component="div">
                {userDetails?.location}
              </Typography>
            </Stack>
          </Stack>
          <Box>
            <img
              className={SubAdminProfileStyle['user-img']}
              src={`${profilePlaceholder}`}
              srcSet={`${profilePlaceholder}`}
              alt="placeholder"
              loading="lazy"
            />
          </Box>
        </Grid>
        <Grid
          item
          xs="12"
          md="8"
          sx={{
            alignItems: { xs: 'center', md: 'inherit' }
          }}>
          <Typography variant={'h5'} gutterBottom className={SubAdminProfileStyle['title']}>
            {VIEW_PROILE_CONSTANTS.aboutMe}
            {selfProfile && (
              <EditIcon
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  navigate(`/edit/${formDatas.GUID}`);
                }}
              />
            )}
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            component="div"
            className={SubAdminProfileStyle['subtitle']}>
            Test About Me
          </Typography>

          <>
            <Grid container spacing={2} className={SubAdminProfileStyle['info-table']}>
              <Grid item xs="12" sm="6">
                <InfoTableTemplate
                  label={VIEW_PROILE_CONSTANTS['generalInfoTitle']}
                  data={generalInfo}
                />
              </Grid>
              {(formDatas.RoleId == 5 || formDatas.RoleId == 2) && (
                <>
                  <Grid item xs="12" sm="6">
                    <InfoTableTemplate
                      label={VIEW_PROILE_CONSTANTS['accountDetails']}
                      data={bankDetails}
                    />
                  </Grid>
                  <Grid container spacing={2} className={SubAdminProfileStyle['info-table']}>
                    <Grid item xs={12}>
                      <InfoTableTemplate
                        label={VIEW_PROILE_CONSTANTS['locationTitle']}
                        data={location}
                      />
                    </Grid>
                  </Grid>
                </>
              )}
              {!selfProfile || (formDatas.RoleId == 1 && selfProfile) ? (
                <>
                  <Grid item xs="12" sm="6">
                    <Stack spacing={3}>
                      <InfoTableTemplate
                        label={VIEW_PROILE_CONSTANTS['physicalInfoTitle']}
                        data={physicalprofileinfo}
                      />
                      <InfoTableTemplate
                        label={VIEW_PROILE_CONSTANTS['professionalInfoTitle']}
                        data={professionalInfo}
                      />
                    </Stack>
                  </Grid>
                </>
              ) : (
                <></>
              )}
            </Grid>
            {!selfProfile || (formDatas.RoleId == 1 && selfProfile) ? (
              <>
                <Grid container spacing={2} className={SubAdminProfileStyle['info-table']}>
                  <Grid item xs={12}>
                    <InfoTableTemplate
                      label={VIEW_PROILE_CONSTANTS['locationTitle']}
                      data={location}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} className={SubAdminProfileStyle['info-table']}>
                  <Grid item xs="12" sm="6">
                    <InfoTableTemplate
                      label={VIEW_PROILE_CONSTANTS['familyDetailsTitle']}
                      data={familydetail}
                      occupations={occupations}
                    />
                  </Grid>
                  <Grid item xs="12" sm="6">
                    <InfoTableTemplate
                      label={VIEW_PROILE_CONSTANTS['partnerPreferenceTitle']}
                      data={partnerpreferance}
                    />
                  </Grid>
                </Grid>{' '}
              </>
            ) : (
              <></>
            )}
          </>
        </Grid>
      </Grid>
    </Container>
  );
};

ViewProfile.propTypes = {
  profileDetails: PropTypes.shape({
    generalInfo: PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string
    }),
    familydetail: PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string
    }),
    partnerpreferance: PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string
    }),
    physicalprofileinfo: PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string
    }),
    professionalInfo: PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string
    }),
    location: PropTypes.shape({
      key: PropTypes.string,
      permenantAddress: PropTypes.string,
      workAddress: PropTypes.string
    }),
    bankDetails: PropTypes.any,
    userDetails: PropTypes.shape({
      fullName: PropTypes.string,
      language: PropTypes.string,
      location: PropTypes.string,
      age: PropTypes.string
    })
  }),
  selfProfile: PropTypes.string
};

export default ViewProfile;
