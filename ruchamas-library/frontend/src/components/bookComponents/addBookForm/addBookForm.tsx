import { Button, Container, Paper, Typography } from "@mui/material"

import { useForm } from "react-hook-form"

import { FormInputText } from "./formComponents/FormInputText"
import { FormInputDropdown } from "./formComponents/FormInputDropdown"
import { FormInputRadio } from "./formComponents/FormInputRadio"

import { addBookFormContainerSx } from "./addBookFormStyle"
import { coverTypes, FormInput, FormInputProps } from "../../../data.consts"

type Props = {
  defaultValues: FormInput
  onSubmit: (data: FormInput) => void
}

export default function AddBookForm({ defaultValues, onSubmit }: Props) {
  const methods = useForm<FormInput>({ defaultValues: defaultValues })
  const { handleSubmit, reset, control, setValue, watch } = methods

  return (
    <Container sx={addBookFormContainerSx}>
      <Typography variant="h6">Add Book</Typography>

      <FormInputText name="ISBN" control={control} label="ISBN" />
      <FormInputDropdown name="publisher" control={control} label="Publisher" />
      <FormInputText
        name="pageCount"
        showValue={defaultValues.pageCount}
        control={control}
        label="Page Count"
      />
      <FormInputRadio
        name="printFormat"
        control={control}
        label="Print Format"
      />

      <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
        {" "}
        Submit{" "}
      </Button>
      <Button onClick={() => reset()} variant={"outlined"}>
        {" "}
        Reset{" "}
      </Button>
    </Container>
  )
}
