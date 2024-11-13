import { TextField, TextFieldProps } from "@mui/material";
import React from "react";

type InputProps = TextFieldProps & {
  label: string;
  name: string;
  type?: string;
  error?: boolean;
  helperText?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};

const Input: React.FC<InputProps> = ({
  label,
  name,
  type = "text",
  error = false,
  helperText = "",
  onChange,
  value,
  fullWidth = true,
  ...otherProps
}) => {
  return (
    <TextField
      label={label}
      name={name}
      type={type}
      fullWidth={fullWidth}
      size="small"
      error={error}
      helperText={helperText}
      onChange={onChange}
      {...otherProps}
      sx={{
        color: "#868E96",
        "& .MuiInputBase-root": {
          borderColor: "#E0E0E0",
        },
        "& label.Mui-focused": {
          color: "#A0AAB4",
        },
      }}
    ></TextField>
  );
};

export default Input;
