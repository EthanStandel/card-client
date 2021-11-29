import { TextField } from "@mui/material";
import type { TextFieldProps } from "@mui/material";
import { useField } from "formik";

const Input = ({ name, ...props }: TextFieldProps & { name: string }) => {
  const [field, { error, touched }] = useField<string>(name);
  const inputProps: TextFieldProps = { ...field, ...props };

  return (
    <TextField
      {...inputProps}
      variant="outlined"
      error={!!error && !!touched}
    />
  );
};

export default Input;
