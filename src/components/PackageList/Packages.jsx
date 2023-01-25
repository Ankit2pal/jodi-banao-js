/* eslint-disable no-debugger */
import React, { forwardRef, useState, useEffect } from 'react';
import {
  Button,
  Container,
  TextField,
  Box,
  Typography,
  Modal,
  DialogActions,
  Link,
  MenuItem,
  Select,
  InputLabel,
  Snackbar,
  Alert
} from '@mui/material';
import PackageStyles from './packages.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  packageRequest,
  createpackageRequest,
  deletepackageRequest,
  updatepackageRequest
} from '../../redux/modules/packageSlice';
import {
  getPackages,
  createPackages,
  deletePackages,
  updatePackages
} from '../../redux/selectors/packageSelector';
import Loader from '../../commons/Loader/Loader';
import { packageListConstants } from '../../constants/packageListConstants';
import { Table } from '../../commons/Table';
import { getUID } from '../../redux/selectors/loginSelector';

const Packages = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const packages = useSelector(getPackages);
  const users = useSelector(createPackages);
  const user = useSelector(deletePackages);
  const Updateuser = useSelector(updatePackages);

  const [open1, setOpen1] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = useState([]);

  // const PackageNameEdit = useSelector((state) => state.packageDetails.data);

  const [state, setState] = useState({
    userId: useSelector(getUID),
    PackageName: '',
    //PackageTypeId: '',
    Cost: '',
    ValidityInMonths: ''
  });
  const { PackageName, Cost, ValidityInMonths, userId } = state;
  const [error, setError] = useState('');
  const [PackageTypeId, setPackageTypeId] = React.useState('');
  const [snackBarOpen, setSnackBarOpen] = React.useState(false);
  console.log('loading', loading);

  const onSuccessAdd = useSelector((state) => state?.packages?.data.Message);

  const handleChange = (event) => {
    setPackageTypeId(event.target.value);
  };

  const handleSnackbarClose = () => {
    setSnackBarOpen(false);
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  // const handleSubmitEdit = (e) => {
  //   e.preventDefault();
  //   setSnackBarOpen(true);
  //   setLoading(false);
  //   if (!PackageName || !PackageTypeId || !Cost || !ValidityInMonths) {
  //     setError('please Fill all the filed');
  //   } else {
  //     const payload = {
  //       UserId: userId,
  //       PackageName: PackageName,
  //       PackageTypeId: PackageTypeId,
  //       Cost: Cost,
  //       ValidityInMonths: ValidityInMonths
  //     };
  //     if (PackageName && PackageTypeId && ValidityInMonths) dispatch(createpackageRequest(payload));
  //     setError('');
  //   }
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSnackBarOpen(true);
    setLoading(false);
    if (!PackageName || !PackageTypeId || !Cost || !ValidityInMonths) {
      setError('please Fill all the filed');
    } else {
      const payload = {
        UserId: userId,
        PackageName: PackageName,
        PackageTypeId: PackageTypeId,
        Cost: Cost,
        ValidityInMonths: ValidityInMonths
      };
      if (PackageName && PackageTypeId && ValidityInMonths) dispatch(createpackageRequest(payload));
      setError('');
    }
  };
  const handleDelete = (index1, index) => {
    const payload = {
      UserId: userId,
      Id: dataFortable[index.rowIndex]?.Id,
      isActive: dataFortable[index.rowIndex]?.IsActive
    };
    dispatch(deletepackageRequest(payload));
  };

  const handleEdit = (index1, index) => {
    debugger;
    setOpen1(true);
    !open1 &&
      setState({
        Id: data?.[0]?.Package[index.rowIndex].Id,
        PackageTypeId: data?.[0]?.Package[index.rowIndex].PackageTypeId,
        PackageName: data?.[0]?.Package[index.rowIndex].PackageName,
        Cost: data?.[0]?.Package[index.rowIndex].Cost,
        ValidityInMonths: data?.[0]?.Package[index.rowIndex].ValidityInMonths,
        UserId: userId
      });
    open1 && dispatch(updatepackageRequest(state));
    open1 && setOpen1(false);
  };

  const options = {
    filter: true,
    filterType: 'dropdown',
    responsive: 'standard',
    page: 2,
    onColumnSortChange: (changedColumn, direction) =>
      console.log('changedColumn: ', changedColumn, 'direction: ', direction),
    onChangeRowsPerPage: (numberOfRows) => console.log('numberOfRows: ', numberOfRows)
  };

  const columns = [
    {
      label: 'Package Type Id',
      name: 'PackageTypeId',
      options: {
        filter: true
      }
    },
    {
      label: 'Package Name',
      name: 'PackageName',
      options: {
        filter: true
      }
    },
    {
      name: 'Cost',
      options: {
        filter: false
      }
    },
    {
      label: 'Validity In Months ',
      name: 'ValidityInMonths',
      options: {
        filter: true
      }
    },

    {
      name: 'Action',
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (dataIndex, index) => {
          return (
            <Button
              color="error"
              onClick={() => {
                handleDelete(dataIndex, index);
              }}>
              {dataFortable[index.rowIndex]?.IsActive ? 'Activate' : 'Deactivate'}
            </Button>
          );
        }
      }
    },
    {
      name: 'Action',
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: () => {
          return (
            <Button type="submit" onClick={handleOpen} onSubmit={handleEdit}>
              Edit
            </Button>
          );
        }
      }
    }
  ];
  const payload = { userId: useSelector(getUID) };
  useEffect(() => {
    dispatch(packageRequest(payload));
  }, []);

  useEffect(() => {
    if (user) {
      setData(user);
    }
    if (users) {
      setData(users);
    }
    if (Updateuser) {
      setData(Updateuser);
    }
    if (packages) {
      setData(packages);
    }
  }, [user, users, Updateuser, packages]);

  let dataForSilver = { ...data?.[0]?.Package };
  let dataForGold = { ...data?.[1]?.Package };
  let dataForDiamond = { ...data?.[2]?.Package };

  let dataFortable = [];
  Object.entries(dataForSilver).forEach((key) => {
    let keyCopy = { ...key[1] };
    if (keyCopy.PackageTypeId === 1) {
      keyCopy.PackageTypeId = 'Silver';
    }
    dataFortable.push(keyCopy);
  });
  Object.entries(dataForGold).forEach((key) => {
    let keyCopy = { ...key[1] };
    if (keyCopy.PackageTypeId === 2) {
      keyCopy.PackageTypeId = 'Gold';
    }
    dataFortable.push(keyCopy);
  });
  Object.entries(dataForDiamond).forEach((key) => {
    let keyCopy = { ...key[1] };
    if (keyCopy.PackageTypeId === 3) {
      keyCopy.PackageTypeId = 'Diamond';
    }
    dataFortable.push(keyCopy);
  });
  return (
    <>
      <Container className={PackageStyles['container']}>
        {dataFortable.length === 0 ? (
          <Loader />
        ) : (
          <>
            <Box className={PackageStyles['add_button_container']}>
              <Button
                type="submit"
                onClick={handleOpen}
                onSubmit={handleSubmit}
                className={PackageStyles['add_button']}>
                Add
              </Button>
            </Box>
            <Table
              title={packageListConstants.title}
              data={dataFortable}
              options={options}
              columns={columns}
            />{' '}
          </>
        )}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box className={PackageStyles['model-box']}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ padding: { xs: '15px 42px 15px 50px', sm: '15px 50px 15px 58px' } }}
              className={PackageStyles['add_title']}>
              Add Package
            </Typography>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              className={PackageStyles['form_container']}>
              {error && <h3 className={PackageStyles['error']}>{error}</h3>}
              {/* <TextField
                  id="PackageTypeId"
                  type="number"
                  name="PackageTypeId"
                  label="PackageTypeId"
                  variant="standard"
                  value={PackageTypeId}
                  onChange={handleInputChange}
                /> */}
              <InputLabel id="demo-customized-select-label">PackageTypeId</InputLabel>
              <Select
                style={{ minWidth: '100%' }}
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={PackageTypeId}
                onChange={handleChange}>
                <MenuItem value={1}>Silver</MenuItem>
                <MenuItem value={2}>Gold</MenuItem>
                <MenuItem value={3}>Diamond</MenuItem>
              </Select>
              <TextField
                id="PackageName"
                type="text"
                name="PackageName"
                label="PackageName"
                variant="standard"
                value={PackageName}
                onChange={handleInputChange}
              />
              <TextField
                id="Cost"
                type="number"
                name="Cost"
                label="Cost"
                variant="standard"
                value={Cost}
                onChange={handleInputChange}
              />
              <TextField
                id="ValidityInMonths"
                type="number"
                name="ValidityInMonths"
                label="ValidityInMonths"
                variant="standard"
                value={ValidityInMonths || ''}
                onChange={handleInputChange}
              />
              <DialogActions className={PackageStyles['save_button_container']}>
                <Button onClick={handleSubmit} className={PackageStyles['save_button']}>
                  Save
                </Button>
              </DialogActions>
            </Box>
          </Box>
        </Modal>

        {/* Edit */}
        <Button onClick={handleOpen1}></Button>
        <Modal
          open={open1}
          onClose={handleClose1}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box className={PackageStyles['model-box']}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              update data
            </Typography>

            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '25ch' }
              }}
              noValidate
              autoComplete="off">
              <form>
                {error && <h3 className={PackageStyles['error']}>{error}</h3>}

                {/* <TextField
                  id="PackageTypeId"
                  type="number"
                  name="PackageTypeId"
                  label="PackageTypeId"
                  variant="standard"
                  value={PackageTypeId || ''}
                  onChange={handleInputChange}
                /> */}
                <InputLabel id="demo-customized-select-label">PackageTypeId</InputLabel>
                <Select
                  style={{ minWidth: 120 }}
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  value={PackageTypeId}
                  onChange={handleChange}>
                  <MenuItem value={1}>Silver</MenuItem>
                  <MenuItem value={2}>Gold</MenuItem>
                  <MenuItem value={3}>Diamond</MenuItem>
                </Select>
                <TextField
                  id="PackageName"
                  type="text"
                  name="PackageName"
                  label="PackageName"
                  variant="standard"
                  value={PackageName || ''}
                  onChange={handleInputChange}
                />
                <TextField
                  id="Cost"
                  type="number"
                  name="Cost"
                  label="Cost"
                  variant="standard"
                  value={Cost || ''}
                  onChange={handleInputChange}
                />
                <TextField
                  id="ValidityInMonths"
                  type="number"
                  name="ValidityInMonths"
                  label="ValidityInMonths"
                  variant="standard"
                  value={ValidityInMonths || ''}
                  onChange={handleInputChange}
                />
              </form>
              <DialogActions>
                <Link to="/ handleEdit">
                  <Button onClick={handleEdit}>Edit</Button>
                </Link>
              </DialogActions>
            </Box>
          </Box>
        </Modal>
      </Container>
      <Snackbar open={snackBarOpen} autoHideDuration={1000} onClose={handleSnackbarClose}>
        <AlertBox
          autoHideDuration={1000}
          severity={onSuccessAdd == 'Save successfully!' ? 'success' : 'error'}
          onClose={handleSnackbarClose}
          sx={{ width: '100%' }}>
          {onSuccessAdd == 'Save successfully!' ? 'Added Successfully' : 'Not added'}
        </AlertBox>
      </Snackbar>
    </>
  );
};

export default Packages;

const AlertBox = forwardRef(function SbAlert(props, ref) {
  return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});
