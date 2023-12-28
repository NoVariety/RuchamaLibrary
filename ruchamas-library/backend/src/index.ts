import { AppDataSource } from "./dataSource"
import LibAuthors from "./models/libAuthors"
import LibBooks from "./models/libBooks"
import LibBorrows from "./models/libBorrows"
import LibPublishers from "./models/libPublishers"
import LibReaders from "./models/libReaders"
import { coverTypes } from "./data.consts"

import App from "./app"

const port = process.env.PORT || "8000"
App.listen(port)

console.log(`Listening on port ${port}`)

AppDataSource.initialize()
  .then(async () => {
    // const author = new LibAuthors()
    // author.penName = "Mei Hachimoku"
    // const publisher = new LibPublishers()
    // publisher.name = "Seven Seas Entertainment"
    // publisher.foundingDate = new Date()
    // publisher.originCountry = "California"
    // const book = new LibBooks()
    // book.id = 9780345376596
    // book.title = "The Tunnel to Summer, the Exit of Goodbyes (Light Novel)"
    // book.coverImage =
    //   "http://books.google.com/books/content?id=tJiQEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
    // book.author = author
    // book.publisher = publisher
    // book.publishDate = new Date("2022-05-17")
    // book.language = "en"
    // book.genre = "Comics & Graphic Novels"
    // book.summary =
    //   "The award-winning, bittersweet sci-fi tale of a mysterious tunnel, time travel, and young summer love that inspired an anime film. Don’t miss the manga adaptation and the light novel Wait For Me Yesterday in Spring (by the same creators), both also from Seven Seas! One summer morning before school, Kaoru hears an unsettling rumor—of a mysterious tunnel that can grant any wish to those who enter it, but ages them dramatically in exchange. At first, he writes it off as nothing more than an urban legend, but that very night, he happens upon the selfsame passage: the Urashima Tunnel. As he stands before its gaping maw, a thought occurs to him—if this tunnel truly does have the power to grant any wish, could he use it to bring his younger sister back from her untimely death five years prior? Yet when he returns to explore the tunnel the next day, he finds he’s been followed by the new girl in class: a total enigma by the name of Anzu. She takes an interest in Kaoru, and they agree to work together to investigate the time-twisting tunnel and uncover its mysteries. Together, they might achieve their deepest desires…but are they prepared for what it may cost them?"
    // book.coverType = coverTypes.PAPERBACK
    // book.pageCount = 350
    // book.price = 14.99
    // book.copies = 3
    // const authorRepository = AppDataSource.getRepository(LibAuthors)
    // const publisherRepository = AppDataSource.getRepository(LibPublishers)
    // const bookRepository = AppDataSource.getRepository(LibBooks)
    // await authorRepository.save(author)
    // await publisherRepository.save(publisher)
    // await bookRepository.save(book)
  })
  .catch((error) => console.log(error))
