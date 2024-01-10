import {
  requestAllBorrows,
  requestAllBorrowsByBookID,
  requestCountBorrowsByBookID,
  requestFindBorrowByID,
  sendAddBorrowToDB,
  requestReturnBookByID,
} from "../controllers/borrowsController"
import jsonParser from "../utils/jsonParser"
import * as express from "express"

const borrowsRouter = express.Router()

borrowsRouter.get("/", requestAllBorrows)
borrowsRouter.get("/by-book/:id", requestAllBorrowsByBookID)
borrowsRouter.get("/by-book/:id/count", requestCountBorrowsByBookID)
borrowsRouter.get("/:id", requestFindBorrowByID)
borrowsRouter.post("/", jsonParser, sendAddBorrowToDB)
borrowsRouter.patch("/:id", requestReturnBookByID)

export default borrowsRouter
