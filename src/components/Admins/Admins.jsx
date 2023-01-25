import React, { useState, useEffect } from 'react';
import { Button, Container } from '@mui/material';
import AdminStyles from './admins.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { adminRequest } from '../../redux/modules/adminSlice';
import { getAdmins } from '../../redux/selectors/adminSelector';
import { adminConstants } from '../../constants/adminConstants';
import { Table } from '../../commons/Table';
import AddVendorUser from '../../commons/AddVendorUser/AddVendorUser';
import { useNavigate } from 'react-router-dom';
import { getUID } from '../../redux/selectors/loginSelector';
import Loader from '../../commons/Loader/Loader';
import moment from 'moment';
import { get } from 'lodash';

const Admins = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const admins = useSelector(getAdmins);
  const payload = { userId: useSelector(getUID) };
  const navigate = useNavigate();

  //let objectData = {};
  const objectData = data?.Result?.map((e) => {
    return JSON.parse(JSON.stringify(e));
  });

  const dataForTable = objectData?.map((e) => {
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
    onChangePage: (currentPage) => console.log('currentPage: ', currentPage)
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
      name: 'Edit',
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (dataIndex, index) => {
          return (
            <Button
              onClick={() => {
                const userId = get(admins?.Result[index.rowIndex], 'GUID', '');
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
    dispatch(adminRequest(payload));
  }, []);

  useEffect(() => {
    if (admins) {
      setData(admins);
    }
  }, [admins]);

  return (
    <>
      {data?.length === 0 ? (
        <Container className={AdminStyles['container']}>
          <Loader />
        </Container>
      ) : (
        <Container className={AdminStyles['container']}>
          <AddVendorUser name={'Add Admin'} link="/add-profile" />
          <Table
            title={adminConstants.title}
            data={dataForTable}
            options={options}
            columns={columns}
          />
        </Container>
      )}
    </>
  );
};

export default Admins;
