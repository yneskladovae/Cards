import { instance } from "common/api/common.api";
import axios from "axios";

export const authApi = {
  register: (arg: ArgRegisterType) => {
    return instance.post<RegisterResponseType>("auth/register", arg);
  },
  login: (arg: ArgLoginType) => {
    return axios.post<ProfileType>(
      "https://neko-back.herokuapp.com/2.0/auth/login",
      arg
    );
  },
  forgot: (args: ArgsForgotType) => {
    return axios.post<ForgotResponsePasswordType>(
      "https://neko-back.herokuapp.com/2.0/auth/forgot",
      args
    );
  },
  setNewPassword: (args: ArgsSetNewPasswordType) => {
    return axios.post<SetNewPasswordResponseType>(
      "https://neko-back.herokuapp.com/2.0/auth/set-new-password",
      args
    );
  },
};

export type ProfileType = {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  publicCardPacksCount: number;
  // количество колод
  created: Date;
  updated: Date;
  isAdmin: boolean;
  verified: boolean; // подтвердил ли почту
  rememberMe: boolean;
  error?: string;
};

type ForgotResponsePasswordType = {
  info: string;
  error: string;
};
type SetNewPasswordResponseType = {
  info: string;
  error: string;
};
type RegisterResponseType = {
  addedUser: Omit<ProfileType, "token" | "tokenDeathTime">;
};

export type ArgRegisterType = Omit<ArgLoginType, "rememberMe">;
export type ArgLoginType = {
  email: string;
  password: string;
  rememberMe: boolean;
};
export type ArgsForgotType = {
  email: string;
  from: string;
  message: string;
};
export type ArgsSetNewPasswordType = {
  password: string;
  resetPasswordToken: string | undefined;
};
