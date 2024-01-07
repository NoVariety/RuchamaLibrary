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

import { LibBooks, LibReaders } from "./data.consts"
import { fetchAllBooks } from "./APIs/LibBooksAPI"
import AddReader from "./components/readerComponents/addReader/addReader"
import { fetchAllReaders } from "./APIs/LibReadersAPI"
import ShowReaders from "./components/readerComponents/showReaders/showReaders"

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
  const [readers, setReaders] = useState<Array<LibReaders>>()

  const [openAddBook, setOpenAddBook] = useState<boolean>(false)
  const [openAddReader, setOpenAddReader] = useState<boolean>(false)

  useEffect(() => {
    refreshBooksToDisplay()
    refreshReadersToDisplay()
  }, [])

  async function refreshBooksToDisplay(): Promise<void> {
    try {
      const allBooksData = (await fetchAllBooks()).data
      setBooks(allBooksData)
    } catch (error) {
      alert("Failed to fetch books from DB")
    }
  }

  async function refreshReadersToDisplay(): Promise<void> {
    try {
      const allReadersData = (await fetchAllReaders()).data
      setReaders(allReadersData)
    } catch (error) {
      alert("Failed to fetch books from DB")
    }
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
          {openAddReader && (
            <AddReader refreshReadersToDisplay={refreshReadersToDisplay} />
          )}
          {openAddBook && (
            <AddBook refreshBooksToDisplay={refreshBooksToDisplay} />
          )}
        </Container>
        <Container sx={propertyContainerSx}>
          {books && <ShowBooks books={books} />}
        </Container>
        <Container sx={propertyContainerSx}>
          {readers && <ShowReaders readers={readers} />}
        </Container>
        <Button
          variant="contained"
          onClick={refreshBooksToDisplay}
          sx={refreshButtonSx}
        >
          Refresh Books
        </Button>
      </Container>
    </ThemeProvider>
  )
}

export default App
