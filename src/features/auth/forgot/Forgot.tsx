import React from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { ArgsForgotType } from "../auth.api";
import { authThunks } from "../auth.slice";
import TextField from "@mui/material/TextField";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import email from "../../../assets/svg/email.jpg";
import formStyle from "../../../common/style/form.module.css";
import s from "./forgot.module.css";

export const Forgot = () => {
  const isForgot = useAppSelector((state) => state.auth.isForgot);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ArgsForgotType>({
    defaultValues: {
      email: "",
      from: "ddd",
      message: `
        <div style="background-color: lime; padding: 15px">
        password recovery link: 
            <a href='http://localhost:3000/set-new-password/$token$'>
                link
            </a>
        </div>`,
    },
  });

  const loginHandler = (data: ArgsForgotType) => {
    console.log(data);
    dispatch(
      authThunks.forgot({
        ...data,
      })
    );
  };
  const onSubmit: SubmitHandler<ArgsForgotType> = (data) => loginHandler(data);

  return (
    <>
      {!isForgot ? (
        <div className={formStyle.formBlock}>
          <div
            className={`${formStyle.formContainer} ${s.forgotBlockContainer}`}
          >
            <h2>Forgot your password?</h2>
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
              <p className={s.subText}>
                Enter your email address and we will send you further
                instructions
              </p>
              <Button
                className={formStyle.button}
                type="submit"
                variant="contained"
              >
                Send Instructions
              </Button>
              <p className={s.subLinkText}>Did you remember your password?</p>
              <NavLink to={"/login"}>Try logging in</NavLink>
            </form>
          </div>
        </div>
      ) : (
        <div className={formStyle.formBlock}>
          <div className={formStyle.formContainer}>
            <h2>Check email</h2>
            <img src={email} alt="Email" />
            <p className={s.subText}>
              We've sent an Email with instructions to example@mail.com
            </p>
            <NavLink to={"/login"}>
              <Button
                className={formStyle.button}
                type="submit"
                variant="contained"
              >
                Back to login
              </Button>
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};
