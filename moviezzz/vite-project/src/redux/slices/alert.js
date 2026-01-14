import { createSlice } from "@reduxjs/toolkit";

import { STATUS_OPTIONS } from "../../globals.js";

const alertSlice = createSlice({
  name: "alert",
  initialState: { message: null, type: null, status: STATUS_OPTIONS.IDLE },
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

export const selectAlert = (state) => state.alert;

export const { showAlert, clearAlert } = alertSlice.actions;
export default alertSlice.reducer;
