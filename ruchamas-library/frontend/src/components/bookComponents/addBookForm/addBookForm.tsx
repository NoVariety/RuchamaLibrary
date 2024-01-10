import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react"

import { Button, Container } from "@mui/material"

import { useForm } from "react-hook-form"

import { FormInputText } from "../../formComponents/FormInputText"
import { FormInputDropdown } from "../../formComponents/FormInputDropdown"
import { FormInputRadio } from "../../formComponents/FormInputRadio"

import { addBookFormContainerSx } from "./addBookFormStyle"

import {
  DropdownOptionsType,
  AddBookFormInput,
  ISBN_LENGTH,
  LibPublishers,
  BookInformation,
  defaultBookInfo,
} from "../../../data.consts"

import { fetchBooksApi } from "../../../APIs/googleBooksAPI"

import { addBookToDB, doesBookExistByISBN } from "../../../APIs/LibBooksAPI"

import { HttpStatusCode } from "axios"
import { getRandomPrice } from "../../../utils/appUtils"

type Props = {
  refreshBooksToDisplay: () => void
  defaultValues: AddBookFormInput
  setBookData: Dispatch<SetStateAction<BookInformation>>
  bookData: BookInformation
  allPublishers: MutableRefObject<LibPublishers[]>
}

export default function AddBookForm({
  refreshBooksToDisplay,
  defaultValues,
  setBookData,
  bookData,
  allPublishers,
}: Props) {
  const methods = useForm<AddBookFormInput>({ defaultValues })
  const { control, handleSubmit, reset, resetField, watch, register } = methods

  const watchISBN = watch("ISBN")

  useEffect(() => {
    fetchBookData()
  }, [watchISBN])

  useEffect(() => {
    resetField("pageCount", { defaultValue: defaultValues.pageCount })
  }, [bookData])

  const getISBNLength = (): number => watchISBN.toString().length

  async function fetchBookData(): Promise<void> {
    try {
      let bookInformation: BookInformation = defaultBookInfo
      const googleBookData = (await fetchBooksApi(watchISBN)).data

      if (getISBNLength() === ISBN_LENGTH && googleBookData.totalItems > 0) {
        const volumeData = googleBookData.items[0].volumeInfo
        bookInformation = {
          summary: volumeData.description,
          title: volumeData.title,
          coverImage: volumeData.imageLinks?.thumbnail,
          author: volumeData.authors ? volumeData.authors[0] : "?",
          language: volumeData.language,
          publisher: bookData.publisher,
          publishDate: volumeData.publishedDate,
          category: volumeData.categories ? volumeData.categories[0] : "?",
          coverType: bookData.coverType,
          pageCount: volumeData.pageCount,
          id: watchISBN,
        }
      }

      setBookData(bookInformation)
    } catch (error) {
      console.log("Fetch Books API Error: " + error)
    }
  }

  const watchPrintFormat = watch("printFormat")
  const watchPublisherName = watch("publisherName")
  const watchPageCount = watch("pageCount")

  useEffect(() => {
    const publisher: LibPublishers | undefined = allPublishers.current.find(
      (pItem) => pItem.name === watchPublisherName
    )
    setBookData((prev) => ({
      ...prev,
      publisher: publisher ? publisher : null,
    }))
  }, [watchPublisherName])

  useEffect(() => {
    setBookData((prev) => ({
      ...prev,
      coverType: watchPrintFormat,
    }))
  }, [watchPrintFormat])

  useEffect(() => {
    setBookData((prev) => ({
      ...prev,
      pageCount: watchPageCount,
    }))
  }, [watchPageCount])

  const doesBookExist = (): boolean => bookData.id !== defaultBookInfo.id

  const onSubmit = (data: AddBookFormInput) => {
    if (!doesBookExist()) {
      watchISBN !== defaultBookInfo.id &&
        alert(`No book exists with the ISBN: ${watchISBN}!`)
    } else {
      addNewBook(data.copies)
    }
    reset()
  }

  async function addNewBookToDB(copies: number): Promise<void> {
    try {
      const addBookResStatus = (
        await addBookToDB({
          ...bookData,
          copies: copies,
          price: getRandomPrice(),
        })
      ).status
      if (addBookResStatus === HttpStatusCode.Ok) {
        watchISBN !== defaultBookInfo.id &&
          alert(`The book: "${bookData.title}" has been added to the database!`)
        refreshBooksToDisplay()
      } else {
        alert(
          `An error has occured while trying to add: "${bookData.title}" to the database!`
        )
      }
    } catch (error) {
      console.log("Add New Book To DB Error: " + error)
    }
  }

  async function addNewBook(copies: number): Promise<void> {
    try {
      const doesBookExist = (await doesBookExistByISBN(bookData.id)).data
      if (doesBookExist) {
        watchISBN !== defaultBookInfo.id &&
          alert(`The book: "${bookData.title}" is already in the database!`)
      } else {
        addNewBookToDB(copies)
      }
    } catch (error) {
      console.log("Does Book Exist By ISBN Error: " + error)
    }
  }

  return (
    <Container sx={addBookFormContainerSx}>
      <FormInputText
        control={control}
        label="ISBN"
        {...register("ISBN", {
          minLength: ISBN_LENGTH,
          maxLength: ISBN_LENGTH,
          pattern: /^\d+$/,
          required: true,
        })}
        errorMessage={`ISBN must be a number of ${ISBN_LENGTH} digits`}
      />
      <FormInputDropdown
        control={control}
        label="Publisher"
        {...register("publisherName", {
          required: true,
        })}
        errorMessage={`Publisher must be filled!`}
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
          pattern: /^\d+$/,
          required: true,
        })}
        errorMessage={`Page count must be a number!`}
      />
      <FormInputRadio
        control={control}
        label="Print Format"
        {...register("printFormat", {
          required: true,
        })}
      />
      <FormInputText
        control={control}
        label="Copies"
        {...register("copies", {
          pattern: /^\d+$/,
          required: true,
        })}
        errorMessage={`Copies must be a number!`}
      />

      <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
        Submit
      </Button>
      <Button onClick={() => reset()} variant={"outlined"}>
        Reset
      </Button>
    </Container>
  )
}
