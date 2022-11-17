const express = require('express');
const router = express.Router();
const db = require('../server/mongo').db('masager');
const crypto = require('crypto');
const mailer = require('../server/mail');
const DATE_DIFF = require('date-diff-js');
const { Users, Messages } = require('./collections');

router.post('/user', function(req, res) {
    crypto.randomBytes(25, async (err, buf) => {
        if(err) {
            res.status(500).send('Internal error create token');
            return;
        }

        const token = buf.toString('hex');
        const email = req.body.email;

        const user = await Users.findOne({ email });

        if(user) {
            Users.updateOne({ _id: user._id }, { $set: { token, last_update: new Date() }})
        } else {
            Users.insertOne({ email, token, name: 'Anonym', last_update: new Date()});
        }

        mailer(req.body.email, 'Your token for authorize on masager app', `Key token: ${token}`);
            
        res.end();
    });
});

router.use(async function (req, res, next) {  // TODO: check last token update
    console.log('auth middleware');

    const token = req.headers?.authorization?.slice(7);

    if(!token) {
        res.status(401).send({error: 'No token'});
        return;
    }

    const doc = await Users.findOne({ token })

    if(!doc) {
        res.status(401).send({error: 'Cant\'t find user'});
        return;
    }

    const cookieDays = 1;

    if(DATE_DIFF(Date.now(), doc.last_update, 'D').output > cookieDays) {
        res.status(401).send({error: 'Not actual token'});
        return;
    }

    req.access = {
        user: doc,
        token: token,
    };

    next();
});


router.patch('/user', function(req, res) {
    if(!req.body.name) {
        res.status(400).send({error: 'Name can\'t be emty'});
        return;
    }
    
    Users.updateOne({ token: req.headers.authorization.slice(7) }, {$set: { name: String(req.body.name) }});
    res.end();
});

router.get('/user/me', function(req, res) {
    const { email, name} = {...req.access.user};
    
    res.send({ email, name });
});
router.get('/messages', async function(req, res) {
    const messages = Messages.aggregate([{ $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'user' }}]);       

    let data = [];
  
    for await (let {user, text, createdAt} of messages){
        data.push({ user: { name: user[0].name, email: user[0].email}, text, createdAt});
    }

    res.send({ messages: data });
});

module.exports = router;