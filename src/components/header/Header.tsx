import React from "react";
import Toolbar from "@mui/material/Toolbar";
import incubatorLogo from "../../assets/svg/incubatorLogo.svg";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import { useAppSelector } from "../../app/hooks";

const Header = () => {
  const isLogin = useAppSelector((state) => state.auth.isLogin);
  const profile = useAppSelector((state) => state.auth.profile);

  return (
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
  );
};

export default Header;
