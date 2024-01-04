import { Button, Container } from "@mui/material"

import { useForm } from "react-hook-form"

import { FormInputText } from "../../formComponents/FormInputText"
import { FormInputDropdown } from "../../formComponents/FormInputDropdown"
import { FormInputRadio } from "../../formComponents/FormInputRadio"

import { addBookFormContainerSx } from "./addBookFormStyle"
import {
  DropdownOptionsType,
  FormInput,
  ISBN_LENGTH,
  Publisher,
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
  defaultValues: FormInput
  setBookData: Dispatch<SetStateAction<BookInformation>>
  bookData: BookInformation
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
  } = methods

  const watchISBN = watch("ISBN")

  useEffect(() => {
    fetchBookData()
  }, [watchISBN])

  useEffect(() => {
    resetField("pageCount", { defaultValue: defaultValues.pageCount })
  }, [bookData])

  const getISBNLength = (): number => watchISBN.toString().length

  function fetchBookData(): void {
    fetchBooksApi(watchISBN)
      .then((response) => {
        let information: BookInformation = defaultBookInfo

        if (getISBNLength() === ISBN_LENGTH && response.data.totalItems > 0) {
          const data = response.data.items[0].volumeInfo
          information = {
            summary: data.description,
            title: data.title,
            coverImage: data.imageLinks?.thumbnail,
            author: data.authors ? data.authors[0] : "?",
            language: data.language,
            publisher: bookData.publisher,
            publishDate: data.publishedDate.split("-").reverse().join("-"),
            category: data.categories ? data.categories[0] : "?",
            coverType: bookData.coverType,
            pageCount: data.pageCount,
            id: watchISBN,
          }
        }

        setBookData(information)
      })
      .catch((error) => console.log("Fetch Books API Error: " + error))
  }

  const watchPrintFormat = watch("printFormat")
  const watchPublisherName = watch("publisherName")

  useEffect(() => {
    const publisher: Publisher | undefined = allPublishers.current.find(
      (p) => p.name === watchPublisherName
    )
    setBookData((prev) => ({
      ...prev,
      coverType: watchPrintFormat,
      publisher: publisher ? publisher : null,
    }))
  }, [watchPrintFormat, watchPublisherName])

  const onSubmit = (data: FormInput) => {
    const publisher: Publisher | undefined = allPublishers.current.find(
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
        addBookToDBIfNew()
      }
      reset()
    }
  }, [formState.isSubmitSuccessful])

  function addBookToDBIfNew(): void {
    doesBookExistByISBN(bookData.id)
      .then((response) => {
        if (response.data) {
          watchISBN !== defaultBookInfo.id &&
            alert(`The book: "${bookData.title}" is already in the database!`) //! change to swal
        } else {
          //! add book to db here
          addNewBookToDB({
            ...bookData,
            price: 1,
            copies: 1,
          })
            .then((response) => {
              if (response.status === HttpStatusCode.Ok) {
                console.log(bookData)
                watchISBN !== defaultBookInfo.id &&
                  alert(
                    `The book: "${bookData.title}" has been added to the database!`
                  ) //! change to swal
              } else {
                alert(
                  `An error has occured while trying to add: "${bookData.title}" to the database!`
                ) //! change to swal
              }
            })
            .catch((error) => console.log("Add New Book To DB Error: " + error))
        }
      })
      .catch((error) => console.log("Does Book Exist By ISBN Error: " + error))
  }

  return (
    <Container sx={addBookFormContainerSx}>
      <FormInputText
        control={control}
        label={"ISBN"}
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
