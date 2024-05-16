const express = require("express");
const path = require("node:path");
const PORT = 3000;
const next = require("next"); // Include module next
const cors = require("cors");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const users = require('./data')

app.prepare().then(() => {
  const server = express();

  const users = require('./routes/users')
  const songs = require('./routes/songs')
  const comments = require('./routes/comments')
  const genres = require('./routes/genres')
  const playlists = require('./routes/playlists')
  const artists = require('./routes/artists')

  server.use(cors());
  server.use(express.urlencoded({extended:false}))
  server.use(express.json())

  server.get("/api/home", (req, res) => {
    res.json({ message: "Hello World!" });
  });

  server.use('/api/users',users)
  server.use('/api/songs',songs)
  server.use('/api/comments',comments)
  server.use('/api/genres',genres)
  server.use('/api/playlists',playlists)
  server.use('/api/artists',artists)

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
// sql = `SELECT * FROM users`;
// db.all(sql, [], (err, rows) => {
//   if (err) return console.error(err.message);
//   rows.forEach((row) => {
//     console.log(row);
//   });
// });

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
