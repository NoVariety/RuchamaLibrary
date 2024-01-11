import LibBorrows from "../models/libBorrows"
import {
  fetchAllBorrows,
  fetchUnreturnedBorrowsBeforeDate,
  fetchUnreturnedBorrowsByBookID,
  countUnreturnedBorrowByBookID,
  fetchBorrowsByID,
  addBorrowToDB,
  returnBookByID,
} from "../repositories/borrowsRepository"

const getAllBorrows = async () => await fetchAllBorrows()

const getUnreturnedBorrowsBeforeDate = async (date: Date) =>
  await fetchUnreturnedBorrowsBeforeDate(date)

const getUnreturnedBorrowsByBookID = async (bookID: number) =>
  await fetchUnreturnedBorrowsByBookID(bookID)

const getUnreturnedBorrowsAmountByBookID = async (bookID: number) =>
  await countUnreturnedBorrowByBookID(bookID)

const findBorrowByID = async (id: number) => await fetchBorrowsByID(id)

const insertBorrowToDB = async (borrow: LibBorrows) =>
  await addBorrowToDB(borrow)

const returnBookBorrowByID = async (id: number) => await returnBookByID(id)

export {
  getAllBorrows,
  getUnreturnedBorrowsBeforeDate,
  getUnreturnedBorrowsByBookID,
  getUnreturnedBorrowsAmountByBookID,
  findBorrowByID,
  insertBorrowToDB,
  returnBookBorrowByID,
}
