const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const PORT = 8080;

let sql;

const db = new sqlite3.Database("./test.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.log("error");
});

// sql = `CREATE TABLE users(id INTEGER PRIMARY KEY,first_name,last_name,username,password,email)`;
// db.run(sql);

// db.run("DROP TABLE users");

// sql = `INSERT INTO users(first_name,last_name,username,password,email) VALUES(?,?,?,?,?)`
// db.run(sql,["fred","fredson","fred","test","fred@gmail.com"],(err)=>{
//     if (err) return console.error(err.message)
// })

//update the data
// sql = `UPDATE users SET first_name = ? WHERE id = ?`;
// db.run(sql, ["Jake", 1], (err) => {
//   if (err) return console.error(err.message);
// });

//Delete data
sql = `DELETE FROM users WHERE id = ?`;
db.run(sql, [1], (err) => {
  if (err) return console.error(err.message);
});

//query the data
sql = `SELECT * FROM users`;
db.all(sql, [], (err, rows) => {
  if (err) return console.error(err.message);
  rows.forEach((row) => {
    console.log(row);
  });
});

app.use(express.json());

app.listen(PORT, () => console.log(`it's alive on http:localhost:${PORT}`));

app.get("/tshirt", (req, res) => {
  res.status(200).send({
    tshirt: "shirt",
    size: "large",
  });
});

app.post("/tshirt/:id", (req, res) => {
  const { id } = req.params;
  const { logo } = req.body;

  if (!logo) {
    res.status(418).send({ message: "We need a logo!" });
  }

  res.send({
    tshirt: `le_shirt with your ${logo} and ID of ${id}`,
  });
});
