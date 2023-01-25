import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import DeactivateStyle from './deactivate.module.scss';
import Grid from '@mui/material/Grid';
import { InputAutoCompleteField, InputTextField } from '../../commons';
import { isRequired } from '../../validators';
import deactivateConstants from '../../constants/deactivateConstants';
import { Alert, Box, Button, Snackbar } from '@mui/material';
import { forwardRef } from 'react';

const DeactivateAlert = forwardRef(function SbAlert(props, ref) {
  return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Deactivate = ({
  creatingForOptionalData,
  deactivateSubmit,
  isDeactivateSuccess,
  handleClose,
  sBOpen,
  statusMessage
}) => {
  return (
    <>
      <Box className={DeactivateStyle['box_container']}>
        <Snackbar onClose={handleClose} open={sBOpen} autoHideDuration={2000}>
          <DeactivateAlert
            onClose={handleClose}
            severity={isDeactivateSuccess ? 'success' : 'error'}
            sx={{ width: '100%' }}>
            {statusMessage}
          </DeactivateAlert>
        </Snackbar>
        <Grid className={DeactivateStyle['box_form_container']}>
          <Form
            onSubmit={(values) => deactivateSubmit(values)}
            validate={(values) => {
              const errors = {};
              if (!values.DeactiveReason) {
                errors.DeactiveReason = 'Required';
              }

              return errors;
            }}
            render={({ handleSubmit }) => (
              <>
                <Grid as="form" onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} className={DeactivateStyle['box_form']}>
                      <Box className={DeactivateStyle['box_deact_type']}>
                        <Field
                          label={deactivateConstants.dropdownlabel}
                          name="deactivateFor"
                          options={creatingForOptionalData}
                          component={InputAutoCompleteField}
                          validate={isRequired}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box className={DeactivateStyle['box_deact_reason']}>
                        <Field
                          label={deactivateConstants.inputlabel}
                          name={'DeactiveReason'}
                          component={InputTextField}
                          type="text"
                          validate={isRequired}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={12} marginTop={'20px'}>
                      <Box as="div" className={DeactivateStyle.button}>
                        <Button
                          size="large"
                          type="submit"
                          variant="contained"
                          className={DeactivateStyle['button_submit']}>
                          {deactivateConstants.submit}
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            )}></Form>
        </Grid>
      </Box>
    </>
  );
};

export default Deactivate;

Deactivate.propTypes = {
  deactivateSubmit: PropTypes.func,
  creatingForOptionalData: PropTypes.array,
  isDeactivateSuccess: false,
  sBOpen: false,
  statusMessage: PropTypes.string,
  handleClose: () => {}
};

Deactivate.defaultProps = {
  isDeactivateSuccess: false,
  sBOpen: false,
  statusMessage: '',
  deactivateSubmit: () => {}
};
