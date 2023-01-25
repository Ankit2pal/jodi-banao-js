import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  Tab,
  Tabs,
  Avatar
} from '@mui/material';
import DashboardHeaderStyles from './DashboardHeader.module.scss';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { roleId } from '../../redux/selectors/userRegisterationDetails';
import { resetUserRegisterationDetail } from '../../redux/modules/userRegisterationDetails';
import SessionStorageHandler from '../../utils/SessionStorageHandler';
import {
  ADMIN_ROLE_CONSTANTS,
  VENDOR_EXECUTIVE_ROLE_CONSTANTS
} from '../../constants/dashboardConstants';
import { deepOrange } from '@mui/material/colors';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { onLoginReset } from '../../redux/modules/loginHeaderSlice';
import { onLoginResetSearch } from '../../redux/modules/searchResultsSlice';
import { getVendorPackageErrorReset } from '../../redux/modules/vendorDashboardSlice';
const style = styled({
  customLabelColor: {
    backgroundColor: '#F14046'
  }
});

const DashboardHeader = () => {
  const classes = style();
  const loggedInRole = useSelector(roleId);
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();
  const formDatas = useSelector((state) => state.userRegisterationDetails.data);
  const balProfile = useSelector((state) => state.userRegisterationDetails?.balanceProfile);
  const pages = ['DASHBOARD'];
  let settings = ['Profile', 'Manage Photos', 'Deactivate', 'Change Password', 'Logout'];
  const subPages = ['USER LIST', 'VENDOR LIST'];
  useEffect(() => {
    formDatas?.RoleId == 1
      ? setUserType('U')
      : formDatas?.RoleId == 2
      ? setUserType('V')
      : formDatas?.RoleId == 3
      ? setUserType('A')
      : formDatas?.RoleId == 4
      ? setUserType('SA')
      : formDatas?.RoleId == 5
      ? setUserType('E')
      : setUserType(' ');
  }, []);

  if (formDatas?.RoleId !== 2 && formDatas?.RoleId !== 5) {
    pages.push('SEARCH');
  }
  pages.push('EDIT');
  if (formDatas?.RoleId > 1) {
    settings = ['Profile', 'Change Password', 'Logout'];
    pages.push('ADD');
  }
  if (ADMIN_ROLE_CONSTANTS.includes(loggedInRole)) {
    pages.push('LIST');
    pages.push('PACKAGE LIST');
  }
  if (loggedInRole > 3) {
    subPages.push('ADMINS LIST');
  }
  pages.push('HELP');
  pages.push('NOTIFICATION');
  if (formDatas?.RoleId >= 2) {
    pages.push('PAYMENT DETAILS');
    pages.push('PAYMENT HISTORY');
  }
  if (formDatas?.RoleId < 2) {
    pages.push('PACKAGE');
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const currentTab = () => {
    let path = window.location.pathname;
    if (path === '/dashboard') return 0;
    else if (path === '/search') return 1;
    else if (path.includes('/edit')) {
      if (VENDOR_EXECUTIVE_ROLE_CONSTANTS.includes(loggedInRole)) return 1;
      else return 2;
    } else if (path.includes('/add-profile')) {
      if (VENDOR_EXECUTIVE_ROLE_CONSTANTS.includes(loggedInRole)) return 2;
      else if (loggedInRole > 2) return 3;
    } else if (path.includes('/help-us')) {
      if (loggedInRole === 1) return 3;
      if (VENDOR_EXECUTIVE_ROLE_CONSTANTS.includes(loggedInRole)) return 3;
      if (loggedInRole > 2) return 6;
    } else if (path.includes('/vendors') && loggedInRole > 2) {
      return 4;
    } else if (path.includes('/users') && loggedInRole > 2) {
      return 4;
    } else if (path.includes('/executive') && loggedInRole > 3) {
      return 4;
    } else if (path.includes('/executive') && loggedInRole === 3) {
      return 4;
    } else if (path.includes('/admins') && loggedInRole > 2) {
      return 4;
    } else if (path.includes('/payment-details')) {
      if (VENDOR_EXECUTIVE_ROLE_CONSTANTS.includes(loggedInRole)) return 5;
      if (loggedInRole > 3) return 8;
      if (loggedInRole === 3) return 8;
    } else if (path.includes('/payment-history')) {
      if (VENDOR_EXECUTIVE_ROLE_CONSTANTS.includes(loggedInRole)) return 5;
      if (loggedInRole > 3) return 8;
      if (loggedInRole === 3) return 8;
      if (loggedInRole === 2) return 7;
    } else if (path.includes('/notification')) {
      if (loggedInRole === 1) return 4;
      if (VENDOR_EXECUTIVE_ROLE_CONSTANTS.includes(loggedInRole)) return 4;
      if (loggedInRole > 2) return 7;
    } else if (path.includes('/packages')) {
      if (loggedInRole === 1) return 5;
      if (VENDOR_EXECUTIVE_ROLE_CONSTANTS.includes(loggedInRole)) return 7;
      if (loggedInRole > 2) return 5;
    } else if (path === '/add') return 6;
    else if (path.includes('view-profile')) {
      return 1;
    } else return 0;
  };
  const [value, setValue] = useState(currentTab);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleOpenUser = () => {
    navigate('/packages');
  };

  const handleLogout = () => {
    dispatch(resetUserRegisterationDetail());
    dispatch(onLoginReset());
    dispatch(onLoginReset());
    dispatch(onLoginResetSearch());
    dispatch(getVendorPackageErrorReset());
    SessionStorageHandler.removeItemFromStorage('userId');
    navigate('/');
  };

  const handleMopbileNavMenu = (name) => {
    switch (name) {
      case 'DASHBOARD':
        {
          formDatas?.RoleId === 1 && navigate('/dashboard');
        }
        {
          formDatas?.RoleId === 2 && navigate('/vendor-dashboard');
        }
        {
          formDatas?.RoleId === 3 && navigate('/admin-dashboard');
        }
        {
          formDatas?.RoleId === 4 && navigate('/super-admin');
        }
        {
          formDatas?.RoleId === 5 && navigate('/executive-dashboard');
        }
        break;
      case 'SEARCH':
        navigate('/search');
        break;
      case 'ADD':
        navigate('/add-profile');
        break;
      case 'HELP':
        navigate('/help-us');
        break;
      case 'NOTIFICATION':
        navigate('/notification');
        break;
      case 'PAYMENT DETAILS':
        navigate(`/payment-details`);
        break;
      case 'PAYMENT HISTORY':
        navigate(`/payment-history`);
        break;
      case 'PACKAGE':
        navigate('/packages');
        break;
      case 'EDIT':
        navigate(`/edit/${formDatas.GUID}`);
        break;
      case 'USER LIST':
        navigate(`/users`);
        break;
      case 'VENDOR LIST':
        navigate(`/vendors`);
        break;
      case 'EXECUTIVE':
        navigate(`/executive`);
        break;
      case 'ADMINS LIST':
        navigate(`/admins`);
        break;
      case 'PACKAGE LIST':
        navigate(`/packages-list`);
        break;
      default:
        break;
    }
  };

  const handleCloseUserMenu = (setting) => {
    switch (setting) {
      case 'Manage Photos':
        navigate('/manage-photos');
        break;
      case 'Profile':
        navigate('/my-profile');
        break;
      case 'Deactivate':
        navigate('/deactivate');
        break;
      case 'Change Password':
        navigate('/change-password');
        break;
      case 'Logout':
        handleLogout();
        break;
      default:
        break;
    }
    setAnchorElUser(null);
  };

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const [sticky, setSticky] = useState('');

  useEffect(() => {
    window.addEventListener('scroll', isSticky);
    return () => {
      window.removeEventListener('scroll', isSticky);
    };
  }, []);

  const isSticky = () => {
    const scrollTop = window.scrollY;
    const stickyClass = scrollTop >= 75 ? 'is-sticky' : '';
    setSticky(stickyClass);
  };

  const classes2 = `${sticky} dashColor`;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [payTab, setpayTab] = React.useState(null);
  const openPayTab = Boolean(payTab);
  const handleClickPayTab = (event) => {
    setpayTab(event.currentTarget);
  };
  const handleClosePayTab = () => {
    setpayTab(null);
  };
  return (
    <AppBar position="static" color="default">
      <div className={DashboardHeaderStyles['topHead']} />
      <Container maxWidth="xl" className={classes2}>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}>
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}>
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleMopbileNavMenu(page)}>
                  <Typography textAlign="center">{page}</Typography>
                  {ADMIN_ROLE_CONSTANTS.includes(loggedInRole) &&
                    page === 'LIST' &&
                    subPages.map((sPage) => (
                      <MenuItem key={page} onClick={() => handleMopbileNavMenu(sPage)}>
                        <Typography textAlign="center">{sPage}</Typography>
                      </MenuItem>
                    ))}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              textDecoration: 'none'
            }}>
            <Box as="span" className={DashboardHeaderStyles['box_logo']} />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'black', display: 'none' }}></Button>
            <Tabs
              value={value || 0}
              onChange={handleChangeTab}
              TabIndicatorProps={{ style: { background: '#F14046' } }}
              classes={{
                customLabelColor: classes.customLabelColor
              }}>
              {formDatas?.RoleId === 1 && (
                <Tab label="DASHBOARD" to="/dashboard" component={Link} />
              )}
              {formDatas?.RoleId === 2 && (
                <Tab label="DASHBOARD" to="/vendor-dashboard" component={Link} />
              )}
              {formDatas?.RoleId === 3 && (
                <Tab label="DASHBOARD" to="/admin-dashboard" component={Link} />
              )}
              {formDatas?.RoleId === 4 && (
                <Tab label="DASHBOARD" to="/super-admin" component={Link} />
              )}
              {formDatas?.RoleId === 5 && (
                <Tab label="DASHBOARD" to="/executive-dashboard" component={Link} />
              )}
              {!VENDOR_EXECUTIVE_ROLE_CONSTANTS.includes(loggedInRole) && (
                <Tab label="SEARCH" to="/search" component={Link} />
              )}

              <Tab label="EDIT" to={`/edit/${formDatas?.GUID}`} component={Link} />
              {formDatas?.RoleId >= 2 && <Tab label="ADD" to="/add-profile" component={Link} />}
              {ADMIN_ROLE_CONSTANTS.includes(loggedInRole) && (
                <>
                  <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    className={DashboardHeaderStyles['header-color']}
                    onClick={handleClick}>
                    List
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button'
                    }}>
                    <MenuItem onClick={handleClose}>
                      <Tab
                        label="User List"
                        to="/users"
                        className={DashboardHeaderStyles['header-color']}
                        component={Link}
                      />
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      {' '}
                      <Tab
                        label="VENDOR LIST"
                        to="/vendors"
                        className={DashboardHeaderStyles['header-color']}
                        component={Link}
                      />
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      {' '}
                      <Tab
                        label="EXECUTIVE LIST"
                        to="/executive"
                        className={DashboardHeaderStyles['header-color']}
                        component={Link}
                      />
                    </MenuItem>
                    {loggedInRole === 4 && (
                      <MenuItem onClick={handleClose}>
                        {' '}
                        <Tab
                          label="ADMIN LIST"
                          to="/admins"
                          className={DashboardHeaderStyles['header-color']}
                          component={Link}
                        />
                      </MenuItem>
                    )}
                  </Menu>
                </>
              )}
              {ADMIN_ROLE_CONSTANTS.includes(loggedInRole) && (
                <Tab label="PACKAGE LIST" to="/packages-list" component={Link} />
              )}
              <Tab label="HELP" to="/help-us" component={Link} />
              <Tab label="NOTIFICATION" to="/notification" component={Link} />

              {formDatas?.RoleId > 1 && (
                <>
                  <Button
                    id="basic-button-payment"
                    aria-controls={openPayTab ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openPayTab ? 'true' : undefined}
                    className={DashboardHeaderStyles['header-color']}
                    onClick={handleClickPayTab}>
                    PAYMENT INFO
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={payTab}
                    open={openPayTab}
                    onClose={handleClosePayTab}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button'
                    }}>
                    <MenuItem onClick={handleClosePayTab}>
                      <Tab
                        label="PAYMENT DETAILS"
                        to="/payment-details"
                        className={DashboardHeaderStyles['header-color']}
                        component={Link}
                      />
                    </MenuItem>
                    <MenuItem onClick={handleClosePayTab}>
                      {' '}
                      <Tab
                        label="PAYMENT HISTORY"
                        to="/payment-history"
                        className={DashboardHeaderStyles['header-color']}
                        component={Link}
                      />
                    </MenuItem>
                  </Menu>
                </>
              )}
              {formDatas.RoleId < 2 && <Tab label="PACKAGE" to="/packages" component={Link} />}
            </Tabs>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Avatar sx={{ bgcolor: deepOrange[500] }} onClick={handleOpenUserMenu}>
              {userType}
            </Avatar>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {formDatas?.RoleId === 1 && balProfile < 1 && (
            <LocalMallIcon
              className={DashboardHeaderStyles['upgrade-color2']}
              onClick={handleOpenUser}
            />
          )}

          {formDatas?.RoleId === 1 && balProfile < 1 ? (
            <Tab
              className={DashboardHeaderStyles['upgrade-color']}
              label="PURCHASE PACKAGE"
              to="/packages"
              component={Link}
            />
          ) : (
            ''
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default DashboardHeader;
