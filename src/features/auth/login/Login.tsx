import React from "react";
import { useAppDispatch } from "app/hooks";
import { authThunks } from "features/auth/auth.slice";
import { SubmitHandler, useForm } from "react-hook-form";
import { ArgLoginType } from "../auth.api";

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
    <>
      <h2>Sign in</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email", { required: true })} />
        <input {...register("password", { required: true, maxLength: 20 })} />
        <input
          type={"checkbox"}
          {...register("rememberMe", { required: false })}
        />
        <p>Forgot Password?</p>
        {errors.email && errors.password && <span>This field is required</span>}
        <input type="submit" />
        <p>Don't have an account?</p>
        <a href="#">Sign Up</a>
      </form>
    </>
  );
};

export default Login;
