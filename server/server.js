const express = require("express");
const bodyParser = require("body-parser");
const db = require("./utils/database");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.post("/addUser", async (req, res, next) => {
  const data = req.body;
  const email = data["email"];
  const name = data["name"];
  const age = data["age"];
  const cell = data["cell"];

  var exist = true;

  const response = await db.execute(
    `SELECT * FROM Users WHERE email = '${email}'`
  );

  if (response[0].length > 0) {
    exist = true;
  } else {
    exist = false;
  }

  if (exist) {
    res.json({ result: "User already exists" });
  } else {
    db.execute(
      `INSERT INTO users (name, email, cell_no, created_at, is_deleted, age) VALUES (?, ?, ?, ?, ?, ?)`,
      [name, email, cell, new Date(), false, age]
    )
      .then((result) => {
        console.log(result);
        res.json({ result: "Successful" });
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

app.post("/getUsers", (req, res, next) => {
  const data = req.body;
  const query = data["query"];
  console.log(query);
  if (query === "ALL") {
    db.execute("SELECT * FROM Users")
      .then((result) => {
        console.log(result[0]);
        res.json({ result: result[0] });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    const userName = query.toLowerCase();
    db.execute(`SELECT * FROM Users WHERE lower(name) LIKE '%${userName}%'`)
      .then((result) => {
        res.json({ result: result[0] });
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

app.listen(3030);
