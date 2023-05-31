import React from "react";
import { useAppDispatch } from "app/hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { ArgsSetNewPasswordType } from "features/auth/auth.api";
import { authThunks } from "features/auth/auth.slice";
import { useParams } from "react-router-dom";
import s from "./setNewPassword.module.css";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const SetNewPassword = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const dispatch = useAppDispatch();

  let { token } = useParams();
  console.log(token);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ArgsSetNewPasswordType>({
    defaultValues: {
      password: "",
    },
  });

  const setNewPasswordHandler = (data: ArgsSetNewPasswordType) => {
    dispatch(
      authThunks.setNewPassword({
        password: data.password,
        resetPasswordToken: token,
      })
    );
  };
  const onSubmit: SubmitHandler<ArgsSetNewPasswordType> = (data) =>
    setNewPasswordHandler(data);

  return (
    <div className={s.setNewPassBlock}>
      <div className={s.setNewPassBlockContainer}>
        <h2>Set new password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.email}>
            <FormControl
              sx={{ m: 1, width: "25ch" }}
              variant="standard"
              className={s.formControl}
            >
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                {...register("password", { required: true })}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
          <p className={s.subText}>
            Create new password and we will send you further instructions to
            email
          </p>
          <Button
            style={{
              width: "100%",
              borderRadius: "30px",
              fontSize: "16px",
              marginTop: "60px",
            }}
            type="submit"
            variant="contained"
          >
            Create new password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SetNewPassword;
