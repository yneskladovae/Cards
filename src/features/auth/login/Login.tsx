import React from "react";
import { useAppDispatch } from "app/hooks";
import { authThunks } from "features/auth/auth.slice";

const Login = () => {
  const dispatch = useAppDispatch();

  const loginHandler = () => {
    dispatch(
      authThunks.login({
        email: "",
        password: "",
        rememberMe: false,
      })
    );
  };

  return (
    <div>
      <button onClick={loginHandler}>Login</button>
    </div>
  );
};

export default Login;
