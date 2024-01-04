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

export { fetchAllBooks, checkIfBookExists, saveBookToDB }
