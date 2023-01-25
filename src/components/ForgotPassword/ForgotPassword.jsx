import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { Field, Form } from 'react-final-form';
import Button from '@mui/material/Button';
import ForgotPasswordStyles from './ForgotPassword.module.scss';
import { InputTextField } from '../../commons';
import { Container } from '@mui/material';
import { composeValidators, isRequired, isEmailValid } from '../../validators';
import { FORGOT_PASSWORD_LABELS } from '../../constants/forgotPasswordConstants';

const ForgotPassword = ({ title, forgotPasswordHandler, showSubmitButton, checkEmailExist }) => {
  return (
    <Container maxWidth="md">
      {title && <h4>{FORGOT_PASSWORD_LABELS.title}</h4>}
      <Box className={ForgotPasswordStyles['container-box']}>
        <Form
          onSubmit={forgotPasswordHandler}
          render={({ handleSubmit }) => (
            <Box
              as="form"
              onSubmit={handleSubmit}
              className={ForgotPasswordStyles['forgot-password-form']}>
              <Box as="div">
                <Field
                  className={ForgotPasswordStyles['email']}
                  label={`${FORGOT_PASSWORD_LABELS.email}`}
                  name="email"
                  component={InputTextField}
                  type="email"
                  onBlur={(e) => checkEmailExist(e.target.value)}
                  validate={composeValidators(isRequired, isEmailValid)}
                />
              </Box>
              {showSubmitButton && (
                <Box as="div" className={ForgotPasswordStyles['btn-section']}>
                  <Button
                    sx={{
                      backgroundColor: '#f14046',
                      '&:hover, &.Mui-selected, &.Mui-selected:hover': {
                        backgroundColor: '#f14046'
                      }
                    }}
                    type="submit"
                    variant="contained"
                    className={ForgotPasswordStyles['button_forgotpwd']}>
                    {FORGOT_PASSWORD_LABELS.submit}
                  </Button>
                </Box>
              )}
            </Box>
          )}></Form>
      </Box>
    </Container>
  );
};

ForgotPassword.propTypes = {
  forgotPasswordHandler: PropTypes.func.isRequired,
  showSubmitButton: PropTypes.bool,
  title: PropTypes.string.isRequired,
  checkEmailExist: PropTypes.func.isRequired
};

ForgotPassword.defaultProps = {
  showSubmitButton: false,
  title: ''
};

export default ForgotPassword;
