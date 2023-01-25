import Box from '@mui/material/Box';
import { Field, Form } from 'react-final-form';
import Button from '@mui/material/Button';
import FormStyle from './Contact.module.scss';
import { InputTextField, PhoneNumberField } from '../../commons';
import { composeValidators, isRequired } from '../../validators';
import { Alert, Grid, Snackbar, TextareaAutosize } from '@mui/material';
import { forwardRef, useState } from 'react';
import { contactUsConstants } from '../../constants/contactUsConstants';
import { callContactUs } from '../../services/registerApi';
import { useNavigate } from 'react-router-dom';
import footerclk from '../../images/footerclock.svg';
import footerEmail from '../../images/footerEmail.svg';
import footerLoc from '../../images/footerLoc.svg';
const AlertBox = forwardRef(function SbAlert(props, ref) {
  return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Contact = () => {
  const [textArea, setTextArea] = useState('');
  const [termsSnackBar, setTermsSnackBar] = useState(false);
  const [snackBar, setSnackBar] = useState(false);
  const navigate = useNavigate();
  const mySubmit = async (payload) => {
    payload['Message'] = textArea;
    try {
      await callContactUs(payload);
      setSnackBar(true);
      setTermsSnackBar(true);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      setSnackBar(true);
      setTermsSnackBar(false);
      return false;
    }
  };
  const handleClose = () => {
    setSnackBar(false);
  };
  return (
    <>
      <Snackbar open={snackBar} autoHideDuration={1000} onClose={handleClose}>
        <AlertBox
          autoHideDuration={1000}
          severity={termsSnackBar ? 'success' : 'error'}
          onClose={handleClose}
          sx={{ width: '100%' }}>
          {termsSnackBar ? 'Email Send Successfully' : 'Wrong Details'}
        </AlertBox>
      </Snackbar>

      <Box className={FormStyle['']}>
        <Box className={FormStyle['about_jodi_container']}>
          <Grid container className={FormStyle['box_containers']}>
            <Grid item xs={12} md={3} className={FormStyle['box_n_desc']}>
              <Box className={FormStyle['box']}>
                <Box as="img" src={footerclk} className={FormStyle['box_img']} />
              </Box>
              <Box className={FormStyle['desc']}>
                <Box as="h2" className={FormStyle['desc_title']}>
                  Contact
                </Box>
                <Box as="p">(+91)98555-85666</Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={3} className={FormStyle['box_n_desc']}>
              <Box className={FormStyle['box']}>
                <Box as="img" src={footerEmail} className={FormStyle['box_img']} />
              </Box>
              <Box className={FormStyle['desc']}>
                <Box as="h2" className={FormStyle['desc_title']}>
                  Email
                </Box>
                <Box as="p">info@jodibanav.com</Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={3} className={FormStyle['box_n_desc']}>
              <Box className={FormStyle['box']}>
                <Box as="img" src={footerLoc} className={FormStyle['box_img']} />
              </Box>
              <Box className={FormStyle['desc']}>
                <Box as="h2" className={FormStyle['desc_title']}>
                  Address
                </Box>
                <Box as="p">2-2-290/29-30,New Venkataramana Colony,Hyderabad-500068</Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box className={FormStyle['box-container_map1']}>
          <Box className={FormStyle['box-container_map']}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.685657582503!2d78.55634887434064!3d17.378852503052556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb990d6390b78b%3A0xac9052aabea45572!2s2-2-290%2F29-30%2C%20Mamatha%20Nagar%20Colony%2C%20Nagole%2C%20Hyderabad%2C%20Telangana%20500068!5e0!3m2!1sen!2sin!4v1672426210484!5m2!1sen!2sin"
              width="570"
              height="580"
              allowFullScreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"></iframe>
          </Box>
          <Box className={FormStyle['box-container']}>
            <h1 className={FormStyle['get']}>{contactUsConstants.get}</h1>
            <Form
              onSubmit={mySubmit}
              render={({ handleSubmit }) => (
                <Box as="form" onSubmit={handleSubmit} className={FormStyle['box-form-container']}>
                  <Box as="div" className={FormStyle['box-form-container1']}>
                    <Field
                      label={`${contactUsConstants.Name}`}
                      name="Name"
                      component={InputTextField}
                      type="text"
                      className={FormStyle['new-password']}
                      validate={composeValidators(isRequired)}
                    />

                    <Field
                      label={`${contactUsConstants.Subject}`}
                      name="Subject"
                      component={InputTextField}
                      type="text"
                      className={FormStyle['new-password']}
                      validate={composeValidators(isRequired)}
                    />
                  </Box>
                  <Box as="div" className={FormStyle['box-form-container1']}>
                    <Field
                      label={`${contactUsConstants.Mobile}`}
                      name="Mobile"
                      component={PhoneNumberField}
                      type="number"
                      className={FormStyle['confirm-password']}
                    />
                    <Field
                      label={`${contactUsConstants.Email}`}
                      name="Email"
                      component={InputTextField}
                      type="text"
                      className={FormStyle['new-password']}
                      validate={composeValidators(isRequired)}
                    />
                  </Box>
                  <Box as="div">
                    <TextareaAutosize
                      placeholder={`${contactUsConstants.Message}`}
                      label="Message"
                      onChange={(e) => setTextArea(e.target.value)}
                      value={textArea}
                      minRows={5}
                      cols={92}
                      className={FormStyle['new-password']}
                      validate={composeValidators(isRequired)}
                    />
                  </Box>
                  <Box as="div" className={FormStyle['new-pwd']}>
                    <Button
                      size="large"
                      type="submit"
                      variant="contained"
                      className={FormStyle['button_forgotpwd']}>
                      {contactUsConstants.Make}
                    </Button>
                  </Box>
                </Box>
              )}></Form>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default Contact;
