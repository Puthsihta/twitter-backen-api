require("dotenv").config();

const PORT = process.env.APP_PORT;
const DB_URL = process.env.DATABASE_URL;

module.exports = { PORT, DB_URL };
