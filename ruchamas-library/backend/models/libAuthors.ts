import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm"

import LibBooks from "./libBooks"

@Entity()
export default class LibAuthors {
  @PrimaryGeneratedColumn()
  id: number

  @OneToMany((type) => LibBooks, (book) => book.author)
  books: LibBooks[]

  @Column()
  penName: string
}
