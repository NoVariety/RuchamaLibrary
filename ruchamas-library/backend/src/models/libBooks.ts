import { Entity, Column, PrimaryColumn, ManyToOne } from "typeorm"

import LibAuthors from "./libAuthors"
import LibPublishers from "./libPublishers"

import { noCoverAvailable, coverTypes } from "../data.consts"

@Entity()
export default class LibBooks {
  @PrimaryColumn("bigint")
  id: number

  @Column("varchar")
  title: string

  //! add default image
  @Column("varchar")
  coverImage: string = noCoverAvailable

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

  @Column({ type: "enum", enum: coverTypes })
  coverType: string

  @Column("integer")
  pageCount: number

  @Column("decimal", { precision: 5, scale: 2 })
  price: number

  @Column("integer")
  copies: number
}
