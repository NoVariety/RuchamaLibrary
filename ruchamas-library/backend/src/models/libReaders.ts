import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity()
export default class LibReaders {
  @PrimaryColumn()
  id: number

  @Column("varchar")
  firstName: string

  @Column("varchar")
  lastName: string

  @Column("varchar")
  email: string

  @Column("integer")
  phoneNumber: number

  @Column("date")
  joinDate: Date = new Date()
}
