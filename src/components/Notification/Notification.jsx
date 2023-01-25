import React, { useState, useEffect, forwardRef } from 'react';
import {
  Box,
  Container,
  FormLabel,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  TextareaAutosize,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert
} from '@mui/material';
import NotificationStyles from './notification.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import CustomAccordian from '../../commons/accordion';
import { notificationRequest } from '../../redux/modules/notificationSlice';
import { getNotifications } from '../../redux/selectors/notificationSelector';
import { notificationConstants } from '../../constants/notificationConstants';
import { sendNotificationRequest } from '../../redux/modules/sendNotificationSlice';
import { getUId } from '../../redux/selectors/userRegisterationDetails';
import { Alerts } from '../../commons';
import Loader from '../../commons/Loader/Loader';

const Notification = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const userIdValue = useSelector(getUId);
  const notifications = useSelector(getNotifications);
  const [value, setValue] = React.useState('phone');
  const [subValue, setSubValue] = React.useState('all');
  const [expanded, setExpanded] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [textArea, setTextArea] = React.useState('');
  const [sendToSelect, setSendToSelect] = React.useState('');
  const [notificationType, setNotificationType] = React.useState('v');
  const [snackBarOpen, setSnackBarOpen] = React.useState(false);
  const onSuccessSend = useSelector((state) => state.sendnotification.data.Status);
  const isLoading = useSelector((state) => state.sendnotification.isLoading);
  const formDatas = useSelector((state) => state.userRegisterationDetails.data);
  const onNotificationSuccess = useSelector((state) => state.notification.isLoading);
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleDropdownSelectChange = (event) => {
    setSendToSelect(event.target.value);
  };
  const handleSubChange = (event) => {
    setSubValue(event.target.value);
  };

  const handleSnackbarClose = () => {
    setSnackBarOpen(false);
  };

  useEffect(() => {
    const expandedAccordion = () => {
      setExpanded(true);
    };
    expandedAccordion();
    setExpanded(false);
  }, [expanded]);

  useEffect(() => {
    userIdValue !== '' && dispatch(notificationRequest({ UserId: userIdValue }));
  }, [userIdValue]);

  useEffect(() => {
    if (notifications) {
      setData(notifications);
    }
  }, [notifications]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const getNotificationView = () => {
    return (
      <>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="all"
          name="radio-buttons-group"
          row
          onChange={handleSubChange}
          sx={{
            span: {
              '&.Mui-checked': {
                color: '#fe3f46'
              }
            }
          }}>
          <Box className={NotificationStyles['radioButton']}>
            <FormControlLabel
              value="all"
              control={<Radio />}
              label={value == 'phone' ? 'Message all users' : 'Email all users'}
            />
            <FormControlLabel
              value="sing"
              control={<Radio />}
              label={value == 'phone' ? 'Message this user' : 'Email this user'}
            />
          </Box>
        </RadioGroup>

        {subValue === 'sing' && value == 'email' && (
          <Box className={NotificationStyles['pt10']}>
            <TextField
              id="outlined-basic"
              label="Email Id"
              variant="outlined"
              value={email}
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
        )}
        {subValue === 'all' && <InputLabel id="demo-customized-select-label">Send To</InputLabel>}
        {subValue === 'all' && (
          <Select
            style={{ minWidth: '100%' }}
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            placeholder="User"
            value={sendToSelect}
            onChange={handleDropdownSelectChange}>
            <MenuItem value={1}>User</MenuItem>
            {formDatas?.RoleId > 2 && <MenuItem value={2}>Vendor</MenuItem>}
            {formDatas?.RoleId > 3 && <MenuItem value={3}>Admin</MenuItem>}
          </Select>
        )}
        {value == 'email' && (
          <Box className={NotificationStyles['pt10']}>
            <TextField
              id="outlined-basic"
              label="subject"
              variant="outlined"
              fullWidth
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </Box>
        )}

        {subValue === 'sing' && value == 'phone' && (
          <Box className={NotificationStyles['pt10']}>
            <TextField
              id="outlined-basic"
              label="Phone"
              variant="outlined"
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Box>
        )}

        <Box className={NotificationStyles['text-area']}>
          <TextareaAutosize
            className={NotificationStyles['textfieldentermessage']}
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            fullWidth
            value={textArea}
            onChange={(e) => setTextArea(e.target.value)}
            placeholder="Please enter your message here"
            minRows={20}
            cols={92}
          />
        </Box>
      </>
    );
  };

  // TO handle API call for send notification
  const handleDispatch = () => {
    setSnackBarOpen(true);
    const payload = {
      UserTypeId: formDatas?.RoleId,
      Subject: subject,
      Message: textArea,
      IsSMS: value === 'phone' ? true : false,
      IsSendByGroup: subValue === 'all' ? true : false,
      UserId: userIdValue,
      SendTo: sendToSelect
    };
    dispatch(sendNotificationRequest(payload));
  };

  const [alignment, setAlignment] = React.useState('view');
  const handleToggle = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <>
      <Container
        sx={{
          display: 'flex',
          rowGap: '50px',
          flexDirection: { xs: 'column', md: 'row' },
          paddingBottom: '50px'
        }}>
        {formDatas?.RoleId > 1 && (
          <Box sx={{ display: 'flex', flex: '1', justifyContent: 'center' }}>
            <ToggleButtonGroup
              value={alignment}
              exclusive
              onChange={handleToggle}
              sx={{
                button: {
                  '&:hover, &.Mui-selected, &.Mui-selected:hover': {
                    border: '0px solid transparent !important',
                    background: 'linear-gradient(90.05deg, #fe3f46 -3.72%, #fcb714 120.3%)',
                    color: '#fff'
                  }
                }
              }}
              className={NotificationStyles['notifications_Button']}>
              <ToggleButton
                value="view"
                className={NotificationStyles['notifications_Button_send']}
                onClick={() => {
                  setNotificationType('v');
                }}>
                {notificationConstants.view_notification}
              </ToggleButton>
              <ToggleButton
                value="send"
                className={NotificationStyles['notifications_Button_send']}
                onClick={() => {
                  setNotificationType('s');
                }}>
                {notificationConstants.send_notification}
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        )}
        {notificationType === 'v' && (
          <Container sx={{ flex: '2' }}>
            {onNotificationSuccess ? (
              <Loader />
            ) : (
              <>
                {((Array.isArray(data) && data) || []).map((notification) => {
                  return (
                    <>
                      <Box className={NotificationStyles['notifications_alerts_container']}>
                        <Alerts
                          severity="info"
                          alertTitle={notification.Title}
                          alertMessage={notification.Message}
                          className={NotificationStyles['notifications_alerts']}
                        />
                      </Box>
                    </>
                  );
                })}
              </>
            )}
          </Container>
        )}
        {formDatas?.RoleId > 1 && notificationType === 's' && (
          <Container sx={{ flex: '2' }}>
            <Box className={NotificationStyles['notifications_parent_container']}>
              <Box className={NotificationStyles['messagesendsection']}>
                <Container className={NotificationStyles['container']}>
                  <FormControl
                    sx={{
                      label: {
                        '&.Mui-focused': {
                          color: '#fe3f46'
                        }
                      },
                      span: {
                        '&.Mui-checked': {
                          color: '#fe3f46'
                        }
                      }
                    }}>
                    <FormLabel id="demo-radio-button" className={NotificationStyles['messageText']}>
                      {notificationConstants.send_meesage}
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons"
                      defaultValue="phone"
                      name="radio-buttons"
                      onChange={handleChange}>
                      <Box className={NotificationStyles['radioButton']}>
                        <FormControlLabel value="phone" control={<Radio />} label="via Phone" />
                        <FormControlLabel value="email" control={<Radio />} label="via Email" />
                      </Box>
                    </RadioGroup>
                  </FormControl>
                  <CustomAccordian
                    handleAccordionChange={(e) => setExpanded(e)}
                    className={NotificationStyles['element_container']}
                    title={value == 'phone' ? 'Message via Phone' : 'Message via Email'}
                    description={<>{getNotificationView()}</>}
                  />
                  <Box
                    className={NotificationStyles['sendButton']}
                    sx={{
                      button: {
                        '&:hover, &.Mui-selected, &.Mui-selected:hover': {
                          backgroundColor: '#fe3f46'
                        }
                      }
                    }}>
                    <Button size="large" type="submit" variant="contained" onClick={handleDispatch}>
                      {notificationConstants.send}
                    </Button>
                  </Box>
                </Container>
              </Box>
            </Box>
          </Container>
        )}
        {isLoading && notificationType == 's' ? <Loader /> : ''}
        <Snackbar
          open={snackBarOpen && !isLoading}
          autoHideDuration={1000}
          onClose={handleSnackbarClose}>
          <AlertBox
            autoHideDuration={1000}
            severity={onSuccessSend == 'success' ? 'success' : 'error'}
            onClose={handleSnackbarClose}
            sx={{ width: '100%' }}>
            {onSuccessSend == 'success' ? 'Notify Succesfully' : 'Something went wrong'}
          </AlertBox>
        </Snackbar>
      </Container>
    </>
  );
};

export default Notification;

const AlertBox = forwardRef(function SbAlert(props, ref) {
  return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});
