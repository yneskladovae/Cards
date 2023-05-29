import React, { useEffect } from "react";
import { Counter } from "features/counter/Counter";
import "./App.css";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { appActions } from "app/app.slice";
import { Register } from "features/auth/register/Register";
import Login from "features/auth/login/Login";

function App() {
  const isLoading = useAppSelector((state) => state.app.isLoading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(appActions.setIsLoading({ isLoading: false }));
    }, 3000);
  }, [dispatch]);

  return (
    <div>
      {isLoading && <h1>Loader...</h1>}
      <Counter />
      <Register />
      <Login />
    </div>
  );
}

export default App;
