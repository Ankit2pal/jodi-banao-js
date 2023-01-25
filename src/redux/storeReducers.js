import registerationDetailsReducer from './modules/registerationDetailsSlice';
import loginReducer from './modules/loginHeaderSlice';
import packageReducer from './modules/packagesSlice';
import forgotPasswordReducer from './modules/forgotPasswordSlice';
import resetPasswordReducer from './modules/resetPasswordSlice';
import completeRegisterationReducer from './modules/completeRegisterationSlice';
import userRegisterationDetailsReducer from './modules/userRegisterationDetails';
import deactivateDetailReducer from './modules/deactivateDetailsSlice';
import deactivateReducer from './modules/deactivateSlice';
import registerReducer from './modules/registerSlice';
import searchResultsReducer from './modules/searchResultsSlice';
import managePhotosReducer from './modules/managePhotoSlice';
import finalFormReducer from './modules/formStateSlice';
import notificationReducer from './modules/notificationSlice';
import editProfileReducer from './modules/editProfileSlice';
import vendorDashboardReducer from './modules/vendorDashboardSlice';
import adminDashboardReducer from './modules/adminDashboardSlice';
import superAdminreducer from './modules/superAdminSlice';
import userReducer from './modules/userSlice';
import userPaymentHistoryReducer from './modules/userPaymentHistorySlice';
import vendorReducer from './modules/vendorSlice';
import executiveReducer from './modules/executiveSlice';
import adminsReducer from './modules/adminSlice';
import packagesReducer from './modules/packageSlice';
import vendorByUserAdd from './modules/vendorByUserAdd';
import sendNotificationReducer from './modules/sendNotificationSlice';
import changePasswordReducer from './modules/changePasswordSlice';
import { combineReducers } from 'redux';

const reducers = combineReducers({
  registerationDetails: registerationDetailsReducer,
  loginDetails: loginReducer,
  forgotPasswordDetails: forgotPasswordReducer,
  resetPasswordDetails: resetPasswordReducer,
  completeRegisteration: completeRegisterationReducer,
  userRegisterationDetails: userRegisterationDetailsReducer,
  packageDetails: packageReducer,
  deactivateDetail: deactivateDetailReducer,
  deactivate: deactivateReducer,
  formRegisterationDetails: registerReducer,
  searchResults: searchResultsReducer,
  userPhotos: managePhotosReducer,
  finalForm: finalFormReducer,
  notification: notificationReducer,
  editProfile: editProfileReducer,
  vendorDashboard: vendorDashboardReducer,
  superAdmin: superAdminreducer,
  adminDashboard: adminDashboardReducer,
  users: userReducer,
  usersPaymentHistory: userPaymentHistoryReducer,
  vendors: vendorReducer,
  executive: executiveReducer,
  admins: adminsReducer,
  packages: packagesReducer,
  addVendorUser: vendorByUserAdd,
  sendnotification: sendNotificationReducer,
  changePasswordDetails: changePasswordReducer
});

export default reducers;
