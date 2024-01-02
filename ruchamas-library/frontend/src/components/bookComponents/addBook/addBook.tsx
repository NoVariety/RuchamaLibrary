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
import { useEffect, useState } from "react"

import AddBookForm from "../addBookForm/addBookForm"

export default function AddBook() {
  const [bookData, setBookData] = useState<bookInformation>(defaultBookInfo)
  const [wasRequestMade, setWasRequestMade] = useState<boolean>(false)

  //? tunnel to summer
  // const [isbn, setIsbn] = useState<number>(9781638584155)
  //? dune
  const [isbn, setIsbn] = useState<number>(9780340960196)
  //? invalid
  // const [isbn, setIsbn] = useState<number>(9990340960196)

  const getISBNLength = (): number => isbn.toString().length

  //! add try catch in case fetching book failed and make a proper alert for it
  //* cool idea to maybe implement later: make the fields editable so you can change whatever you like in the final result
  useEffect(() => {
    fetchBooksApi(isbn).then((response) => {
      let information: bookInformation = defaultBookInfo

      if (getISBNLength() === ISBN_LENGTH && response.data.totalItems > 0) {
        // console.log(getISBNLength())
        // console.log(response.data.items[0])

        const data = response.data.items[0].volumeInfo
        information = {
          summary: data.description,
          title: data.title,
          coverImage: data.imageLinks.thumbnail,
          author: data.authors[0],
          language: data.language,
          publisher: bookData.publisher, //! change to publisher selected from db. option: auto add publisher and if not in DB ask the user to add publisher to db
          publicationDate: data.publishedDate.split("-").reverse().join("-"),
          genre: data.categories[0],
          format: bookData.format, //! change to paperback/hardcover according to choice
          pages: data.pageCount, //! add option to set a different page count if is incorrect
          ISBN: isbn, //! check if not already in db, suggest adding more to count if yes
        }
      }
      setBookData({ ...information, ISBN: formValues.ISBN })
      setFormValues((prev) => ({
        ...formValues,
        pageCount: information.pages,
      }))

      setWasRequestMade(true)
    })
    console.log(isbn)

    // console.log(bookData)
  }, [isbn])

  const [formValues, setFormValues] = useState<FormInput>({
    ISBN: isbn,
    publisher: "",
    pageCount: bookData.pages,
    printFormat: coverTypes.PAPERBACK,
  })

  const onSubmit = (data: FormInput) => {
    setFormValues(data)
  }

  //TODO: run useEffect on the ISBN and watch its value on change in the form
  //TODO: so when the field is 13 chars long it makes a request to google api to get book info by the new isbn
  //TODO: and when its not isbn length(*const value?) long set it all to default values

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
        {wasRequestMade && (
          <AddBookForm
            defaultValues={formValues}
            onSubmit={onSubmit}
            setIsbn={setIsbn}
          />
        )}
        <BookPreview bookInfo={bookData} />
      </Stack>
    </Container>
  )
}
