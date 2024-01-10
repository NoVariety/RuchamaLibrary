import React, { useEffect, useState } from "react"

import {
  addButtonSx,
  appBackgroundSx,
  appContainerSx,
  getDesignTokens,
  propertyContainerSx,
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

import { LibBooks, LibReaders, viewTypes } from "./data.consts"
import { fetchAllBooks } from "./APIs/LibBooksAPI"
import AddReader from "./components/readerComponents/addReader/addReader"
import { fetchAllReaders } from "./APIs/LibReadersAPI"
import ShowReaders from "./components/readerComponents/showReaders/showReaders"

function App() {
  const [mode, setMode] = React.useState<PaletteMode>("light")
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        )
      },
    }),
    []
  )
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode])

  const [books, setBooks] = useState<Array<LibBooks>>()
  const [readers, setReaders] = useState<Array<LibReaders>>()

  const [views, setViews] = useState<viewTypes>(viewTypes.BOOKS)

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
      <Container sx={appBackgroundSx} disableGutters>
        <NavBar views={views} setViews={setViews} />
        <Container sx={appContainerSx}>
          {views === viewTypes.BOOKS && (
            <Container sx={propertyContainerSx}>
              {openAddBook && (
                <AddBook refreshBooksToDisplay={refreshBooksToDisplay} />
              )}
              {books && readers && (
                <ShowBooks books={books} readers={readers} />
              )}
              <Button
                color="primary"
                variant="contained"
                onClick={() => setOpenAddBook((prev) => !prev)}
                sx={addButtonSx}
              >
                {`${openAddBook ? "-" : "+"}Add Book`}
              </Button>
            </Container>
          )}

          {views === viewTypes.READERS && (
            <Container sx={propertyContainerSx}>
              {openAddReader && (
                <AddReader refreshReadersToDisplay={refreshReadersToDisplay} />
              )}
              {readers && <ShowReaders readers={readers} />}
              <Button
                color="primary"
                variant="contained"
                onClick={() => setOpenAddReader((prev) => !prev)}
                sx={addButtonSx}
              >
                {`${openAddReader ? "-" : "+"}Add Reader`}
              </Button>
            </Container>
          )}
        </Container>
      </Container>
    </ThemeProvider>
  )
}

export default App
