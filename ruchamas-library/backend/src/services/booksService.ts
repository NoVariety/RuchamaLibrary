import { fetchAllBooks } from "../repositories/booksRepository"

const getAllBooks = async () => await fetchAllBooks()

export { getAllBooks }
