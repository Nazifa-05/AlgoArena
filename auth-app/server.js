const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// Signup Route
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) return res.status(500).send('DB error');
    if (results.length > 0) return res.status(409).send('Username already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
      if (err) return res.status(500).send('Failed to register');
      res.status(200).send('User registered');
    });
  });
});

// Login Route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err || results.length === 0) return res.status(401).send('Invalid credentials');

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(401).send('Invalid credentials');

    req.session.userId = user.id;
    res.status(200).send('Login successful');
  });
});

// Protected Route
app.get('/dashboard', (req, res) => {
  if (!req.session.userId) return res.status(401).send('Unauthorized');
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.send('Logged out');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
