import React from 'react';
import { Box, Card, Container, Grid, Button } from '@mui/material';
import TestimonialStyle from './Testimonials.module.scss';
import { findJodiConstants } from '../../constants/findJodiConstants';
import Carousel, { consts } from 'react-elastic-carousel';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Placeholder from '../../images/testimonial_ph.png';

function Testimonials() {
  const myArrow = ({ type, onClick, isEdge }) => {
    const pointer = type === consts.PREV ? <ArrowLeftIcon /> : <ArrowRightIcon />;
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Button className={TestimonialStyle['custom_btn']} onClick={onClick} disabled={isEdge}>
          {pointer}
        </Button>
      </Box>
    );
  };

  const breakPoints = [
    { width: 1, itemsToShow: 1, itemsToScroll: 1 },
    { width: 768, itemsToShow: 2, itemsToScroll: 2 }
  ];

  return (
    <Grid sx={{ padding: '0% 8%' }}>
      <div className={TestimonialStyle['findmatch-header']}>
        <h3 className={TestimonialStyle['terminal']}>{findJodiConstants.trml}</h3>
        <h1 className={TestimonialStyle['sucstory']}>{findJodiConstants.ssty}</h1>
      </div>
      <Container maxWidth="100%" sx={{ padding: '0 !important' }}>
        <Box className="carousel-wrapper">
          {/* <Grid className={TestimonialStyle['grid_container']}> */}
          <Carousel
            breakPoints={breakPoints}
            renderArrow={myArrow}
            className={TestimonialStyle['grid_container']}>
            {findJodiConstants.data.map((item, index) => (
              <Grid item key={index} xs={12} className={TestimonialStyle['card-flw']}>
                <Card className={TestimonialStyle['card']}>
                  <Grid container className={TestimonialStyle['details_container']}>
                    <Grid item xs={4}>
                      <Box className={TestimonialStyle['ph_container']}>
                        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" version="1.1">
                          <defs>
                            <clipPath id="customShape">
                              <path
                                fill="#000"
                                d="M19.6,-34.1C26.3,-30,33.4,-26.7,36.4,-21.1C39.5,-15.5,38.7,-7.8,37.4,-0.7C36.2,6.3,34.6,12.7,32,19.1C29.4,25.6,25.9,32.1,20.4,37.1C14.9,42.1,7.4,45.6,-0.1,45.8C-7.6,45.9,-15.3,42.8,-22,38.5C-28.7,34.2,-34.5,28.7,-38.4,22.1C-42.2,15.5,-44.2,7.7,-44.3,0C-44.3,-7.8,-42.4,-15.6,-38.4,-22C-34.4,-28.4,-28.3,-33.4,-21.6,-37.4C-14.8,-41.4,-7.4,-44.5,-0.5,-43.6C6.4,-42.8,12.9,-38.1,19.6,-34.1Z"
                                width="100%"
                                height="100%"
                                transform="translate(50 50)"></path>
                            </clipPath>
                          </defs>
                          <image
                            width="100%"
                            height="100%"
                            xlinkHref={Placeholder}
                            clipPath="url(#customShape)"
                          />
                        </svg>
                      </Box>
                    </Grid>
                    <Grid item xs={8} className={TestimonialStyle['user-Dtils']}>
                      <Box>
                        <h3 className={TestimonialStyle['username']}> {item.name} </h3>
                        <span className={TestimonialStyle['designation']}>{item.dig}</span>
                        <Box as="p" className={TestimonialStyle['userdisp']}>
                          {item.abt}
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
            {/* </Grid> */}
          </Carousel>
        </Box>
      </Container>
    </Grid>
  );
}

export default Testimonials;
