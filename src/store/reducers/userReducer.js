import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
  
// };

export const userSlice = createSlice({
  name: "userDetail",
  initialState: {},
  reducers: {
    LOGGED_IN_USER: (state, action) => {
      
      return action.payload
    },
    LOGOUT : (state,action) => {
      return action.payload
    }
  },
});

export const { LOGGED_IN_USER, LOGOUT } = userSlice.actions;
export default userSlice.reducer;
