import React from "react";
import { useAppDispatch } from "app/hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { ArgsSetNewPasswordType } from "features/auth/auth.api";
import { authThunks } from "features/auth/auth.slice";
import { useParams } from "react-router-dom";

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
    <>
      <h2>Set new password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("password", { required: true, maxLength: 20 })} />
        <input type="submit" />
      </form>
    </>
  );
};

export default SetNewPassword;
