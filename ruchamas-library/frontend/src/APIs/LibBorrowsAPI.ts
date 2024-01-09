import { LibBorrows } from "../data.consts"
import { requestUrl } from "./api.consts"
import axios from "axios"

const borrowsRequestUrl = `${requestUrl}/borrows`

const fetchAllBorrows = async () => await axios.get(`${borrowsRequestUrl}/`)

const fetchBorrowsByID = async (id: number) =>
  await axios.get(`${borrowsRequestUrl}/${id}`)

const addBorrowToDB = async (borrow: LibBorrows) =>
  await axios.post(`${borrowsRequestUrl}/`, borrow)

const removeBorrowByID = async (id: number) =>
  await axios.delete(`${borrowsRequestUrl}/${id}`)

export { fetchAllBorrows, fetchBorrowsByID, addBorrowToDB, removeBorrowByID }
