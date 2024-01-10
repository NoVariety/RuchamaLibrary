import LibBorrows from "../models/libBorrows"
import {
  fetchAllBorrows,
  fetchAllBorrowsByBookID,
  fetchBorrowCountByBookID,
  fetchBorrowsByID,
  addBorrowToDB,
  returnBookByID,
} from "../repositories/borrowsRepository"

const getAllBorrows = async () => await fetchAllBorrows()

const getAllBorrowsByBookID = async (bookID: number) =>
  await fetchAllBorrowsByBookID(bookID)

const getBorrowsAmountByBookID = async (bookID: number) =>
  await fetchBorrowCountByBookID(bookID)

const findBorrowByID = async (id: number) => await fetchBorrowsByID(id)

const insertBorrowToDB = async (borrow: LibBorrows) =>
  await addBorrowToDB(borrow)

const returnBookBorrowByID = async (id: number) => await returnBookByID(id)

export {
  getAllBorrows,
  getAllBorrowsByBookID,
  getBorrowsAmountByBookID,
  findBorrowByID,
  insertBorrowToDB,
  returnBookBorrowByID,
}
