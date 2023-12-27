import React from "react"

import "reflect-metadata"

import {} from "./AppStyle"

import { Container } from "@mui/material"

import { AppDataSource } from "./dataSource"

AppDataSource.initialize()
  .then(async () => {
    // await AppDataSource.manager.save(user)
    // const users = await AppDataSource.manager.find(User)
    // console.log("Loaded users: ", users)
  })
  .catch((error) => console.log(error))

function App() {
  return <Container></Container>
}

export default App
