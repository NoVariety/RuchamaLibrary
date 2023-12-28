import LibBooks from "../models/libBooks"
import { AppDataSource } from "../dataSource"

const bookRepository = AppDataSource.getRepository(LibBooks)

const fetchAllBooks = async () => await bookRepository.find()

export { fetchAllBooks }
