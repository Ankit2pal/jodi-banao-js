import React from 'react';
import { Container, Grid } from '@mui/material';
import FooterDtls from './FooterDetails_v2.module.scss';
import fbicon from '../../images/fbicon.svg';
import insta from '../../images/insta.svg';
import twiter from '../../images/twiter.svg';
import pinterest from '../../images/pinterest.svg';
import footerclk from '../../images/footerclock.svg';
import footerEmail from '../../images/footerEmail.svg';
import footerLoc from '../../images/footerLoc.svg';
import appleIcon from '../../images/app-store.svg';
import playIcon from '../../images/google-play.png';
import { FOOTER_LABELS } from '../../constants/footerConstants';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';

const FooterDetails = () => {
  const navigate = useNavigate();
  return (
    <div className={FooterDtls['main_footer']}>
      <Container className={FooterDtls['footer_container']}>
        <Grid container gap={2} className={FooterDtls['grid_container']}>
          <Grid item sm={2.5} className={FooterDtls['footer_nav']}>
            <h4 className={FooterDtls['contact_info_head']}>{FOOTER_LABELS.info}</h4>
            <p className={`${FooterDtls['contact_info']} ${FooterDtls['content_sz']}`}>
              {FOOTER_LABELS.footerTxt}
            </p>
          </Grid>
          <Grid
            item
            sm={2.5}
            className={`${FooterDtls['footer_nav']} ${FooterDtls['footer_nav-cntct']}`}>
            <h4 className={FooterDtls['contact_info_head']}>{FOOTER_LABELS.cntctInfo}</h4>
            <div className={FooterDtls['cntct-bx']}>
              <div className={FooterDtls['contact_info']}>
                <img src={footerLoc} />
                <p className={FooterDtls['contact_txt']}>{FOOTER_LABELS.address}</p>
              </div>
              <div className={FooterDtls['contact_info']}>
                <img src={footerclk} />
                <p className={FooterDtls['contact_txt']}>{FOOTER_LABELS.ph}</p>
              </div>
              <div className={FooterDtls['contact_info']}>
                <img src={footerEmail} />
                <p className={FooterDtls['contact_txt']}>{FOOTER_LABELS.email}</p>
              </div>
            </div>
          </Grid>
          <Grid
            item
            sm={2.5}
            className={`${FooterDtls['footer_nav']} ${FooterDtls['footer_nav-info']}`}>
            <h4 className={FooterDtls['contact_info_head']}>{FOOTER_LABELS.mob}</h4>
            <Box
              className={`${FooterDtls['cntct-bx']} ${FooterDtls['phn_box']}`}
              sx={{ justifyContent: { xs: 'center', lg: 'flex-start' }, a: { cursor: 'pointer' } }}>
              <Box as="a">
                <Box as="img" src={appleIcon} className={FooterDtls['apple_icon']} />
              </Box>
              <Box as="a">
                <Box as="img" src={playIcon} className={FooterDtls['play_icon']} />
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            sm={2.5}
            className={`${FooterDtls['footer_nav']} ${FooterDtls['footer_nav-info']}`}>
            <h4 className={FooterDtls['contact_info_head']}>{FOOTER_LABELS.jodi}</h4>
            <div className={FooterDtls['cntct-bx']}>
              <p onClick={() => navigate('/about-us')} className={FooterDtls['contact_info']}>
                <a>{FOOTER_LABELS.abtUs}</a>
              </p>
              <p onClick={() => navigate('/contact-us')} className={FooterDtls['contact_info']}>
                <a>{FOOTER_LABELS.cntUs}</a>
              </p>
              <p onClick={() => navigate('/')} className={FooterDtls['contact_info']}>
                <a>{FOOTER_LABELS.car}</a>
              </p>
            </div>
          </Grid>
        </Grid>
        <Grid container className={`${FooterDtls['mediaIcon']}`}>
          <a target="_blank" className={`${FooterDtls['socialIcons']} ${FooterDtls['fbicon']}`}>
            <img src={fbicon} className={FooterDtls['img-fluid']} />
          </a>
          <a target="_blank" className={`${FooterDtls['socialIcons']} ${FooterDtls['twiter_img']}`}>
            <img src={twiter} />
          </a>
          <a target="_blank" className={`${FooterDtls['socialIcons']} ${FooterDtls['insta']}`}>
            <img src={insta} />
          </a>
          <a target="_blank" className={`${FooterDtls['socialIcons']} ${FooterDtls['fbicon']}`}>
            <img src={pinterest} />
          </a>
        </Grid>
        <div className={FooterDtls['center_Border']}></div>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '10px'
          }}>
          <Box
            sx={{
              width: '250px',
              height: '46px'
            }}>
            <Box className={FooterDtls['footer_logo']} />
          </Box>
          <Box className={FooterDtls['copyright']}>{FOOTER_LABELS.copyRight}</Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              gap: '5%',
              color: '#fff',
              width: { xs: '85%', sm: '60%', md: '40%', lg: '30%' },
              p: {
                textAlign: 'center',
                lineHeight: '15px',

                a: {
                  fontSize: '12px',
                  cursor: 'pointer'
                }
              }
            }}>
            <Box as="p" onClick={() => navigate('/terms-and-condition')}>
              <Box as="a">{FOOTER_LABELS.tc}</Box>
            </Box>
            <Box as="p" onClick={() => navigate('/privacy-policy')}>
              <Box as="a">{FOOTER_LABELS.pr_policy}</Box>
            </Box>
            <Box as="p" onClick={() => navigate('/refund-policy')}>
              <Box as="a">{FOOTER_LABELS.rp}</Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
};
export default FooterDetails;
