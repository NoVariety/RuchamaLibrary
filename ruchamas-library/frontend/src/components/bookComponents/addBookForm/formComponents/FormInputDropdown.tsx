import React from "react"
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SxProps,
  TextField,
} from "@mui/material"
import { useFormContext, Controller } from "react-hook-form"
import { FormInputProps } from "../../../../data.consts"
import { requiredAsterisk } from "../addBookFormStyle"

const options = [
  {
    label: "publisher a",
    value: "1",
  },
  {
    label: "publisher b",
    value: "2",
  },
]

export const FormInputDropdown: React.FC<FormInputProps> = ({
  name,
  control,
  label,
}) => {
  const generateSingleOptions = () => {
    return options.map((option: any) => {
      return (
        <MenuItem key={option.value} value={option.value}>
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
