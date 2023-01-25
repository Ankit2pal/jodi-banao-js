import { createSlice } from '@reduxjs/toolkit';

export const formStateSlice = createSlice({
  name: 'finalForm',
  initialState: {},
  reducers: {
    updateFormState: (state, { payload }) => {
      const { form, formState } = payload;
      return { ...state, [form]: formState };
    }
  }
});

export const { updateFormState } = formStateSlice.actions;
export default formStateSlice.reducer;
