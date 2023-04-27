import {IUserData} from '@common/interfaces';
import {createSlice} from '@reduxjs/toolkit';

interface IAuthGenerics<T> {
  userData: T[];
}

const initialState: IAuthGenerics<IUserData> = {
  userData: [],
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData(state, actions) {
      state.userData = actions.payload;
    },
  },
});

const userReducer = user.reducer;

export const userActions = user.actions;

export default userReducer;
