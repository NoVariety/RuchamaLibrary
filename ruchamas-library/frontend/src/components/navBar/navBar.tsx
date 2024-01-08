import { Dispatch, SetStateAction } from "react"

import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material"
import { navFlexGrow } from "./navBarStyle"
import NavViews from "./navViews/navViews"
import { viewTypes } from "../../data.consts"

type Props = {
  views: viewTypes
  setViews: React.Dispatch<React.SetStateAction<viewTypes>>
}

export default function NavBar({ views, setViews }: Props) {
  return (
    <Box sx={navFlexGrow}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={navFlexGrow}>
            Ruchama's Library
          </Typography>
          <NavViews views={views} setViews={setViews} />
        </Toolbar>
      </AppBar>
    </Box>
  )
}
