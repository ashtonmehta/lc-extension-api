import app from "./app";
import { AppDataSource } from "./data-source";
import { port } from "./config";

AppDataSource.initialize().then(async () => {
  app.listen(port);
  console.log(`Express server has started on port ${port}.`);
}).catch((error) => console.log(error));
