import React, { useState, useEffect, forwardRef } from 'react';
import { Alert, Button, Container, Snackbar } from '@mui/material';
import UserStyles from './users.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  userRequest,
  //userDeActiveRequest,
  userActiveRequest,
  userDeActiveRequest
} from '../../redux/modules/userSlice';
import { getUsers } from '../../redux/selectors/userSelector';
import { userConstants } from '../../constants/userConstants';
import { Table } from '../../commons/Table';
import { get } from 'lodash';
import { useNavigate } from 'react-router-dom';
import AddVendorUser from '../../commons/AddVendorUser/AddVendorUser';
import { getUID } from '../../redux/selectors/loginSelector';
import Loader from '../../commons/Loader/Loader';
import moment from 'moment';

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const users = useSelector(getUsers);
  const userRoleId = useSelector(getUID);
  // const [action,setAction]=useState([]);

  const objectData = data.map((e) => {
    return JSON.parse(JSON.stringify(e));
  });

  const dataForTable = objectData.map((e) => {
    if (e.DateOfBirth) {
      return { ...e, DateOfBirth: moment(data.DateOfBirth).format('DD/MM/YYYY') };
    }

    return e;
  });

  dataForTable;

  const options = {
    filter: true,
    filterType: 'dropdown',
    responsive: 'standard',
    page: 2,
    onColumnSortChange: (changedColumn, direction) =>
      console.log('changedColumn: ', changedColumn, 'direction: ', direction),
    onChangeRowsPerPage: (numberOfRows) => console.log('numberOfRows: ', numberOfRows),
    onChangePage: (currentPage) => console.log('currentPage: ', currentPage),
    onRowsDelete: () => {},
    selectableRows: 'single'
  };
  let onSubmitBtn = useSelector((state) => state.users.data.Result);
  if (onSubmitBtn) {
    onSubmitBtn = 'success';
  }
  const handleClose = () => {
    setOpen(false);
  };
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    onSubmitBtn ? setOpen(true) : '';
  };

  const handleActiveUser = (loggedInUserId, userId) => {
    const payload = { loggedInUserId: loggedInUserId, userId: userId, userType: 'u' };
    dispatch(userActiveRequest(payload));
  };

  const handleDeactiveUser = (loggedInUserId, userId) => {
    const payload = { loggedInUserId: loggedInUserId, userId: userId, userType: 'u' };
    dispatch(userDeActiveRequest(payload));
  };

  const columns = [
    {
      name: 'RoleId',
      label: 'Role Id',
      options: {
        filter: true
      }
    },
    {
      label: 'Full Name',
      name: 'FullName',
      options: {
        filter: true
      }
    },
    {
      name: 'DateOfBirth',
      label: 'Date Of Birth',
      options: {
        filter: false
      }
    },
    {
      name: 'MobileNumber',
      label: 'Mobile Number',
      options: {
        filter: true
      }
    },
    {
      name: 'EmailId',
      label: 'Email Id',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: 'Action',
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (dataIndex, index) => {
          const IsActive = get(users[index.rowIndex], 'IsActive', '');
          return (
            <Button
              color="error"
              onClick={() => {
                const loggedInUserId = userRoleId;
                const userId = get(users[index.rowIndex], 'GUID', '');
                handleClick();
                IsActive
                  ? handleDeactiveUser(loggedInUserId, userId)
                  : handleActiveUser(loggedInUserId, userId);
              }}>
              {IsActive ? 'Deactivate' : 'Activate'}
            </Button>
          );
        }
      }
    },
    {
      name: 'Edit',
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (dataIndex, index) => {
          return (
            <Button
              onClick={() => {
                const userId = get(users[index.rowIndex], 'GUID', '');
                navigate(`/edit/${userId}`, { replace: true });
              }}>
              Edit
            </Button>
          );
        }
      }
    }
  ];

  useEffect(() => {
    const payload = { userId: userRoleId };
    dispatch(userRequest(payload));
  }, []);

  useEffect(() => {
    if (users) {
      setData(users);
    }
  }, [users]);

  return (
    <>
      {data?.length === 0 ? (
        <Container className={UserStyles['container']}>
          <Loader />
        </Container>
      ) : (
        <Container className={UserStyles['container']}>
          <AddVendorUser name={'Add User'} link="/add-profile" />
          <Table
            title={userConstants.title}
            data={dataForTable}
            options={options}
            columns={columns}
          />
        </Container>
      )}
      {open ? (
        <Snackbar open={onSubmitBtn == 'success'} autoHideDuration={1000} onClose={handleClose}>
          <AlertBox
            autoHideDuration={1000}
            severity={onSubmitBtn == 'success' ? 'success' : 'error'}
            onClose={handleClose}
            sx={{ width: '100%' }}>
            {onSubmitBtn == 'success' ? 'Successfully' : 'failed'}
          </AlertBox>
        </Snackbar>
      ) : (
        ''
      )}
    </>
  );
};

export default Users;
const AlertBox = forwardRef(function SbAlert(props, ref) {
  return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});
