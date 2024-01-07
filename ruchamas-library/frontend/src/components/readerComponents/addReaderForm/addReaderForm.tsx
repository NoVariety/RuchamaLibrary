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
} from "../../../data.consts"
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react"
import {
  addNewReaderToDB,
  doesReaderExistByID,
} from "../../../APIs/LibReadersAPI"
import { HttpStatusCode } from "axios"

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
  setBookData,
  bookData,
  allPublishers,
}: Props) {
  const methods = useForm<AddReaderFormInput>({ defaultValues })
  const {
    control,
    handleSubmit,
    reset,
    resetField,
    watch,
    register,
    formState,
  } = methods

  const onSubmit = (data: AddReaderFormInput) => {}

  //   async function addBookToDB(): Promise<void> {
  //     try {
  //       const addBookResStatus = (
  //         await addNewBookToDB({
  //           ...bookData,
  //           price: 1,
  //           copies: 1,
  //         })
  //       ).status
  //       if (addBookResStatus === HttpStatusCode.Ok) {
  //         watchISBN !== defaultBookInfo.id &&
  //           alert(`The book: "${bookData.title}" has been added to the database!`) //! change to swal
  //         refreshReadersToDisplay()
  //       } else {
  //         alert(
  //           `An error has occured while trying to add: "${bookData.title}" to the database!`
  //         ) //! change to swal
  //       }
  //     } catch (error) {
  //       console.log("Add New Book To DB Error: " + error)
  //     }
  //   }

  //   async function addNewBook(): Promise<void> {
  //     try {
  //       const doesBookExist = (await doesBookExistByISBN(bookData.id)).data
  //       if (doesBookExist) {
  //         watchISBN !== defaultBookInfo.id &&
  //           alert(`The book: "${bookData.title}" is already in the database!`) //! change to swal
  //       } else {
  //         addBookToDB()
  //       }
  //     } catch (error) {
  //       console.log("Does Book Exist By ISBN Error: " + error)
  //     }
  //   }

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
