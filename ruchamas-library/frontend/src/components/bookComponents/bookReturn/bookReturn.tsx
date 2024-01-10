import { useEffect, useState } from "react"

import {
  borrowsByBookID,
  countBorrowsByBookID,
  returnBookByBorrowID,
} from "../../../APIs/LibBorrowsAPI"

import {
  buttonSx,
  infoNameSx,
  infoValueSx,
  marginContainerSx,
} from "./bookReturnStyle"

import {
  ChooseBorrowFormInput,
  DropdownOptionsType,
  LibBooks,
  LibBorrows,
} from "../../../data.consts"

import { FormInputDropdown } from "../../formComponents/FormInputDropdown"

import { Button, Container, Stack } from "@mui/material"
import { useForm } from "react-hook-form"

type Props = {
  book: LibBooks
}

export default function BookReturn({ book }: Props) {
  const methods = useForm<ChooseBorrowFormInput>({
    defaultValues: {},
  })
  const { control, handleSubmit, register } = methods

  const [borrows, setBorrows] = useState<Array<LibBorrows>>()

  async function updateBorrows(): Promise<void> {
    const resBorrows = (await borrowsByBookID(book.id)).data
    setBorrows(resBorrows)
  }

  useEffect(() => {
    updateBorrows()
  }, [])

  async function handleReturn(data: ChooseBorrowFormInput): Promise<void> {
    await returnBookByBorrowID(data.borrowID)

    console.log(data.borrowID)
    updateBorrows()
  }

  const [bookBorrows, setBookBorrows] = useState<number>()

  async function updateBookBorrows(): Promise<void> {
    const resBookBorrows: number = (await countBorrowsByBookID(book.id)).data
    setBookBorrows(resBookBorrows)
  }

  useEffect(() => {
    updateBookBorrows()
  }, [borrows])

  const isReturnDisabled = (): boolean =>
    bookBorrows === undefined || bookBorrows < 1

  return (
    <Container sx={marginContainerSx} disableGutters>
      <Stack direction="column">
        <Stack direction="row">
          <Container sx={infoNameSx}>Borrowed Copies</Container>
          <Container sx={infoValueSx}>{bookBorrows}</Container>
          <Button
            variant="contained"
            onClick={handleSubmit(handleReturn)}
            disabled={isReturnDisabled()}
            sx={buttonSx}
          >
            Return
          </Button>
        </Stack>
        {borrows && bookBorrows !== undefined && bookBorrows > 0 && (
          <FormInputDropdown
            control={control}
            label="borrow"
            {...register("borrowID", {
              required: true,
            })}
            errorMessage={"Reader must be filled to borrow!"}
            dropdownOptions={
              borrows.map((borrow) => ({
                key: borrow.id,
                value: borrow.id,
                label: `${borrow.reader?.firstName} ${borrow.reader?.lastName} borrrowed ${borrow.book.title} at ${borrow.borrowDate}`,
              })) as DropdownOptionsType
            }
          />
        )}
      </Stack>
    </Container>
  )
}
