const express = require('express');
const router = express.Router();

router.ws('/', function(ws, req) {
    ws.on('message', function(msg) {
        console.log(msg);
        // ws.send({ data: 'Hello World!'});
    });
    

    ws.on('open', function (ws, req) {
        console.log('socket', req.testing);
        // ws.send({ data: 'Hello World!'});
    })

    ws.on('error', (err) => console.log(err))
});
  
module.exports = router;