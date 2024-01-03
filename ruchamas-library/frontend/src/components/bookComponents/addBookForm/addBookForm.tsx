import { Button, Container, Typography } from "@mui/material"

import { useForm } from "react-hook-form"

import { FormInputText } from "./formComponents/FormInputText"
import { FormInputDropdown } from "./formComponents/FormInputDropdown"
import { FormInputRadio } from "./formComponents/FormInputRadio"

import { addBookFormContainerSx } from "./addBookFormStyle"
import {
  FormInput,
  ISBN_LENGTH,
  bookInformation,
  defaultBookInfo,
} from "../../../data.consts"
import { Dispatch, SetStateAction, useEffect } from "react"
import { fetchBooksApi } from "../../../APIs/googleBooks"

type Props = {
  defaultValues: FormInput
  onSubmit: (data: FormInput) => void
  setBookData: Dispatch<SetStateAction<bookInformation>>
  bookData: bookInformation
}

export default function AddBookForm({
  defaultValues,
  onSubmit,
  setBookData,
  bookData,
}: Props) {
  const methods = useForm<FormInput>({ defaultValues })
  const { control, handleSubmit, reset, resetField, watch, register } = methods

  //? tunnel to summer
  // 9781638584155
  //? dune
  // 9780340960196
  //? invalid
  // 9990340960196
  const watchISBN = watch("ISBN")

  useEffect(() => {
    fetchBookData()
  }, [watchISBN])

  useEffect(() => {
    resetField("publisher", { defaultValue: defaultValues.publisher })
    resetField("pageCount", { defaultValue: defaultValues.pageCount })
    resetField("printFormat", { defaultValue: defaultValues.printFormat })
  }, [bookData])

  const getISBNLength = (): number => watchISBN.toString().length

  function fetchBookData(): void {
    fetchBooksApi(watchISBN).then((response) => {
      let information: bookInformation = defaultBookInfo

      if (getISBNLength() === ISBN_LENGTH && response.data.totalItems > 0) {
        const data = response.data.items[0].volumeInfo
        information = {
          summary: data.description,
          title: data.title,
          coverImage: data.imageLinks.thumbnail,
          author: data.authors ? data.authors[0] : "?",
          language: data.language,
          publisher: bookData.publisher, //! change to publisher selected from db. option: auto add publisher and if not in DB ask the user to add publisher to db
          publicationDate: data.publishedDate.split("-").reverse().join("-"),
          genre: data.categories ? data.categories[0] : "?",
          format: bookData.format,
          pages: data.pageCount,
          ISBN: watchISBN, //! on submit, check if not already in db, suggest adding more to count if yes
        }
      }

      setBookData(information)
    })
  }

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
