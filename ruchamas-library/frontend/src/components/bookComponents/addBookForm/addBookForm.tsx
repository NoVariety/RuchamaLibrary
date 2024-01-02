import { Button, Container, Paper, Typography } from "@mui/material"

import { useForm } from "react-hook-form"

import { FormInputText } from "./formComponents/FormInputText"
import { FormInputDropdown } from "./formComponents/FormInputDropdown"
import { FormInputRadio } from "./formComponents/FormInputRadio"

import { addBookFormContainerSx } from "./addBookFormStyle"
import { FormInput, ISBN_LENGTH } from "../../../data.consts"
import { Dispatch, SetStateAction, useEffect } from "react"

type Props = {
  defaultValues: FormInput
  onSubmit: (data: FormInput) => void
  setIsbn: Dispatch<SetStateAction<number>>
  setFormValues: Dispatch<SetStateAction<FormInput>>
}

export default function AddBookForm({
  defaultValues,
  onSubmit,
  setIsbn,
  setFormValues,
}: Props) {
  const methods = useForm<FormInput>({ defaultValues: defaultValues })
  const { handleSubmit, reset, control, setValue, watch, register } = methods

  const watchISBN = watch("ISBN")
  const watchPageCount = watch("pageCount")

  useEffect(() => {
    setIsbn(watchISBN)
    setFormValues((prev) => ({
      ...prev,
      pageCount: watchPageCount,
    }))
  }, [watchISBN])

  return (
    <Container sx={addBookFormContainerSx}>
      <Typography variant="h6">Add Book</Typography>

      <FormInputText
        control={control}
        label={"ISBN"}
        {...register("ISBN", {
          minLength: ISBN_LENGTH,
          maxLength: ISBN_LENGTH,
          required: true,
        })}
        errorMessage={`Must be a ${ISBN_LENGTH} digits long number`}
      />
      <FormInputDropdown
        control={control}
        label="Publisher"
        {...register("publisher", {
          required: true,
        })}
      />
      <FormInputText
        control={control}
        label="Page Count"
        {...register("pageCount", {
          required: true,
        })}
      />
      <FormInputRadio
        control={control}
        label="Print Format"
        {...register("printFormat", {
          required: true,
        })}
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
