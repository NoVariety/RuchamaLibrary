import {
  requestAllBooks,
  requestFindIfBookExists,
  sendAddBookToDB,
  requestBookCopiesByISBN,
} from "../controllers/booksController"
import jsonParser from "../utils/jsonParser"
import * as express from "express"

const booksRouter = express.Router()

booksRouter.get("/", requestAllBooks)

booksRouter.get("/:isbn", requestFindIfBookExists)

booksRouter.post("/", jsonParser, sendAddBookToDB)

booksRouter.get("/copies/:isbn", requestBookCopiesByISBN)

export default booksRouter
