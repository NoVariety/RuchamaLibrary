import { Request, Response } from "express"
import {
  getAllBooks,
  findIfBookExists,
  addBookToDB,
} from "../services/booksService"

//! add middleware instead of try catch
const requestAllBooks = async (req: Request, res: Response) => {
  try {
    res.send(await getAllBooks())
  } catch (error) {
    res.send(error)
  }
}

const requestFindIfBookExists = async (req: Request, res: Response) => {
  try {
    res.send(await findIfBookExists(req.params["isbn"]))
  } catch (error) {
    res.send(error)
  }
}

const sendAddBookToDB = async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    console.log(res.body)
    res.send(await addBookToDB(req.body))
  } catch (error) {
    res.send(error)
  }
}

export { requestAllBooks, requestFindIfBookExists, sendAddBookToDB }
