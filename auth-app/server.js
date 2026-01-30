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
  secret: '59a5f341f4msh78188f3a3df3fa4p1774afjsnc721ccca70af', // make sure you have a real secret here
  resave: false,
  saveUninitialized: true
}));

// 🔥 Put static middleware here (before routes)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'auth')));

// ----------------- AUTH ROUTES -----------------
app.post('/signup', async (req, res) => {
  // your signup code...
});

app.post('/login', (req, res) => {
  // your login code...
});

app.get('/dashboard', (req, res) => {
  if (!req.session.userId) return res.status(401).send('Unauthorized');
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.send('Logged out');
});

// ----------------- EXTRA ROUTES -----------------
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'WHoleCode1.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
