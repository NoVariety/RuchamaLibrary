import { useEffect, useState } from "react"

import { addBorrowToDB } from "../../../APIs/LibBorrowsAPI"
import { getBookCopiesByISBN } from "../../../APIs/LibBooksAPI"

import {
  buttonSx,
  infoNameSx,
  infoValueSx,
  marginContainerSx,
} from "./bookBorrowStyle"

import {
  ChooseReaderFormInput,
  DropdownOptionsType,
  LibBooks,
  LibBorrows,
  LibReaders,
} from "../../../data.consts"

import { FormInputDropdown } from "../../formComponents/FormInputDropdown"

import { Button, Container, Stack } from "@mui/material"
import { useForm } from "react-hook-form"
import { HttpStatusCode } from "axios"

type Props = {
  book: LibBooks
  readers: Array<LibReaders>
}

export default function BookBorrow({ book, readers }: Props) {
  const methods = useForm<ChooseReaderFormInput>({
    defaultValues: { readerID: "" },
  })
  const { control, handleSubmit, register } = methods

  async function handleBorrow(data: ChooseReaderFormInput): Promise<void> {
    const newReader: LibReaders | undefined = readers.find(
      (rItem) => rItem.id === data.readerID
    )

    const borrow: LibBorrows = {
      book: book,
      reader: newReader,
      borrowDate: new Date(),
      returnDate: null,
    }

    try {
      const borrowStatus = (await addBorrowToDB(borrow)).status
      if (borrowStatus === HttpStatusCode.Ok) {
        try {
          await updateBookCopies()
        } catch (error) {
          console.log("Decrease Copies Count Error: " + error)
        }
      }
    } catch (error) {
      alert("Add Borrow Error: " + error)
    }
  }

  const [bookCopies, setBookCopies] = useState<number>(book.copies)

  async function updateBookCopies(): Promise<void> {
    const resBookCopies: number = (await getBookCopiesByISBN(book.id)).data
    setBookCopies(resBookCopies)
  }

  useEffect(() => {
    updateBookCopies()
  }, [])

  return (
    <Container sx={marginContainerSx} disableGutters>
      <Stack direction="column">
        <Stack direction="row">
          <Container sx={infoNameSx}>Available Copies</Container>
          <Container sx={infoValueSx}>{bookCopies}</Container>
          <Button
            variant="contained"
            onClick={handleSubmit(handleBorrow)}
            disabled={bookCopies < 1}
            sx={buttonSx}
          >
            Borrow
          </Button>
        </Stack>
        {bookCopies > 0 && (
          <FormInputDropdown
            control={control}
            label="reader"
            {...register("readerID", {
              required: true,
            })}
            errorMessage={"Reader must be filled to borrow!"}
            dropdownOptions={
              readers.map((reader) => ({
                key: reader.id,
                value: reader.id,
                label: `${reader.firstName} ${reader.lastName}`,
              })) as DropdownOptionsType
            }
          />
        )}
      </Stack>
    </Container>
  )
}
