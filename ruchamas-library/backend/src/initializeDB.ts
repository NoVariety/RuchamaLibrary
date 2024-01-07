import { DataSource } from "typeorm"

import LibBooks from "./models/libBooks"
import LibBorrows from "./models/libBorrows"
import LibPublishers from "./models/libPublishers"
import LibReaders from "./models/libReaders"

import { coverTypes } from "./data.consts"

/*
 ! delete db: 
 !   DROP TABLE lib_books, lib_borrows, lib_publishers, lib_readers CASCADE
 */

/*
 *initialize db:
 */
export default function initializeDB(dataSource: DataSource): void {
  dataSource
    .initialize()
    .then(async () => {
      // // ! publishers
      // const publisher = new LibPublishers()
      // publisher.name = "Seven Seas Entertainment"
      // publisher.foundingDate = new Date()
      // publisher.originCountry = "California"
      // const publisher2 = new LibPublishers()
      // publisher2.name = "Comma Press"
      // publisher2.foundingDate = new Date()
      // publisher2.originCountry = "USA"
      // const publisher3 = new LibPublishers()
      // publisher3.name = "Artisan Books"
      // publisher3.foundingDate = new Date("1994-03-15")
      // publisher3.originCountry = "New York"
      // const publisher4 = new LibPublishers()
      // publisher4.name = "Crown Publishing"
      // publisher4.foundingDate = new Date("1933-01-03")
      // publisher4.originCountry = "New York"
      // const publisher5 = new LibPublishers()
      // publisher5.name = "Penguin Random House"
      // publisher5.foundingDate = new Date("2013-07-01")
      // publisher5.originCountry = "USA"
      // const publisher6 = new LibPublishers()
      // publisher6.name = "YenPress"
      // publisher6.foundingDate = new Date("2006-01-01")
      // publisher6.originCountry = "New York"
      // const publisherRepository = dataSource.getRepository(LibPublishers)
      // await publisherRepository.save(publisher)
      // await publisherRepository.save(publisher2)
      // await publisherRepository.save(publisher3)
      // await publisherRepository.save(publisher4)
      // await publisherRepository.save(publisher5)
      // await publisherRepository.save(publisher6)
      // // ! books
      // const book = new LibBooks()
      // book.id = 9781638584155
      // book.title = "The Tunnel to Summer, the Exit of Goodbyes (Light Novel)"
      // book.coverImage =
      //   "http://books.google.com/books/content?id=tJiQEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
      // book.author = "Mei Hachimoku"
      // book.publisher = publisher
      // book.publishDate = new Date("2022-05-17")
      // book.language = "en"
      // book.category = "Comics & Graphic Novels"
      // book.summary =
      //   "The award-winning, bittersweet sci-fi tale of a mysterious tunnel, time travel, and young summer love that inspired an anime film. Don’t miss the manga adaptation and the light novel Wait For Me Yesterday in Spring (by the same creators), both also from Seven Seas! One summer morning before school, Kaoru hears an unsettling rumor—of a mysterious tunnel that can grant any wish to those who enter it, but ages them dramatically in exchange. At first, he writes it off as nothing more than an urban legend, but that very night, he happens upon the selfsame passage: the Urashima Tunnel. As he stands before its gaping maw, a thought occurs to him—if this tunnel truly does have the power to grant any wish, could he use it to bring his younger sister back from her untimely death five years prior? Yet when he returns to explore the tunnel the next day, he finds he’s been followed by the new girl in class: a total enigma by the name of Anzu. She takes an interest in Kaoru, and they agree to work together to investigate the time-twisting tunnel and uncover its mysteries. Together, they might achieve their deepest desires…but are they prepared for what it may cost them?"
      // book.coverType = coverTypes.PAPERBACK
      // book.pageCount = 350
      // book.price = 14.99
      // book.copies = 3
      // const bookRepository = dataSource.getRepository(LibBooks)
      // await bookRepository.save(book)
      // // ! readers
      // const reader = new LibReaders()
      // reader.id = 123456789
      // reader.firstName = "Abra"
      // reader.lastName = "Kadabra"
      // reader.email = "abrakadabra@magic.wa.nd"
      // reader.phoneNumber = "0123456789"
      // reader.joinDate = new Date("1223-12-23")
      // const readerRepository = dataSource.getRepository(LibReaders)
      // await readerRepository.save(reader)
    })
    .catch((error) => console.log(error))
}
