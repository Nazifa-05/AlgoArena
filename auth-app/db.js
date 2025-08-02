const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',         // ✅ change if your MySQL username is different
  password: '12345',         // ✅ put your MySQL password here
  database: 'node_auth' // ✅ matches what you just created
});

db.connect((err) => {
  if (err) throw err;
  console.log('✅ Connected to MySQL database!');
});

module.exports = db;
