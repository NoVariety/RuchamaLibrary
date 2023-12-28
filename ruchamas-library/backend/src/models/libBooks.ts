import { Entity, Column, PrimaryColumn, ManyToOne } from "typeorm"

import LibAuthors from "./libAuthors"
import LibPublishers from "./libPublishers"

//! add type to all cols

@Entity()
export default class LibBooks {
  @PrimaryColumn("integer")
  id: number

  @Column("varchar")
  title: string

  @Column("varchar")
  coverImage: string

  @ManyToOne((type) => LibAuthors, (author) => author.books)
  author: LibAuthors

  @ManyToOne((type) => LibPublishers, (publisher) => publisher.books)
  publisher: LibPublishers

  @Column("date")
  publishDate: Date

  @Column("varchar")
  language: string

  @Column("varchar")
  genre: string

  @Column("text")
  summary: string

  @Column("varchar", { length: 9 })
  coverType: string

  @Column("integer")
  pageCount: number

  @Column("decimal", { precision: 5, scale: 2 })
  price: number

  @Column("integer")
  copies: number
}
