const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
const masager = require('../masager/route');
const mongo = require('./mongo');

app.use(cors());
app.use(express.json());
 
app.listen(port, () => {
    mongo.connect(function (err, db) {
        if (!db || err) {
            throw new Error('MongoDB init connection error.');
        }
        console.log("Successfully connected to MongoDB."); 
    });

    app.use('/masager/api/', masager);
    app.get('/', (req,res) => res.send('ok'));

  console.log(`Server is running on port: ${port}`);
});