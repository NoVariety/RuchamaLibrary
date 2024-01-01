import { Controller, useFormContext } from "react-hook-form"
import TextField from "@mui/material/TextField"
import { FormInputProps } from "../../../../data.consts"

export const FormInputText = ({
  name,
  control,
  label,
  showValue,
}: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value !== 0 ? value : showValue}
          fullWidth
          label={label}
          variant="outlined"
        />
      )}
    />
  )
}
