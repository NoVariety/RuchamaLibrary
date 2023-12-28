import { requestAllBooks } from "../controllers/booksController"
import * as express from "express"

const booksRouter = express.Router()

booksRouter.get("/", requestAllBooks)

export default booksRouter
