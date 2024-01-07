enum coverTypes {
  HARDCOVER = "Hardcover",
  PAPERBACK = "Paperback",
}

type DropdownOptionsType = Array<{
  key: string
  value: string
  label: string
}>

interface BookInformation {
  id: number
  title: string
  coverImage: string
  author: string
  summary: string
  publisher: LibPublishers | null
  publishDate: string
  language: string
  category: string
  coverType: coverTypes
  pageCount: number
}

interface LibPublishers {
  name: string
  foundingDate: Date
  originCountry: string
}

interface LibBooks extends BookInformation {
  price: number
  copies: number
}

interface LibReaders {
  id: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  joinDate: Date
}

interface LibReadersTitles {
  id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  joinDate: string
}

interface FormInputProps {
  name: string
  control: any
  label: string
  setValue?: any
  errorMessage?: string
  dropdownOptions?: DropdownOptionsType
}

interface AddBookFormInput {
  ISBN: number
  publisherName: string
  pageCount: number
  printFormat: coverTypes
}

interface AddReaderFormInput {
  ID: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
}

const defaultBookInfo: BookInformation = {
  summary: "no summary available",
  title: "?",
  coverImage:
    "https://cdn.bookauthority.org/dist/images/book-cover-not-available.6b5a104fa66be4eec4fd16aebd34fe04.png",
  author: "?",
  language: "?",
  publisher: null,
  publishDate: "?",
  category: "?",
  coverType: coverTypes.HARDCOVER,
  pageCount: 0,
  id: 0,
}

const ISBN_LENGTH: number = 13
const ID_LENGTH: number = 9
const PHONE_NUMBER_LENGTH: number = 10

export {
  coverTypes,
  type DropdownOptionsType,
  type BookInformation,
  type LibPublishers,
  type LibBooks,
  type LibReaders,
  type LibReadersTitles,
  type FormInputProps,
  type AddBookFormInput,
  type AddReaderFormInput,
  defaultBookInfo,
  ISBN_LENGTH,
  ID_LENGTH,
  PHONE_NUMBER_LENGTH,
}
