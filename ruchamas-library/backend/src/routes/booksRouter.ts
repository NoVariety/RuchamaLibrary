import {
  requestAllBooks,
  requestFindIfBookExists,
  sendAddBookToDB,
} from "../controllers/booksController"
import * as express from "express"

const booksRouter = express.Router()

const bodyParser = require("body-parser")
const jsonParser = bodyParser.json()

booksRouter.get("/", requestAllBooks)
booksRouter.get("/:isbn", requestFindIfBookExists)
booksRouter.post("/", jsonParser, sendAddBookToDB)

export default booksRouter
