import { Box } from '@mui/material';
import JoinUsFooterStyles from './JoinUsFooterPage.module.scss';
import React from 'react';
import { JoinUsFooterConstants } from '../../constants/joinUsFooterConstants';

const JoinUsFooterPage = () => {
  return (
    <Box className={JoinUsFooterStyles['box_container']}>
      <p className={JoinUsFooterStyles['join_us_text_container']}>
        <span className={JoinUsFooterStyles['join_us']}>
          {JoinUsFooterConstants.JOIN_US},&nbsp;
        </span>
        <span className={JoinUsFooterStyles['find_match']}>
          {JoinUsFooterConstants.FIND_MATCH},&nbsp;
        </span>
        <span className={JoinUsFooterStyles['get_married']}>
          {JoinUsFooterConstants.GET_MARRIED}
        </span>
      </p>
    </Box>
  );
};
export default JoinUsFooterPage;
