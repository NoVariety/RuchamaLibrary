import { Grid } from "@mui/material"

import { LibBooks } from "../../../data.consts"

import BookPreview from "../bookPreview/bookPreview"

type Props = {
  books: Array<LibBooks>
}

export default function ShowBooks({ books }: Props) {
  return (
    <Grid container spacing={3}>
      {books.map(({ price, copies, ...book }) => {
        return (
          <Grid item xs={4}>
            <BookPreview bookInfo={book} />
          </Grid>
        )
      })}
    </Grid>
  )
}
