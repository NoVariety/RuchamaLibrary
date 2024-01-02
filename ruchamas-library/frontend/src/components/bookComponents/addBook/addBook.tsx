import { Container, Stack } from "@mui/material"

import { addBookContainerSx } from "./addBookStyle"

import {
  FormInput,
  ISBN_LENGTH,
  bookInformation,
  coverTypes,
  defaultBookInfo,
} from "../../../data.consts"

import BookPreview from "../bookPreview/bookPreview"

import { fetchBooksApi } from "../../../APIs/googleBooks"
import { useEffect, useReducer, useState } from "react"

import AddBookForm from "../addBookForm/addBookForm"

export default function AddBook() {
  const [bookData, setBookData] = useState<bookInformation>(defaultBookInfo)

  //? tunnel to summer
  // 9781638584155
  //? dune
  // 9780340960196
  //? invalid
  // 9990340960196
  const [isbn, setIsbn] = useState<number>(0)

  const getISBNLength = (): number => isbn.toString().length

  useEffect(() => {
    fetchBooksApi(isbn).then((response) => {
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
          ISBN: isbn, //! on submit, check if not already in db, suggest adding more to count if yes
        }
      }

      setBookData(information)
      setFormValues((prev) => ({
        ...formValues,
        pageCount: information.pages,
        ISBN: isbn,
      }))
    })
  }, [isbn])

  //TODO:
  //* if i cant fix it tomorrow quickly
  //* then move on to updating it to db and stuff
  //* then come back to it later
  //! start the day by thinking how it should work, checking
  //! if the code indeed works this way and if not change it
  //! might have some things i missed here that worsen the situation

  const [formValues, setFormValues] = useState<FormInput>({
    ISBN: isbn,
    publisher: "",
    pageCount: bookData.pages,
    printFormat: coverTypes.PAPERBACK,
  })

  const onSubmit = (data: FormInput) => {
    setFormValues(data)
  }

  useEffect(() => {
    setBookData((prev) => ({
      ...prev,
      publisher: formValues.publisher,
      pages: formValues.pageCount,
      format: formValues.printFormat,
    }))
  }, [formValues])

  return (
    <Container sx={addBookContainerSx}>
      <Stack direction="row">
        <AddBookForm
          defaultValues={{
            ISBN: isbn,
            publisher: "",
            pageCount: bookData.pages,
            printFormat: coverTypes.PAPERBACK,
          }}
          onSubmit={onSubmit}
          setIsbn={setIsbn}
        />
        <BookPreview bookInfo={bookData} />
      </Stack>
    </Container>
  )
}
