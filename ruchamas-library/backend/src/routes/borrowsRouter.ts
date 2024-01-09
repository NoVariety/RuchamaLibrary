import {
  requestAllBorrows,
  requestFindBorrowByID,
  sendAddBorrowToDB,
  requestRemoveBorrowByID,
} from "../controllers/borrowsController"
import jsonParser from "../utils/jsonParser"
import * as express from "express"

const borrowsRouter = express.Router()

borrowsRouter.get("/", requestAllBorrows)
borrowsRouter.get("/:id", requestFindBorrowByID)
borrowsRouter.post("/", jsonParser, sendAddBorrowToDB)
borrowsRouter.delete("/:id", requestRemoveBorrowByID)

export default borrowsRouter
