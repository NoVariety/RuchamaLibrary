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
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react"
import { fetchBooksApi } from "../../../APIs/googleBooksAPI"
import { addNewBookToDB, doesBookExistByISBN } from "../../../APIs/LibBooksAPI"
import { HttpStatusCode } from "axios"

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
  const {
    control,
    handleSubmit,
    reset,
    resetField,
    watch,
    register,
    formState,
  } = methods

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

  useEffect(() => {
    const publisher: LibPublishers | undefined = allPublishers.current.find(
      (p) => p.name === watchPublisherName
    )
    setBookData((prev) => ({
      ...prev,
      coverType: watchPrintFormat,
      publisher: publisher ? publisher : null,
    }))
  }, [watchPrintFormat, watchPublisherName])

  const onSubmit = (data: AddBookFormInput) => {
    const publisher: LibPublishers | undefined = allPublishers.current.find(
      (currPublisher) => currPublisher.name === data.publisherName
    )

    setBookData((prev) => ({
      ...prev,
      publisher: publisher ? publisher : null,
      pageCount: data.pageCount,
      coverType: data.printFormat,
    }))
  }

  const doesBookExist = (): boolean => bookData.id !== defaultBookInfo.id

  const [didInitialLoadHappen, setDidInitialLoadHappen] =
    useState<boolean>(false)
  useEffect(() => {
    if (!didInitialLoadHappen) {
      setDidInitialLoadHappen(true)
    } else {
      if (!doesBookExist()) {
        watchISBN !== defaultBookInfo.id &&
          alert(`No book exists with the ISBN: ${watchISBN}!`) //! change to swal
      } else {
        addNewBook()
      }
      reset()
    }
  }, [formState.isSubmitSuccessful])

  async function addBookToDB(): Promise<void> {
    try {
      const addBookResStatus = (
        await addNewBookToDB({
          ...bookData,
          price: 1,
          copies: 1,
        })
      ).status
      if (addBookResStatus === HttpStatusCode.Ok) {
        watchISBN !== defaultBookInfo.id &&
          alert(`The book: "${bookData.title}" has been added to the database!`) //! change to swal
        refreshBooksToDisplay()
      } else {
        alert(
          `An error has occured while trying to add: "${bookData.title}" to the database!`
        ) //! change to swal
      }
    } catch (error) {
      console.log("Add New Book To DB Error: " + error)
    }
  }

  async function addNewBook(): Promise<void> {
    try {
      const doesBookExist = (await doesBookExistByISBN(bookData.id)).data
      if (doesBookExist) {
        watchISBN !== defaultBookInfo.id &&
          alert(`The book: "${bookData.title}" is already in the database!`) //! change to swal
      } else {
        addBookToDB()
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
        Submit
      </Button>
      <Button onClick={() => reset()} variant={"outlined"}>
        Reset
      </Button>
    </Container>
  )
}
