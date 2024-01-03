import axios from "axios"

const fetchBooksApi = async (isbn: number) =>
  await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)

export { fetchBooksApi }
