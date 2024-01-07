import LibReaders from "../models/libReaders"
import {
  fetchAllReaders,
  checkIfReaderExists,
  saveReaderToDB,
} from "../repositories/readersRepository"

const getAllReaders = async () => await fetchAllReaders()

const findIfReaderExists = async (id: number) => await checkIfReaderExists(id)

const addReaderToDB = async (reader: LibReaders) => await saveReaderToDB(reader)

export { getAllReaders, findIfReaderExists, addReaderToDB }
