const mysql = require('mysql'); 

// mysql.proto
// mysql.__proto__.call = function(procedure, ...params) {
//     console.log(procedure);
// }

// Object.setPrototypeOf(mysql, { call(procedure, ...params) {
//     console.log(procedure);
// }})


const pool = {
    db(database) {
        const pool = mysql.createPool({
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database,
        });

        pool.call = function(name, params, callback) {
            pool.query(`call ${name}(${params.join(',')})`, function (err, result) {
                callback(err, result[0]);
            });
        }

        pool.exec = function(name, params, callback) {
            pool.query(`select ${name}(${params.join(',')})`, function (err, result) {
                callback(err, result[0].values[0]);
            });
        }

        return pool;
    }
};

module.exports = pool;