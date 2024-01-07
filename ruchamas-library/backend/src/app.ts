import * as express from "express"

import booksRouter from "./routes/booksRouter"
import publishersRouter from "./routes/publishersRouter"
import readersRouter from "./routes/readersRouter"

const cors = require("cors")

const app = express()

app.use(
  cors({
    origin: "*",
  })
)

app.use("/books", booksRouter)
app.use("/publishers", publishersRouter)
app.use("/readers", readersRouter)

export default app
