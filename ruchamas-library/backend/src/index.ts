import { AppDataSource } from "./dataSource"
import LibAuthors from "./models/libAuthors"
import LibBooks from "./models/libBooks"
import LibBorrows from "./models/libBorrows"
import LibPublishers from "./models/libPublishers"
import LibReaders from "./models/libReaders"

//!move to backend
//!seperate backend into a different folder with node models and all the stuff
//!aka: frontend folder with public src and all the stuff, backend with same stuff
AppDataSource.initialize()
  .then(async () => {
    // await AppDataSource.manager.save(user)
    // const users = await AppDataSource.manager.find(User)
    // console.log("Loaded users: ", users)
  })
  .catch((error) => console.log(error))
