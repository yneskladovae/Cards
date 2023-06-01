import { authThunks } from "features/auth/auth.slice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import React from "react";
import s from "features/auth/login/login.module.css";
import TextField from "@mui/material/TextField";
import { Navigate, NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import { LinearProgress } from "@mui/material";
import formStyle from "../../../common/style/form.module.css";

type Inputs = {
  email: string;
  password: string;
  confirm_password: string;
};
export const Register = () => {
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const isReg = useAppSelector((state) => state.auth.isReg);
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
      <div className={formStyle.formBlock}>
        <div className={formStyle.formContainer}>
          <h2>Sign up</h2>
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
            <div>
              <TextField
                {...register("password", { required: true, maxLength: 20 })}
                id="register-password"
                label="Password"
                variant="standard"
                type={"password"}
                className={formStyle.password}
              />
            </div>
            <div>
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
                className={formStyle.password}
              />
            </div>
            <Button
              className={formStyle.button}
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
