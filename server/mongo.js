const { MongoClient } = require("mongodb");
var client = new MongoClient(process.env.MONGO || 'mongodb://127.0.0.1:27017');
module.exports = client;