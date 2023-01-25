import { get } from 'lodash';
import { createSelector } from 'reselect';

export const getFinalFormState = createSelector([(state) => state.finalForm], (form = {}) => form);

export const getFormState = createSelector(
  [getFinalFormState, (_, formName) => formName],
  (formState, formName) => {
    return get(formState, formName, {});
  }
);

export const getFormStateValues = createSelector(
  [(state, formName) => getFormState(state, formName)],
  (formState = {}) => {
    return get(formState, 'values', {});
  }
);
