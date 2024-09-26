import React, { FC } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import colors from "../utils/colors";

interface AppTextFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  sx?: object;
}

const CustomTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: colors.main,
    },
    "&:hover fieldset": {
      borderColor: colors.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: colors.main,
    },
  },
  "& .MuiInputLabel-root": {
    color: colors.main,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: colors.main,
  },
}));

const AppTextField: FC<AppTextFieldProps> = ({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  sx,
}) => {
  return (
    <CustomTextField
      label={label}
      size="small"
      fullWidth
      value={value}
      onChange={onChange}
      required={required}
      type={type}
      sx={{ ...sx }}
    />
  );
};

export default AppTextField;
