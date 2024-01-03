import { Container, Stack } from "@mui/material"

import { useState } from "react"

import { addBookContainerSx } from "./addBookStyle"

import {
  FormInput,
  bookInformation,
  coverTypes,
  defaultBookInfo,
} from "../../../data.consts"

import BookPreview from "../bookPreview/bookPreview"
import AddBookForm from "../addBookForm/addBookForm"

export default function AddBook() {
  const [bookData, setBookData] = useState<bookInformation>(defaultBookInfo)

  const onSubmit = (data: FormInput) => {
    setBookData((prev) => ({
      ...prev,
      publisher: data.publisher,
      pages: data.pageCount,
      format: data.printFormat,
    }))
  }

  return (
    <Container sx={addBookContainerSx}>
      <Stack direction="row">
        <AddBookForm
          defaultValues={{
            ISBN: 0,
            publisher: "",
            pageCount: bookData.pages,
            printFormat: coverTypes.PAPERBACK,
          }}
          onSubmit={onSubmit}
          setBookData={setBookData}
          bookData={bookData}
        />
        <BookPreview bookInfo={bookData} />
      </Stack>
    </Container>
  )
}
