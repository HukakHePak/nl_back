const { MongoClient } = require("mongodb");
const Db = process.env.MONGO;
var client = new MongoClient(Db || 'mongodb://127.0.0.1:27017');
module.exports = client;