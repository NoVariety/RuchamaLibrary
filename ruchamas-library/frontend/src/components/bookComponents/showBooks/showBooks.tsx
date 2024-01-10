import { useState } from "react"

import { Grid, Stack } from "@mui/material"

import { LibBooks, LibReaders, borrowViewTypes } from "../../../data.consts"

import BookPreview from "../bookPreview/bookPreview"
import BookBorrow from "../bookBorrowWrapper/bookBorrow"
import BorrowViews from "../borrowViews/borrowViews"
import BookReturn from "../bookReturn/bookReturn"

type Props = {
  books: Array<LibBooks>
  readers: Array<LibReaders>
}

export default function ShowBooks({ books, readers }: Props) {
  const booksSortedByTitle: LibBooks[] = books.sort((a, b) => {
    return ("" + a.title).localeCompare(b.title)
  })

  const [borrowViews, setBorrowViews] = useState<borrowViewTypes>(
    borrowViewTypes.BORROW
  )

  return (
    <Grid container spacing={3}>
      {booksSortedByTitle.map((book) => {
        return (
          <Grid item xs={4}>
            <Stack direction="column">
              <BookPreview bookInfo={book} />
              {borrowViews === borrowViewTypes.BORROW ? (
                <BookBorrow book={book} readers={readers} />
              ) : (
                <BookReturn book={book} />
              )}
            </Stack>
          </Grid>
        )
      })}
      <BorrowViews views={borrowViews} setViews={setBorrowViews} />
    </Grid>
  )
}
