import { Container } from "@mui/material"

import { addBookContainerSx } from "./addBookStyle"

import { bookInformation, defaultBookInfo } from "../../../data.consts"

import BookPreview from "../bookPreview/bookPreview"

import { fetchBooksApi } from "../../../APIs/googleBooks"
import { useEffect, useState } from "react"

export default function AddBook() {
  const [bookData, setBookData] = useState<bookInformation>(defaultBookInfo)

  //? tunnel to summer
  // const [isbn, setIsbn] = useState<number>(9781638584155)
  //? dune
  const [isbn, setIsbn] = useState<number>(9780340960196)

  //! add try catch in case fetching book failed and make a proper alert for it
  //* cool idea to maybe implement later: make the fields editable so you can change whatever you like in the final result
  useEffect(() => {
    fetchBooksApi(isbn).then((response) => {
      const data = response.data.items[0].volumeInfo
      const information: bookInformation = {
        summary: data.description,
        title: data.title,
        coverImage: data.imageLinks.thumbnail,
        author: data.authors[0],
        language: data.language,
        publisher: "?", //! change to publisher selected from db. option: auto add publisher and if not in DB ask the user to add publisher to db
        publicationDate: data.publishedDate.split("-").reverse().join("-"),
        genre: data.categories[0],
        format: "?", //! change to paperback/hardcover according to choice
        pages: data.pageCount, //! add option to set a different page count if is incorrect
        ISBN: isbn, //! check if not already in db, suggest adding more to count if yes
      }
      setBookData(information)
    })
    console.log(bookData)
  }, [])

  return (
    <Container sx={addBookContainerSx}>
      <BookPreview bookInfo={bookData} />
    </Container>
  )
}
