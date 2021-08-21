const server = require("./src/app.js");
const { conn } = require("./src/db.js");
require("dotenv").config();

// Syncing all the models at once.
conn
  .sync({ force: false })
  .then(() => {
    server.listen(3001, () => {
      console.log(`listening at 3001`);
    });
  })
  .catch((err) => console.log(err));
