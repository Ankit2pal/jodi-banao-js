import React from 'react';
import { Box, Grid } from '@mui/material';
import AboutJodiStyles from './AboutJodi.module.scss';
import ProfilesIcon from '../../images/profiles_icon.svg';
import FastIcon from '../../images/fast_icon.svg';
import SecureIcon from '../../images/secure_icon.svg';

const AboutJodi = () => {
  return (
    <Box className={AboutJodiStyles['about_jodi_container']}>
      <Box className={AboutJodiStyles['text_container']}>
        <Box as="span" className={AboutJodiStyles['match_text']}>
          Find your perfect match with
        </Box>
        <Box as="h1" className={AboutJodiStyles['jodi_text']}>
          JodiBanav Matrimony
        </Box>
      </Box>
      <Grid container className={AboutJodiStyles['box_containers']}>
        <Grid item xs={12} md={3} className={AboutJodiStyles['box_n_desc']}>
          <Box className={AboutJodiStyles['box']}>
            <Box as="img" src={ProfilesIcon} className={AboutJodiStyles['box_img']} />
          </Box>
          <Box className={AboutJodiStyles['desc']}>
            <Box as="h2" className={AboutJodiStyles['desc_title']}>
              Millions of Profiles
            </Box>
            <Box as="p">Millions of Bride & Groom</Box>
            <Box as="p">Profiles</Box>{' '}
          </Box>
        </Grid>
        <Grid item xs={12} md={3} className={AboutJodiStyles['box_n_desc']}>
          <Box className={AboutJodiStyles['box']}>
            <Box as="img" src={FastIcon} className={AboutJodiStyles['box_img']} />
          </Box>
          <Box className={AboutJodiStyles['desc']}>
            <Box as="h2" className={AboutJodiStyles['desc_title']}>
              Fast
            </Box>
            <Box as="p">Intelligent Matchmaking</Box>
            <Box as="p">System</Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={3} className={AboutJodiStyles['box_n_desc']}>
          <Box className={AboutJodiStyles['box']}>
            <Box as="img" src={SecureIcon} className={AboutJodiStyles['box_img']} />
          </Box>
          <Box className={AboutJodiStyles['desc']}>
            <Box as="h2" className={AboutJodiStyles['desc_title']}>
              Secure
            </Box>
            <Box as="p">Phone Number Verified</Box>
            <Box as="p">Profiles</Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutJodi;
