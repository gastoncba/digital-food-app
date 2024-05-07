import { createSlice } from '@reduxjs/toolkit';
import { Menu } from '../../models';

export const MenuEmptyState: Menu = {
  id: 0,
  name: '',
  photo: null,
  isAdmin: false,
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState: MenuEmptyState,
  reducers: {
    createMenu: (state, action) => action.payload,
    modifyMenu: (state, action) => ({ ...state, ...action.payload }),
    resetMenu: () => MenuEmptyState,
  },
});

export const { createMenu, resetMenu, modifyMenu } = menuSlice.actions;

export default menuSlice.reducer;
