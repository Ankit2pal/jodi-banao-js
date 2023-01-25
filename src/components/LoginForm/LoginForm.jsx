import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { Field, Form } from 'react-final-form';
import Button from '@mui/material/Button';
import LoginFormStyles from './LoginForm.module.scss';
import { InputTextField } from '../../commons';
import { Container } from '@mui/material';
import {
  composeValidators,
  isRequired,
  isEmailValidLogin,
  MobileValidLogin
} from '../../validators';
import { LOGIN_FORM_CONSTANTS } from '../../constants/loginFormConstants';

const LoginForm = ({
  title,
  showSubmitButton,
  loginSubmit
  // handleOpenModalHandler,
  // handleCloseModalHandler
}) => {
  return (
    <Container maxWidth="md">
      {title && <h4>{title}</h4>}
      <Box className={LoginFormStyles['container-box']}>
        <Form
          onSubmit={loginSubmit}
          render={({ handleSubmit }) => (
            <>
              <Box as="form" onSubmit={handleSubmit} className={LoginFormStyles['login-form']}>
                <Box as="div">
                  <Field
                    label={LOGIN_FORM_CONSTANTS.userName}
                    name="EmailId"
                    component={InputTextField}
                    type="text"
                    validate={composeValidators(isRequired, isEmailValidLogin, MobileValidLogin)}
                    size="small"
                    className={LoginFormStyles['email']}
                  />
                </Box>
                <Box as="div">
                  <Field
                    label={LOGIN_FORM_CONSTANTS.password}
                    name="PasswordHash"
                    component={InputTextField}
                    type="password"
                    validate={isRequired}
                    size="small"
                  />
                </Box>
                {showSubmitButton && (
                  <>
                    <Box
                      as="div"
                      className={LoginFormStyles['btn-section']}
                      sx={{
                        button: {
                          backgroundColor: '#f14046',
                          '&:hover, &.Mui-selected, &.Mui-selected:hover': {
                            backgroundColor: '#f14046'
                          }
                        }
                      }}>
                      <Button
                        type="submit"
                        variant="contained"
                        className={LoginFormStyles['button_submit']}>
                        {LOGIN_FORM_CONSTANTS.submit}
                      </Button>
                    </Box>
                  </>
                )}
              </Box>
              {/* <Link
                underline="none"
                onClick={() => {
                  handleCloseModalHandler({ label: 'login' });
                  handleOpenModalHandler({ label: 'forgot-password' });
                }}>
                {LOGIN_HEADER_LABELS.forgotPassword}
              </Link> */}
            </>
          )}></Form>
      </Box>
    </Container>
  );
};

LoginForm.propTypes = {
  loginSubmit: PropTypes.func.isRequired,
  showSubmitButton: PropTypes.bool,
  title: PropTypes.string.isRequired,
  handleCloseModalHandler: PropTypes.func.isRequired,
  handleOpenModalHandler: PropTypes.func.isRequired
};

LoginForm.defaultProps = {
  showSubmitButton: false,
  title: ''
};

export default LoginForm;
