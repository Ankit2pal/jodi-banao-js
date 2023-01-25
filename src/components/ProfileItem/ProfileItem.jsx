import { Box, Button, Typography, Alert, Snackbar } from '@mui/material';
import PropTypes from 'prop-types';
import styles from './ProfileItem.module.scss';
import userProfile from '../../images/userProfile.svg';
import { useNavigate } from 'react-router-dom';
import { useState, forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { roleId } from '../../redux/selectors/userRegisterationDetails';
import CakeIcon from '@mui/icons-material/CakeOutlined';
import LocationIcon from '@mui/icons-material/LocationOnOutlined';
import SchoolIcon from '@mui/icons-material/SchoolOutlined';
import { useEffect } from 'react';

const ProfileItem = ({
  name,
  age,
  height,
  education,
  state,
  country,
  imageUrl,
  userid,
  balance,
  viewProfile
}) => {
  const navigate = useNavigate();
  const loggedInRole = useSelector(roleId);
  const agePlusHeight = `${age}, ${height}`;

  const imageSrc = imageUrl ?? userProfile;
  const countries = useSelector((state) => state?.registerationDetails?.country);
  const statess = useSelector((state) => state?.registerationDetails?.state);
  const [countryPlusState, setCountryPlusState] = useState('India');
  const handleClose = () => {
    setOpen(false);
  };
  const [open, setOpen] = useState(false);

  const navigateViewProfile = () => {
    let viewProf = viewProfile?.filter((item) => {
      return item.userid === userid;
    });
    balance?.balProfile || viewProf?.length > 0 || loggedInRole > 2
      ? navigate('/view-profile/' + userid)
      : setOpen(true);
  };
  const findState = (id, name) => {
    let states = statess.filter(function (item) {
      return item.id == id;
    });
    if (name) {
      return states[0]?.iso2;
    } else {
      return states[0]?.name;
    }
  };

  const findCountry = (id, name) => {
    let findCountrys = countries.filter(function (item) {
      return item.id == id;
    });
    if (name) {
      return findCountrys[0]?.iso2;
    } else {
      return findCountrys[0]?.name;
    }
  };
  useEffect(() => {
    let countryIso = findCountry(country);
    let stateIso = findState(state);
    setCountryPlusState(`${countryIso ?? ''}, ${stateIso ?? ''}`);
  }, [state]);

  return (
    <Box as="div" className={styles['box_container_profile']}>
      <Box as="img" src={imageSrc} alt="profile image" className={styles['box_img_profile']} />
      <Box as="div" className={styles['box_details_container']}>
        <Typography className={styles['p_username']} component="p">
          {name}
        </Typography>
        <Typography className={styles['p_other_details']} component="p">
          <CakeIcon />
          {agePlusHeight}
        </Typography>
        <Typography className={styles['p_other_details']} component="p">
          {education && <SchoolIcon />}
          {education}
        </Typography>
        <Typography className={styles['p_other_details']} component="p">
          <LocationIcon />
          {countryPlusState}
        </Typography>
      </Box>
      <Box as="div" className={styles['box_button_container']}>
        <Button
          onClick={() => navigateViewProfile()}
          className={styles['button_view_profile']}
          size="large"
          type="submit"
          variant="contained">
          View Profile
        </Button>
        <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
          <AlertBox
            autoHideDuration={1000}
            severity={'error'}
            onClose={handleClose}
            sx={{ width: '100%' }}>
            {'You Have Insufficient Balance'}
          </AlertBox>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default ProfileItem;
const AlertBox = forwardRef(function SbAlert(props, ref) {
  return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});
ProfileItem.propTypes = {
  name: PropTypes.string,
  age: PropTypes.string,
  height: PropTypes.number,
  education: PropTypes.string,
  country: PropTypes.string,
  state: PropTypes.string,
  imageUrl: PropTypes.string,
  userid: PropTypes.string,
  balance: PropTypes.number,
  viewProfile: PropTypes.array
};

ProfileItem.defaultProps = {
  name: '',
  age: '',
  height: 0,
  education: '',
  country: '',
  state: '',
  imageUrl: null,
  balance: 0
};
