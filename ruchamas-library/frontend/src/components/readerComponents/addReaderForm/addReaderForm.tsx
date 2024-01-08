import { Dispatch, MutableRefObject, SetStateAction } from "react"

import { Button, Container } from "@mui/material"

import { useForm } from "react-hook-form"

import { FormInputText } from "../../formComponents/FormInputText"

import { addReaderFormContainerSx } from "./addReaderFormStyle"
import {
  AddReaderFormInput,
  LibPublishers,
  BookInformation,
  ID_LENGTH,
  PHONE_NUMBER_LENGTH,
  LibReaders,
} from "../../../data.consts"

import { addReaderToDB, doesReaderExistByID } from "../../../APIs/LibReadersAPI"

type Props = {
  refreshReadersToDisplay: () => void
  defaultValues: AddReaderFormInput
  setBookData: Dispatch<SetStateAction<BookInformation>>
  bookData: BookInformation
  allPublishers: MutableRefObject<LibPublishers[]>
}

export default function AddReaderForm({
  refreshReadersToDisplay,
  defaultValues,
}: Props) {
  const methods = useForm<AddReaderFormInput>({ defaultValues })
  const { control, handleSubmit, reset, register } = methods

  const onSubmit = async (data: AddReaderFormInput) => {
    try {
      const isReaderAlreadyInDB = (await doesReaderExistByID(data.ID)).data
      if (!isReaderAlreadyInDB) {
        addNewReaderToDB(data)
      } else {
        alert("Failed to add reader: Reader is already in DB")
      }
    } catch (error) {
      console.log("Error adding reader to db: " + error)
    }
  }

  async function addNewReaderToDB(
    readerData: AddReaderFormInput
  ): Promise<void> {
    const newReader: LibReaders = {
      id: readerData.ID,
      firstName: readerData.firstName,
      lastName: readerData.lastName,
      email: readerData.email,
      phoneNumber: readerData.phoneNumber,
      joinDate: new Date(),
    }
    try {
      await addReaderToDB(newReader)
      reset()
      refreshReadersToDisplay()
    } catch (error) {
      throw error
    }
  }

  return (
    <Container sx={addReaderFormContainerSx}>
      <FormInputText
        control={control}
        label="ID"
        {...register("ID", {
          minLength: ID_LENGTH,
          maxLength: ID_LENGTH,
          required: true, //! if i have time add validation like a real id has
        })}
        errorMessage={`ID must be a number of ${ID_LENGTH} digits`}
      />
      <FormInputText
        control={control}
        label="First Name"
        {...register("firstName", {
          required: true,
        })}
        errorMessage={`First Name must be filled!`}
      />
      <FormInputText
        control={control}
        label="Last Name"
        {...register("lastName", {
          required: true,
        })}
        errorMessage={`Last Name must be filled!`}
      />
      <FormInputText
        control={control}
        label="Phone Number"
        {...register("phoneNumber", {
          required: true,
          pattern: /^\d{10}$/,
        })}
        errorMessage={`Phone Number must be a number of ${PHONE_NUMBER_LENGTH} digits`}
      />
      <FormInputText
        control={control}
        label="Email"
        {...register("email", {
          required: true,
          pattern: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        })}
        errorMessage={`Invalid Email Address! example of a valid Email Address: ruchama@lib.ra.ry`}
      />

      <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
        Submit
      </Button>
      <Button onClick={() => reset()} variant={"outlined"}>
        Reset
      </Button>
    </Container>
  )
}
