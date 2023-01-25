import React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import jodiBanao from './jodibanao.module.scss';
import { WHYJODI_LABELS } from '../../constants/whyJodiBanaoConstants';
import bulletPoint from '../../images/bulletPoint.svg';
import lksprofiles from '../../images/lksprofiles.svg';
import goahead from '../../images/goahead.svg';
function WhyJodiBanao() {
  return (
    <>
      <Container
        sx={{ display: 'grid', gridTemplateRows: 'repeat(3, auto)' }}
        maxWidth="lg"
        className={jodiBanao['jodi-profiles']}>
        <div className={jodiBanao['bg-smallheart']}></div>
        <div className={jodiBanao['whyjodi_labels']}>
          <p className={jodiBanao['Bg-text']}>{WHYJODI_LABELS.findBG}</p>
          <h2 className={jodiBanao['jd-text']}>{WHYJODI_LABELS.jbm}</h2>
        </div>
        <Grid sx={{ display: 'grid' }} className={jodiBanao['profile-box']}>
          <Grid item sm={5} className={jodiBanao['prfl-content']}>
            <Grid container direction="row" className={jodiBanao['prfl-dtls']}>
              <Grid className={jodiBanao['txt_mrgn']}>
                <span>
                  <img src={lksprofiles} />
                </span>
              </Grid>
              <Grid item sm={10}>
                <div className={jodiBanao['lksprofiles']}>
                  <span className={jodiBanao['lksprl-hd']}>{WHYJODI_LABELS.lksp}</span>
                  <p className={jodiBanao['lksprl-hd-txt']}>{WHYJODI_LABELS.lkspTxt}</p>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={5} className={jodiBanao['prfl-content']}>
            <Grid container direction="row" className={jodiBanao['prfl-dtls']}>
              <Grid>
                <span>
                  <img src={goahead} />
                </span>
              </Grid>
              <Grid item sm={10}>
                <div className={jodiBanao['lksprofiles']}>
                  <span className={jodiBanao['lksprl-hd']}>{WHYJODI_LABELS.gah}</span>
                  <p className={jodiBanao['lksprl-hd-txt']}>{WHYJODI_LABELS.gahText}</p>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Grid sx={{ display: 'grid' }} className={jodiBanao['couple-block']}>
        <Grid container direction="row" className={jodiBanao['couple-img']}></Grid>
        <Grid container direction="row">
          <div className={jodiBanao['Matrimony-info']}>
            <span className={jodiBanao['start-txt']}>
              <p>{WHYJODI_LABELS.lStart}</p>
            </span>
            <h1 className={jodiBanao['start-hd']}>{WHYJODI_LABELS.wjm}</h1>
            <div className={jodiBanao['gb-point']}>
              <img src={bulletPoint} />
              <span className={jodiBanao['gb-text']}> {WHYJODI_LABELS.lksBGP}</span>
            </div>
            <div className={jodiBanao['gb-point']}>
              <img src={bulletPoint} />
              <span className={jodiBanao['gb-text']}> {WHYJODI_LABELS.pSecure}</span>
            </div>
            <div className={jodiBanao['gb-point']}>
              <img src={bulletPoint} />
              <span className={jodiBanao['gb-text']}>{WHYJODI_LABELS.phVerified}</span>
            </div>
            <div className={jodiBanao['gb-point']}>
              <img src={bulletPoint} />
              <span className={jodiBanao['gb-text']}>{WHYJODI_LABELS.uft}</span>
            </div>
            <div className={jodiBanao['gb-point']}>
              <img src={bulletPoint} />
              <span className={jodiBanao['gb-text']}>{WHYJODI_LABELS.im}</span>
            </div>
            <div className={jodiBanao['gb-btn']}>
              <Button variant="contained" className={jodiBanao['start-btn']}>
                {WHYJODI_LABELS.strtbtn}
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default WhyJodiBanao;
