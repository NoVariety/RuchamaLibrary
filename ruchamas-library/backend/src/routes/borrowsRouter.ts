import {
  requestAllBorrows,
  requestUnreturnedBorrowsBeforeDate,
  requestUnreturnedBorrowsByBookID,
  requestCountUnreturnedBorrowsByBookID,
  requestFindBorrowByID,
  sendAddBorrowToDB,
  requestReturnBookByID,
} from "../controllers/borrowsController"
import jsonParser from "../utils/jsonParser"
import * as express from "express"

const borrowsRouter = express.Router()

borrowsRouter.get("/", requestAllBorrows)
borrowsRouter.get(
  "/before-date/:date/unreturned",
  requestUnreturnedBorrowsBeforeDate
)
borrowsRouter.get("/by-book/:id/unreturned", requestUnreturnedBorrowsByBookID)
borrowsRouter.get(
  "/by-book/:id/count/unreturned",
  requestCountUnreturnedBorrowsByBookID
)
borrowsRouter.get("/:id", requestFindBorrowByID)
borrowsRouter.post("/", jsonParser, sendAddBorrowToDB)
borrowsRouter.patch("/:id", requestReturnBookByID)

export default borrowsRouter
