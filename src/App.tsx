import React, { useEffect } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { appActions } from "app/app.slice";
import { Register } from "features/auth/register/Register";
import Login from "features/auth/login/Login";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { AppBar, Button, IconButton, Typography } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Forgot } from "./features/auth/forgot/Forgot";
import SetNewPassword from "features/auth/setNewPassword/SetNewPassword";

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
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            LOGO
          </Typography>
          <Button color="inherit">Login</Button>
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
