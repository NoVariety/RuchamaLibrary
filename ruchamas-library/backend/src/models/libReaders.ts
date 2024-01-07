import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity()
export default class LibReaders {
  @PrimaryColumn("integer")
  id: number

  @Column("varchar")
  firstName: string

  @Column("varchar")
  lastName: string

  @Column("varchar")
  email: string

  @Column("varchar")
  phoneNumber: string

  @Column("date")
  joinDate: Date = new Date()
}
