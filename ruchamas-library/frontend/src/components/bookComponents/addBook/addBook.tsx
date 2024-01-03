import { Container, Stack } from "@mui/material"

import { useEffect, useRef, useState } from "react"

import { addBookContainerSx } from "./addBookStyle"

import {
  FormInput,
  Publisher,
  bookInformation,
  coverTypes,
  defaultBookInfo,
} from "../../../data.consts"

import BookPreview from "../bookPreview/bookPreview"
import AddBookForm from "../addBookForm/addBookForm"
import { fetchAllPublishers } from "../../../APIs/LibPublishersAPI"

export default function AddBook() {
  const [bookData, setBookData] = useState<bookInformation>(defaultBookInfo)

  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false)

  const allPublishers = useRef<Publisher[]>([])

  fetchAllPublishers()
    .then((response) => {
      allPublishers.current = response.data
      setIsDataLoaded(true)
    })
    .catch((e) => {
      console.log(e)
    })

  return (
    <Container sx={addBookContainerSx}>
      <Stack direction="row">
        {isDataLoaded && (
          <AddBookForm
            defaultValues={{
              ISBN: 0,
              publisherName: "",
              pageCount: bookData.pages,
              printFormat: coverTypes.PAPERBACK,
            }}
            setBookData={setBookData}
            bookData={bookData}
            allPublishers={allPublishers}
          />
        )}
        <BookPreview bookInfo={bookData} />
      </Stack>
    </Container>
  )
}
