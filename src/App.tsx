import React, { useEffect } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { Register } from "features/auth/register/Register";
import Login from "features/auth/login/Login";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import { NavLink, Route, Routes } from "react-router-dom";
import { Forgot } from "features/auth/forgot/Forgot";
import SetNewPassword from "features/auth/setNewPassword/SetNewPassword";
import incubatorLogo from "assets/svg/incubatorLogo.svg";
import Profile from "./features/profile/Profile";
import { authThunks } from "./features/auth/auth.slice";

function App() {
  const isLogin = useAppSelector((state) => state.auth.isLogin);
  const profile = useAppSelector((state) => state.auth.profile);
  const isAppInitialized = useAppSelector(
    (state) => state.app.isAppInitialized
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authThunks.authMe());
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
          {!isLogin ? (
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
              <NavLink className={"login"} to={"login"}>
                Sign In
              </NavLink>
            </Button>
          ) : (
            <div className={"profile"}>{profile?.name}</div>
          )}
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path={"/"} element={<div>CARDS</div>} />
        <Route path={"register"} element={<Register />} />
        <Route path={"login"} element={<Login />} />
        <Route path={"forgot"} element={<Forgot />} />
        <Route path={"profile"} element={<Profile />} />
        <Route path={"set-new-password/:token"} element={<SetNewPassword />} />
        <Route path={"*"} element={<div>XZ</div>} />
      </Routes>
    </Box>
  );
}

export default App;
