import { authThunks } from "features/auth/auth.slice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import React from "react";
import s from "features/auth/login/login.module.css";
import TextField from "@mui/material/TextField";
import { Navigate, NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import { LinearProgress } from "@mui/material";

type Inputs = {
  email: string;
  password: string;
  confirm_password: string;
};
export const Register = () => {
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const isReg = useAppSelector((state) => state.auth.isReg);
  const error = useAppSelector((state) => state.auth.error);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerHandler = (data: Inputs) => {
    dispatch(
      authThunks.register({ email: data.email, password: data.password })
    );
  };
  const onSubmit: SubmitHandler<Inputs> = (data) => registerHandler(data);

  if (isReg) return <Navigate to={"/login"} />;

  return (
    <>
      {isLoading && <LinearProgress />}
      <div className={s.registerBlock}>
        <div className={s.registerBlockContainer}>
          <h2>Sign up</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                type={"password"}
              />
            </div>
            <div className={s.password}>
              <TextField
                {...register("confirm_password", {
                  required: true,
                  maxLength: 20,
                  validate: (val: string) => {
                    if (watch("password") != val)
                      return "Your passwords do no match";
                  },
                })}
                id="register-password"
                label="Confirm password"
                variant="standard"
                type={"password"}
              />
            </div>
            <Button
              style={{
                width: "100%",
                borderRadius: "30px",
                fontSize: "16px",
                marginTop: "60px",
              }}
              type="submit"
              variant="contained"
              disabled={isLoading}
            >
              Sign Up
            </Button>
            <p>Already have an account?</p>
            <NavLink to={"/login"}>Sign In</NavLink>
          </form>
        </div>
      </div>
    </>
  );
};
