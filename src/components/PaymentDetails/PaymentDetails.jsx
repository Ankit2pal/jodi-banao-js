import React, { forwardRef, useState } from 'react';
import { isRequired } from '../../validators';
import PropTypes from 'prop-types';
import { OnChange } from 'react-final-form-listeners';
import { useSelector } from 'react-redux';
import { Button, Box, Container, Grid, TextareaAutosize, Alert, Snackbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckCircle from '@mui/icons-material/CheckCircle';
import CustomAccordian from '../../commons/accordion';
import HelpStyles from './PaymentDetails.module.scss';
import { REGISTER_LABELS } from '../../constants/registerConstants';
import { addConstants } from '../../constants/addConstants';
import { Field, Form } from 'react-final-form';
import { InputAutoCompleteField } from '../../commons';
import SessionStorageHandler from '../../utils/SessionStorageHandler';
import useRazorpay from 'react-razorpay';
import { useNavigate } from 'react-router-dom';
import { fetchGeneratePaymentApi } from '../../redux/modules/generatePaymentApiSlice';
import { useDispatch } from 'react-redux';

const PaymentDetails = ({ creatingPackagesData, profiles, api }) => {
  const [textArea, setTextArea] = useState('');
  const Razorpay = useRazorpay();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formDatas = useSelector((state) => state.userRegisterationDetails.data);
  const [planOptions, setplanOptions] = useState([]);
  const [selPlan, setSelPlan] = useState(null);
  const [selUser, setSelUser] = useState(null);
  const [sbopen, setSbOpen] = useState(false);
  const setPlanOnChange = (selected) => {
    const selectedPlan = creatingPackagesData.filter(
      (pck) => pck?.PackageType1 == selected?.PackageType1
    );
    let resultOption = [];
    selectedPlan[0]?.Package.map((sel) => {
      resultOption.push({
        ID: sel.Id,
        name: sel.PackageName,
        label: sel.PackageName,
        key: sel.Id,
        Cost: sel.Cost,
        NoOfProfileView: sel.NoOfProfileView,
        ValidityInMonths: sel.ValidityInMonths
      });
    });

    setplanOptions(resultOption);
  };

  const getPaymentDetails = (values) => {
    console.log(values);
    return (
      <>
        <Grid container spacing={4}>
          <Grid item xs={4} className={HelpStyles['input']}>
            <Field
              label={REGISTER_LABELS.userName}
              name="userName"
              options={profiles}
              component={InputAutoCompleteField}
              type="select"
              className={HelpStyles['input']}
              validate={isRequired}
            />
            <OnChange name="userName">{(a) => setSelUser(a)}</OnChange>
            <Field
              label={REGISTER_LABELS.packageName}
              name="packageName"
              options={creatingPackagesData}
              component={InputAutoCompleteField}
              type="select"
              className={HelpStyles['input']}
              validate={isRequired}
              InputValue={values?.packageName}
            />
            <OnChange name="packageName">
              {(a) => {
                (values.plan = null), setPlanOnChange(a), setSelPlan(null);
              }}
            </OnChange>
            <Field
              label={REGISTER_LABELS.plan}
              name="plan"
              options={planOptions}
              component={InputAutoCompleteField}
              type="select"
              className={HelpStyles['input']}
              validate={isRequired}
              InputValue={values?.plan}
            />
            <OnChange name="plan">{(a) => setSelPlan(a)}</OnChange>
          </Grid>
          {selPlan && (
            <Grid item xs={8} className={HelpStyles['input_field']}>
              {selPlan?.name}
              <Card className={HelpStyles['card']}>
                <CardContent className={HelpStyles['card_content']}>
                  <Grid className={HelpStyles['grid_intial']}>
                    <Typography variant="h5" component="div">
                      {'Basic'}
                    </Typography>
                    <Typography
                      variant="h4"
                      component="div"
                      marginTop={'15px'}
                      fontFamily={'Poppins'}
                      fontWeight={'bold'}>
                      {`₹ ${selPlan?.Cost}`}
                    </Typography>
                  </Grid>
                  <Grid className={HelpStyles['input_field']}>
                    <List className={HelpStyles['list']}>
                      <ListItem disablePadding>
                        <ListItemIcon className={HelpStyles['profile']}>
                          <CheckCircle fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={`Can View ${selPlan?.NoOfProfileView} Profile`} />
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemIcon className={HelpStyles['profile']}>
                          <CheckCircle fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={`Validity of ${selPlan?.ValidityInMonths} month`} />
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemIcon className={HelpStyles['profile']}>
                          <CheckCircle fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={'Free package for new users'} />
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemIcon className={HelpStyles['profile']}>
                          <CheckCircle fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={`${selPlan?.NoOfProfileView} Profiles`} />
                      </ListItem>
                    </List>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          )}
          <Grid item xs={12} sm={12} className={HelpStyles['input_field']}>
            <Box className={HelpStyles['text-area']}>
              {REGISTER_LABELS.remark}
              <TextareaAutosize
                className={HelpStyles['textfieldentermessage']}
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                fullWidth
                value={textArea}
                onChange={(e) => setTextArea(e.target.value)}
                placeholder="This is a placeholder."
                minRows={20}
                cols={118}
              />
            </Box>
          </Grid>
        </Grid>
      </>
    );
  };

  const handlePayment = React.useCallback(() => {
    const options = {
      key: 'rzp_test_2VfblauoUl6E9W',
      amount: 300,
      currency: 'INR',
      name: 'Jodi Banav',
      description: 'Test Transaction',
      image: 'http://localhost:3000/static/media/logo.6924cfb73735faf8d295.svg',
      order_id: '',
      handler: (res) => {
        const payload = {
          packageId: SessionStorageHandler.getKeyFromStorage('activePack'),
          UserId: SessionStorageHandler.getKeyFromStorage('selUserPackage'),
          PurchasedBy: formDatas.GUID,
          PaymentId: res?.razorpay_payment_id
        };
        dispatch(fetchGeneratePaymentApi(payload));

        setTimeout(() => {
          setSbOpen(true);
          formDatas?.RoleId !== 5 && formDatas?.RoleId !== 2 && navigate('/dashboard');
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
    rzpay.on('payment.failed', function (response) {
      console.log('response', response);
    });
  }, [Razorpay]);

  const onSubmitData = () => {
    SessionStorageHandler.setKeyInStorage('activePack', selPlan?.ID);
    SessionStorageHandler.setKeyInStorage('selUserPackage', selUser?.GUID);
    handlePayment();
  };

  const [expandAccordion, setExpandAccordion] = useState(1);
  const handleAccordionChange = (id) => {
    expandAccordion === id ? setExpandAccordion(1) : setExpandAccordion(id);
  };

  const handleClose = () => {
    setSbOpen(false);
  };
  return (
    <>
      <Form
        onSubmit={onSubmitData}
        render={({ handleSubmit, values }) => (
          <>
            <Grid as="form" onSubmit={handleSubmit}>
              <Container className={HelpStyles['container']} onSubmit={handleSubmit}>
                <CustomAccordian
                  className={HelpStyles['element_container']}
                  handleAccordionChange={handleAccordionChange}
                  expandAccordion={expandAccordion}
                  title={addConstants.paymentDetails}
                  description={<>{getPaymentDetails(values)}</>}
                  id={1}
                  key={1}
                />
                <div className={HelpStyles['btn_container']}>
                  <Button
                    size="large"
                    type="submit"
                    variant="contained"
                    className={HelpStyles['submit_btn']}>
                    {addConstants.submit}
                  </Button>
                </div>
              </Container>
            </Grid>
          </>
        )}></Form>
      <Snackbar open={sbopen} onClose={handleClose} autoHideDuration={2000}>
        <PackageRes onClose={handleClose} severity={'success'} sx={{ width: '100%' }}>
          {'Package successfully purchased'}
        </PackageRes>
      </Snackbar>
      <Snackbar open={profiles.length === 0 && api} onClose={handleClose} autoHideDuration={2000}>
        <PackageRes onClose={handleClose} severity={'error'} sx={{ width: '100%' }}>
          {'No User Assigned'}
        </PackageRes>
      </Snackbar>
    </>
  );
};
const PackageRes = forwardRef(function SbAlert(props, ref) {
  return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});
PaymentDetails.propTypes = {
  creatingPackagesData: PropTypes.func,
  creatingPlanData: PropTypes.func,
  profiles: PropTypes.any,
  api: PropTypes.any
};
export default PaymentDetails;
