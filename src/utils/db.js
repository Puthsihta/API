// const mysql = require("mysql");

// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: "",
//   database: process.env.DB_DATABASE,
// });

// module.exports = db;
const { Sequelize } = require("sequelize");
const { createPool } = require("mysql");

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: "",
  database: process.env.DB_DATABASE,
});
module.exports = pool;

const sequelize = new Sequelize("nodejs", "root", null, {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

connect();
