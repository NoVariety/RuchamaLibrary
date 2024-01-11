import { Container, Stack } from "@mui/material"

import { useEffect, useState } from "react"

import { titleSx } from "./showReadersStyle"

import {
  LibReaders,
  TWO_WEEKS_IN_MILLIS,
  readerViewTypes,
} from "../../../data.consts"

import { fetchUnreturnedBorrowsBeforeDate } from "../../../APIs/LibBorrowsAPI"

import ReaderPreview from "../readerPreview/readerPreview"
import ReaderViews from "../readerView/readerViews"

type Props = {
  readers: Array<LibReaders>
}

export default function ShowReaders({ readers }: Props) {
  const [readerViews, setReaderViews] = useState<readerViewTypes>(
    readerViewTypes.ALL
  )

  async function filterReadersByUnreturnedBorrowsBeforeDate(): Promise<
    Array<LibReaders>
  > {
    const filteredReaders: LibReaders[] = (
      await fetchUnreturnedBorrowsBeforeDate(
        new Date(Date.now() - TWO_WEEKS_IN_MILLIS).toLocaleDateString("sv-SE")
      )
    ).data.map((item: { reader: LibReaders }) => item.reader)

    return filteredReaders
  }

  const [readersToShow, setReadersToShow] = useState<Array<LibReaders>>(readers)

  useEffect(() => {
    const loadReadersToShow = async (): Promise<void> => {
      const loadedReaders =
        readerViews === readerViewTypes.ALL
          ? readers
          : await filterReadersByUnreturnedBorrowsBeforeDate()

      setReadersToShow(loadedReaders)
    }
    loadReadersToShow()
  }, [readerViews])

  return (
    <Stack direction="column">
      <Container sx={titleSx}>
        {readerViews === readerViewTypes.ALL
          ? "All Readers"
          : "Readers Late to Return a Book"}
      </Container>

      <ReaderPreview
        reader={{
          id: "ID Number",
          firstName: "First Name",
          lastName: "Last Name",
          email: "Email Address",
          phoneNumber: "Phone Number",
          joinDate: "Join Date",
        }}
        isTitle={true}
      />

      {readersToShow?.map((reader: LibReaders) => {
        return <ReaderPreview reader={reader} isTitle={false} />
      })}

      <ReaderViews views={readerViews} setViews={setReaderViews} />
    </Stack>
  )
}
