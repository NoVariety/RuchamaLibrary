import { LibReaders } from "../data.consts"
import { requestUrl } from "./api.consts"
import axios from "axios"

const readersRequestUrl = `${requestUrl}/readers`

const fetchAllReaders = async () => await axios.get(`${readersRequestUrl}/`)

const doesReaderExistByID = async (id: number) =>
  await axios.get(`${readersRequestUrl}/${id}`)

const addReaderToDB = async (reader: LibReaders) =>
  await axios.post(`${readersRequestUrl}/`, reader)

export { fetchAllReaders, doesReaderExistByID, addReaderToDB }
