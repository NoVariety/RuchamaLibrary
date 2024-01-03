import * as express from "express"

import booksRouter from "./routes/booksRouter"
import publishersRouter from "./routes/publishersRouter"

const app = express()

app.use("/books", booksRouter)
app.use("/publishers", publishersRouter)

export default app
