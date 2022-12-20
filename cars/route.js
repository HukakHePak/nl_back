const express = require('express');
const router = express.Router();
const mysql = require('./mysql');



router.get('/users', function (req, res) {

    // mysql.call('called procedure!')
    // mysql.exec('called procedure!')
    // let out;

    // mysql.query('call show_user_w(@out)', [out], (err, result) => {
    //     if(err) throw err;

    //     res.send({ result, out });
    // });
    mysql.query('select get_users_count()', (err, result) => {
        if(err) throw err;

        res.send({ result });
    });
    // mysql.query('call show_all_users()', (err, result) => {
    //     if(err) throw err;

    //     res.send({ result });
    // });
    // mysql.query('select * from user', (err, result) => {
    //     if(err) throw err;

    //     res.send({ result });
    // });
});

module.exports = router;