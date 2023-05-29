import { instance } from "common/api/common.api";
import axios from "axios";

export const authApi = {
  register: (arg: ArgRegisterType) => {
    return instance.post<RegisterResponseType>("auth/register", arg);
  },
  login: (arg: ArgLoginType) => {
    return instance.post<ProfileType>("auth/login", arg);
  },
  forgot: (args: ArgsForgotType) => {
    return axios.post<ForgotResponsePasswordType>(
      "https://neko-back.herokuapp.com/2.0/auth/forgot",
      args
    );
  },
};

export type ArgsForgotType = {
  email: string;
  from: string;
  message: string;
};

type ForgotResponsePasswordType = {
  info: string;
  error: string;
};

type RegisterResponseType = {
  addedUser: Omit<ProfileType, "token" | "tokenDeathTime">;
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

export type ArgRegisterType = Omit<ArgLoginType, "rememberMe">;
export type ArgLoginType = {
  email: string;
  password: string;
  rememberMe: boolean;
};
