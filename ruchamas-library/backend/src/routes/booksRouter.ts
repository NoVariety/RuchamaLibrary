import {
  requestAllBooks,
  requestFindIfBookExists,
  sendAddBookToDB,
} from "../controllers/booksController"
import jsonParser from "../utils/jsonParser"
import * as express from "express"

const booksRouter = express.Router()

booksRouter.get("/", requestAllBooks)
booksRouter.get("/:isbn", requestFindIfBookExists)
booksRouter.post("/", jsonParser, sendAddBookToDB)

export default booksRouter
