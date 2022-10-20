const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "simple-project",
  password: "Paracha_21",
});

module.exports = pool.promise();
