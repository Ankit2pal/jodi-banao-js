import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getUID } from '../../redux/selectors/loginSelector';
import { getUId } from '../../redux/selectors/userRegisterationDetails';
import SessionStorageHandler from '../../utils/SessionStorageHandler';
import {
  fetchUserRegisterationDetails,
  resetUserRegisterationDetail
} from '../../redux/modules/userRegisterationDetails';
import {
  fetchCountryDetails,
  fetchStateDetails
} from '../../redux/modules/registerationDetailsSlice';
import { useEffect } from 'react';

const RouteAuthWrapper = ({ children, redirectTo }) => {
  const dispatch = useDispatch();
  const userIdFromUserDetails = useSelector(getUId);
  const userIdFromLoginDetails = useSelector(getUID);
  const userId = SessionStorageHandler.getKeyFromStorage('userId');
  const regID = SessionStorageHandler.getKeyFromStorage('regID');
  useEffect(() => {
    dispatch(fetchCountryDetails());
    dispatch(fetchStateDetails());
  }, []);
  if (userIdFromLoginDetails === '') {
    dispatch(fetchUserRegisterationDetails({ userId: userId }));
  }
  if (!userId && !regID) {
    dispatch(resetUserRegisterationDetail());
    SessionStorageHandler.removeItemFromStorage('userId');
    window.location.replace('/');
  }
  return (userIdFromLoginDetails && userIdFromUserDetails && userId) || regID ? (
    children
  ) : (
    <Navigate to={redirectTo} />
  );
};

RouteAuthWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  redirectTo: PropTypes.string
};

RouteAuthWrapper.defaultProps = {
  redirectTo: '/'
};
export default RouteAuthWrapper;
