enum coverTypes {
  HARDCOVER = "Hardcover",
  PAPERBACK = "Paperback",
}

interface bookInformation {
  summary: string
  title: string
  coverImage: string
  author: string
  language: string
  publisher: string
  publicationDate: string
  genre: string
  format: coverTypes
  pages: number
  ISBN: number
}

const defaultBookInfo: bookInformation = {
  summary: "?",
  title: "?",
  coverImage:
    "https://cdn.bookauthority.org/dist/images/book-cover-not-available.6b5a104fa66be4eec4fd16aebd34fe04.png",
  author: "?",
  language: "?",
  publisher: "?",
  publicationDate: "?",
  genre: "?",
  format: coverTypes.PAPERBACK,
  pages: 0,
  ISBN: 0,
}

interface FormInputProps {
  name: string
  control: any
  label: string
  setValue?: any
  showValue?: any
}

interface FormInput {
  ISBN: number
  publisher: string //! set to publisher object
  pageCount: number
  printFormat: coverTypes
}

export {
  coverTypes,
  type bookInformation,
  type FormInputProps,
  type FormInput,
  defaultBookInfo,
}
