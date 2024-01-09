import LibBorrows from "../models/libBorrows"
import {
  fetchAllBorrows,
  fetchBorrowsByID,
  addBorrowToDB,
  removeBorrowByID,
} from "../repositories/borrowsRepository"

const getAllBorrows = async () => await fetchAllBorrows()

const findBorrowByID = async (id: number) => await fetchBorrowsByID(id)

const insertBorrowToDB = async (book: LibBorrows) => await addBorrowToDB(book)

const deleteBorrowByID = async (id: number) => await removeBorrowByID(id)

export { getAllBorrows, findBorrowByID, insertBorrowToDB, deleteBorrowByID }
