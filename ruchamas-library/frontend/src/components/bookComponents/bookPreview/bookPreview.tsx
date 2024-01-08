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

import { BookInformation, defaultBookInfo } from "../../../data.consts"

type bookInfoNameValue = {
  infoName: string
  infoValue: any
}

type Props = {
  bookInfo: BookInformation
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
      infoValue: bookInfo.publisher ? bookInfo.publisher.name : "?",
    },
    {
      infoName: "Publication Date",
      infoValue: bookInfo.publishDate.split("-").reverse().join("/"),
    },
    {
      infoName: "Genre",
      infoValue: bookInfo.category,
    },
    {
      infoName: "Format",
      infoValue:
        bookInfo.author !== defaultBookInfo.author ||
        bookInfo.publishDate !== defaultBookInfo.publishDate
          ? bookInfo.coverType
          : "?",
    },
    {
      infoName: "Pages",
      infoValue: bookInfo.pageCount !== 0 ? bookInfo.pageCount : "?",
    },
    {
      infoName: "ISBN",
      infoValue: bookInfo.id !== 0 ? bookInfo.id : "?",
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
