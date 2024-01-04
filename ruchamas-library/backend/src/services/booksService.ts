import LibBooks from "../models/libBooks"
import {
  fetchAllBooks,
  checkIfBookExists,
  saveBookToDB,
} from "../repositories/booksRepository"

const getAllBooks = async () => await fetchAllBooks()

const findIfBookExists = async (isbn: number) => await checkIfBookExists(isbn)

const addBookToDB = async (book: LibBooks) => await saveBookToDB(book)

export { getAllBooks, findIfBookExists, addBookToDB }
