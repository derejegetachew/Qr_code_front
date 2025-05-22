import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Aut/authSlice"; // Path to your authSlice file

const store = configureStore({
  reducer: {
    auth: authReducer, // This is where the auth state is managed
  },
});

export default store;
