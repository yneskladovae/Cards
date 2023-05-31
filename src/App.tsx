import React, { useEffect } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { appActions } from "app/app.slice";
import { Register } from "features/auth/register/Register";
import Login from "features/auth/login/Login";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { AppBar, Avatar, Button, IconButton, Typography } from "@mui/material";
import { NavLink, Route, Routes } from "react-router-dom";
import { Forgot } from "features/auth/forgot/Forgot";
import SetNewPassword from "features/auth/setNewPassword/SetNewPassword";
import incubatorLogo from "assets/svg/incubatorLogo.svg";

function App() {
  const isLoading = useAppSelector((state) => state.app.isLoading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(appActions.setIsLoading({ isLoading: false }));
    }, 3000);
  }, [dispatch]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#FCFCFC" }}>
        <Toolbar
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <img className={"logo"} src={incubatorLogo} alt={"logo"} />
          <Button
            style={{
              width: "113px",
              borderRadius: "30px",
              fontSize: "16px",
              textAlign: "center",
            }}
            type="submit"
            variant="contained"
          >
            <NavLink className={"login"} to={"/login"}>
              Sign In
            </NavLink>
          </Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path={"register"} element={<Register />} />
        <Route path={"login"} element={<Login />} />
        <Route path={"forgot"} element={<Forgot />} />
        <Route path={"set-new-password/:token"} element={<SetNewPassword />} />
        <Route path={"*"} element={<Login />} />
      </Routes>
    </Box>
  );
}

export default App;
