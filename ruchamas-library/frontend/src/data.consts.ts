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

interface BookInformation {
  id: number
  title: string
  coverImage: string
  author: string
  summary: string
  publisher: Publisher | null
  publishDate: string
  language: string
  category: string
  coverType: coverTypes
  pageCount: number
}

interface LibBooks extends BookInformation {
  price: number
  copies: number
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

export {
  coverTypes,
  type Publisher,
  type BookInformation,
  type LibBooks,
  type FormInputProps,
  type FormInput,
  type DropdownOptionsType,
  defaultBookInfo,
  ISBN_LENGTH,
}
