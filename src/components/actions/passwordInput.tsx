import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  OutlinedInput,
  OutlinedInputProps,
} from "@mui/material";
import React from "react";

type PasswordInputProps = OutlinedInputProps & {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  helperText?: string;
  error?: boolean;
};

const PasswordInput = ({
  onChange,
  value,
  helperText,
  error,
  ...otherProps
}: PasswordInputProps) => {
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
          {...otherProps}
          error={error}
          name="password"
          sx={{
            fontSize: "20px",
            fontWeight: "400",
            "&.MuiInputBase-root": {
              minHeight: "48px",
              "& fieldset": {
                borderColor: "#E0E0E0",
                color: "#868E96",
              },
            },
          }}
          onChange={onChange}
          type={showPassword ? "text" : "password"}
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
        <FormHelperText
          sx={{
            color: "#d32f2f",
            position: "absolute",
            bottom: "-26px",
            m: 0,
          }}
        >
          {helperText}
        </FormHelperText>
      </FormControl>
    </>
  );
};

export default PasswordInput;
