const express = require('express');

const app = express();
const cors = require('cors');

require('dotenv').config({ path: 'config.env' });

const mongoose = require('mongoose');
const mongo = require('./mongo');

require('express-ws')(app);
const masagerSocket = require('../masager/socket');

const masager = require('../masager/route');

const cars = require('../cars/route');
const carsDb = require('../cars/mysql');

app.use(cors({ origin: [/\.github\.io$/, /:5000$/, /:8000/, /:1234/, /:9090/] }));
app.use(express.json());

const port = process.env.PORT || 5000;

app.listen(port, () => {
  mongo.connect((err, db) => {
    if (!db || err) {
      throw new Error('MongoDB init connection error.');
    }
    console.log('Successfully connected to MongoDB.');
  });

  mongoose
    .connect(process.env.MONGOOSE)
    .then(() => console.log('Succesfully connected: Mongoose.'))
    .catch(() => {
      throw new Error('Mongoose init connection error.');
    });

  carsDb.getConnection((err) => {
    if (err) {
      throw new Error('DB carshow init connection error.');
    }
    console.log('Successfully connected to db carshow.');
  });

  app.use(express.static('/home/Note-Lawn/build/'));

  app.use('/cars/', express.static('/home/cars/build/'));
  app.get('/cars/*', (req, res) => {
    res.sendFile('/home/cars/build/index.html');
  });

  app.use('/masager/', (req, res) => res.redirect('https://hukakhepak.github.io/masager/'));
  app.use('/api/masager/', masager);
  app.use('/websocket/masager/', masagerSocket);

  app.use('/api/cars/', cars);

  console.log(`Server is running on port: ${port}`);
});
