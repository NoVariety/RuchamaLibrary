import { Button, Container, Typography } from "@mui/material"

import { useForm } from "react-hook-form"

import { FormInputText } from "./formComponents/FormInputText"
import { FormInputDropdown } from "./formComponents/FormInputDropdown"
import { FormInputRadio } from "./formComponents/FormInputRadio"

import { addBookFormContainerSx } from "./addBookFormStyle"
import {
  DropdownOptionsType,
  FormInput,
  ISBN_LENGTH,
  Publisher,
  bookInformation,
  defaultBookInfo,
} from "../../../data.consts"
import { Dispatch, MutableRefObject, SetStateAction, useEffect } from "react"
import { fetchBooksApi } from "../../../APIs/googleBooksAPI"

type Props = {
  defaultValues: FormInput
  setBookData: Dispatch<SetStateAction<bookInformation>>
  bookData: bookInformation
  allPublishers: MutableRefObject<Publisher[]>
}

export default function AddBookForm({
  defaultValues,
  setBookData,
  bookData,
  allPublishers,
}: Props) {
  const methods = useForm<FormInput>({ defaultValues })
  const {
    control,
    handleSubmit,
    reset,
    resetField,
    watch,
    register,
    formState,
    formState: { isSubmitSuccessful },
  } = methods

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
    resetField("pageCount", { defaultValue: defaultValues.pageCount })
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

  const watchPrintFormat = watch("printFormat")
  const watchPublisherName = watch("publisherName")

  useEffect(() => {
    const publisher: Publisher | undefined = allPublishers.current.find(
      (p) => p.name === watchPublisherName
    )
    setBookData((prev) => ({
      ...prev,
      format: watchPrintFormat,
      publisher: publisher ? publisher : null,
    }))
  }, [watchPrintFormat, watchPublisherName])

  const onSubmit = (data: FormInput) => {
    const publisher: Publisher | undefined = allPublishers.current.find(
      (p) => p.name === data.publisherName
    )

    setBookData((prev) => ({
      ...prev,
      publisher: publisher ? publisher : null,
      pages: data.pageCount,
      format: data.printFormat,
    }))

    console.log("updated publisher")
  }

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      console.log(bookData)
      //! add book to db here

      reset()
    }
  }, [formState])

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
        {...register("publisherName", {
          required: true,
        })}
        dropdownOptions={
          allPublishers.current.map((publisher) => ({
            key: publisher.name,
            value: publisher.name,
            label: publisher.name,
          })) as DropdownOptionsType
        }
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
