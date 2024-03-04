import { createSlice } from "@reduxjs/toolkit";

export interface PopupState {
  isOpen: boolean;
  type: "login" | "createAccount" | "userInfo" | "settings";
}

const initialState: PopupState = {
  isOpen: false,
  type: "login",
};

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    openPopup(state, action) {
      state.isOpen = true;
      state.type = action.payload;
    },
    closePopup(state) {
      state.isOpen = false;
    },
  },
});

export const { openPopup, closePopup } = popupSlice.actions;

export default popupSlice.reducer;
