import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import { authThunks } from "../../features/auth/auth.slice";
import Header from "../header/Header";
import { LinearProgress } from "@mui/material";

const Layout = () => {
  const isAppInitialized = useAppSelector(
    (state) => state.app.isAppInitialized
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authThunks.authMe());
  }, [dispatch]);

  // if (!isAppInitialized) return <LinearProgress />;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Header />
      <Outlet />
    </Box>
  );
};

export default Layout;
