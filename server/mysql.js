const mysql = require('mysql'); 

const pool = {
    db(database) {
        return mysql.createPool({
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database,
        });
    }
};

module.exports = pool;