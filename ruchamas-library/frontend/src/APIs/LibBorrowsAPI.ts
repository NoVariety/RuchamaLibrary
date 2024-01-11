import { LibBorrows } from "../data.consts"
import { requestUrl } from "./api.consts"
import axios from "axios"

const borrowsRequestUrl = `${requestUrl}/borrows`

const fetchAllBorrows = async () => await axios.get(`${borrowsRequestUrl}/`)

const fetchUnreturnedBorrowsBeforeDate = async (date: string) =>
  await axios.get(`${borrowsRequestUrl}/before-date/${date}/unreturned`)

const borrowsByBookID = async (bookID: number) =>
  await axios.get(`${borrowsRequestUrl}/by-book/${bookID}/unreturned`)

const countBorrowsByBookID = async (bookID: number) =>
  await axios.get(`${borrowsRequestUrl}/by-book/${bookID}/count/unreturned`)

const fetchBorrowsByID = async (id: number) =>
  await axios.get(`${borrowsRequestUrl}/${id}`)

const addBorrowToDB = async (borrow: LibBorrows) =>
  await axios.post(`${borrowsRequestUrl}/`, borrow)

const returnBookByBorrowID = async (id: number) =>
  await axios.patch(`${borrowsRequestUrl}/${id}`)

export {
  fetchAllBorrows,
  fetchUnreturnedBorrowsBeforeDate,
  borrowsByBookID,
  countBorrowsByBookID,
  fetchBorrowsByID,
  addBorrowToDB,
  returnBookByBorrowID,
}
