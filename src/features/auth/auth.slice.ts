import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ArgLoginType,
  ArgRegisterType,
  ArgsEditProfileInfoType,
  ArgsForgotType,
  ArgsSetNewPasswordType,
  authApi,
  ProfileType,
} from "features/auth/auth.api";
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk";
import { appActions } from "../../app/app.slice";

const forgot = createAsyncThunk(
  "auth/forgot",
  async (arg: ArgsForgotType, thunkAPI) => {
    try {
      const res = await authApi.forgot(arg);
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

const register = createAsyncThunk(
  "auth/register",
  async (arg: ArgRegisterType, thunkAPI) => {
    try {
      const res = await authApi.register(arg);
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

const login = createAppAsyncThunk<{ profile: ProfileType }, ArgLoginType>(
  "auth/login",
  async (arg: ArgLoginType, thunkAPI) => {
    try {
      const res = await authApi.login(arg);
      return { profile: res.data };
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

const setNewPassword = createAppAsyncThunk(
  "auth/set-new-password",
  async (args: ArgsSetNewPasswordType) => {
    const res = await authApi.setNewPassword(args);
  }
);

const editProfileInfo = createAppAsyncThunk(
  "auth/editProfileInfo",
  async (arg: ArgsEditProfileInfoType, thunkAPI) => {
    try {
      const res = await authApi.editProfileInfo(arg);
      return { profile: res.data };
    } catch (e) {
      return thunkAPI.rejectWithValue(null);
    }
  }
);

const logOut = createAppAsyncThunk("auth/logOut", async () => {
  const res = await authApi.logOut();
});

const authMe = createAppAsyncThunk<{ profile: ProfileType }, void>(
  "auth/authMe",
  async (arg, thunkAPI) => {
    try {
      const res = await authApi.authMe();
      return { profile: res.data };
    } catch (e) {
      return thunkAPI.rejectWithValue(null);
    } finally {
      thunkAPI.dispatch(
        appActions.setIsInitialization({ isAppInitialized: true })
      );
    }
  }
);

const slice = createSlice({
  name: "auth",
  initialState: {
    profile: null as ProfileType | null,
    isLoading: false,
    isLogin: false,
    isReg: false,
    isForgot: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.profile = action.payload.profile;
        state.isLogin = true;
        state.isLoading = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isReg = true;
        state.isLoading = false;
      })
      .addCase(forgot.fulfilled, (state, action) => {
        state.isForgot = true;
        state.isLoading = false;
      })
      .addCase(authMe.fulfilled, (state, action) => {
        state.profile = action.payload.profile;
        state.isLogin = true;
        state.isLoading = false;
      })
      .addCase(editProfileInfo.fulfilled, (state, action) => {
        state.profile = action.payload.profile.updatedUser;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.profile = null;
        state.isLogin = false;
      });
  },
});

export const authReducer = slice.reducer;
export const authThunks = {
  register,
  login,
  forgot,
  setNewPassword,
  authMe,
  editProfileInfo,
  logOut,
};
