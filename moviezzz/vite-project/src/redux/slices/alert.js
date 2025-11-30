import { createSlice } from "@reduxjs/toolkit";

import { statusOptions } from "../../globals.js";

const alertSlice = createSlice({
  name: "alert",
  initialState: { message: null, type: null, status: statusOptions.idle },
  reducers: {
    showAlert: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },

    clearAlert: (state) => {
      state.message = null;
      state.type = null;
    }
  }
});

export const { showAlert, clearAlert } = alertSlice.actions;
export default alertSlice.reducer;
