import * as React from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PackagesStyle from './packages.module.scss';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import { useSelector, useDispatch } from 'react-redux';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import packagesConstant from '../../constants/packagesContants';
import { generatePayment } from '../../redux/selectors/generatePaymentSelectors';
import { fetchGeneratePaymentApi } from '../../redux/modules/generatePaymentApiSlice';
import useRazorpay from 'react-razorpay';
import Loader from '../../commons/Loader/Loader';
import SessionStorageHandler from '../../utils/SessionStorageHandler';
import { Alert, Snackbar } from '@mui/material';
import { forwardRef } from 'react';
import { useState } from 'react';
import Carousel from 'react-elastic-carousel';
import { useNavigate } from 'react-router-dom';
import {
  generatePayUPaymentApi,
  generatePayUPaymentProcessApi
} from '../../services/generatePayUPayements';
import axios from 'axios';
import queryString from 'query-string';
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 }
];

export default function VerticalTabs() {
  const [allPackages, setAllPackages] = React.useState([]);
  const formDatas = useSelector((state) => state.userRegisterationDetails.data);
  const [generatePaymentData, setGeneratePaymentData] = React.useState([]);
  const dispatch = useDispatch();
  const generatePayments = useSelector(generatePayment);
  const packagesDetails = useSelector((state) => state.packageDetails.data);
  const Razorpay = useRazorpay();
  const [sBOpen, setSBopen] = useState(false);
  const navigate = useNavigate();
  React.useEffect(() => {
    setAllPackages(packagesDetails);
  }, [packagesDetails]);

  React.useEffect(() => {
    if (generatePayments) {
      setGeneratePaymentData(generatePayments);
    }
  }, [generatePaymentData]);

  const handlePayment = React.useCallback(() => {
    const options = {
      key: 'rzp_test_2VfblauoUl6E9W',
      amount: '3000',
      currency: 'INR',
      name: 'Jodi Banav',
      description: 'Test Transaction',
      image: 'http://localhost:3000/static/media/logo.6924cfb73735faf8d295.svg',
      order_id: '',
      handler: (res) => {
        const payload = {
          packageId: SessionStorageHandler.getKeyFromStorage('activePack'),
          UserId: formDatas.GUID,
          PaymentId: res?.razorpay_payment_id
        };
        dispatch(fetchGeneratePaymentApi(payload));
        setSBopen(true);
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      },
      notes: {
        address: 'Razorpay Corporate Office'
      },
      theme: {
        color: '#3399cc'
      }
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
    rzpay.on('payment.failed', function () {});
  }, [Razorpay]);

  const getPayment = async () => {
    try {
      const data = {
        packageId: SessionStorageHandler.getKeyFromStorage('activePack'),
        UserId: formDatas.GUID
      };
      axios
        .post(
          'https://test.payu.in/_payment',
          queryString.stringify({
            key: 'oZ7oo9',
            txnid: '12345665000',
            amount: '1',
            productinfo: 'VaibhavSarode',
            firstname: 'vaibhav',
            email: 'test@test.com',
            phone: '9876543210',
            salt: 'UkojH5TS',
            hash: '6C857FD954FEAB2E64BC143A5B5E56B275A7D4B204D2BD8A46750C844571B1BAD964DF63C35C6FD55846CC86FA9E2FEDCD4893DD0082A7FCDF50D783131AB579',
            surl: 'http://localhost/payu/PHP_Kit/Seamless_S2S/PayU_Payment_Response.php',
            curl: 'http://localhost/payu/PHP_Kit/Seamless_S2S/PayU_Payment_Response.php',
            furl: 'http://localhost/payu/PHP_Kit/Seamless_S2S/PayU_Payment_Response.php'
          }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        )
        .then(function (response) {
          console.log(response);
        });
      const response = await generatePayUPaymentApi(data);
      const payment = await generatePayUPaymentProcessApi(data);
      console.log(response, payment);
      handlePayment();
    } catch (error) {
      return error;
    }
  };

  const onSubmitData = (id) => {
    SessionStorageHandler.setKeyInStorage('activePack', id);
    getPayment();
  };

  return (
    <>
      {allPackages?.length === 0 ? (
        <Box>
          <Loader />
        </Box>
      ) : (
        <>
          <Box className={PackagesStyle.carousel_wrapper}>
            {/* <Grid container spacing={3}> */}

            <Carousel breakPoints={breakPoints} className={PackagesStyle.carousel_breakPoints}>
              {allPackages &&
                // allPackages[value]?.Package.map((pk, i) => (
                allPackages.map((pk) => (
                  <Grid key={`pk_${pk?.id}_${pk?.PackageType1}`} item>
                    <Card className={PackagesStyle.card}>
                      <CardContent>
                        <Typography
                          variant="h5"
                          component="div"
                          color={'#f04045'}
                          marginTop={'0px'}
                          fontWeight={'bold'}
                          textAlign={'center'}>
                          {pk?.PackageType1}
                        </Typography>
                        <Typography
                          variant="h5"
                          component="div"
                          color={'#FCB714'}
                          textAlign={'center'}
                          marginTop={'10px'}>
                          {pk.Package[0]?.PackageName}
                        </Typography>
                        <Typography
                          variant="h4"
                          component="div"
                          marginTop={'15px'}
                          fontFamily={'Poppins'}
                          fontWeight={'bold'}>
                          &#8377;{pk.Package[0]?.Cost}
                        </Typography>
                        <List className={PackagesStyle.list} aria-label="contacts">
                          <ListItem disablePadding>
                            <ListItemIcon className={PackagesStyle.profile}>
                              <CheckCircle fontSize="small" />
                            </ListItemIcon>
                            <ListItemText
                              primary={packagesConstant.descptionLine1(
                                pk.Package[0]?.NoOfProfileView
                              )}
                            />
                          </ListItem>
                          <ListItem disablePadding>
                            <ListItemIcon className={PackagesStyle.profile}>
                              <CheckCircle fontSize="small" />
                            </ListItemIcon>
                            <ListItemText
                              primary={packagesConstant.descptionLine2(
                                pk.Package[0]?.ValidityInMonths
                              )}
                            />
                          </ListItem>
                          <ListItem disablePadding>
                            <ListItemIcon className={PackagesStyle.profile}>
                              <CheckCircle fontSize="small" />
                            </ListItemIcon>
                            <ListItemText
                              primary={packagesConstant.descptionLine3(
                                pk.Package[0]?.NoOfProfileView
                              )}
                            />
                          </ListItem>
                          <ListItem disablePadding>
                            <ListItemIcon className={PackagesStyle.profile}>
                              <CheckCircle fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary={packagesConstant.descptionLine4} />
                          </ListItem>
                        </List>
                      </CardContent>
                      <Stack spacing={2} direction="row" marginLeft={'20px'}>
                        <Button
                          className={PackagesStyle.button}
                          variant="contained"
                          onClick={() => {
                            onSubmitData(pk.Package[0]?.Id), handlePayment();
                          }}>
                          {packagesConstant.subscribe}
                        </Button>
                      </Stack>
                    </Card>
                  </Grid>
                ))}
            </Carousel>
            {/* </Grid> */}
          </Box>
          <Snackbar open={sBOpen} autoHideDuration={2000}>
            <PackageRes severity={'success'} sx={{ width: '100%' }}>
              {'Package successfully updated'}
            </PackageRes>
          </Snackbar>
        </>
      )}
    </>
  );
}
const PackageRes = forwardRef(function SbAlert(props, ref) {
  return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});
