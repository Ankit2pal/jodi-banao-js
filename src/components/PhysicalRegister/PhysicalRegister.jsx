import { Alert, Box, Grid, Snackbar, Tab, Tabs } from '@mui/material';
import React, { forwardRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as Professional } from '../../images/professional.svg';
import { ReactComponent as Location } from '../../images/location.svg';
import { ReactComponent as Family } from '../../images/family.svg';
import Physicalreg from './PhysicalRegister.module.scss';
import ProfessionalInfoContainer from '../../containers/ProfessionalInfoContainer';
import FamilyRegisterInfoContainer from '../../containers/FamilyRegisterInfoContainer';
import PermanentWorkingLocationContainer from '../../containers/PermanentWorkingLocationContainer';
import { STEPS_LABELS } from '../../constants/stepsConsntants';

const AlertBox = forwardRef(function SbAlert(props, ref) {
  return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  };
}
function PhysicalRegister({ stepNumber }) {
  const [value, setValue] = React.useState(0);
  const [sbOpen, setSbOpen] = React.useState(false);

  const handleChange = (event, newValue) => {
    stepNumber >= newValue ? (setValue(newValue), setSbOpen(false)) : setSbOpen(true);
  };

  useEffect(() => {
    setValue(stepNumber);
  }, [stepNumber]);

  const onNext = () => {
    setValue(value + 1);
  };

  const onPrev = () => {
    setValue(value - 1);
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <div className={Physicalreg['fb-block']}>
      <Grid className={Physicalreg['phy-reg-main']}>
        <Grid className={Physicalreg['phy-reg-bk']}>
          <Tabs
            className={Physicalreg['phy-tab-bk']}
            value={value}
            onChange={handleChange}
            aria-label="icon position tabs example">
            <Tab
              icon={
                <Box className={Physicalreg['navbar-container']}>
                  <Box
                    className={
                      value == 0 ? Physicalreg['navbar-icon-active'] : Physicalreg['navbar-icon']
                    }>
                    <Professional />
                  </Box>
                  <Box className={Physicalreg['navbar-item']}>
                    Physical & Professional
                    <br />
                    <Box as="span">Information</Box>
                  </Box>
                </Box>
              }
              className={
                value == 0 ? Physicalreg['prosnl-info-active'] : Physicalreg['prosnl-info']
              }
              {...a11yProps(0)}
            />
            <Tab
              icon={
                <Box className={Physicalreg['navbar-container']}>
                  <Box
                    className={
                      value == 1 ? Physicalreg['navbar-icon-active'] : Physicalreg['navbar-icon']
                    }>
                    <Family />
                  </Box>
                  <Box className={Physicalreg['navbar-item']}>
                    Family & Partner
                    <br />
                    <Box as="span">Preferences</Box>
                  </Box>
                </Box>
              }
              className={
                value == 1 ? Physicalreg['prosnl-info-active'] : Physicalreg['prosnl-info']
              }
              {...a11yProps(1)}
            />
            <Tab
              icon={
                <Box className={Physicalreg['navbar-container']}>
                  <Box
                    className={
                      value == 2 ? Physicalreg['navbar-icon-active'] : Physicalreg['navbar-icon']
                    }>
                    <Location height="80%" />
                  </Box>
                  <Box className={Physicalreg['navbar-item']}>
                    Permanent & Working
                    <br />
                    <Box as="span">Location</Box>
                  </Box>
                </Box>
              }
              className={
                value == 2 ? Physicalreg['prosnl-info-active'] : Physicalreg['prosnl-info']
              }
              iconPosition="top"
              {...a11yProps(2)}
            />
          </Tabs>
          <TabPanel value={value} index={0} className={Physicalreg['tab-panal-blk']}>
            <ProfessionalInfoContainer onNext={onNext} />
          </TabPanel>
          <TabPanel value={value} index={1} className={Physicalreg['tab-panal-blk']}>
            <FamilyRegisterInfoContainer onNext={onNext} onPrev={onPrev} />
          </TabPanel>
          <TabPanel value={value} index={2} className={Physicalreg['tab-panal-blk']}>
            <PermanentWorkingLocationContainer onPrev={onPrev} />
          </TabPanel>
        </Grid>
        <Grid className={Physicalreg['cuple-img']}></Grid>
        <Snackbar autoHideDuration={2000} open={sbOpen} onClose={() => setSbOpen(false)}>
          <AlertBox onClose={() => setSbOpen(false)} severity={'error'} sx={{ width: '100%' }}>
            {STEPS_LABELS.fillForm}
          </AlertBox>
        </Snackbar>
      </Grid>
    </div>
  );
}

export default PhysicalRegister;

PhysicalRegister.propTypes = {
  stepNumber: PropTypes.number.isRequired
};
