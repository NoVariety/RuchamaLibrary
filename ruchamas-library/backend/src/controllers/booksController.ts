import { Request, Response } from "express"
import { getAllBooks } from "../services/booksService"

//! add middleware instead of try catch
const requestAllBooks = async (req: Request, res: Response) => {
  try {
    res.send(await getAllBooks())
  } catch (error) {
    res.send(error)
  }
}

export { requestAllBooks }
