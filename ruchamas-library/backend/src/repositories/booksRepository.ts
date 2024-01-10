import LibBooks from "../models/libBooks"
import { AppDataSource } from "../dataSource"

const bookRepository = AppDataSource.getRepository(LibBooks)

const fetchAllBooks = async () =>
  await bookRepository.find({
    relations: {
      publisher: true,
    },
  })

const checkIfBookExists = async (isbn: number) =>
  await bookRepository.exist({ where: { id: isbn } })

const saveBookToDB = async (book: LibBooks) => await bookRepository.save(book)

const borrowBookByISBN = async (isbn: number) => {
  const bookToUpdate = await bookRepository.findOne({ where: { id: isbn } })
  await bookRepository.save({
    ...bookToUpdate,
    copies: bookToUpdate.copies - 1,
  })
}

const returnBookByISBN = async (isbn: number) => {
  const bookToUpdate = await bookRepository.findOne({ where: { id: isbn } })
  await bookRepository.save({
    ...bookToUpdate,
    copies: bookToUpdate.copies + 1,
  })
}

const getBookByISBN = async (isbn: number) =>
  await bookRepository.findOne({ where: { id: isbn } })

export {
  fetchAllBooks,
  checkIfBookExists,
  saveBookToDB,
  borrowBookByISBN,
  returnBookByISBN,
  getBookByISBN,
}
