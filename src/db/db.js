const mongoose = require("mongoose");
const { DB_URL } = require("../secret");

async function dbConnect() {
  mongoose.connection.on("connected", () =>
    console.log("connected to database successfully")
  );
  await mongoose.connect(DB_URL);
}

module.exports = dbConnect;
