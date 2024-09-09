import { createSlice } from '@reduxjs/toolkit';

export const inputSlice = createSlice({
  name: 'input',
  initialState: {
    loginValue: '',
    passwordValue: '',
  },
  reducers: {
    setLoginValue: (state, action) => {
      state.loginValue = action.payload;
    },
    setPasswordValue: (state, action) => {
      state.passwordValue = action.payload;
    },
  },
});

export const { setLoginValue, setPasswordValue } = inputSlice.actions;

export default inputSlice.reducer;