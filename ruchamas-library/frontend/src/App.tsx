import React from "react"

import { appContainerSx, getDesignTokens } from "./AppStyle"

import {
  Button,
  Container,
  PaletteMode,
  ThemeProvider,
  createTheme,
} from "@mui/material"
import AddBook from "./components/bookComponents/addBook/addBook"

function App() {
  const [mode, setMode] = React.useState<PaletteMode>("light")
  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        )
      },
    }),
    []
  )
  // Update the theme only if the mode changes
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode])

  return (
    <ThemeProvider theme={theme}>
      <Container sx={appContainerSx}>
        <AddBook />
      </Container>
    </ThemeProvider>
  )
}

export default App
