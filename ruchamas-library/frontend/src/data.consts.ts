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
  format: coverTypes | string
  pages: number | string
  ISBN: number | string
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
  format: "?",
  pages: "?",
  ISBN: "?",
}

export { type bookInformation, defaultBookInfo }
