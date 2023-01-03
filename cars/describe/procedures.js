const types = require('./types');
const {
  admin, manager, storekeeper, unauth,
} = require('./access');

const procedures = {
  get_cars: {
    params: [],
    returns: types.table,
    access: [admin, manager, storekeeper, unauth],
  },
};

module.exports = procedures;
