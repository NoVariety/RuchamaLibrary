import { Container, Stack, Tooltip, Typography } from "@mui/material"
import {
  getCoverImageSx,
  infoNameSx,
  infoStackSx,
  infoValueSx,
  marginContainerSx,
  summaryIconSx,
  titleSx,
} from "./bookPreviewStyle"

import { bookInformation, defaultBookInfo } from "../../../data.consts"

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
      infoValue:
        bookInfo.author !== defaultBookInfo.author ||
        bookInfo.publicationDate !== defaultBookInfo.publicationDate
          ? bookInfo.publisher
          : "?",
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
      infoValue:
        bookInfo.author !== defaultBookInfo.author ||
        bookInfo.publicationDate !== defaultBookInfo.publicationDate
          ? bookInfo.format
          : "?",
    },
    {
      infoName: "Pages",
      infoValue: bookInfo.pages !== 0 ? bookInfo.pages : "?",
    },
    {
      infoName: "ISBN",
      infoValue: bookInfo.ISBN !== 0 ? bookInfo.ISBN : "?",
    },
  ]

  return (
    <Container sx={marginContainerSx}>
      <Stack direction="column">
        <Container sx={titleSx}>
          {bookInfo.title}
          <Tooltip title={bookInfo.summary} arrow>
            <Container sx={summaryIconSx} disableGutters></Container>
          </Tooltip>
        </Container>

        <Container sx={getCoverImageSx(bookInfo.coverImage)}></Container>

        {bookInfoMap.map((item) => {
          return (
            <Stack direction="row" sx={infoStackSx}>
              <Typography sx={infoNameSx} key={item.infoName}>
                {item.infoName}
              </Typography>
              <Typography sx={infoValueSx} key={item.infoValue}>
                {item.infoValue}
              </Typography>
            </Stack>
          )
        })}
      </Stack>
    </Container>
  )
}
