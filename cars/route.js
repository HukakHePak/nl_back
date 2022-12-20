const express = require('express');
const router = express.Router();
const mysql = require('./mysql');

router.get('/users', function (req, res) {
    mysql.query('select * from carshow.user', (err, result) => {
        if(err) throw err;

        res.send({ result });
    });
});

module.exports = router;