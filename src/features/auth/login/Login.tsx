import React from "react";
import s from "./login.module.css";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { authThunks } from "features/auth/auth.slice";
import { SubmitHandler, useForm } from "react-hook-form";
import { ArgLoginType } from "../auth.api";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Navigate, NavLink } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import formStyle from "../../../common/style/form.module.css";

const Login = () => {
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const isLogin = useAppSelector((state) => state.auth.isLogin);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ArgLoginType>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const loginHandler = (data: ArgLoginType) => {
    dispatch(
      authThunks.login({
        ...data,
      })
    );
  };
  const onSubmit: SubmitHandler<ArgLoginType> = (data) => loginHandler(data);
  // if (isLogin) return <Navigate to={"/"} />;

  return (
    <>
      {isLoading && <LinearProgress />}
      <div className={formStyle.formBlock}>
        <div className={formStyle.formContainer}>
          <h2>Sign in</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <TextField
                {...register("email", { required: true })}
                id="register-email"
                label="Email"
                variant="standard"
                className={formStyle.email}
              />
            </div>
            <div className={s.password}>
              <TextField
                {...register("password", { required: true, maxLength: 20 })}
                id="register-password"
                label="Password"
                variant="standard"
                type={"password"}
                className={formStyle.password}
              />
            </div>
            <label className={s.checkbox}>
              <input
                className={formStyle.checkbox}
                type={"checkbox"}
                {...register("rememberMe", { required: false })}
              />
              Remember me
            </label>
            <NavLink className={s.forgot} to={"/forgot"}>
              Forgot Password?
            </NavLink>
            {errors.email && errors.password && (
              <span>This field is required</span>
            )}
            <Button
              className={formStyle.button}
              type="submit"
              variant="contained"
              disabled={isLoading}
            >
              Sign In
            </Button>
            {/*<input type="submit" />*/}
            <p>Don't have an account?</p>
            <NavLink to={"/register"}>Sign Up</NavLink>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
