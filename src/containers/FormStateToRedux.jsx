import React from 'react';
import { FormSpy } from 'react-final-form';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { updateFormState } from '../redux/modules/formStateSlice';

export const FormStateToRedux = ({ form }) => {
  const dispatch = useDispatch();

  const updateForm = (state) => {
    dispatch(updateFormState({ form, formState: state }));
  };

  return <FormSpy onChange={updateForm} />;
};

FormStateToRedux.propTypes = {
  form: PropTypes.string.isRequired
};
