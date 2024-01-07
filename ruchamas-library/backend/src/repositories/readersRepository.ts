import { AppDataSource } from "../dataSource"
import LibReaders from "../models/libReaders"

const readerRepository = AppDataSource.getRepository(LibReaders)

const fetchAllReaders = async () => await readerRepository.find({})

const checkIfReaderExists = async (id: number) =>
  await readerRepository.exist({ where: { id: id } })

const saveReaderToDB = async (book: LibReaders) =>
  await readerRepository.save(book)

export { fetchAllReaders, checkIfReaderExists, saveReaderToDB }
