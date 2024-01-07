import React from "react"
import { FormControl, MenuItem, TextField } from "@mui/material"
import { Controller } from "react-hook-form"
import { FormInputProps } from "../../data.consts"
import { requiredAsterisk } from "./formComponentsStyle"

export const FormInputDropdown: React.FC<FormInputProps> = ({
  name,
  control,
  label,
  dropdownOptions,
  errorMessage,
}) => {
  const generateSingleOptions = () => {
    return dropdownOptions?.map((option) => {
      return (
        <MenuItem key={option.key} value={option.value}>
          {option.label}
        </MenuItem>
      )
    })
  }

  return (
    <FormControl size={"small"}>
      <Controller
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            select
            helperText={error ? errorMessage : null}
            size="small"
            onChange={onChange}
            value={value}
            label={label}
            required={true}
            error={error && true}
            sx={!error ? requiredAsterisk : {}}
          >
            {generateSingleOptions()}
          </TextField>
        )}
        control={control}
        name={name}
      />
    </FormControl>
  )
}
