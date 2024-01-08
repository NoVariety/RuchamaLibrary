import { LibBooks } from "../data.consts"
import { requestUrl } from "./api.consts"
import axios from "axios"

const booksRequestUrl = `${requestUrl}/books`

const fetchAllBooks = async () => await axios.get(`${booksRequestUrl}/`)

const doesBookExistByISBN = async (isbn: number) =>
  await axios.get(`${booksRequestUrl}/${isbn}`)

const addBookToDB = async (book: LibBooks) =>
  await axios.post(`${booksRequestUrl}/`, book)

export { fetchAllBooks, doesBookExistByISBN, addBookToDB }
