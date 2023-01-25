import React from 'react';
import { Container, Grid } from '@mui/material';
import FooterDtls from './footerdtls.module.scss';
import fbicon from '../../images/fbicon.svg';
import insta from '../../images/insta.svg';
import twiter from '../../images/twiter.svg';
import pinterest from '../../images/pinterest.svg';
import footerclk from '../../images/footerclock.svg';
import footerEmail from '../../images/footerEmail.svg';
import footerLoc from '../../images/footerLoc.svg';
import { FOOTER_LABELS } from '../../constants/footerConstants';
import { useNavigate } from 'react-router-dom';

const FooterDetails = () => {
  const navigate = useNavigate();
  return (
    <div className={FooterDtls['main_footer']}>
      <Container>
        <Grid container className={FooterDtls['grid_container']}>
          <Grid item sm={3} className={FooterDtls['footer_nav']}>
            <div className={FooterDtls['footer_logo']} />
            <p className={`${FooterDtls['contact_info']} ${FooterDtls['content_sz']}`}>
              {FOOTER_LABELS.footerTxt}
            </p>
          </Grid>
          <Grid
            item
            sm={4}
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
            sm={2}
            className={`${FooterDtls['footer_nav']} ${FooterDtls['footer_nav-info']}`}>
            <h4 className={FooterDtls['contact_info_head']}>{FOOTER_LABELS.info}</h4>
            <div className={FooterDtls['cntct-bx']}>
              <p onClick={() => navigate('/about-us')} className={FooterDtls['contact_info']}>
                <a>{FOOTER_LABELS.abtUs}</a>
              </p>
              <p onClick={() => navigate('/contact-us')} className={FooterDtls['contact_info']}>
                <a>{FOOTER_LABELS.cntUs}</a>
              </p>
              <p
                onClick={() => navigate('/terms-and-condition')}
                className={FooterDtls['contact_info']}>
                <a>{FOOTER_LABELS.tc}</a>
              </p>
              <p onClick={() => navigate('/privacy-policy')} className={FooterDtls['contact_info']}>
                <a>{FOOTER_LABELS.pr_policy}</a>
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
        <div className={FooterDtls['copyright']}>{FOOTER_LABELS.copyRight}</div>
      </Container>
    </div>
  );
};
export default FooterDetails;
