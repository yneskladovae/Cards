import React from "react";
import { useAppDispatch } from "app/hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { ArgsForgotType } from "../auth.api";
import { authThunks } from "../auth.slice";

export const Forgot = () => {
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
      <h2>Forgot your password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email", { required: true })} />
        <p>
          Enter your email address and we will send you further instructions
        </p>
        {errors.email && <span>This field is required</span>}
        <input type="submit" />
        <br />
        <a href="#">Did you rememver your password?</a>
        <br />
        <a href="#">Try logging in</a>
        <br />
      </form>
    </>
  );
};
