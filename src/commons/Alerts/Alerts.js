import { Alert, AlertTitle } from '@mui/material';
import PropTypes from 'prop-types';
import '../../styles/_globals.scss';

const Alerts = ({ alertTitle, severity, alertMessage, ...props }) => {
  return (
    <Alert elevation={6} variant="filled" severity={severity} className="mr-10" {...props}>
      {alertTitle && <AlertTitle>{alertTitle}</AlertTitle>}
      {alertMessage}
    </Alert>
  );
};

Alerts.propTypes = {
  alertTitle: PropTypes.string,
  severity: PropTypes.string.isRequired,
  alertMessage: PropTypes.string.isRequired
};

Alerts.defaultProps = {
  alertTitle: ''
};

export default Alerts;
