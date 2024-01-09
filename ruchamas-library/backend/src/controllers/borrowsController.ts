import { Request, Response } from "express"
import {
  getAllBorrows,
  findBorrowByID,
  insertBorrowToDB,
  deleteBorrowByID,
} from "../services/borrowsService"

const requestAllBorrows = async (req: Request, res: Response) => {
  try {
    res.send(await getAllBorrows())
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

const requestRemoveBorrowByID = async (req: Request, res: Response) => {
  try {
    res.send(await deleteBorrowByID(req.params["id"]))
  } catch (error) {
    res.send(error)
  }
}

export {
  requestAllBorrows,
  requestFindBorrowByID,
  sendAddBorrowToDB,
  requestRemoveBorrowByID,
}
