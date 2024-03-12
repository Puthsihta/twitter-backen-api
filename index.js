const express = require("express");
const app = express();
const dbConnect = require("./src/db/db.js");
const rootRouter = require("./src/routes/routes");
const { PORT } = require("./src/secret.js");

app.use(express.json());
app.use("/api", rootRouter);
dbConnect().catch((err) => {
  console.log("conect to database err : ", err);
});
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
