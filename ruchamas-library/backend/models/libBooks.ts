import { Entity, Column, PrimaryColumn, ManyToOne } from "typeorm"

import LibAuthors from "./libAuthors"
import LibPublishers from "./libPublishers"

@Entity()
export default class LibBooks {
  @PrimaryColumn({ length: 13 })
  id: number

  @Column()
  title: string

  @Column()
  coverImage: string

  @ManyToOne((type) => LibAuthors, (author) => author.books)
  author: LibAuthors

  @ManyToOne((type) => LibPublishers, (publisher) => publisher.books)
  publisher: LibPublishers

  @Column()
  genre: string

  @Column({ length: 9 })
  coverType: string

  @Column()
  pageCount: number

  @Column("double")
  price: number

  @Column()
  copies: number
}
