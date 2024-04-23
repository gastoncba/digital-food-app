import { configureStore } from '@reduxjs/toolkit';

import { Menu } from '../models';
import { menuSlice } from './states';

export interface AppStore {
  menu: Menu;
}
const store = configureStore<AppStore>({
  reducer: {
    menu: menuSlice.reducer,
  },
});

export default store;
