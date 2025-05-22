import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    // Set isAuthenticated based on the presence of a token in localStorage
    isAuthenticated: localStorage.getItem("authToken") ? true : false,
  },
  reducers: {
    // Action to set the isAuthenticated state
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
      if (action.payload) {
        // Store token in localStorage if authenticated
        // localStorage.setItem("token"," action.payload.token");
      }
    },

    // Action to log out the user
    logout: (state) => {
      state.isAuthenticated = false;
      // Remove token from localStorage
      localStorage.removeItem("authToken");
    },
  },
});

// Export the actions for use in components
export const { setAuthenticated, logout } = authSlice.actions;

// Export the reducer to be used in the store
export default authSlice.reducer;
