import { Container, Grid, Stack } from "@mui/material"

import { LibReaders } from "../../../data.consts"
import {} from "./showReadersStyle"
import ReaderPreview from "../readerPreview/readerPreview"
import { breaklineContainerSx } from "../readerPreview/readerPreviewStyle"

type Props = {
  readers: Array<LibReaders>
}

export default function ShowReaders({ readers }: Props) {
  return (
    <Container>
      <ReaderPreview
        reader={{
          id: "ID Number",
          firstName: "First Name",
          lastName: "Last Name",
          email: "Email Address",
          phoneNumber: "Phone Number",
          joinDate: "Join Date",
        }}
      />
      <Container sx={breaklineContainerSx} disableGutters></Container>

      {readers.map((reader) => {
        return <ReaderPreview reader={reader} />
      })}
    </Container>
  )
}
