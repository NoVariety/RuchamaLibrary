import { DataSource } from "typeorm"
import "reflect-metadata"

import LibAuthors from "./models/libAuthors"
import LibBooks from "./models/libBooks"
import LibBorrows from "./models/libBorrows"
import LibPublishers from "./models/libPublishers"
import LibReaders from "./models/libReaders"

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
