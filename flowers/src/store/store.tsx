import { configureStore } from "@reduxjs/toolkit";
import popupReducer from "./popup-slice";
import userReducer from "./user-slice";

export const store = configureStore({
  reducer: {
    popup: popupReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
