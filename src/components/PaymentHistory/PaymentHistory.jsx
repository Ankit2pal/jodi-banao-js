import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import UserStyles from './PaymentHistory.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersHistory } from '../../redux/selectors/userPaymentHistorySeleector';
import { Table } from '../../commons/Table';
import { getUID } from '../../redux/selectors/loginSelector';
import Loader from '../../commons/Loader/Loader';
import { paymentHistoryConstant } from '../../constants/paymentHistoryConstant';
import { userPaymentHistoryRequest } from '../../redux/modules/userPaymentHistorySlice';

const PaymentHistory = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const users = useSelector(getUsersHistory);
  const userRoleId = useSelector(getUID);

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
  let userPaymentHis = useSelector((state) => state.usersPaymentHistory.isLoading);
  if (onSubmitBtn) {
    onSubmitBtn = 'success';
  }
  const columns = [
    {
      label: 'Txn ID',
      name: 'Order_Id',
      options: {
        filter: true
      }
    },
    {
      label: 'Txn Type',
      name: 'Wallet',
      options: {
        filter: true
      }
    },
    {
      label: 'Txn Status',
      name: 'Status',
      options: {
        filter: false
      }
    },
    {
      label: 'Amount (in Rs)',
      name: 'Amount',
      options: {
        filter: true
      }
    },
    {
      label: 'Txn Mode',
      name: 'Bank',
      options: {
        filter: true
      }
    },
    {
      label: 'Remarks',
      name: 'Method',
      options: {
        filter: true
      }
    }
  ];

  useEffect(() => {
    const payload = { userId: userRoleId };
    dispatch(userPaymentHistoryRequest(payload));
  }, []);

  useEffect(() => {
    if (users) {
      const preData = users;
      setData(preData?.myPayments?.concat(preData?.myExecutivePayments));
    }
  }, [users]);

  return (
    <>
      {userPaymentHis ? (
        <Container className={UserStyles['container']}>
          <Loader />
        </Container>
      ) : (
        <Container className={UserStyles['container']}>
          <Table
            title={paymentHistoryConstant.titleHead}
            data={data}
            options={options}
            columns={columns}
          />
        </Container>
      )}
    </>
  );
};

export default PaymentHistory;
