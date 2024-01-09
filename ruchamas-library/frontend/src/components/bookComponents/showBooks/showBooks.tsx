import { Grid } from "@mui/material"

import { LibBooks, LibReaders } from "../../../data.consts"

import BookPreview from "../bookPreview/bookPreview"
import BookBorrow from "../bookBorrowWrapper/bookBorrow"

type Props = {
  books: Array<LibBooks>
  readers: Array<LibReaders>
}

export default function ShowBooks({ books, readers }: Props) {
  return (
    <Grid container spacing={3}>
      {books.map((book) => {
        return (
          <Grid item xs={4}>
            <BookPreview bookInfo={book} />
            <BookBorrow book={book} readers={readers} />
          </Grid>
        )
      })}
    </Grid>
  )
}
