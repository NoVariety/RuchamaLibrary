import {
  requestAllReaders,
  requestFindIfReaderExists,
  sendAddReaderToDB,
} from "../controllers/readersController"
import jsonParser from "../utils/jsonParser"
import * as express from "express"

const readersRouter = express.Router()

readersRouter.get("/", requestAllReaders)
readersRouter.get("/:id", requestFindIfReaderExists)
readersRouter.post("/", jsonParser, sendAddReaderToDB)

export default readersRouter
