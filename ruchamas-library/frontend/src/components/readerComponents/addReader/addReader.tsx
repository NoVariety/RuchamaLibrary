import { Container } from "@mui/material"

import { useRef, useState } from "react"

import { mainContainerSx, componentTitleSx } from "./addReaderStyle"

import {
  LibPublishers,
  BookInformation,
  defaultBookInfo,
  AddReaderFormInput,
} from "../../../data.consts"

import AddReaderForm from "../addReaderForm/addReaderForm"
import { fetchAllPublishers } from "../../../APIs/LibPublishersAPI"

type Props = {
  refreshReadersToDisplay: () => void
}

export default function AddReader({ refreshReadersToDisplay }: Props) {
  const [bookData, setBookData] = useState<BookInformation>(defaultBookInfo)

  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false)

  const allPublishers = useRef<LibPublishers[]>([])

  async function initializePublisherList(): Promise<void> {
    try {
      allPublishers.current = (await fetchAllPublishers()).data
      setIsDataLoaded(true)
    } catch (error) {
      console.log("addBook Error: " + error) //! replace with swal or smthing
    }
  }

  initializePublisherList()

  return (
    <Container sx={mainContainerSx} disableGutters>
      <Container sx={componentTitleSx}>ADD READER</Container>
      {isDataLoaded && (
        <AddReaderForm
          defaultValues={{
            ID: 0,
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
          }}
          refreshReadersToDisplay={refreshReadersToDisplay}
          setBookData={setBookData}
          bookData={bookData}
          allPublishers={allPublishers}
        />
      )}
    </Container>
  )
}
