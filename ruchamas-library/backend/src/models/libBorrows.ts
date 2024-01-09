import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm"

import LibReaders from "./libReaders"
import LibBooks from "./libBooks"

@Entity()
export default class LibBorrows {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne((type) => LibBooks)
  @JoinColumn()
  book: LibBooks

  @ManyToOne((type) => LibReaders)
  @JoinColumn()
  reader: LibReaders

  @Column("date")
  borrowDate: Date = new Date()

  @Column("date")
  returnDate: Date
}
