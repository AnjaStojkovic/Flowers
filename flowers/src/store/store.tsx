import {
  Action,
  ThunkAction,
  configureStore,
  combineReducers,
} from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import popupReducer from "./popup-slice";
import userReducer from "./user-slice";
import likeReducer from "./like-slice";

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  popup: popupReducer,
  user: userReducer,
  likes: likeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: {
//     popup: popupReducer,
//     user: userReducer,
//     likes: likeReducer,
//   },
// });

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
