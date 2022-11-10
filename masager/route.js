const express = require('express');
const router = express.Router();
const db = require('../server/mongo').db('masager');
const crypto = require('crypto');
const sendMail = require('../server/mail');

router.post('/user', function(req, res) {
    crypto.randomBytes(25, async (err, buf) => {
        if(err) {
            res.status(500).send('Internal error create token');
            return;
        }

        const token = buf.toString('hex');

        const doc = await db.collection('users').updateOne({ email: req.body.email }, 
            { $set: { token, last_update: new Date()}},
            { upsert: true });

        sendMail(req.body.email, 'Your token for authorize on masager app', `Key token: ${token}`);
            
        res.send(token)
        res.end();
    });
});

router.use(async function (req, res, next) {  // TODO: check last token update
    console.log('auth middleware');

    const token = req.headers?.authorization?.slice(7);

    if(!token) {
        res.status(400).send('Unauthorized');
        return;
    }

    const doc = await db.collection('users').findOne({ token })

    console.log(doc);

    if(!doc) {
        res.status(400).send('Unauthorized');
        return;
    }

    req.access = {
        user: doc._id,
        token: token,
    };

    next();
});


router.patch('/user', function(req, res) {
    if(!req.body.name) {
        res.status(400).send('Name can\'t be emty');
        return;
    }
    
    db.collection('users').updateOne({ token: req.headers.authorization.slice(7) }, {$set: { name: String(req.body.name) }});
    res.end();
});

router.get('/user/me', function(req, res) {
    
    res.send('hello world');
});
router.get('/messages', function(req, res) {
    
    res.send('hello world');
});

module.exports = router;