import { Entity, Column, PrimaryColumn, ManyToOne } from "typeorm"

import LibPublishers from "./libPublishers"

import { noCoverAvailable, coverTypes } from "../data.consts"

@Entity()
export default class LibBooks {
  @PrimaryColumn("bigint")
  id: number

  @Column("varchar")
  title: string

  @Column("varchar")
  coverImage: string = noCoverAvailable

  @Column("varchar")
  author: string

  @ManyToOne((type) => LibPublishers, (publisher) => publisher.books)
  publisher: LibPublishers

  @Column("date")
  publishDate: Date

  @Column("varchar")
  language: string

  @Column("varchar")
  category: string

  @Column("text")
  summary: string

  @Column({ type: "enum", enum: coverTypes })
  coverType: string

  @Column("integer")
  pageCount: number

  @Column("decimal", { precision: 5, scale: 2, nullable: true })
  price: number

  @Column("integer", { nullable: true })
  copies: number
}
