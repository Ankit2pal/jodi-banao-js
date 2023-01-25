import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import EditProfileStyles from './EditProfile.module.scss';
import { Container } from '@mui/material';
import Accordion from '../../../commons/accordion';

function EditProfile() {
  const [expandAccordion, setExpandAccordion] = useState(false);
  const handleAccordionChange = (id) => {
    setExpandAccordion(id);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" className={EditProfileStyles['profile_header']}>
          <Toolbar>
            <Typography variant="h6" component="div" className={EditProfileStyles['header_txt']}>
              Edit Profile
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Container className={EditProfileStyles['accordion_container']}>
        <Accordion
          id="profile_accordion"
          title="General Information"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget."
          className={EditProfileStyles['profile_accordion']}
          expandAccordion={expandAccordion}
          handleAccordionChange={handleAccordionChange}
        />
        <Accordion
          id="Physical_accordion"
          title="Physical & Professional Information"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget."
          className={EditProfileStyles['profile_accordion']}
          expandAccordion={expandAccordion}
          handleAccordionChange={handleAccordionChange}
        />
        <Accordion
          id="Address_accordion"
          title="Permanent Address"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget."
          className={EditProfileStyles['profile_accordion']}
          expandAccordion={expandAccordion}
          handleAccordionChange={handleAccordionChange}
        />
        <Accordion
          id="Family_accordion"
          title="Family Details"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget."
          className={EditProfileStyles['profile_accordion']}
          expandAccordion={expandAccordion}
          handleAccordionChange={handleAccordionChange}
        />
        <Accordion
          id="Partner_accordion"
          title="Partner Preferences"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget."
          className={EditProfileStyles['profile_accordion']}
          expandAccordion={expandAccordion}
          handleAccordionChange={handleAccordionChange}
        />
      </Container>
    </>
  );
}

export default EditProfile;
