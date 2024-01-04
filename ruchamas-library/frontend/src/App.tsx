import React, { useEffect, useState } from "react"

import {
  appContainerSx,
  getDesignTokens,
  propertyContainerSx,
  refreshButtonSx,
} from "./AppStyle"

import {
  Button,
  Container,
  PaletteMode,
  ThemeProvider,
  createTheme,
} from "@mui/material"

import AddBook from "./components/bookComponents/addBook/addBook"
import ShowBooks from "./components/bookComponents/showBooks/showBooks"
import NavBar from "./components/navBar/navBar"

import { LibBooks } from "./data.consts"
import { fetchAllBooks } from "./APIs/LibBooksAPI"
import AddReader from "./components/readerComponents/addReader/addReader"

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

  const [books, setBooks] = useState<Array<LibBooks>>()

  const [openAddBook, setOpenAddBook] = useState<boolean>(false)
  const [openAddReader, setOpenAddReader] = useState<boolean>(false)

  useEffect(() => {
    getBooksFromDB()
  }, [])

  function getBooksFromDB(): void {
    fetchAllBooks()
      .then((response) => {
        setBooks(response.data)
      })
      .catch((error) => console.log("Failed to fetch books from DB"))
  }

  return (
    <ThemeProvider theme={theme}>
      <NavBar
        openAddBook={openAddBook}
        setOpenAddBook={setOpenAddBook}
        openAddReader={openAddReader}
        setOpenAddReader={setOpenAddReader}
      />
      <Container sx={appContainerSx}>
        <Container sx={propertyContainerSx}>
          {openAddReader && <AddReader />}
          {openAddBook && <AddBook />}
        </Container>
        <Container sx={propertyContainerSx}>
          {books && <ShowBooks books={books} />}
        </Container>
        <Button
          variant="contained"
          onClick={getBooksFromDB}
          sx={refreshButtonSx}
        >
          Refresh Books
        </Button>
      </Container>
    </ThemeProvider>
  )
}

export default App
