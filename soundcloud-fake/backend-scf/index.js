const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("node:path");
const PORT = 3000;
const next = require("next"); // Include module next
const cors = require("cors");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const users = require('../src/constants/users.constant')

let sql;

console.log(__dirname);

const db = new sqlite3.Database(
  __dirname + "/test.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) return console.log(err);
  }
);

sql = `CREATE TABLE users(id INTEGER PRIMARY KEY,name,username,password,favSongs,favPlaylists,avatarUrl)`;
db.run(sql);

const cols = users.keys(values).join(", ");
const placeholders = users.keys(values).fill("?").join(", ");
db.run(
  "INSERT INTO users (" + cols + ") VALUES (" + placeholders + ")",
  users.values(values)
),
  (err) => {
    console.log(err);
  };

// sql = `INSERT INTO users(name,username,password,avatarUrl) VALUES(?,?,?,?)`
// db.run(sql,["fredson","fred","test","hisAvatarUrl"],(err)=>{
//     if (err) return console.error(err.message)
// })

app.prepare().then(() => {
  const server = express();

  server.use(cors());

  //Tạo ra các router. Dòng này có ý nghĩa khi gửi request đến path /a . Sẽ render file /a.js trong thư mục pages/a.js của Nextjs
  server.get("/api/home", (req, res) => {
    res.json({ message: "Hello World!" });
  });

  // Nếu các bạn muốn các routing tự động liến kết đến route files giống với cấu trúc của Nextjs thì chỉ cần thêm 3 dòng bên dưới
  // https://nextjs.org/docs/routing/introduction
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});

// db.run("DROP TABLE users");

//update the data
// sql = `UPDATE users SET first_name = ? WHERE id = ?`;
// db.run(sql, ["Jake", 1], (err) => {
//   if (err) return console.error(err.message);
// });

// Delete data
// sql = `DELETE FROM users WHERE id = ?`;
// db.run(sql, [3], (err) => {
//   if (err) return console.error(err.message);
// });

//query the data
sql = `SELECT * FROM users`;
db.all(sql, [], (err, rows) => {
  if (err) return console.error(err.message);
  rows.forEach((row) => {
    console.log(row);
  });
});

// app.use(express.json());

// app.get("/tshirt", (req, res) => {
//   res.status(200).send({
//     tshirt: "shirt",
//     size: "large",
//   });
// });

// app.post("/tshirt/:id", (req, res) => {
//   const { id } = req.params;
//   const { logo } = req.body;

//   if (!logo) {
//     res.status(418).send({ message: "We need a logo!" });
//   }

//   res.send({
//     tshirt: `le_shirt with your ${logo} and ID of ${id}`,
//   });
// });
