import { Container, Stack } from "@mui/material"

import { useRef, useState } from "react"

import { mainStackSx, componentTitleSx } from "./addBookStyle"

import {
  Publisher,
  BookInformation,
  coverTypes,
  defaultBookInfo,
} from "../../../data.consts"

import BookPreview from "../bookPreview/bookPreview"
import AddBookForm from "../addBookForm/addBookForm"
import { fetchAllPublishers } from "../../../APIs/LibPublishersAPI"

export default function AddBook() {
  const [bookData, setBookData] = useState<BookInformation>(defaultBookInfo)

  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false)

  const allPublishers = useRef<Publisher[]>([])

  fetchAllPublishers()
    .then((response) => {
      allPublishers.current = response.data
      setIsDataLoaded(true)
    })
    .catch((error) => {
      console.log(error) //! replace with swal or smthing
    })

  return (
    <Stack direction="row" spacing={0.2} sx={mainStackSx}>
      <Stack>
        <Container sx={componentTitleSx}>ADD BOOK</Container>
        {isDataLoaded && (
          <AddBookForm
            defaultValues={{
              ISBN: 0,
              publisherName: "",
              pageCount: bookData.pageCount,
              printFormat: coverTypes.PAPERBACK,
            }}
            setBookData={setBookData}
            bookData={bookData}
            allPublishers={allPublishers}
          />
        )}
      </Stack>
      <Stack>
        <Container sx={componentTitleSx}>PREVIEW</Container>
        <BookPreview bookInfo={bookData} />
      </Stack>
    </Stack>
  )
}
