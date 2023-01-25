import React from 'react';
import { Grid } from '@mui/material';
import { Field } from 'react-final-form';
import HelpStyles from '../../components/Add/add.module.scss';
import InputAutoCompleteField from '../../commons/InputAutoCompleteField/InputAutoCompleteField';
import { useSelector } from 'react-redux';
const AccordionMenu = () => {
  function newData(ID, name, label, key) {
    this.ID = ID;
    this.name = name;
    this.label = label;
    this.key = key;
  }
  const formDatas = useSelector((state) => state.userRegisterationDetails.data);
  const Country = new newData(1, formDatas?.Country, formDatas?.Country, formDatas.Country);

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} className={HelpStyles['input']}>
        <Field
          label="Religion"
          name="Religion"
          className={HelpStyles['input_field']}
          component={InputAutoCompleteField}
          options={Country}
        />
      </Grid>
    </Grid>
  );
};

export default AccordionMenu;
