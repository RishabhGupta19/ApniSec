import { app } from "./app.js";
import { Database } from "./config/db.js";
import { ENV } from "./config/env.js";

Database.connect().then(() => {
  app.listen(ENV.PORT, () => {
    console.log(`Running on ${ENV.PORT}`);
  });
});
