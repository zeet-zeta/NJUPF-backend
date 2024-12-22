const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '121.41.102.207',
    user: 'root',
    password: 'NJUpf4&59',
    database: 'my_database'
});

connection.connect(err => {
    if (err) {
        console.error('Database connection error:', err.stack);
    } else {
        console.log('Connected to the database.');
    }
});

module.exports = connection;