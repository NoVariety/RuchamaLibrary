import LibBooks from "../models/libBooks"
import {
  fetchAllBooks,
  checkIfBookExists,
  saveBookToDB,
  getBookByISBN,
} from "../repositories/booksRepository"

const getAllBooks = async () => await fetchAllBooks()

const findIfBookExists = async (isbn: number) => await checkIfBookExists(isbn)

const addBookToDB = async (book: LibBooks) => await saveBookToDB(book)

const getBookCopiesByISBN = async (isbn: number) =>
  (await getBookByISBN(isbn)).copies

export { getAllBooks, findIfBookExists, addBookToDB, getBookCopiesByISBN }
