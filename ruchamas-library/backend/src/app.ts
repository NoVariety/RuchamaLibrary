import * as express from "express"

import booksRouter from "./routes/booksRouter"

const app = express()

app.use("/books", booksRouter)

export default app
