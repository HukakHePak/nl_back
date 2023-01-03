const mysql = require('mysql');

function genCalling(name, length) {
  return `${name}(${Array.from({ length }).map(() => '?').join(',')})`;
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

    pool.exec = (name, params = []) => pool.sql(`select ${genCalling(name, params.length)}`, params)
      .then((result) => String(Object.values(result[0])[0]));

    pool.call = (name, params = []) => pool.sql(`call ${genCalling(name, params.length)}`, params)
      .then((result) => {
        if (!Array.isArray(result)) return undefined;
        if (result.length === 2) return result[0];

        return result.slice(0, -1).map((array) => (array.length === 1 ? array[0] : array));
      });

    return pool;
  },
};

module.exports = dbPool;
