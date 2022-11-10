const express = require('express');
const router = express.Router();
const db = require('../server/mongo').db('masager');
const crypto = require('crypto');

router.use(function (req, res, next) {
    console.log('routeL masager')
    next();
});

router.post('/user', function(req, res) {
    crypto.randomBytes(25, async (err, buf) => {
        if(err) {
            res.status(500).send('Internal error create token');
            return;
        }

        const doc = await db.collection('users').updateOne({ email: req.body.email }, 
            { $set: { token: buf.toString('hex'), last_update: new Date(), name: 'Anonym' }},
            { upsert: true });

        res.send(buf.toString('hex'))
        res.end();
    });
});

router.patch('/user', function(req, res) {
    if(!req.headers.authorization) {
        res.status(400).send('Unauthorized');
    }

    console.log(req.headers.authorization)

    if(!req.body.name) {
        res.status(400).send('Name can\'t be emty');
        return;
    }
    
    db.collection('users').updateOne({ token: req.headers.authorization.slice(7) }, {$set: { name: String(req.body.name) }});
    res.end();
});

router.get('/user', function(req, res) {
    
    res.send('hello world');
});
router.get('/user/me', function(req, res) {
    
    res.send('hello world');
});
router.get('/messages', function(req, res) {
    
    res.send('hello world');
});

module.exports = router;