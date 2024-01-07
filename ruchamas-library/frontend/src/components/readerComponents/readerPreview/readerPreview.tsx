import { Container, Stack } from "@mui/material"

import { LibReaders, LibReadersTitles } from "../../../data.consts"
import { readerContainerSx, readerInfoTextSx } from "./readerPreviewStyle"

type Props = {
  reader: LibReaders | LibReadersTitles
}

export default function ReaderPreview({ reader }: Props) {
  return (
    <Container sx={readerContainerSx} disableGutters>
      <Stack direction="row">
        <Container sx={readerInfoTextSx}>{reader.id}</Container>
        <Container sx={readerInfoTextSx}>{reader.firstName}</Container>
        <Container sx={readerInfoTextSx}>{reader.lastName}</Container>
        <Container sx={readerInfoTextSx}>{reader.email}</Container>
        <Container sx={readerInfoTextSx}>{reader.phoneNumber}</Container>
        <Container sx={readerInfoTextSx}>
          {reader.joinDate.toLocaleString().split("-").reverse().join("/")}
        </Container>
      </Stack>
    </Container>
  )
}
