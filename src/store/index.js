// store.js (using Redux Toolkit)

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Aut/authSlice';  // Import your authReducer
import modeReducer from './mode';  // Import other reducers if needed

const store = configureStore({
  reducer: {
    auth: authReducer,  // auth reducer for authentication state
    mode: modeReducer,  // mode reducer for managing app theme or mode (dark/light, etc.)
  },
});

export default store;
