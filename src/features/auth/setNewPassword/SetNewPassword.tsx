import React from "react";
import { useAppDispatch } from "app/hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { ArgsSetNewPasswordType } from "features/auth/auth.api";
import { authThunks } from "features/auth/auth.slice";
import { NavLink, useParams } from "react-router-dom";
import s from "./setNewPassword.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const SetNewPassword = () => {
  const dispatch = useAppDispatch();

  let { token } = useParams();
  console.log(token);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ArgsSetNewPasswordType>({
    defaultValues: {
      password: "",
    },
  });

  const setNewPasswordHandler = (data: ArgsSetNewPasswordType) => {
    dispatch(
      authThunks.setNewPassword({
        password: data.password,
        resetPasswordToken: token,
      })
    );
  };
  const onSubmit: SubmitHandler<ArgsSetNewPasswordType> = (data) =>
    setNewPasswordHandler(data);

  return (
    <div className={s.setNewPassBlock}>
      <div className={s.setNewPassBlockContainer}>
        <h2>Set new password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.email}>
            <TextField
              {...register("password", { required: true })}
              id="create-new-password"
              label="Password"
              variant="standard"
            />
          </div>
          <p className={s.subText}>
            Create new password and we will send you further instructions to
            email
          </p>
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
            Create new password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SetNewPassword;
