import { requestAllPublishers } from "../controllers/publishersController"
import * as express from "express"

const publishersRouter = express.Router()

publishersRouter.get("/", requestAllPublishers)

export default publishersRouter
