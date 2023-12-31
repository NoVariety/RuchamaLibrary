import { Container, Stack, Tooltip, Typography } from "@mui/material"
import {
  getCoverImageSx,
  infoNameSx,
  infoStackSx,
  infoValueSx,
  marginContainerSx,
  previewContainerSx,
  summaryIconSx,
  titleSx,
} from "./bookPreviewStyle"

import { bookInformation } from "../../../data.consts"

type bookInfoNameValue = {
  infoName: string
  infoValue: string | number
}

type Props = {
  bookInfo: bookInformation
}

export default function BookPreview({ bookInfo }: Props) {
  const bookInfoMap: bookInfoNameValue[] = [
    {
      infoName: "Author",
      infoValue: bookInfo.author,
    },
    {
      infoName: "Language",
      infoValue: bookInfo.language,
    },
    {
      infoName: "Publisher",
      infoValue: bookInfo.publisher,
    },
    {
      infoName: "Publication date",
      infoValue: bookInfo.publicationDate,
    },
    {
      infoName: "Genre",
      infoValue: bookInfo.genre,
    },
    {
      infoName: "Format",
      infoValue: bookInfo.format,
    },
    {
      infoName: "Pages",
      infoValue: bookInfo.pages !== 0 ? bookInfo.pages : "?",
    },
    {
      infoName: "ISBN",
      infoValue: bookInfo.ISBN,
    },
  ]

  return (
    <Container sx={previewContainerSx}>
      <Container sx={marginContainerSx}>
        <Stack direction="column">
          <Typography sx={titleSx}>
            {bookInfo.title}
            <Tooltip title={bookInfo.summary} arrow>
              <Container sx={summaryIconSx} disableGutters></Container>
            </Tooltip>
          </Typography>

          <Container sx={getCoverImageSx(bookInfo.coverImage)}></Container>

          {bookInfoMap.map((item) => {
            return (
              <Stack direction="row" sx={infoStackSx}>
                <Typography sx={infoNameSx}>{item.infoName}</Typography>
                <Typography sx={infoValueSx}>{item.infoValue}</Typography>
              </Stack>
            )
          })}
        </Stack>
      </Container>
    </Container>
  )
}
