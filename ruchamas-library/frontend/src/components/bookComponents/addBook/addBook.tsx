import { Container, Stack } from "@mui/material"

import { useRef, useState } from "react"

import { mainStackSx, componentTitleSx } from "./addBookStyle"

import {
  LibPublishers,
  BookInformation,
  coverTypes,
  defaultBookInfo,
} from "../../../data.consts"

import BookPreview from "../bookPreview/bookPreview"
import AddBookForm from "../addBookForm/addBookForm"
import { fetchAllPublishers } from "../../../APIs/LibPublishersAPI"

type Props = {
  refreshBooksToDisplay: () => void
}

export default function AddBook({ refreshBooksToDisplay }: Props) {
  const [bookData, setBookData] = useState<BookInformation>(defaultBookInfo)

  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false)

  const allPublishers = useRef<LibPublishers[]>([])

  async function initializePublisherList(): Promise<void> {
    try {
      allPublishers.current = (await fetchAllPublishers()).data
      setIsDataLoaded(true)
    } catch (error) {
      console.log("addBook Error: " + error)
    }
  }

  initializePublisherList()

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
              copies: 1,
            }}
            refreshBooksToDisplay={refreshBooksToDisplay}
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
