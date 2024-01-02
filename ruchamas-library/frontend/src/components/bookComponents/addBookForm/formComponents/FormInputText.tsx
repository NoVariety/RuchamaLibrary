import { Controller } from "react-hook-form"
import TextField from "@mui/material/TextField"
import { FormInputProps } from "../../../../data.consts"
import { requiredAsterisk } from "../addBookFormStyle"

export const FormInputText = ({
  name,
  control,
  label,
  errorMessage,
}: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => {
        return (
          <TextField
            helperText={error ? errorMessage : null}
            size="small"
            error={!!error}
            onChange={onChange}
            value={value}
            fullWidth
            label={label}
            variant="outlined"
            required={true}
            sx={requiredAsterisk}
          />
        )
      }}
    />
  )
}
