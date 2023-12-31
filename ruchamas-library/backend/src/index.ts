import { AppDataSource } from "./dataSource"

import initializeDB from "./initializeDB"

import App from "./app"

const port = process.env.PORT || "8000"
App.listen(port)

console.log(`Listening on port ${port}`)

initializeDB(AppDataSource)
