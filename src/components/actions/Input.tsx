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
  style?: React.CSSProperties;
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
  style,
  ...otherProps
}) => {
  return (
    <TextField
      name={name}
      placeholder={label}
      type={type}
      fullWidth={fullWidth}
      size="small"
      error={error}
      value={value}
      helperText={helperText}
      onChange={onChange}
      {...otherProps}
      sx={{
        ...style,
        color: "#868E96",
        "& .MuiInputBase-root": {
          borderRadius: "5px",
          fontSize: "20px",
          fontWeight: "400",
          minHeight: "48px",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#E0E0E0",
            color: "#868E96",
          },
        },

        "& label.Mui-focused": {
          color: "#A0AAB4",
        },
        "& .MuiFormHelperText-root": {
          position: "absolute",
          bottom: "-26px",
          m: 0,
        },
      }}
    ></TextField>
  );
};

export default Input;
