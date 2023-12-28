import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm"

import LibReaders from "./libReaders"
import LibBooks from "./libBooks"

@Entity()
export default class LibBorrows {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne((type) => LibBooks)
  @JoinColumn()
  book: LibBooks

  @OneToOne((type) => LibReaders)
  @JoinColumn()
  reader: LibReaders

  @Column("date")
  borrowDate: Date = new Date()

  @Column("date")
  returnDate: Date
}
