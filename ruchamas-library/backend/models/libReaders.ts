import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity()
export default class LibReaders {
  @PrimaryColumn({ length: 9 })
  id: number

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  email: string

  @Column({ length: 10 })
  phoneNumber: number

  @Column()
  joinDate: Date
}
