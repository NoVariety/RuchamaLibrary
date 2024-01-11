import { Request, Response } from "express"
import {
  getAllBorrows,
  getUnreturnedBorrowsBeforeDate,
  getUnreturnedBorrowsByBookID,
  getUnreturnedBorrowsAmountByBookID,
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

const requestUnreturnedBorrowsBeforeDate = async (
  req: Request,
  res: Response
) => {
  try {
    res.send(await getUnreturnedBorrowsBeforeDate(req.params["date"]))
  } catch (error) {
    res.send(error)
  }
}

const requestUnreturnedBorrowsByBookID = async (
  req: Request,
  res: Response
) => {
  try {
    res.send(await getUnreturnedBorrowsByBookID(req.params["id"]))
  } catch (error) {
    res.send(error)
  }
}

const requestCountUnreturnedBorrowsByBookID = async (
  req: Request,
  res: Response
) => {
  try {
    res.json(await getUnreturnedBorrowsAmountByBookID(req.params["id"]))
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
  requestUnreturnedBorrowsBeforeDate,
  requestUnreturnedBorrowsByBookID,
  requestCountUnreturnedBorrowsByBookID,
  requestFindBorrowByID,
  sendAddBorrowToDB,
  requestReturnBookByID,
}
