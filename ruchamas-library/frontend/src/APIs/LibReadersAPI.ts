import { requestUrl } from "./api.consts"
import axios from "axios"

//TODO: implement those three requests in backend

const readersRequestUrl = `${requestUrl}/readers`

const fetchAllReaders = async () => await axios.get(`${readersRequestUrl}/`)

const doesReaderExistByID = async (id: number) =>
  await axios.get(`${readersRequestUrl}/${id}`)

const addNewReaderToDB = async () =>
  //! get reader object as param
  await axios.post(`${readersRequestUrl}/` /* add param here */)

export { fetchAllReaders, doesReaderExistByID, addNewReaderToDB }
