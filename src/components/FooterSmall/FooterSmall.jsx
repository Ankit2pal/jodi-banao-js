import React from 'react';
import { Container, Grid } from '@mui/material';
import FooterSml from './footersmall.module.scss';
import { FOOTER_LABELS } from '../../constants/footerConstants';
import { useNavigate } from 'react-router-dom';

const FooterSmall = () => {
  const navigate = useNavigate();
  return (
    <div className={FooterSml['main_footer']}>
      <div className={FooterSml['bottom_line']} />
      <Container maxWidth="100%" className={FooterSml['container']}>
        <Grid container className={FooterSml['grid_container']}>
          <div className={FooterSml['cntct-bx']}>
            <p onClick={() => navigate('/about-us')} className={FooterSml['contact_info']}>
              <a>{FOOTER_LABELS.abtUs}</a>
            </p>
            <p onClick={() => navigate('/contact-us')} className={FooterSml['contact_info']}>
              <a>{FOOTER_LABELS.cntUs}</a>
            </p>
            <p
              onClick={() => navigate('/terms-and-condition')}
              className={FooterSml['contact_info']}>
              <a>{FOOTER_LABELS.tc}</a>
            </p>
            <p onClick={() => navigate('/privacy-policy')} className={FooterSml['contact_info']}>
              <a>{FOOTER_LABELS.pr_policy}</a>
            </p>
            <p onClick={() => navigate('/refund-policy')} className={FooterSml['contact_info']}>
              <a>{FOOTER_LABELS.rp}</a>
            </p>
          </div>
          <div className={FooterSml['copyright']}>{FOOTER_LABELS.copyRight}</div>
        </Grid>
      </Container>
    </div>
  );
};
export default FooterSmall;
