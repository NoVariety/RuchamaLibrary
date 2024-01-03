import { fetchAllPublishers } from "../repositories/publishersRepository"

const getAllPublishers = async () => await fetchAllPublishers()

export { getAllPublishers }
