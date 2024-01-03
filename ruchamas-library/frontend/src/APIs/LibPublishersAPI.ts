import { requestUrl } from "./api.consts"
import axios from "axios"

const fetchAllPublishers = async () =>
  await axios.get(`${requestUrl}/publishers/`)

export { fetchAllPublishers }
