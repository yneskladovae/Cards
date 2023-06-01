import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ArgLoginType,
  ArgRegisterType,
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
      thunkAPI.dispatch(authAction.setIsLogin({ isLogin: true }));
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

const authMe = createAppAsyncThunk<{ profile: ProfileType }, void>(
  "auth/authMe",
  async (arg, thunkAPI) => {
    try {
      const res = await authApi.authMe();
      thunkAPI.dispatch(authAction.setIsLogin({ isLogin: true }));
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
  reducers: {
    setIsLogin(state, action: PayloadAction<{ isLogin: boolean }>) {
      state.isLogin = action.payload.isLogin;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.profile = action.payload.profile;
        state.isLoading = false;
      })
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(register.fulfilled, (state, action) => {
        state.isReg = true;
        state.isLoading = false;
      })
      .addCase(register.pending, (state, action) => {
        state.isReg = false;
        state.isLoading = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isReg = false;
      })
      .addCase(authMe.fulfilled, (state, action) => {
        state.profile = action.payload.profile;
        state.isLoading = false;
      });
  },
});

export const authReducer = slice.reducer;
export const authAction = slice.actions;
export const authThunks = {
  register,
  login,
  forgot,
  setNewPassword,
  authMe,
};
