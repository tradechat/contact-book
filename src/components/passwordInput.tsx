import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import React from "react";

interface PasswordInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  value: string;
}

const PasswordInput = ({ onChange, value }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <FormControl variant="outlined" fullWidth size="small">
        <OutlinedInput
          name="password"
          sx={{ fontSize: "20px", fontWeight: "400" }}
          onChange={onChange}
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={value}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showPassword ? "hide the password" : "display the password"
                }
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </>
  );
};

export default PasswordInput;
