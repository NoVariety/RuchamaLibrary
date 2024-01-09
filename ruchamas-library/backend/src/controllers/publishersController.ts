import { Request, Response } from "express"
import { getAllPublishers } from "../services/publishersService"

const requestAllPublishers = async (req: Request, res: Response) => {
  try {
    res.send(await getAllPublishers())
  } catch (error) {
    res.send(error)
  }
}

export { requestAllPublishers }
