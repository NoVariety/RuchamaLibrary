enum coverTypes {
  HARDCOVER = "Hardcover",
  PAPERBACK = "Paperback",
}

interface Publisher {
  name: string
  foundingDate: Date
  originCountry: string
}

type DropdownOptionsType = Array<{
  key: string
  value: string
  label: string
}>

interface bookInformation {
  summary: string
  title: string
  coverImage: string
  author: string
  language: string
  publisher: Publisher | null
  publicationDate: string
  genre: string
  format: coverTypes
  pages: number
  ISBN: number
}

interface FormInputProps {
  name: string
  control: any
  label: string
  setValue?: any
  errorMessage?: string
  dropdownOptions?: DropdownOptionsType
}

interface FormInput {
  ISBN: number
  publisherName: string
  pageCount: number
  printFormat: coverTypes
}

const defaultBookInfo: bookInformation = {
  summary: "?",
  title: "?",
  coverImage:
    "https://cdn.bookauthority.org/dist/images/book-cover-not-available.6b5a104fa66be4eec4fd16aebd34fe04.png",
  author: "?",
  language: "?",
  publisher: null,
  publicationDate: "?",
  genre: "?",
  format: coverTypes.HARDCOVER,
  pages: 0,
  ISBN: 0,
}

const ISBN_LENGTH: number = 13

export {
  coverTypes,
  type Publisher,
  type bookInformation,
  type FormInputProps,
  type FormInput,
  type DropdownOptionsType,
  defaultBookInfo,
  ISBN_LENGTH,
}
