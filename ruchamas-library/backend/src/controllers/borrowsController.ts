import { Request, Response } from "express"
import {
  getAllBorrows,
  getAllBorrowsByBookID,
  getBorrowsAmountByBookID,
  findBorrowByID,
  insertBorrowToDB,
  returnBookBorrowByID,
} from "../services/borrowsService"

const requestAllBorrows = async (req: Request, res: Response) => {
  try {
    res.send(await getAllBorrows())
  } catch (error) {
    res.send(error)
  }
}

const requestAllBorrowsByBookID = async (req: Request, res: Response) => {
  try {
    res.send(await getAllBorrowsByBookID(req.params["id"]))
  } catch (error) {
    res.send(error)
  }
}

const requestCountBorrowsByBookID = async (req: Request, res: Response) => {
  try {
    res.json(await getBorrowsAmountByBookID(req.params["id"]))
  } catch (error) {
    res.send(error)
  }
}

const requestFindBorrowByID = async (req: Request, res: Response) => {
  try {
    res.send(await findBorrowByID(req.params["id"]))
  } catch (error) {
    res.send(error)
  }
}

const sendAddBorrowToDB = async (req: Request, res: Response) => {
  try {
    res.send(await insertBorrowToDB(req.body))
  } catch (error) {
    res.send(error)
  }
}

const requestReturnBookByID = async (req: Request, res: Response) => {
  try {
    res.send(await returnBookBorrowByID(req.params["id"]))
  } catch (error) {
    res.send(error)
  }
}

export {
  requestAllBorrows,
  requestAllBorrowsByBookID,
  requestCountBorrowsByBookID,
  requestFindBorrowByID,
  sendAddBorrowToDB,
  requestReturnBookByID,
}
