import React from "react";
import s from "./login.module.css";
import { useAppDispatch } from "app/hooks";
import { authThunks } from "features/auth/auth.slice";
import { SubmitHandler, useForm } from "react-hook-form";
import { ArgLoginType } from "../auth.api";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Login = () => {
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
        // email: data.email,
        // password: data.password,
        // rememberMe: data.rememberMe,
        ...data,
      })
    );
  };
  const onSubmit: SubmitHandler<ArgLoginType> = (data) => loginHandler(data);

  return (
    <div className={s.registerBlock}>
      <div className={s.registerBlockContainer}>
        <h2>Sign in</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/*<input {...register("email", { required: true })} />*/}
          {/*<input*/}
          {/*  {...register("password", { required: true, maxLength: 20 })}*/}
          {/*/>*/}
          <div className={s.email}>
            <TextField
              {...register("email", { required: true })}
              id="register-email"
              label="Email"
              variant="standard"
            />
          </div>
          <div className={s.password}>
            <TextField
              {...register("password", { required: true, maxLength: 20 })}
              id="register-password"
              label="Password"
              variant="standard"
            />
          </div>
          <label className={s.checkbox}>
            <input
              type={"checkbox"}
              {...register("rememberMe", { required: false })}
            />
            Remember me
          </label>
          <p className={s.forgot}>Forgot Password?</p>
          {errors.email && errors.password && (
            <span>This field is required</span>
          )}
          <Button
            style={{
              width: "100%",
              borderRadius: "30px",
              fontSize: "16px",
              marginTop: "60px",
            }}
            type="submit"
            variant="contained"
          >
            Sign In
          </Button>
          {/*<input type="submit" />*/}
          <p>Don't have an account?</p>
          <a href="#">Sign Up</a>
        </form>
      </div>
    </div>
  );
};

export default Login;
