import { Dispatch, SetStateAction } from "react"

import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material"
import { navFlexGrow } from "./navBarStyle"

type Props = {
  openAddBook: boolean
  setOpenAddBook: Dispatch<SetStateAction<boolean>>
  openAddReader: boolean
  setOpenAddReader: Dispatch<SetStateAction<boolean>>
}

export default function NavBar({
  openAddBook,
  setOpenAddBook,
  openAddReader,
  setOpenAddReader,
}: Props) {
  return (
    <Box sx={navFlexGrow}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={navFlexGrow}>
            Ruchama's Library
          </Typography>
          <Button
            color="inherit"
            onClick={() => setOpenAddReader((prev) => !prev)}
          >
            {`${openAddReader ? "-" : "+"}Add Reader`}
          </Button>
          <Button
            color="inherit"
            onClick={() => setOpenAddBook((prev) => !prev)}
          >
            {`${openAddBook ? "-" : "+"}Add Book`}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
