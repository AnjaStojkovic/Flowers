import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./store";
import UserService from "../services/UserService";
import { FormData } from "../components/Forms/CreateAccount";

interface User {
  userId: number | null;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  date_of_birth?: Date;
}

interface UserState {
  user: User;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: {
    userId: null,
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    date_of_birth: undefined,
  },
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId(state, action: PayloadAction<number>) {
      state.user.userId = action.payload;
    },
    clearUserId(state) {
      state.user.userId = null;
    },
    fetchUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchUserSuccess(state, action: PayloadAction<User>) {
      state.loading = false;
      state.user = action.payload;
    },
    fetchUserFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    addUserSuccess(state, action: PayloadAction<User>) {
      state.loading = false;
      state.user = action.payload;
    },
    addUserFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setUserId,
  clearUserId,
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFailure,
  addUserStart,
  addUserSuccess,
  addUserFailure,
} = userSlice.actions;

export const fetchUserData = (): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchUserStart());
    const response = await UserService.getUserInfo();
    const { user } = response;
    dispatch(fetchUserSuccess(user));
  } catch (error: any) {
    dispatch(fetchUserFailure(error.message));
  }
};

export const addUser =
  (formData: FormData): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(addUserStart());
      const newSighting = await UserService.createAccount(formData);
      dispatch(addUserSuccess(newSighting));
    } catch (error: any) {
      dispatch(addUserFailure(error.message));
    }
  };

export default userSlice.reducer;
