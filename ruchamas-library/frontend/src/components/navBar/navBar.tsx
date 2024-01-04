import { Dispatch, SetStateAction } from "react"

import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material"

type Props = {
  setOpenAddBook: Dispatch<SetStateAction<boolean>>
}

export default function NavBar({ setOpenAddBook }: Props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Ruchama's Library
          </Typography>
          <Button
            color="inherit"
            onClick={() => setOpenAddBook((prev) => !prev)}
          >
            +Add Book
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
