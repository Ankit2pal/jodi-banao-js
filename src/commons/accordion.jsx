import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types';
import AccordionDetails from '@mui/material/AccordionDetails';
import CustomAccordionStyle from './accordion.module.scss';
import Box from '@mui/material/Box';

const CustomAccordion = ({
  expandAccordion,
  handleAccordionChange,
  ariaControl,
  id,
  title,
  description,
  className = '',
  disabled = false
}) => {
  return (
    <div>
      <Accordion
        disabled={disabled}
        className={className}
        expanded={expandAccordion === id}
        onChange={() => handleAccordionChange(id)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={ariaControl} id={id}>
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails className={CustomAccordionStyle.tilesDetails}>
          <Box>{description}</Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

CustomAccordion.propTypes = {
  expandAccordion: PropTypes.bool.isRequired,
  handleAccordionChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  ariaControl: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool
};

export default CustomAccordion;
