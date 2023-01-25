import { all } from 'redux-saga/effects';
import completeRegisterationSaga from './completeRegisterationSaga';
import loginSaga from './loginSaga';
import registerationDetailsSaga from './registerationDetailsSaga';
import registerSaga from './registerSaga';
import forgotPasswordSaga from './forgotPasswordSaga';
import resetPasswordSaga from './resetPasswordSaga';
import userRegisterationDetailsSaga from './userRegisterationDetailsSaga';
import searchResultsSaga from './searchResultSaga';
import packagesDetailSaga from './packagesSaga';
// import packageDetailSaga from './packagesSaga';

import deactivateDetailsSaga from './deactivateDetailSaga';
import deactivateSaga from './deactivateSaga';
import managePhotoSaga, { userPhotosDeleteSaga, userPhotosUploadSaga } from './managePhotoSaga';
import vendorDashboardSaga, { getVendorPackageSaga } from './vendorDashboardSaga';
import adminDashboardSaga from './adminDashboardSaga';
import superAdminSaga, { getSuperAdminPackageSaga } from './superAdminSaga';
import userSaga, { userActiveSaga, userDeActiveSaga } from './userSaga';
import userPaymentHistorySaga from './userPaymentHistorySaga';
import executiveSaga from './executiveSaga';
import editUserSaga from './editProfileSaga';
import vendorSaga from './vendorSaga';
import addVendorUserSaga from './addVendorUserSaga';
import notificationSaga from './notificationSaga';
import sendNotificationSaga from './sendNotificationSaga';
import changePasswordSaga from './changePasswordSaga';

import adminSaga from './adminSaga';
import packageSaga, {
  packageListSaga,
  deletepackageListSaga,
  updatepackageListSaga
} from './packageSaga';

import generatePaymentSaga from './generatePaymentSaga';

export default function* rootSaga() {
  yield all([
    registerationDetailsSaga(),
    loginSaga(),
    packagesDetailSaga(),
    registerSaga(),
    deletepackageListSaga(),
    packageListSaga(),
    forgotPasswordSaga(),
    resetPasswordSaga(),
    completeRegisterationSaga(),
    userRegisterationDetailsSaga(),
    deactivateDetailsSaga(),
    deactivateSaga(),
    searchResultsSaga(),
    userPhotosUploadSaga(),
    updatepackageListSaga(),
    managePhotoSaga(),
    notificationSaga(),
    userPhotosDeleteSaga(),
    vendorDashboardSaga(),
    adminDashboardSaga(),
    superAdminSaga(),
    getVendorPackageSaga(),
    // getAdminPackageSaga(),
    getSuperAdminPackageSaga(),
    editUserSaga(),
    userSaga(),
    userPaymentHistorySaga(),
    executiveSaga(),
    userDeActiveSaga(),
    userActiveSaga(),
    vendorSaga(),
    adminSaga(),
    packageSaga(),
    addVendorUserSaga(),
    sendNotificationSaga(),
    changePasswordSaga(),
    generatePaymentSaga()
  ]);
}
