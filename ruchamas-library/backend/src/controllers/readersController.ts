import { Request, Response } from "express"
import {
  getAllReaders,
  findIfReaderExists,
  addReaderToDB,
} from "../services/readersService"

const requestAllReaders = async (req: Request, res: Response) => {
  try {
    res.send(await getAllReaders())
  } catch (error) {
    res.send(error)
  }
}

const requestFindIfReaderExists = async (req: Request, res: Response) => {
  try {
    res.send(await findIfReaderExists(req.params["id"]))
  } catch (error) {
    res.send(error)
  }
}

const sendAddReaderToDB = async (req: Request, res: Response) => {
  try {
    res.send(await addReaderToDB(req.body))
  } catch (error) {
    res.send(error)
  }
}

export { requestAllReaders, requestFindIfReaderExists, sendAddReaderToDB }
