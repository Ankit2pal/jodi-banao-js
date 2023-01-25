import React, { useState, useEffect, forwardRef } from 'react';
import { Button, Container, Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { executiveRequest } from '../../redux/modules/executiveSlice';
import { Table } from '../../commons/Table';
import { executiveConstant } from '../../constants/executiveConstant';
import ExecutiveStyles from './Executive.module.scss';
// import { useNavigate } from 'react-router-dom';
import { getUID } from '../../redux/selectors/loginSelector';
import { get } from 'lodash';
import Loader from '../../commons/Loader/Loader';
import moment from 'moment';
import { getExecutive } from '../../redux/selectors/executiveSelector';
// import AddVendorUser from '../../commons/AddVendorUser/AddVendorUser';
import { userActiveRequest, userDeActiveRequest } from '../../redux/modules/userSlice';
const Executive = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  //let objectData = {};
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

  const executive = useSelector(getExecutive);
  const userRoleId = useSelector(getUID);
  // const navigate = useNavigate();
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
  let onSubmitBtn = useSelector((state) => state.users?.data?.Status);
  const handleClose = () => {
    setOpen(false);
  };
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    onSubmitBtn ? setOpen(true) : '';
  };

  const handleActiveUser = (loggedInUserId, userId) => {
    const payload = { loggedInUserId: loggedInUserId, userId: userId, userType: 'e' };
    dispatch(userActiveRequest(payload));
  };

  const handleDeactiveUser = (loggedInUserId, userId) => {
    const payload = { loggedInUserId: loggedInUserId, userId: userId, userType: 'e' };
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
          const IsActive = get(executive[index.rowIndex], 'IsActive', '');
          return (
            <Button
              color="error"
              onClick={() => {
                const loggedInUserId = userRoleId;
                const userId = get(executive[index.rowIndex], 'GUID', '');
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
    }
    // {
    //   name: 'Edit',
    //   options: {
    //     filter: true,
    //     sort: false,
    //     empty: true,
    //     customBodyRender: (dataIndex, index) => {
    //       return (
    //         <Button
    //           onClick={() => {
    //             const userId = get(executive[index.rowIndex], 'GUID', '');
    //             navigate(`/edit/${userId}`, { replace: true });
    //           }}>
    //           Edit
    //         </Button>
    //       );
    //     }
    //   }
    // }
  ];
  const payload = { userId: useSelector(getUID) };
  useEffect(() => {
    dispatch(executiveRequest(payload));
  }, []);

  useEffect(() => {
    if (executive) {
      setData(executive);
    }
  }, [executive]);

  return (
    <>
      {objectData?.length === 0 ? (
        <Container className={ExecutiveStyles['container']}>
          <Loader />
        </Container>
      ) : (
        <Container className={ExecutiveStyles['container']}>
          {/* <AddVendorUser name={'Add Executive'} link="/add-profile" /> */}
          <Table
            title={executiveConstant.title}
            data={dataForTable}
            options={options}
            columns={columns}
          />
        </Container>
      )}
      {open ? (
        <Snackbar open={onSubmitBtn} autoHideDuration={1000} onClose={handleClose}>
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

export default Executive;
const AlertBox = forwardRef(function SbAlert(props, ref) {
  return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});
