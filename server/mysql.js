const mysql = require('mysql');

function ArrayOf(str, length) {
  return Array.from({ length })
    .map(() => str);
}

const dbPool = {
  db(database) {
    const pool = mysql.createPool({
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database,
    });

    pool.sql = (sql, params = []) => new Promise((resolve, reject) => {
      pool.query(sql, params, (err, result) => {
        if (err) reject(err);

        resolve(result);
      });
    });

    /**
     * Call stored procedure
     * @param {String} name  name of procedure
     * @param {Array} params    procedure parameters list
     * @returns Promise
     */
    pool.call = (name, params = []) => pool.sql(`call ${name}(${ArrayOf('?', params.length).join(',')})`, params);

    /**
     * Execute stored function
     * @param {String} name  name of function
     * @param {Array} params    function parameters list
     * @returns Promise
     */
    pool.exec = (name, params = []) => new Promise((resolve, reject) => {
      pool.query(`select ${name}(${ArrayOf('?', params.length).join(',')})`, params, (err, result) => {
        if (err) reject(err);
        try {
          resolve(Object.values(result[0])[0]);
        } catch (e) {
          reject(e);
        }
      });
    });

    return pool;
  },
};

module.exports = dbPool;
