import { authThunks } from "features/auth/auth.slice";
import { useAppDispatch } from "app/hooks";

export const Register = () => {
  const dispatch = useAppDispatch();

  const registerHandler = () => {
    dispatch(authThunks.register({ email: "123", password: "123" }));
  };

  return (
    <div>
      <h1>Register</h1>
      <button onClick={registerHandler}>register</button>
    </div>
  );
};
