import { createSlice } from '@reduxjs/toolkit';

import axios from 'utils/axios';

export const commonSlice = createSlice({
  name: 'user',
  initialState: {
    userList: {
      data: [],
      total: 0,
      skip: 0,
      limit: 10
    },
    userStates: {
      isFetchingUsers: false
    }
  },
  reducers: {
    setUserList: (state, action) => {
      state.userList = {
        ...state.userList,
        ...action.payload
      };
    },
    setUserStates: (state, action) => {
      state.userStates = {
        ...state.userStates,
        ...action.payload
      };
    }
  }
});

export const { setUserList, setUserStates } = commonSlice.actions;

export default commonSlice.reducer;

export const fetchUsers =
  (queryString = '') =>
  (dispatch) => {
    dispatch(setUserStates({ isFetchingUsers: true }));
    return new Promise((resolve, reject) => {
      axios
        .get(`/user?${queryString}`)
        .then(({ data: result }) => {
          dispatch(setUserList(result.data));
          resolve(result.data);
        })
        .catch((error) => {
          reject(error);
        })
        .finally(() => {
          dispatch(setUserStates({ isFetchingUsers: false }));
        });
    });
  };
