import { authThunks } from "features/auth/auth.slice";
import { useAppDispatch } from "app/hooks";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};
export const Register = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email", { required: true })} />
      <input {...register("password", { required: true, maxLength: 20 })} />
      {errors.email && errors.password && <span>This field is required</span>}
      <input type="submit" />
    </form>
  );
};
