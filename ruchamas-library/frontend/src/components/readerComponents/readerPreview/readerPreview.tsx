import { Container, Stack } from "@mui/material"

import { LibReaders, LibReadersTitles } from "../../../data.consts"
import { getReaderInfoTextSx } from "./readerPreviewStyle"

type Props = {
  reader: LibReaders | LibReadersTitles
  isTitle: boolean
}

export default function ReaderPreview({ reader, isTitle }: Props) {
  return (
    <Stack direction="row">
      <Container sx={getReaderInfoTextSx(isTitle)}>{reader.id}</Container>
      <Container sx={getReaderInfoTextSx(isTitle)}>
        {reader.firstName}
      </Container>
      <Container sx={getReaderInfoTextSx(isTitle)}>{reader.lastName}</Container>
      <Container sx={getReaderInfoTextSx(isTitle)}>{reader.email}</Container>
      <Container sx={getReaderInfoTextSx(isTitle)}>
        {reader.phoneNumber}
      </Container>
      <Container sx={getReaderInfoTextSx(isTitle)}>
        {reader.joinDate?.toLocaleString().split("-").reverse().join("/")}
      </Container>
    </Stack>
  )
}
