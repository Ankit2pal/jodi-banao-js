import React from 'react';
import { Box, Card, CardMedia, CardContent, Typography } from '@mui/material';
import HowItWorksStyles from './HowItWorks.module.scss';

const HowItWorks = () => {
  return (
    <Box className={HowItWorksStyles['hiw_container']}>
      <Box className={HowItWorksStyles['title_container']}>
        <Box as="h1" className={HowItWorksStyles['title']}>
          How it works?
        </Box>
      </Box>
      <Box className={HowItWorksStyles['card_container']}>
        <Card className={HowItWorksStyles['card']} sx={{ maxWidth: 345, border: '1px solid #eee' }}>
          <Box className={HowItWorksStyles['card_div']}>
            <CardMedia
              component="img"
              alt="alt"
              height="250"
              image="https://picsum.photos/250"
              sx={{
                transition: 'transform 500ms',
                '&:hover': {
                  transform: 'scale(1.2)'
                }
              }}
              className={HowItWorksStyles['card_img']}
            />
          </Box>
          <CardContent className={HowItWorksStyles['card_content']} sx={{ textAlign: 'center' }}>
            <Typography
              gutterBottom
              variant="h2"
              component="h2"
              className={HowItWorksStyles['card_title']}>
              Create profile
            </Typography>
            <Typography variant="p" component="p" className={HowItWorksStyles['card_para']}>
              Complete your profile to join millions of others. The details you provide, will help
              us find profiles closest to your liking.
            </Typography>
          </CardContent>
        </Card>
        <Card className={HowItWorksStyles['card']} sx={{ maxWidth: 345, border: '1px solid #eee' }}>
          <Box className={HowItWorksStyles['card_div']}>
            <CardMedia
              component="img"
              alt="alt"
              height="250"
              image="https://picsum.photos/250"
              sx={{
                transition: 'transform 500ms',
                '&:hover': {
                  transform: 'scale(1.2)'
                }
              }}
              className={HowItWorksStyles['card_img']}
            />
          </Box>
          <CardContent className={HowItWorksStyles['card_content']} sx={{ textAlign: 'center' }}>
            <Typography
              gutterBottom
              variant="h2"
              component="h2"
              className={HowItWorksStyles['card_title']}>
              Search
            </Typography>
            <Typography variant="p" component="p" className={HowItWorksStyles['card_para']}>
              Search for your perfect partner with our match finder. It is designed to provide you
              with your most ideal partners.
            </Typography>
          </CardContent>
        </Card>
        <Card className={HowItWorksStyles['card']} sx={{ maxWidth: 345, border: '1px solid #eee' }}>
          <Box className={HowItWorksStyles['card_div']}>
            <CardMedia
              component="img"
              alt="alt"
              image="https://picsum.photos/250"
              sx={{
                transition: 'transform 500ms',
                '&:hover': {
                  transform: 'scale(1.2)'
                }
              }}
              className={HowItWorksStyles['card_img']}
            />
          </Box>
          <CardContent className={HowItWorksStyles['card_content']}>
            <Typography
              gutterBottom
              variant="h2"
              component="h2"
              className={HowItWorksStyles['card_title']}>
              Connect
            </Typography>
            <Typography variant="p" component="p" className={HowItWorksStyles['card_para']}>
              Once you have found your perfect match, all you need to do is to connect with your
              potential jodi!
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default HowItWorks;
