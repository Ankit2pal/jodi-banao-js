import React from 'react';
import { Box, Card, Container, Grid } from '@mui/material';
import FindJodiStyle from './findmatch.module.scss';
import { findJodiConstants } from '../../constants/findJodiConstants';
import Carousel from 'react-elastic-carousel';

function FindJodi() {
  const breakPoints = [
    { width: 1, itemsToShow: 1, itemsToScroll: 1 },
    { width: 1024, itemsToShow: 2, itemsToScroll: 2 }
  ];

  return (
    <Grid>
      <div className={FindJodiStyle['findmatch-header']}>
        <h3 className={FindJodiStyle['terminal']}>{findJodiConstants.trml}</h3>
        <h1 className={FindJodiStyle['sucstory']}>{findJodiConstants.ssty}</h1>
      </div>
      <Container maxWidth="100%">
        <Box className="carousel-wrapper">
          {/* <Grid className={FindJodiStyle['grid_container']}> */}
          <Carousel breakPoints={breakPoints} className={FindJodiStyle['grid_container']}>
            {findJodiConstants.data.map((item, index) => (
              <Grid item key={index} xs={12} className={FindJodiStyle['card-flw']}>
                <Card className={FindJodiStyle['card']}>
                  <Grid container className={FindJodiStyle['details_container']}>
                    <Grid item xs={4}>
                      <img src={item.img} className={FindJodiStyle['story-profile']} />
                    </Grid>
                    <Grid item xs={8} className={FindJodiStyle['user-Dtils']}>
                      <Box>
                        <h3 className={FindJodiStyle['username']}> {item.name} </h3>
                        <span className={FindJodiStyle['designation']}>{item.dig}</span>
                        <Box as="p" className={FindJodiStyle['userdisp']}>
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

export default FindJodi;
