const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Initialize SQLite database
const db = new sqlite3.Database(':memory:'); // In-memory database for simplicity, change it for a file-based db in a real-world scenario

// Create a users table
db.serialize(() => {
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, googleId TEXT)");

  // Insert a test user
  const stmt = db.prepare("INSERT INTO users (googleId) VALUES (?)");
  stmt.run('123456789'); // Replace with an actual Google ID obtained from OAuth2
  stmt.finalize();
});

// Simple route to test the server
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
