const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
const mongo = require('./mongo');
require('express-ws')(app);
const masagerSocket = require('../masager/socket');
const masager = require('../masager/route');

app.use(cors({ origin: [/\.github\.io$/] }));
//app.use(cors());
app.use(express.json());
 
app.listen(port, () => {
    mongo.connect(function (err, db) {
        if (!db || err) {
            throw new Error('MongoDB init connection error.');
        }
        console.log("Successfully connected to MongoDB."); 
    });

    //app.use('/masager/', express.static('../masager'));
    app.use('/masager/', (req,res) => res.redirect('https://hukakhepak.github.io/masager/'));
    app.use('/api/masager/', masager);
    app.use('/websocket/masager/', masagerSocket);
    
    app.get('/', (req,res) => res.redirect('https://hukakhepak.github.io/Note-Lawn/'));

  console.log(`Server is running on port: ${port}`);
});

