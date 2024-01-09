import { useState } from "react"

import { addBorrowToDB } from "../../../APIs/LibBorrowsAPI"

import { buttonSx, marginContainerSx } from "./bookBorrowStyle"

import {
  ChooseReaderFormInput,
  DropdownOptionsType,
  LibBooks,
  LibBorrows,
  LibReaders,
  defaultReaderInfo,
} from "../../../data.consts"

import { FormInputDropdown } from "../../formComponents/FormInputDropdown"

import { Button, Container, Stack } from "@mui/material"
import { useForm } from "react-hook-form"

type Props = {
  book: LibBooks
  readers: Array<LibReaders>
}

export default function BookBorrow({ book, readers }: Props) {
  const [reader, setReader] = useState<LibReaders>(defaultReaderInfo)

  const methods = useForm<ChooseReaderFormInput>()
  const { control, handleSubmit, register, watch } = methods

  const watchReader = watch("reader")

  async function handleBorrow(data: ChooseReaderFormInput): Promise<void> {
    const borrow: LibBorrows = {
      book: book,
      reader: data.reader,
      borrowDate: new Date(),
      returnDate: null,
    }

    await addBorrowToDB(borrow)
  }

  function checkIsBookInStock(): boolean {
    return true // todo: add request to check if book is in stock aka copies > 0
  }

  const [isBookInStock, setIsBookInStock] = useState<boolean>(
    checkIsBookInStock()
  )

  return (
    <Container sx={marginContainerSx} disableGutters>
      <Stack direction="column">
        <Button
          variant="contained"
          onClick={handleSubmit(handleBorrow)}
          disabled={
            !isBookInStock ||
            JSON.stringify(watchReader) === JSON.stringify(reader)
          }
          sx={buttonSx}
        >
          Borrow
        </Button>
        <FormInputDropdown
          control={control}
          label="reader"
          {...register("reader", {
            required: true,
          })}
          errorMessage={`Reader must be filled to borrow!`}
          dropdownOptions={
            readers.map((reader) => ({
              key: `${reader.firstName} ${reader.lastName}`,
              value: reader.id,
              label: `${reader.firstName} ${reader.lastName}`,
            })) as DropdownOptionsType
          }
        />
      </Stack>
    </Container>
  )
}
