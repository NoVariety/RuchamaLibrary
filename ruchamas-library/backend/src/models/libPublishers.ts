import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import LibBooks from "./libBooks"

@Entity()
export default class LibPublishers {
  @PrimaryGeneratedColumn()
  id: number

  @Column("integer")
  name: string

  @Column("date")
  foundingDate: Date

  @Column("varchar")
  originCountry: String

  @OneToMany((type) => LibBooks, (book) => book.author)
  books: LibBooks[]
}
