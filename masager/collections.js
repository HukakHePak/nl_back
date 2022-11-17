const db = require('../server/mongo').db('masager');

const Users = db.collection('users');
const Messages = db.collection('messages');

module.exports = { Users, Messages };