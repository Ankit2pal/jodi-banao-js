import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Field, Form } from 'react-final-form';
import { Box } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { InputTextField } from './InputTextField';
import { composeValidators, isEmailValid, isRequired } from '../validators';

export const CustomPopup = ({ handleClose, open = false }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const loginSubmit = () => {};
  return (
    <Dialog
      open={open}
      fullScreen={fullScreen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">Enter your recovery email</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Form
            onSubmit={loginSubmit}
            render={({ handleSubmit }) => (
              <Box as="form" onSubmit={handleSubmit}>
                <Box className="new-pwd">
                  <Field
                    label="Recovery email"
                    name="Recovery email"
                    component={InputTextField}
                    type="email"
                    validate={composeValidators(isRequired, isEmailValid)}
                  />
                </Box>
              </Box>
            )}></Form>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button type="submit" value="submit" color="primary" autoFocus>
          CONTINUE
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CustomPopup.propTypes = {
  details: PropTypes.shape({
    popupHeading: PropTypes.string,
    PopUpText: PropTypes.string
  }),
  handleClose: PropTypes.func,
  open: PropTypes.bool
};

// CustomPopup.defaultProps = {
//   details: {}
// };
