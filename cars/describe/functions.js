const types = require('./types');
const {
  admin, manager, storekeeper, unauth,
} = require('./access');

const functions = {
  cars_count: {
    params: [],
    returns: types.count,
    access: [admin, manager, storekeeper, unauth],
  },
};

module.exports = functions;
