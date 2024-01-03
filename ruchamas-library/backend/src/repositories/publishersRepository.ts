import { AppDataSource } from "../dataSource"
import LibPublishers from "../models/libPublishers"

const publisherRepository = AppDataSource.getRepository(LibPublishers)

const fetchAllPublishers = async () => await publisherRepository.find({})

export { fetchAllPublishers }
