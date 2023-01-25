import { NoMatch } from '../components/NoMatch';
import HomePageContainer from '../containers/HomeContainer';
import LandingPageContainer from '../containers/LandingPageContainer';
import { AboutUsContainer } from '../containers/AboutUsContainer';
import { TermsAndConditionContainer } from '../containers/TermsAndConditionContainer';
import { PrivacyPolicyContainer } from '../containers/PrivacyPolicyContainer';
import { ContactUsContainer } from '../containers/ContactUsContainer';
import PhysicalRegisterContainer from '../containers/PhysicalRegisterContainer';
import ResetPasswordContainer from '../containers/ResetPasswordContainer';
import { HelpUsContainer } from '../containers/HelpUsContainer';
import { PackagesContainer } from '../containers/PackagesContainer';
import { DeactivateContainer } from '../containers/DeactivateContainer';
import OtpContainer from '../containers/OtpContainer';
import { ViewProfileContainer } from '../containers/ViewProfileContainer';
import { DashboardContainer } from '../containers/DashboardContainer';
import { ManagePhotosContainer } from '../containers/ManagePhotosContainer';
import SearchProfilesContainer from '../containers/SearchProfilesContainer';
import RouteAuthWrapper from '../commons/RouteAuthWrapper';
import { MyProfileContainer } from '../containers/myProfileContainer';
import { VendorDashboardContainer } from '../containers/VendorDashboardContainer';
import { AdminDashboardContainer } from '../containers/AdminDashboardContainer';
import { EditContainer } from '../containers/EditContainer';
import { AddContainer } from '../containers/AddContainer';
import { VendorsContainer } from '../containers/VendorsContainer';
import { UsersContainer } from '../containers/UsersContainer';
import { AdminsContainer } from '../containers/AdminsContainer';
import { SuperAdminContainer } from '../containers/SuperAdminContainer';
import { PackageListContainer } from '../containers/PackageListContainer';
import ChangePasswordContainer from '../containers/ChangePasswordContainer';
import RegisterinfoContainer from '../components/RegisterInfo/RegisterInfoContainer';
import { PaymentDetailsContainer } from '../containers/PaymentDetailsContainer';
import { PaymentHistoryContainer } from '../containers/PaymentHistoryContainer';
import { NotificationContainer } from '../containers/NotificationContainer';
import { ExecutiveContainer } from '../containers/ExecutiveContainer';
import { RefundPolicyContainer } from '../containers/RefundPolicyContainer';

const RoutesConfig = [
  {
    path: '/',
    element: <HomePageContainer />
  },

  {
    path: '/home',
    element: <HomePageContainer />
  },
  {
    path: '/landing',
    element: <LandingPageContainer />
  },
  {
    path: '/about-us',
    element: <AboutUsContainer />
  },
  {
    path: '/privacy-policy',
    element: <PrivacyPolicyContainer />
  },
  {
    path: '/refund-policy',
    element: <RefundPolicyContainer />
  },
  {
    path: '/contact-us',
    element: <ContactUsContainer />
  },
  {
    path: '/terms-and-condition',
    element: <TermsAndConditionContainer />
  },
  {
    path: '/steps-registration',
    element: (
      <RouteAuthWrapper>
        <PhysicalRegisterContainer />
      </RouteAuthWrapper>
    )
  },
  {
    path: '/basic-registration',
    element: <RegisterinfoContainer />
  },
  {
    path: '/help-us',
    element: (
      <RouteAuthWrapper>
        <HelpUsContainer />
      </RouteAuthWrapper>
    )
  },
  {
    path: '/edit/:userId',
    element: (
      <RouteAuthWrapper>
        <EditContainer />
      </RouteAuthWrapper>
    )
  },
  {
    path: '/add-profile',
    element: (
      <RouteAuthWrapper>
        <AddContainer />
      </RouteAuthWrapper>
    )
  },
  {
    path: '/packages',
    element: (
      <RouteAuthWrapper>
        <PackagesContainer />
      </RouteAuthWrapper>
    )
  },
  {
    path: '/reset-password',
    element: <ResetPasswordContainer />
  },
  {
    path: '/change-password',
    element: (
      <RouteAuthWrapper>
        <ChangePasswordContainer />
      </RouteAuthWrapper>
    )
  },
  {
    path: '/deactivate',
    element: (
      <RouteAuthWrapper>
        <DeactivateContainer />
      </RouteAuthWrapper>
    )
  },
  {
    path: '/verify-otp',
    element: <OtpContainer />
  },
  {
    path: '/view-profile/:userId',
    element: (
      <RouteAuthWrapper>
        <ViewProfileContainer />
      </RouteAuthWrapper>
    )
  },
  {
    path: '/my-profile',
    element: (
      <RouteAuthWrapper>
        <MyProfileContainer />
      </RouteAuthWrapper>
    )
  },
  {
    path: '/dashboard',
    element: (
      <RouteAuthWrapper>
        <DashboardContainer />
      </RouteAuthWrapper>
    )
  },
  {
    path: '/manage-photos',
    element: <ManagePhotosContainer />
  },
  {
    path: '/search',
    element: (
      <RouteAuthWrapper>
        <SearchProfilesContainer />
      </RouteAuthWrapper>
    )
  },
  {
    path: '/notification',
    element: (
      <RouteAuthWrapper>
        <NotificationContainer />
      </RouteAuthWrapper>
    )
  },

  // VENDOR PANEL
  {
    path: '/vendor-dashboard',
    element: (
      <RouteAuthWrapper>
        <VendorDashboardContainer />
      </RouteAuthWrapper>
    )
  },

  {
    path: '/executive-dashboard',
    element: (
      <RouteAuthWrapper>
        <VendorDashboardContainer />
      </RouteAuthWrapper>
    )
  },

  // ADMIN PANEL
  {
    path: '/admin-dashboard',
    element: (
      <RouteAuthWrapper>
        <AdminDashboardContainer />
      </RouteAuthWrapper>
    )
  },
  // SUPER-ADMIN PANEL
  {
    path: '/super-admin',
    element: <SuperAdminContainer />
  },
  {
    path: '/users',
    element: (
      <RouteAuthWrapper>
        <UsersContainer />
      </RouteAuthWrapper>
    )
  },
  {
    path: '/vendors',
    element: (
      <RouteAuthWrapper>
        <VendorsContainer />
      </RouteAuthWrapper>
    )
  },
  {
    path: '/executive',
    element: (
      <RouteAuthWrapper>
        <ExecutiveContainer />
      </RouteAuthWrapper>
    )
  },
  {
    path: '/admins',
    element: (
      <RouteAuthWrapper>
        <AdminsContainer />
      </RouteAuthWrapper>
    )
  },
  {
    path: '/payment-details',
    element: (
      <RouteAuthWrapper>
        <PaymentDetailsContainer />
      </RouteAuthWrapper>
    )
  },
  {
    path: '/payment-history',
    element: (
      <RouteAuthWrapper>
        <PaymentHistoryContainer />
      </RouteAuthWrapper>
    )
  },
  {
    path: '/packages-list',
    element: (
      <RouteAuthWrapper>
        <PackageListContainer />
      </RouteAuthWrapper>
    )
  },
  { path: '*', element: <NoMatch /> }
];

export default RoutesConfig;
