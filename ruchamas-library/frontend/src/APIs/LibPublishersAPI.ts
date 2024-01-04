import { requestUrl } from "./api.consts"
import axios from "axios"

const publishersRequestUrl = `${requestUrl}/publishers`

const fetchAllPublishers = async () =>
  await axios.get(`${publishersRequestUrl}/`)

export { fetchAllPublishers }
