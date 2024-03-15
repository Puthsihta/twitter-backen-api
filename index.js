const express = require("express");
const cors = require("cors");
var session = require("express-session");
const app = express();
const dbConnect = require("./src/db/db.js");
const rootRouter = require("./src/routes/routes");
const { PORT } = require("./src/secret.js");

// app.use(session({
//   secret: 'dfndfndnfn',
//   resave: false,
//   saveUninitialized: true
// }))
app.use(cors());
app.use(express.json());
app.use("/api", rootRouter);
dbConnect().catch((err) => {
  console.log("conect to database err : ", err);
});
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
