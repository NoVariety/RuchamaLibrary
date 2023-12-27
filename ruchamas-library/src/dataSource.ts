import "reflect-metadata"
import { DataSource } from "typeorm"
import LibAuthors from "../backend/models/libAuthors"
import LibBooks from "../backend/models/libBooks"
import LibBorrows from "../backend/models/libBorrows"
import LibPublishers from "../backend/models/libPublishers"
import LibReaders from "../backend/models/libReaders"

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "pgadmin",
  database: "ruchama",
  synchronize: true,
  logging: false,
  entities: [LibAuthors, LibBooks, LibBorrows, LibPublishers, LibReaders],
  migrations: [],
  subscribers: [],
})
