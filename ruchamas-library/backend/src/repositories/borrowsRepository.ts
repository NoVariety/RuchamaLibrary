import { AppDataSource } from "../dataSource"
import LibBooks from "../models/libBooks"
import LibBorrows from "../models/libBorrows"

const borrowsRepository = AppDataSource.getRepository(LibBorrows)

const fetchAllBorrows = async () =>
  await borrowsRepository.find({ relations: { book: true, reader: true } })

const fetchBorrowsByID = async (id: number) =>
  await borrowsRepository.find({
    where: { id: id },
    relations: { book: true, reader: true },
  })

const addBorrowToDB = async (book: LibBorrows) =>
  await borrowsRepository.save(book)

const removeBorrowByID = async (id: number) => {
  const borrowToRemove: LibBorrows[] = await borrowsRepository.find({
    where: { id: id },
  })
  await borrowsRepository.remove(borrowToRemove)
}

export { fetchAllBorrows, fetchBorrowsByID, addBorrowToDB, removeBorrowByID }
