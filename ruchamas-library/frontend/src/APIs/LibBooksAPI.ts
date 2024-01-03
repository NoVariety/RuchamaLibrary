import { requestUrl } from "./api.consts"
import axios from "axios"

const fetchAllBooks = async () => await axios.get(`${requestUrl}/books/`)

export { fetchAllBooks }
