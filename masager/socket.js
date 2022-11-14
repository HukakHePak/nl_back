const express = require('express');
const router = express.Router();
const db = require('../server/mongo').db('masager');

const clients = [];

router.ws('/', async function(ws, req) {
    const token = Object.keys(req.query)[0];

    let user;

    if(token) {
        user = await db.collection('users').findOne({ token });

        if(!user) {
            ws.close(undefined,'Unauthorized');
            return;
        }
    } else {
        ws.close(undefined,'Unauthorized');
        return;
    }

    console.log('client connected: ' + user.name);
    clients.push(ws);

    const messages = db.collection('messages');

    ws.on('message', async function(msg, req) {
        try {
            const text = JSON.parse(msg).text.trim();
            if(!text.length) return;
            
            
            await messages.insertOne({ userId: user._id, text, createdAt: Date.now()});

            const message = { user: { name: user.name, email: user.email }, text, createdAt: Date.now()};
                        
            clients.forEach(client => client.send(JSON.stringify(message)));
        } catch(err) {
            console.log(err);
        }
    });

    ws.on('error', function (err) {
        console.log(err);
        ws.emit('close');
    });

    ws.on('close', function(ws, err) {
        console.log('client disconnected: ' + user.name);  
        clients.splice(clients.indexOf(ws));     
    });
});
  
module.exports = router;